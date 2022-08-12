<template>
  <form class="row" @submit.prevent="formSubmit">

    <h4>Бланк додавання сертифіката ковід</h4>

    <InputComponent class="col s12 m6" v-bind="inputName" ref="inputNameDetails"/>
    <InputComponent class="col s12 m6" v-bind="inputSurname" ref="inputSurnameDetails"/>
    <InputComponent class="col s12 m6" v-bind="inputBirthdate" ref="inputBirthdateDetails"/>

    <h5 class="col s12 m12">Відскануйте qr-код</h5>

    <a class="col m2 waves-effect waves-light btn mt1" v-on:click="isFormCompleted">Сканувати</a>
    <h6 class="col m10 red-text text-darken-2 pt1">{{ massage }}</h6>

    <template v-if="qrVisible">
      <div class="col qrbox mt2">
        <qrcode-stream @init="onInit" @decode="onDecode"></qrcode-stream>
      </div>
    </template>

    <InputComponent v-bind="inputQrCode" ref="inputQrCodeDetails"/>

    <template v-if="isComplitedForm">
      <button class="col btn waves-effect waves-light mt2" type="submit">
        Відправити
        <i class="material-icons right">send</i></button>
    </template>

  </form>
</template>

<script>
import InputComponent from '@/components/formsComponents/InputComponent.vue';
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  name: 'CertificateForm',
  props: {},
  components: {
    InputComponent,
    QrcodeStream
  },
  data: function () {
    return {
      massage: "",
      qrVisible: false,
      isComplitedForm: false,
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
        placeholder: "Введіть фамілію пацієнта:",
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
        type: "hidden",
        id: "",
        name: "qrcode",
        placeholder: "",
        labelText: ""
      },
      errors: []
    }
  },
  methods: {
    isFormCompleted () {
      if (this.$refs.inputNameDetails.value !== ""
          && this.$refs.inputSurnameDetails.value !== ""
          && this.$refs.inputBirthdateDetails.value !== "")
      {
        this.massage = "";
        this.qrVisible = true;
      }
      else if (this.$refs.inputBirthdateDetails.value === "")
      {
        this.massage = "Введіть дату народження, можливо введена невірна дата";
      }
      else
      {
        this.massage = "Спочатку введіть всі данні до форми";
      }
    },
    onDecode (decodedString) {
      this.$refs.inputQrCodeDetails.value = decodedString;
      this.massage = "Код відскановано";
      this.qrVisible = false;
      this.isComplitedForm = true;
    },
    async onInit (promise) {
      try {
        await promise

      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.massage = "user denied camera access permisson";
        } else if (error.name === 'NotFoundError') {
          this.massage = "no suitable camera device installed";
        } else if (error.name === 'NotSupportedError') {
          this.massage = "page is not served over HTTPS (or localhost)";
        } else if (error.name === 'NotReadableError') {
          this.massage = "maybe camera is already in use";
        } else if (error.name === 'OverconstrainedError') {
          this.massage = "did you requested the front camera although there is none?";
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.massage = "browser seems to be lacking features";
        }
        this.qrVisible = false;
      } finally {
      }
    },
    async formSubmit() {
      if (this.$refs.inputNameDetails.value !== ""
          && this.$refs.inputSurnameDetails.value !== ""
          && this.$refs.inputBirthdateDetails.value !== ""
          && this.$refs.inputQrCodeDetails.value !== "")
      {
        this.isComplitedForm = false;
        this.massage = "Відправка даних... Зачекайте";

        await fetch('https://localhost:7275/api/certificate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            name: this.$refs.inputNameDetails.value,
            surname: this.$refs.inputSurnameDetails.value,
            birthdate: this.$refs.inputBirthdateDetails.value,
            certificatenumber: this.$refs.inputQrCodeDetails.value
          })
        }).then(response => {
          if (response.ok)
          {
            this.massage = "";
            this.$refs.inputNameDetails.value = "";
            this.$refs.inputSurnameDetails.value = "";
            this.$refs.inputBirthdateDetails.value = "";
            this.$refs.inputQrCodeDetails.value = "";
            this.qrVisible = false;
            window.alert("Дані успішно додано!");
          }
          else
          {
            window.alert("Сталась помилка, спробуйте пізніше!");
            const error = response.statusText;
            return Promise.reject(error);
          }
        }).catch(error => {
          console.error("<<<ERROR>>>", error);
        });
      }
      else
      {
        this.massage = "Спочатку введіть всі данні до форми!";
      }
    }
  }
};
</script>

<style scoped>
.mt1 {
  margin-top: 1rem;
}
.mt2 {
  margin-top: 2rem;
}
.qrbox {
  width: 20rem;
  height: 20rem;
  border: 2px dotted red;
}
.pt1 {
  padding-top: 1rem;
}
</style>