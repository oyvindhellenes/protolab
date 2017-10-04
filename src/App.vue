<template>
  <div id="app" class="beige-bg">
    <img src="./assets/cover-round.png" id="header-img">
    <div id="firebaseui-auth-container"></div>
    <div id="loader">&hellip;</div>
    <div v-if="currentUser">
      <h2>Hello {{ currentUser.email }},</h2>
      <button v-on:click="signOut">Sign out</button>
    <!-- Button trigger modal -->
    <div v-if="dateRenew">
      <button id="unsubscribeBtn" v-on:click="unsubscribe" class="btn btn-primary btn-lg orange-bg">Meld meg ut</button>
      <i id="spinnerIcon" class="fa fa-spinner fa-spin loader" style="font-size:24px"></i>
      {{ newCharge.error }}
      <h4>Ditt medlemskap blir fornya {{this.dateRenew.toDateString()}}</h4>
    </div>
    <div v-else>
      <div v-if="dateEnd">
        <button id="unsubscribeBtn" v-on:click="reactivate" class="btn btn-primary btn-lg orange-bg">Aktiver abbonment</button>
        <h4>Ditt medlemskap går ut {{this.dateEnd.toDateString()}} og blir ikkje fornya</h4>
      </div>
      <div v-else>
        <button id="subscribeBtn" type="button" class="btn btn-primary btn-lg orange-bg" data-toggle="modal" data-target="#myModal">
          Bli medlem!
        </button>
      </div>
      <i id="spinnerIcon" class="fa fa-spinner fa-spin loader" style="font-size:24px"></i>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content beige-bg align-left">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">Bli medlem av Protolab Vest</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>

          <div class="modal-body">

              <div v-if="stripeCustomerInitialized">
                <div v-if="firstStep">
                  <div>
                    <label>
                      Velg kort:
                      <select class="form-control" v-model="newCharge.source">
                        <option :value="null">Ingen kort valgt</option>
                        <option v-for="(source, id) in sources" v-bind:value="source.id" v-if="source.id">
                          {{ source.brand }} &hellip;{{ source.last4 }}
                          (exp. {{ source.exp_month }}/{{ source.exp_year }})
                        </option>
                      </select>
                    </label>
                    <button id="fortsettBtn" class="btn btn-primary" v-on:click="toggleSteps" >Forsett</button>
                    <div class="alert alert-danger alert-dismissable">
                      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                      Du må velge eit kort du ønsker å betale med.
                    </div>
                  </div>
                  <br>
                  <br>
                  <div v-if="newCard">
                    <h4>Legg til nytt kort</h4>
                    <form>
                      <div class="form-group">
                        <label>
                          Navn på kortholder <input class="form-control" v-model="newCreditCard.name">
                        </label>
                      </div>
                      <div class="form-group">
                        <label>
                          Number <input class="form-control" v-model="newCreditCard.number">
                        </label>
                      </div>
                      <div class="form-group">
                        <div class="form-group row">
                          <div class="col-md-4">
                            <div class="">
                              <label>
                                CCV <input class="form-control" v-model="newCreditCard.cvc">
                              </label>
                            </div>
                          </div>
                          <div class="col-md-8">
                            <div class="">
                              <label>
                                Exp
                                <ul class="list-inline">
                                  <li class="list-inline-item">
                                    <input class="form-control" v-model="newCreditCard.exp_month" size="2">
                                  </li>
                                  <li class="list-inline-item"> / </li>
                                  <li class="list-inline-item">
                                    <input class="form-control" v-model="newCreditCard.exp_year" size="4">
                                  </li>
                                </ul>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button class="btn btn-default" v-on:click="submitNewCreditCard">Legg til kort</button>
                        {{ newCreditCard.error }}
                      </div>
                    </form>
                  </div>
                  <div v-else>
                    <button class="btn btn-default" v-on:click="toggleNewCard">Legg til nytt kort</button>
                  </div>
                </div>
                <div v-else>
                  <h3>Subscribe</h3>
                  <button class="btn btn-primary" data-dismiss="modal" v-on:click="submitNewSubscription">Bli medlem</button>
                  <br>
                  <button class="btn btn-default" v-on:click="toggleSteps">Tilbake</button>
                  {{ newCharge.error }}
                </div>

              </div>
              <div v-else>&hellip;</div>

          </div>
        </div>
        </div>
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

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})

var firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
export default {
  name: 'app',
  data: function(){
    return {
    currentUser: null,
    subscription: null,
    thankyou: "Takk for at du var medlem. Vi håpar du kjem tilbake :)",
    dateRenew: 0,
    dateEnd: 0,
    sources: {},
    stripeCustomerInitialized: false,
    newCreditCard: {
      name: '',
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
    },
    firstStep: true,
    newCard: false
  }
  },
  ready: () => {

  },
  mounted: function() {
    this.setActive()
    let thisDate = new Date();
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
        let subData = null;
        document.getElementById('loader').style.display = 'none';
        this.currentUser = firebaseUser;
        this.listen();
        firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/subscriptions`).once('value', snapshot => {
          snapshot.forEach(sub => {
            this.subscription = sub.val();
            this.subscription.key = sub.key;
            if (!sub.val().cancel_at_period_end) {
              this.dateRenew = new Date(sub.val().current_period_end*1000)
            } else if (sub.val().current_period_end*1000 > thisDate.getTime()) {
              this.dateEnd = new Date(sub.val().current_period_end*1000);
            }
          })
        });
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
    submitNewCreditCard: function(e) {
      e.preventDefault();

      Stripe.card.createToken({
        number: this.newCreditCard.number,
        cvc: this.newCreditCard.cvc,
        exp_month: this.newCreditCard.exp_month,
        exp_year: this.newCreditCard.exp_year,
        address_zip: this.newCreditCard.address_zip,
        name: this.newCreditCard.name
      }, (status, response) => {
        if (response.error) {
          this.newCreditCard.error = response.error.message;
        } else {
          firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/sources`).push({token: response.id}).then(() => {
            this.newCreditCard = {
              name: '',
              number: '',
              cvc: '',
              exp_month: 1,
              exp_year: 2017,
              address_zip: ''
            };
            this.newCard = !this.newCard;
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
      document.getElementById('spinnerIcon').style.display = 'block';
      document.getElementById('subscribeBtn').style.display = 'none';
      firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/subscriptions`).push({
        source: this.newCharge.source
      })
      setTimeout(function(){
        location.reload();
      }, 1000);

    },
    unsubscribe: function() {
      document.getElementById('spinnerIcon').style.display = 'block';
      document.getElementById('unsubscribeBtn').style.display = 'none';
      if (!this.subscription.cancel_at_period_end) {
        request.post('https://us-central1-protolabvest-f8252.cloudfunctions.net/unsubscribeCustomer',{
          form: {
            subKey: this.subscription.key,
            subId: this.subscription.id,
            userId: this.currentUser.uid
          },
          json: true
          }, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body); // Print the HTML for the Google homepage.
          location.reload();
        });
      } else {
        console.log("Not cancelled");
      }
    },
    reactivate: function() {
      document.getElementById('spinnerIcon').style.display = 'block';
      document.getElementById('unsubscribeBtn').style.display = 'none';
      if (this.subscription.cancel_at_period_end) {
        request.post('https://us-central1-protolabvest-f8252.cloudfunctions.net/reactivateSubscription',{
          form: {
            subKey: this.subscription.key,
            subId: this.subscription.id,
            userId: this.currentUser.uid
          },
          json: true
          }, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body); // Print the HTML for the Google homepage.
          //location.reload();
        });
      } else {
        console.log("Not reactivated");
      }
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
    },
    toggleSteps: function() {
      console.log(this.newCharge.source);
      if (this.newCharge.source) {
        this.firstStep = !this.firstStep;
      } else {
        $('.alert').show()
      }

    },
    toggleNewCard: function() {
      this.newCard = !this.newCard;
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

.align-left {
  text-align: left;
  padding-left: 20px;
}

.alert{
    display: none;
}

.loader {
  display: none;
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
