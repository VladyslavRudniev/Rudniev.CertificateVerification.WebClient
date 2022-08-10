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
  props: ["numberOfSection"],
  data: function (){
    return {
      numberSection : this.numberOfSection,
    }
  },
  methods: {
    OnTabSerchPage() {
      this.$emit('update:numberOfSection', this.numberSection=1);
    },
    OnTabAddPage() {
      this.$emit('update:numberOfSection', this.numberSection=2);
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