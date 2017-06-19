<template>
  <div>
    <img src="../assets/logo.png" id="logo-cover">
    <img src="../assets/cover.png" id="banner">
    <h4 class="beige p">Vi i Førde Tennisklubb har jobba i over seks år for å kunne bygge ei flunkande ny tennisbane i Førde.
      No treng vi berre 100 000 kroner for å sette i gong med bygginga.
      Så bli med og støtt Noregs første folkefinansierte tennisbane!</h4>

    <h4 class="beige p">Kampanjen sluttar om <span class="bold-underscore">29 dagar!</span></h4>
    <img src="../assets/spacer.png" id="spacer">
    <div class="small-container beige-bg">
      <img src="../assets/vipps_logo.png" id="vipps1">
      <h2 class="bold blue">
        Støtt oss med vipps eller nettbank
      </h2>
      <h4 class="blue p padding-top-bottom">
        Vil du være med å folkefinansiere Tennisbane i Førde så kan du sende ønskeleg beløp på Vipps eller Nettbank.
      </h4>
      <h4 class="blue bold">Vipps nummer:</h4>
      <h2 class="blue bold borderbox">17722</h2>
      <div><img src="../assets/vipps1.jpg" id="vipps2"></div>
      <h4 class="blue p-center padding-top-bottom">(Kontonummer: <span class="bold-underscore"> 15037510944</span>)</h4>
      <h4 class="blue p">PS: Hugs å merk donasjonen med navn slik at vi enkelt kan ta kontakt dersom det blir nødvendig. Dersom prosjektet skulle skjære seg eller prosjektet ikkje er påbegynt innan to år så vil du bli refundert fullt beløp.</h4>
    </div>
    <img src="../assets/spacer.png" id="spacer">
    <h3 class="beige bold">Om folkefinansiering</h3>
    <img src="../assets/spacer.png" id="spacer">
    <img src="../assets/racket.png" id="racket">
    <h3 class="beige bold">Slik fungerar kampanjen</h3>
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

#banner {
  width: 100%;
  border-style: solid;
  border-width: 5px;
  border-color: #fef1cf;
  border-radius: 10px;
  margin-bottom: 30px;
}

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
