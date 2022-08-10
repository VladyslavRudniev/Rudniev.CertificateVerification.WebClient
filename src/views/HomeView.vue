<template>
  <div class="container">
    <HomeMainBlock class="mt15"/>
  </div>
</template>

<script>
import HomeMainBlock from "@/components/pages/home/HomeMainBlock";

export default {
  name: "HomeView",
  components: {
    HomeMainBlock
  }
}
</script>

<style scoped>
.mt15 {
  margin-top: 15rem;
}
</style>