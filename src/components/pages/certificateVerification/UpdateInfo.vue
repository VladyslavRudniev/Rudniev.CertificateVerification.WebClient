<template>
  <div>
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
    <form class="row" @submit.prevent="formSubmit2">

      <h4>Або видаліть дані із бази</h4>

      <h6 class="col m10 red-text text-darken-2 pt1">{{ massage2 }}</h6>

      <button class="col btn waves-effect waves-light mt2" type="submit">
        Видалити дані<i class="material-icons right">send</i></button>

    </form>
  </div>
</template>

<script>
import InputComponent from "@/components/formsComponents/InputComponent";

export default {
  name: "UpdateInfo",
  props: {
    entity: {
      type: Array,
      required: true,
    },
  },
  components: {
    InputComponent,
  },
  data: function () {
    return {
      patientId: "",
      massage: "",
      massage2: "",
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
            patientid: this.patientId,
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
      } else {
        this.massage = "Спочатку введіть всі данні до форми!";
      }
    },
    async formSubmit2() {
      this.massage2 = "Відправка даних... Зачекайте";

      await fetch('https://localhost:7275/api/certificate', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          patientid: this.patientId,
        })
      }).then(response => {
        if (response.ok) {
          this.massage2 = "";
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
    this.patientId = this.entity.shift();
    this.$refs.inputNameDetails.value = this.entity.shift();
    this.$refs.inputSurnameDetails.value = this.entity.shift();
    this.$refs.inputBirthdateDetails.value = this.entity.shift();
    this.$refs.inputQrCodeDetails.value = this.entity.shift();
  }
}
</script>

<style scoped>

</style>