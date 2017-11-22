<template>
  <div>
    <h1 class="beige bold" id="title">Cafe</h1>
    <h3 class="beige bold">Vil du vere med å starte ein ny kreativ cafe i skaparhuset?</h3>
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



</style>
