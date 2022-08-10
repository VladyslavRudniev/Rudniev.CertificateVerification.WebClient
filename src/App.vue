<template>
  <div id="app">
    <nav>
      <router-link class="brand-logo left" to="/">Logo</router-link>
      <ul class="right">
        <li><router-link to="/CovidCertificate/">Cертифікати ковід</router-link></li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<style scoped>

</style>
