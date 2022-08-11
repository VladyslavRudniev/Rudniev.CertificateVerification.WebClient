<template>
  <table class="highlight">
    <thead>
    <tr>
      <th v-for="value in titles">{{ value }}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="item in info">
      <td v-for="value in item">{{ value }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TableComponent",
  props: {
    info: null,
    titles: null,
  },
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>

</style>