<template>
  <form class="row" @submit.prevent="formSubmit">

    <h4>Або видаліть дані із бази</h4>

    <InputComponent v-bind="inputId" ref="inputIdDetails"/>

    <h6 class="col m10 red-text text-darken-2 pt1">{{ massage }}</h6>

    <button class="col btn waves-effect waves-light mt2" type="submit">
      Видалити дані<i class="material-icons right">send</i></button>

  </form>
</template>

<script>
import InputComponent from "@/components/formsComponents/InputComponent";

export default {
  name: "CertificateDelete",
  props: {
    entityid: {
      type: String,
      required: true,
    },
  },
  components: {
    InputComponent,
  },
  data: function () {
    return {
      massage: "",
      inputId: {
        type: "hidden",
        id: "",
        name: "Id",
        placeholder: "",
        labelText: ""
      },
      errors: []
    }
  },
  methods: {
    async formSubmit() {
      this.massage = "Відправка даних... Зачекайте";
      console.log("entity id:", this.entityid);
      await fetch('https://localhost:7275/api/certificate', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          patientid: this.$refs.inputIdDetails.value,
        })
      }).then(response => {
        if (response.ok) {
          this.massage = "";
          this.$refs.inputIdDetails.value = "";
          window.alert("Дані успішно видалено!");
          this.$emit('valuechange');
        } else {
          const error = response.statusText;
          return Promise.reject(error);
        }
      }).catch(error => {
        this.massage = "";
        console.error("<<<ERROR>>>", error);
        window.alert("Сталась помилка, спробуйте пізніше!");
      });
    }
  },
  mounted() {
    this.$refs.inputIdDetails.value = this.entityid;
  }
}
</script>

<style scoped>

</style>