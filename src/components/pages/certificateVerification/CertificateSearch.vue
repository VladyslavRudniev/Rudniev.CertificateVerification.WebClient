<template>
  <div>
    <h4>Сторінка пошуку сертифікату</h4>
    <div v-for="(obj, index) in info">
      <p>{{ index+1 }}: {{ obj["name"] }} {{obj["surname"]}}, день народження {{obj["birthDate"]}}, сертифікат№{{obj["certificateNumber"]}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CertificateSearch",
  data: function() {
    return {
      info: null
    }
  },
  async created() {
    await axios.get('https://localhost:7275/api/certificate')
        .then(response => (this.info = response.data))
        .catch(error => console.log(error));
    console.log(this.info)
  }
}
</script>

<style scoped>

</style>