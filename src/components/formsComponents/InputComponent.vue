<template>
  <div class="input-field mt2">
    <label :for="id" class="active">{{labelText}}</label>
    <input :type="type"
           :id="id"
           :name="name"
           v-model.lazy.trim="value"
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
  }

};
</script>

<style scoped>
</style>