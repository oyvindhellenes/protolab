<template>
  <div>
    <br>
    <h2 class="beige bold">Dette er heimstaden til Sunnfjord Skaparhus. Noregs nest største makerspace. Velkommen!</h2>
    <br>
    <img src="../assets/skaparhus4.jpg" id="banner">
    <p class="beige lead">
     Sunnfjord Skaparhus blei skipa Februar 2017. Sia den gong har vi hatt ein jevn vekst med mest fokus på aktivitetar for barn og unge.
     No utvidar vi og satsar for fullt på vaksne også! Medlemskap kostar 349kr i månden. Du finn meir info om kva medlemskap innebærer
     under "Kva vi gjer" lenger nede. Det er også mogleg å få gunstige avtalar for skular og bedrifter.
    </p>
    <a class="btn btn-default beige-bg orange" href="/medlem">Bli medlem</a>
    <br>
    <br>
    <p class="beige lead">
      Er du usikker på om dette er noko for deg må du sjølvsagt berre ta turen innom for ein kopp kaffi og litt omvisning. Det er stort sett folk som kan hjelpe deg mellom
      10:00 og 15:00. Ønskjer du å komme etter middag er det berre å avtale med Øyvind Hellenes. Sjå kontaktinfo i bunn av sida. Ellers er
      vi er lokalisert på verftet i Førde (Øyrane 12) og held for det meste til i 3 etg i nybygget som vist på bilete under.
    </p>
    <img src="../assets/verft.jpg" id="banner">
    <h3 class="beige bold">Kva vi gjer</h3>
    <p class="beige lead">
      Sjølv om vi organiserar og legg til rette for ein haug med forskjellige aktivitetar så identifiserar vi oss først og fremst som eit klassisk Makerspace. No skal det
      likevel seiast at "makerspace" er eit dårleg norsk ord så difor vel vi å bruke "Skaparhus" i staden.
      Eit Skaparhus er definert som eit kreativt rom eller verkstad der folk kan samlast for å skape og lære.
      Vi gjer deg tilgang til eit hav av utstyr, maskiner og kunnskap slik at du kan utfolde deg kreativt og
      treffe andre engasjerte mennesker.
    </p>
    <img src="../assets/skaparhus3.jpg" id="banner">
    <h3 class="beige bold">Reodorklubben</h3>
    <p class="beige lead">
      Sunnfjord Skaparhus er vert for det som kanskje er den tøffaste skaparklubben i heile Noreg, nemleg Reodorklubben! Les meir om Reodorklubben <a class="orange" href="/reodorklubben">her.</a>
    </p>
    <img src="../assets/skaparhus5.jpg" id="banner">
    <h3 class="beige bold">Utdanning</h3>
    <p class="beige lead">
      Skular er ein svært viktig del av Sunnfjord Skaparhus. Vi legg til rette for at alt i frå
      barneskular til høgskular skal kunne nytte fasilitetane våre. Dette er viktig for oss då vi meinar at praktisk
      arbeid med teknolgi gjer barn og vaksne bedre rusta for å takle viktige jobbar i framtida.
      Skular som vi i dag samarbeidar med inkluderar Høgskulen på Vestlandet, Halbrend og Førde Ungdomskule,
      Mo og Øyrane VGS, Norsksenteret og United World College.
    </p>
    <img src="../assets/skaparhus2.jpg" id="banner">
    <img src="../assets/skaparhus8.jpg" id="banner">
    <h3 class="beige bold">Kva vi har</h3>
    <p class="beige lead">
      Kunst, video, tre, metall, 3D printing, laser, data, elektronikk, tekstil, prototyping osv. Nesten uansett kva prosjekt du ønskjer å
      jobbe med så har vi det utstyret du treng. Og om vi ikkje har det skal vi alltids prøve å skaffe det du treng.
    </p>
    <h5 class="beige bold">Elektrolab</h5>
    <img src="../assets/skaparhus6.jpg" id="banner">
    <h5 class="beige bold">Tekstilverkstad</h5>
    <img src="../assets/maskin3.jpg" id="banner">
    <h5 class="beige bold">Printerhub</h5>
    <img src="../assets/maskin5.jpg" id="banner">
    <h5 class="beige bold">Tre og metall-verkstad</h5>
    <img src="../assets/skaparhus7.jpg" id="banner">
    <img src="../assets/maskin1.jpg" id="maskin">
    <img src="../assets/maskin2.jpg" id="maskin">
    <h5 class="beige bold">Laser</h5>
    <img src="../assets/maskin4.jpg" id="banner">
    <h3 class="beige bold">Sponsorar</h3>
    <p class="beige lead">
      Vi hadde ikkje eksistert i dag om det ikkje hadde vore for våre fantastiske sponsorar. Vi ønskjer å gje ein spesiell takk til Hellenes AS og Sparebankstiftinga i Sogn og Fjordane.
    </p>
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
