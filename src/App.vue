<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/question">Question</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">

// Fonts
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800&display=swap');

// Resets and base
@import './assets/style/resets/reset.scss';
@import './assets/style/_utils.scss';
// @import './assets/style/_variables.scss'; __ globally imported via vue.config.js

#app {
  background-color: $white;
  font-family: $font;
  font-weight: $regular;
  overflow-x: hidden;
  position: relative;
  // min-height: 100vh;
  color: #2c3e50;
}
</style>
