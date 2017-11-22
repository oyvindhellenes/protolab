<template>
  <div>
    <h3 class="beige bold">Dette er heimstaden til Sunnfjord Skaparhus. Noregs nest største makerspace. Vi er lokalisert på det gamle skipsverftet i Førde</h3>
    <img src="../assets/skaparhus4.jpg" id="banner">
    <img src="../assets/verft.jpg" id="banner">
    <h3 class="beige bold">Info</h3>
    <img src="../assets/skaparhus8.jpg" id="banner">
    <h3 class="beige bold">Kva vi gjer</h3>
    <img src="../assets/skaparhus2.jpg" id="banner">
    <h3 class="beige bold">Makerspace</h3>
    <p class="beige lead">
     Sjølv om vi jobbar litt i alle retningar så identifiserar vi oss som eit klassisk Makerspace. No skal det
     likevel seiast at "makerspace" er eit dårleg norsk ord så difor vel vi å bruke "Skaparhus" i staden.
     Eit Skaparhus er definert som eit kreativt rom eller verkstad der folk kan samlast for å skape og lære.
     Vi gjer deg tilgang til eit hav av utstyr, maskiner og kunnskap slik at du kan utfolde deg kreativt og
     treffe andre engasjerte sjeler.
    </p>
    <img src="../assets/skaparhus3.jpg" id="banner">
    <h3 class="beige bold">Reodorklubben</h3>
    <p class="beige lead">
      Sunnfjord Skaparhus er vert for det som kanskje er den tøffaste skaparklubben i heile Noreg, nemleg Reodorklubben! Les meir her</p>
    <img src="../assets/skaparhus5.jpg" id="banner">
    <h3 class="beige bold">Utdanning</h3>
    <p class="beige lead">
      Skular er ein svært viktig del av Sunnfjord Skaparhus. Vi legg til rette for at alt i frå
      barneskular til høgskular skal kunne nytte fasilitetane våre. Dette er viktig for oss då vi meinar at praktisk
      arbeid med teknolgi gjer barn og vaksne meir kreative, men også bedre rusta for å takle viktige jobbar i framtida.</p>
    <p class="beige lead">
      Skular som vi i dag samarbeidar med inkluderar Høgskulen på Vestlandet, Halbrend og Førde Ungdomskule, Mo og Øyrane VGS, Norsksenteret og United World College
    </p>
    <img src="../assets/skaparhus6.jpg" id="banner">
    <img src="../assets/skaparhus7.jpg" id="banner">
    <h3 class="beige bold">Kva vi har</h3>
    <img src="../assets/maskin1.jpg" id="maskin">
    <img src="../assets/maskin2.jpg" id="maskin">
    <h4 class="beige p">Elektrolab</h4>
    <h4 class="beige p">Tekstilverkstad</h4>
    <img src="../assets/maskin3.jpg" id="banner">
    <h4 class="beige p">Printer</h4>
    <img src="../assets/maskin4.jpg" id="banner">
    <h4 class="beige p">Treverkstad</h4>
    <img src="../assets/maskin5.jpg" id="banner">
    <h3 class="beige bold">Sponsorar</h3>
    <img src="../assets/sponsorar.jpg" id="banner">


  </div>
</template>

<script>
let product = {
  name: 'Moby Dick',
  description: 'I love whales',
  amount: 100000 // 100$ in cents
}
export default {
  name: 'app',
  data () {
    return product
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#tennisball {
  width: 200px;
  margin: auto;
  padding: 30px;
}

#racket {
  width: 300px;
  margin: auto;
  padding: 30px;
  padding-top: 0px;
}

#vipps1 {
  width: 300px;
  margin: auto;
  padding: 0px;
  border-radius: 10px;
}

#vipps2 {
  width: 300px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0px;
  border-radius: 10px;
}

#title {
  position: relative;
  padding: 20px;
  text-shadow: 2px 2px 0px black;
  font-size: 50px;

}

#maskin {
  height: 300px;
  border-style: solid;
  border-width: 5px;
  border-color: #fef1cf;
  border-radius: 10px;
  margin-bottom: 30px;
}

.small-container {
  padding: 20px;
  border-radius: 10px;
}

.progress-bar-animated {
  background-color: #ebc733;
  height: 40px;
}
.progress {
  margin-top: 50px;
  margin-bottom: 30px;
}

.progress p {
  margin-top: 10px;
}

.btn-lg {
  height: 80px;
}

.borderbox {
  padding: 10px;
  border-color: #017272;
  border-width: 4px;
  border-style: solid;
  border-radius: 5px;
  width: 150px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}


</style>
