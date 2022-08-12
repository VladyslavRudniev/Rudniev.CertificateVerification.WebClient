<template>
  <div>
    <h4>Пошук сертифікату</h4>

    <table-component class="mb1" :info="visibleList" :titles="titles"/>

    <a class="waves-effect waves-light btn-small" @click="decreasePage">назад</a>
    Сторінка {{ pageNumber + 1 }} із {{ pages }}
    <a class="waves-effect waves-light btn-small" @click="increasePage">вперед</a>

    <input-component class="col" v-bind="inputSearchParam" v-on:valuechange="changeSearchParam"/>

  </div>
</template>

<script>
import axios from "axios";
import TableComponent from "@/components/otherComponents/TableComponent";
import InputComponent from "@/components/formsComponents/InputComponent";

export default {
  name: "CertificateSearch",
  components: {
    TableComponent,
    InputComponent
  },
  data: function() {
    return {
      info: [],
      tempInfo: [],
      pageNumber: 0,
      itemsCount: 10,
      titles: ["ім'я", "фамілія", "день народження", "номер сертифікату"],
      inputSearchParam: {
        type: "text",
        id: "surname",
        name: "surname",
        placeholder: "ім'я або фамілія",
        labelText: "Пошук:"
      },
      searchParam: "",
    }
  },
  computed: {
    visibleList: function (){
      if (this.searchParam === "")
        return this.info.slice(this.pageNumber*this.itemsCount, (this.pageNumber+1)*this.itemsCount);
      else
      {
        let tempArray = [];
        let regexp = new RegExp(`${this.searchParam}`, "iu");
        for (const item of this.info)
        {
          if (regexp.test(item.surname) || regexp.test(item.name))
          {
            tempArray.push(item);
          }
        }
        this.tempInfo =  tempArray;
        this.pageNumber = 0;
        return this.tempInfo.slice(this.pageNumber*this.itemsCount, (this.pageNumber+1)*this.itemsCount);
      }
    },
    pages: function () {
      let result;
      if (this.searchParam === "") {
         result = Math.floor(this.info.length / this.itemsCount);
        if (this.info.length % this.itemsCount !== 0)
          result++;
      } else {
        result = Math.floor(this.tempInfo.length / this.itemsCount);
        if (this.tempInfo.length % this.itemsCount !== 0)
          result++;
      }
      return result;
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
    },
    changeSearchParam: function (value) {
      this.searchParam = value;
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