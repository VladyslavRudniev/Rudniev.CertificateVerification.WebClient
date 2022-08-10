<template>
  <div class="container">
    <NotFoundMessageBox class="mt15"/>
  </div>
</template>

<script>
import NotFoundMessageBox from '@/components/pages/notFound/NotFoundMessageBox.vue'

export default {
  name: "NotFoundView",
  components: {
    NotFoundMessageBox
  }
}
</script>

<style scoped>
.mt15 {
  margin-top: 15rem;
}
</style>