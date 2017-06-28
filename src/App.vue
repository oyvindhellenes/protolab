<template>
  <div id="app" class="beige-bg">
    <img src="./assets/cover-round.png" id="header-img">
    <div id="firebaseui-auth-container"></div>
    <div id="loader">&hellip;</div>
    <div v-if="currentUser">
      <h2>Hello {{ currentUser.email }},</h2>
      <button v-on:click="signOut">Sign out</button>
      <div v-if="stripeCustomerInitialized">
        <h3>Credit Cards</h3>
        <ul>
          <li v-for="(source, id) in sources">
            <span v-if="source.id">
              {{ source.brand }} &hellip;{{ source.last4 }}
              (exp. {{ source.exp_month }}/{{ source.exp_year }})
            </span>
            <span v-else>&hellip;</span>
          </li>
        </ul>
        <div>
          <h4>New</h4>
          <div>
            <label>
              Number <input v-model="newCreditCard.number">
            </label>
          </div>
          <div>
            <label>
              CCV <input v-model="newCreditCard.cvc">
            </label>
          </div>
          <div>
            <label>
              Exp
              <input v-model="newCreditCard.exp_month" size="2"> /
              <input v-model="newCreditCard.exp_year" size="4">
            </label>
          </div>
          <div>
            <label>
              Zip <input v-model="newCreditCard.address_zip">
            </label>
          </div>
          <div>
            <button v-on:click="submitNewCreditCard">Add</button>
            {{ newCreditCard.error }}
          </div>
        </div>
      </div>
      <div v-else>&hellip;</div>
      <h3>Subscribe</h3>
      <div>
        <label>
          Card
          <select v-model="newCharge.source">
            <option :value="null">Default payment method</option>
            <option v-for="(source, id) in sources" v-bind:value="source.id" v-if="source.id">
              {{ source.brand }} &hellip;{{ source.last4 }}
              (exp. {{ source.exp_month }}/{{ source.exp_year }})
            </option>
          </select>
        </label>
      </div>
      <div>
        <button v-on:click="submitNewSubscription">Subscribe</button>
        {{ newCharge.error }}
      </div>
      <div>
        <button v-on:click="unsubscribe">Unsubscribe</button>
        {{ newCharge.error }}
      </div>
    </div>
    <nav class=container id="navigation">
      <ul class="nav nav-tabs">
        <li class="nav-item nav-left" v-on:click="setActive">
          <router-link to="/om" id="om" class="nav-link">Reodorklubben</router-link>
        </li>
        <li class="nav-item" v-on:click="setActive">
          <router-link to="/heim" id="heim" class="nav-link">Makerspace</router-link>
        </li>
        <li class="nav-item nav-right" v-on:click="setActive">
          <router-link to="/info" id="info" class="nav-link">Info</router-link>
        </li>
      </ul>
    </nav>
    <div class="home container dark-bg">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
var request = require('../node_modules/request');

var firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
export default {
  name: 'app',
  data: function(){
    return {
    currentUser: null,
    sources: {},
    stripeCustomerInitialized: false,
    newCreditCard: {
      number: '4242424242424242',
      cvc: '111',
      exp_month: 1,
      exp_year: 2020,
      address_zip: '00000'
    },
    charges: {},
    newCharge: {
      source: null,
      amount: 2000
    }
  }
  },
  ready: () => {

  },
  mounted: function() {
    this.setActive()
    Stripe.setPublishableKey('pk_test_DhbaltXpWcE22ulgVtP4JGBO');


    var firebaseAuthOptions = {
      callbacks: {
        signInSuccess: (currentUser, credential, redirectUrl) => { return false; },
        uiShown: () => { document.getElementById('loader').style.display = 'none'; }
      },
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      signInOptions: [ firebase.auth.GoogleAuthProvider.PROVIDER_ID ],
      tosUrl: '/'
    };
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        document.getElementById('loader').style.display = 'none';
        this.currentUser = firebaseUser;
        this.listen();
      } else {
        firebaseUI.start('#firebaseui-auth-container', firebaseAuthOptions);
        this.currentUser = null;
      }
    });
  },
  methods: {
    listen: function() {
      firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/customer_id`).on('value', snapshot => {
        this.stripeCustomerInitialized = (snapshot.val() !== null);
      }, () => {
        this.stripeCustomerInitialized = false;
      });
      firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/sources`).on('value', snapshot => {
        this.sources = snapshot.val();
      }, () => {
        this.sources = {};
      });
      firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/charges`).on('value', snapshot => {
        this.charges = snapshot.val();
      }, () => {
        this.charges = {};
      });
    },
    submitNewCreditCard: function() {
      Stripe.card.createToken({
        number: this.newCreditCard.number,
        cvc: this.newCreditCard.cvc,
        exp_month: this.newCreditCard.exp_month,
        exp_year: this.newCreditCard.exp_year,
        address_zip: this.newCreditCard.address_zip
      }, (status, response) => {
        if (response.error) {
          this.newCreditCard.error = response.error.message;
        } else {
          firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/sources`).push({token: response.id}).then(() => {
            this.newCreditCard = {
              number: '',
              cvc: '',
              exp_month: 1,
              exp_year: 2017,
              address_zip: ''
            };
          });
        }
      });
    },
    submitNewCharge: function() {
      firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/charges`).push({
        source: this.newCharge.source,
        amount: parseInt(this.newCharge.amount)
      });
    },
    submitNewSubscription: function() {
      firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/subscriptions`).push({
        source: this.newCharge.source
      })
    },
    unsubscribe: function() {
      let userKey = this.currentUser.uid;
      firebase.database().ref(`/stripe_customers/${userKey}/subscriptions`).once('value', function(snapshot) {
        snapshot.forEach(function(sub){
          let subscription = sub.val();
          let options = {
            url: 'https://us-central1-protolabvest-f8252.cloudfunctions.net/unsubscribeCustomer',
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            form: {
              id: subscription.id
            }
          }

          if (!subscription.cancel_at_period_end) {
            request.post(options, function (error, response, body) {
              console.log('error:', error); // Print the error if one occurred
              console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
              console.log('body:', body); // Print the HTML for the Google homepage.
            });
          } else {
            console.log("Not cancelled");
          }
        })
      });
    },
    signOut: function() {
      firebase.auth().signOut()
    },
    setActive: function() {
      let path = window.location.pathname.split( '/' )[1];
      setTimeout(() => {
        let item = document.getElementById(path);
        item.className += " active bold";
      }, 50);
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

@media (max-width: 767px) {
  #navigation .nav-item a{
    font-size: 24px !important;
    padding-top: 25px !important;
  }
  #header-img {
    height: 150px !important;
  }
}

body {
  margin: 0;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

nav {
    margin-top: 100px;
}

.container {
  padding-right: 0px;
  padding-left: 0px;
}

.home {
  border-width: 13px;
  border-style: solid;
  border-color:  #CE6A1B;
  padding: 15px 10% 500px 10%;

}

.dark {
  color: #321700;
}

.orange {
  color: #CE6A1B;
}

.brown {
  color: #7D3E00;
}
.beige {
  color: #EAE3D1;
}

.black {
  color: black;
}

.dark-bg {
  background-color: #321700;
}

.orange-bg {
  background-color: #CE6A1B;
}

.brown-bg {
  background-color: #7D3E00;
}
.beige-bg {
  background-color: #EAE3D1;
}

.bold {
  font-family: 'Lilita One' !important;
}

.bold-underscore {
  font-family: 'Lilita One' !important;
  text-decoration: underline;
}

.p {
  font-family: 'Helvetica' !important;
  font-weight: lighter;
  text-align: left;
  padding-left: 40px;
  padding-right: 40px;
}

.p-center {
  font-family: 'Helvetica' !important;
  font-weight: lighter;
  text-align: center;
  padding-left: 40px;
  padding-right: 40px;
}

.padding-top-bottom {
  padding-top: 20px;
  padding-bottom: 20px;
}

#navigation .nav-link {
  height: 100px;
  position: relative;
  top: 5px;
  background-color: #EAE3D1;
  border-style: none none none none;
  border-color: #CE6A1B;
  border-width: 5px;
}

#navigation .nav-item a{
  color: black;
  font-size: 30px;
  padding-top: 25px;
}

#navigation .nav-item {
  width: 100%;
}

#navigation .nav-right {
  margin-left: 20px;
  margin-right: 0px;
}

#navigation .nav-left {
  margin-right: 20px;
  margin-left: 0px;
}

#navigation .nav-link:hover {
  border-style: solid solid none solid;
  border-color: #CE6A1B;
  border-width: 10px;
}

#navigation .nav-link.active {
  background-color: #CE6A1B;
  position: relative;
  top: 5px
}

#navigation .nav-tabs {
  border-bottom: none;
}

#navigation .nav-tabs .nav-link.active {
  color: black;
}

#spacer {
  height: 15px;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 100%;
}

#header-img {
  width: 100%;
  padding: 20px;
}
#logo-cover {
  width: 60%;
  padding: 20px ;
}
</style>
