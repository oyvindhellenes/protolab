<template>
  <div>
      <br/>
      <br/>
      <h1 class="beige bold" id="title">Bli medlem i Sunnfjord Skaparhus</h1>
      <br/>
      <br/>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">&hellip;</div>
      <div v-if="currentUser">
        <ul class="list-inline">
          <li class="list-inline-item"><img :src=currentUser.photoURL alt="" id="userPhoto"></li>
          <li class="list-inline-item"><h2 class="beige">{{ currentUser.displayName }}</h2></li>
          <li class="list-inline-item"><button class="btn btn-default logout beige-bg p" v-on:click="signOut">Logg ut</button></li>
        </ul>
      <!-- Button trigger modal -->
      <div v-if="dateRenew">
        <button id="unsubscribeBtn" v-on:click="unsubscribe" class="btn btn-primary btn-lg orange-bg">Meld meg ut</button>
        <br/>
        <br/>
        <i id="spinnerIcon" class="fa fa-spinner fa-spin loader beige" style="font-size:24px"></i>
        {{ newCharge.error }}
        <p class="beige">Ditt medlemskap blir fornya {{this.dateRenew.toDateString()}}</p>
      </div>
      <div v-else>
        <div v-if="dateEnd">
          <button id="unsubscribeBtn" v-on:click="reactivate" class="btn btn-primary btn-lg orange-bg">Aktiver abonnement</button>
          <i id="spinnerIcon" class="fa fa-spinner fa-spin loader beige" style="font-size:24px"></i>
          <br/>
          <br/>
          <p class="beige">Ditt medlemskap går ut {{this.dateEnd.toDateString()}} og blir ikkje fornya</p>
        </div>
        <div v-else>
          <button id="subscribeBtn" type="button" class="btn btn-primary btn-lg orange-bg p" data-toggle="modal" data-target="#myModal">
            Bli medlem
          </button>
          <br/>
          <br/>
        </div>

      </div>

      <!-- Modal -->
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content beige-bg align-left">
            <div class="modal-header">
              <h4 class="modal-title dark bold" id="myModalLabel">Bli medlem av Sunnfjord Skaparhus</h4>
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
                      <button id="fortsettBtn" class="btn btn-primary orange-bg p" v-on:click="toggleSteps" >Forsett</button>
                      <i id="spinnerIcon" class="fa fa-spinner fa-spin loader" style="font-size:24px"></i>
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
                          <button id="addNewCardBtn" class="btn btn-default orange-bg p beige" v-on:click="submitNewCreditCard">Legg til kort</button>
                          {{ newCreditCard.error }}
                        </div>
                      </form>
                    </div>
                    <div v-else>
                      <button class="btn btn-default orange-bg p beige" v-on:click="toggleNewCard">Legg til nytt kort</button>
                    </div>
                  </div>
                  <div v-else>
                    Du er i ferd med å stadfeste medlemskap hjå Sunnfjord Skaparhus.
                    Det betyr at vi vil belaste deg med 349kr kvar månad frå og med i dag.
                    Du kan når som helst avslutte abonnomentet.
                    <br/>
                    <br/>
                    <ul class="list-inline">
                      <li class="list-inline-item"><button class="btn btn-primary orange-bg p" data-dismiss="modal" v-on:click="submitNewSubscription">Start Medlemskap</button></li>
                      <li class="list-inline-item"><button class="btn btn-default p" v-on:click="toggleSteps">Tilbake</button></li>
                    </ul>

                    {{ newCharge.error }}
                  </div>

                </div>
                <div v-else>&hellip;</div>

            </div>
          </div>
          </div>
        </div>
      </div>
      <p class="beige p">Medlemskap i Sunnfjord Skaparhus kostar 349kr i månaden.
        Få å lese om kva medlemskap innebærer, gå til Makerspace. Ønskjer du å bli medlem må du først
        logge inn med din google-konto og deretter fylle inn nødvending informasjon.
        Du kan når som helst velge å avbryte abonnementet. Har du andre spørsmål så ikkje nøl med
        å ta kontakt med Øyvind Hellenes på 94055843.</p>
  </div>
</template>

<script>
var request = require('../../node_modules/request');

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
      document.getElementById('spinnerIcon').style.display = 'inline-block';
      document.getElementById('fortsettBtn').style.display = 'none';
      this.newCard = !this.newCard;
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
            setTimeout(function(){
              document.getElementById('spinnerIcon').style.display = 'none';
              document.getElementById('fortsettBtn').style.display = 'inline-block';
            }, 3000);

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
      setTimeout(function(){
        location.reload();
      }, 500);

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
          location.reload();
        });
      } else {
        console.log("Not reactivated");
      }
    },
    signOut: function() {
      firebase.auth().signOut()
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#userPhoto {
  width: 35px;
  border-radius: 5px;
  margin-bottom: 10px;
}

#subscribeBtn {
  border-color: #EAE3D1;
}

.logout {
  margin-bottom: 10px;
}


</style>
