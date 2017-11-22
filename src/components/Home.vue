<template>
  <div>
    <h4 class="beige p">Dette er heimstaden til Sunnfjord Skaparhus. Noregs nest største makerspace. Vi er lokalisert på det gamle skipsverftet i Førde</h4>
    <img src="../assets/cover.png" id="banner">
    <h3 class="beige bold">Info</h3>
    <img src="../assets/skaparhus8.jpg" id="banner">
    <img src="../assets/skaparhus7.jpg" id="banner">
    <h3 class="beige bold">Kva vi gjer</h3>
    <img src="../assets/skaparhus2.jpg" id="banner">
    <h4 class="beige p">Makerspace</h4>
    <img src="../assets/skaparhus3.jpg" id="banner">
    <h4 class="beige p">Reodorklubb</h4>
    <img src="../assets/skaparhus4.jpg" id="banner">
    <h4 class="beige p">Høgskule</h4>
    <img src="../assets/skaparhus5.jpg" id="banner">
    <h4 class="beige p">Ungdomskule</h4>
    <img src="../assets/skaparhus6.jpg" id="banner">
    <h4 class="beige p">Norsksenteret</h4>
    <h4 class="beige p">United World College</h4>
    <h3 class="beige bold">Kva vi har</h3>
    <img src="../assets/maskin1.jpg" id="banner">
    <img src="../assets/maskin2.jpg" id="banner">
    <h4 class="beige p">Elektrolab</h4>
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
