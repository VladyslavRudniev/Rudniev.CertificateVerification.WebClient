<template>
  <div class="row">
    <sidebar class="col s3 m3 l2 13 sidebar" :numberOfSection.sync="numberOfSection"/>
    <CertificateForm class="col s9 m9 l8 19" v-if="numberOfSection === 2"/>
    <CertificateSearch class="col s9 m9 l8 19" v-else-if="numberOfSection === 1" v-on:valuechange="changePatientsInfo"/>
    <UpdateInfo class="col s9 m9 l8 19" :entity="entityinfo" v-else-if="numberOfSection === 3"/>
  </div>
</template>

<script>
import CertificateForm from '@/components/pages/certificateVerification/CertificateForm.vue'
import Sidebar from "@/components/pages/certificateVerification/Sidebar";
import CertificateSearch from "@/components/pages/certificateVerification/CertificateSearch";
import UpdateInfo from "@/components/pages/certificateVerification/UpdateInfo";

export default {
  name: 'CertificateVerificationView',
  components: {
    CertificateForm,
    CertificateSearch,
    Sidebar,
    UpdateInfo,
  },
  data: function() {
    return {
      numberOfSection: 2,
      entityinfo: {},
    }
  },
  methods: {
    changePatientsInfo: function (value) {
      this.entityinfo = value;
      this.numberOfSection = 3;
    },
  }
}
</script>

<style scoped>
.sidebar {
  min-height: 85vh;
}
</style>