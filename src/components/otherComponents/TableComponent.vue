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
    info: {
      type: Array,
      required: false,
    },
    titles: {
      type: Array,
      required: true,
    }
  },
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>

</style>