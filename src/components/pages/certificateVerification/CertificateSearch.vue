<template>
  <div>
    <h4>Пошук сертифікату</h4>
    <table-component class="mb1" :info="visibleList" :titles="titles"/>
    <a class="waves-effect waves-light btn-small" @click="decreasePage">назад</a>
    Сторінка {{pageNumber+1}} із {{pages}}
    <a class="waves-effect waves-light btn-small" @click="increasePage">вперед</a>
  </div>
</template>

<script>
import axios from "axios";
import TableComponent from "@/components/otherComponents/TableComponent";

export default {
  name: "CertificateSearch",
  components: {
    TableComponent
  },
  data: function() {
    return {
      info: [],
      tempInfo: [],
      pageNumber: 0,
      titles: ["ім'я", "фамілія", "день народження", "номер сертифікату"]
    }
  },
  computed: {
    visibleList: function (){
      return this.info.slice(this.pageNumber*10, (this.pageNumber+1)*10);
    },
    pages: function (){
      let res = parseInt(this.info.length / 10);
      if (this.info.length % 10 !== 0)
        res++;
      return res;
    }
  },
  methods: {
    decreasePage () {
      if (this.pageNumber > 0)
        this.pageNumber--;
    },
    increasePage () {
      if (this.pageNumber < this.pages-1)
        this.pageNumber++;
    }
  },
  async created() {
    await axios.get('https://localhost:7275/api/certificate')
        .then(response => (this.info = response.data))
        .catch(error => console.log(error));
  }
}
</script>

<style scoped>
.mb1 {
  margin-bottom: 1rem;
}
</style>