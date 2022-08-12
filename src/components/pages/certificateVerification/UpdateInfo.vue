<template>
  <form class="row" @submit.prevent="formSubmit">

    <h4>Змініть дані на актуальні</h4>

    <InputComponent class="col s12 m6" v-bind="inputName" ref="inputNameDetails"/>
    <InputComponent class="col s12 m6" v-bind="inputSurname" ref="inputSurnameDetails"/>
    <InputComponent class="col s12 m6" v-bind="inputBirthdate" ref="inputBirthdateDetails"/>
    <InputComponent class="col s12 m6" v-bind="inputQrCode" ref="inputQrCodeDetails"/>

    <h6 class="col m10 red-text text-darken-2 pt1">{{ massage }}</h6>

    <button class="col btn waves-effect waves-light mt2" type="submit">
      Оновити дані<i class="material-icons right">send</i></button>

  </form>
</template>

<script>
import InputComponent from "@/components/formsComponents/InputComponent";

export default {
  name: "UpdateInfo",
  props: {
    entity: {
      type: Object,
      required: true,
    },
  },
  components: {
    InputComponent,
  },
  data: function () {
    return {
      massage: "",
      inputName: {
        type: "text",
        id: "name",
        name: "name",
        placeholder: "Введіть ім'я пацієнта",
        labelText: "Введіть ім'я пацієнта:"
      },
      inputSurname: {
        type: "text",
        id: "surname",
        name: "surname",
        placeholder: "Введіть фамілію пацієнта",
        labelText: "Введіть фамілію пацієнта:"
      },
      inputBirthdate: {
        type: "date",
        id: "birthdate",
        name: "birthdate",
        placeholder: "",
        labelText: "Введіть дату народження:"
      },
      inputQrCode: {
        type: "text",
        id: "qrcode",
        name: "qrcode",
        placeholder: "Введіть qr-код",
        labelText: "Введіть qr-код:"
      },
      errors: []
    }
  },
  methods: {
    async formSubmit() {
      if (this.$refs.inputNameDetails.value !== ""
          && this.$refs.inputSurnameDetails.value !== ""
          && this.$refs.inputBirthdateDetails.value !== ""
          && this.$refs.inputQrCodeDetails.value !== "") {
        this.massage = "Відправка даних... Зачекайте";

        await fetch('https://localhost:7275/api/certificate', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            patientid: this.entity.patientid,
            name: this.$refs.inputNameDetails.value,
            surname: this.$refs.inputSurnameDetails.value,
            birthdate: this.$refs.inputBirthdateDetails.value,
            certificatenumber: this.$refs.inputQrCodeDetails.value
          })
        }).then(response => {
          if (response.ok) {
            this.massage = "";
            this.$refs.inputNameDetails.value = "";
            this.$refs.inputSurnameDetails.value = "";
            this.$refs.inputBirthdateDetails.value = "";
            this.$refs.inputQrCodeDetails.value = "";
            window.alert("Дані успішно оновлено!");
          } else {
            const error = response.statusText;
            return Promise.reject(error);
          }
        }).catch(error => {
          console.error("<<<ERROR>>>", error);
          window.alert("Сталась помилка, спробуйте пізніше!");
        });
      } else {
        this.massage = "Спочатку введіть всі данні до форми!";
      }
    }
  },
  mounted() {
    this.$refs.inputNameDetails.value = this.entity.name;
    this.$refs.inputSurnameDetails.value = this.entity.surname;
    this.$refs.inputBirthdateDetails.value = this.entity.birthdate;
    this.$refs.inputQrCodeDetails.value = this.entity.certificatenumber;
  }
}
</script>

<style scoped>

</style>