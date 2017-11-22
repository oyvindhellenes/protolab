<template>
  <div id="app">
    <nav class="container" id="navigation">
      <img src="./assets/cover3.png" id="header-img">
      <ul class="nav nav-tabs">
        <li class="nav-item nav-left" v-on:click="setActive">
          <router-link to="/heim" id="heim" class="nav-link">Skaparhuset</router-link>
        </li>
        <li class="nav-item" v-on:click="setActive">
          <router-link to="/reodorklubben" id="reodorklubben" class="nav-link">Reodorklubben</router-link>
        </li>
        <li class="nav-item" v-on:click="setActive">
          <router-link to="/cafe" id="cafe" class="nav-link">Cafè</router-link>
        </li>
        <li class="nav-item nav-right" v-on:click="setActive">
          <router-link to="/member" id="member" class="nav-link">Medlemside</router-link>
        </li>
      </ul>
    </nav>
    <div class="home container dark-bg">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data: function(){
    return {}
  },
  mounted: function() {
    this.setActive()

  },
  methods: {
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
  background-color: #EAE3D1;
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
    margin-top: 20px;
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

.btn:hover {
  cursor: pointer;
  background-color: #EAE3D1;
  color: #321700;
  border-style: solid;
  border-color: #321700;
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
  padding-bottom: 20px;
}

#logo-cover {
  width: 60%;
  padding: 20px ;
}

#banner {
  width: 100%;
  border-style: solid;
  border-width: 5px;
  border-color: #fef1cf;
  border-radius: 10px;
  margin-bottom: 30px;
}

</style>
