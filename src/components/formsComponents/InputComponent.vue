<template>
  <div class="input-field mt2">
    <label :for="id" class="active">{{labelText}}</label>
    <input :type="type"
           :id="id"
           :name="name"
           v-model.trim="value"
           v-on:input="onValueChange"
           :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data: function () {
    return {
      value: ""
    }
  },
  props: {
    type: {
      type: String,
      require: true,
      default: "text"
    },
    id: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      require: true,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    labelText: {
      type: String,
      require: true,
      default: "Заповніть поле:"
    }
  },
  methods: {
    onValueChange: function () {
      this.$emit('valuechange', this.value);
    }
  }
};
</script>

<style scoped>
</style>