<template>
  <div class="card-panel teal lighten-2 row">
    <ul>
      <li class="col s12 my1">
        <a class="black-text cpoint" @click="OnTabSerchPage">Пошук сертифікату</a>
      </li>
      <li class="col s12 my1">
        <a class="black-text cpoint" @click="OnTabAddPage">Додати сертифікат</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["isSearchPage", "isAddPage"],
  data: function (){
    return {
      searchPage : this.isSearchPage,
      addPage : this.isAddPage,
    }
  },
  methods: {
    OnTabSerchPage() {
      this.$emit('update:isSearchPage', this.isSearchPage=true);
      this.$emit('update:isAddPage', this.isAddPage=false);
    },
    OnTabAddPage() {
      this.$emit('update:isSearchPage', this.isSearchPage=false);
      this.$emit('update:isAddPage', this.isAddPage=true);
    }
  }
}
</script>

<style scoped>
.my1 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.cpoint {
  cursor: pointer;
}
</style>