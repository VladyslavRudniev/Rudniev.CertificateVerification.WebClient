<template>
  <table class="highlight">
    <thead>
    <tr>
      <th v-for="value in titles">{{ value }}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(item, index1) in info" @click="OnClickTable(item)">
      <td v-for="(value, index2) in item">{{ index2 === entityIdName ? index1+1 : value }}</td>
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
    },
    entityIdName: {
      type: String,
      required: false,
    },
  },
  data: function () {
    return {
    }
  },
  methods: {
    OnClickTable (value) {
      this.$emit('valuechange', value);
    }
  }
}
</script>

<style scoped>

</style>