<template>
  <div class="row">
    <sidebar class="col s3 m3 l2 13 sidebar" :numberOfSection.sync="numberOfSection"/>
    <CertificateForm class="col s9 m9 l8 19" v-if="numberOfSection === 2"/>
    <CertificateSearch class="col s9 m9 l8 19" v-else-if="numberOfSection === 1"/>
  </div>
</template>

<script>
import CertificateForm from '@/components/pages/certificateVerification/CertificateForm.vue'
import Sidebar from "@/components/pages/certificateVerification/Sidebar";
import CertificateSearch from "@/components/pages/certificateVerification/CertificateSearch";

export default {
  name: 'CertificateVerificationView',
  components: {
    CertificateForm,
    CertificateSearch,
    Sidebar
  },
  data: function() {
    return {
      numberOfSection: 2,
    }
  }
}
</script>

<style scoped>
.sidebar {
  height: 100vh;
}
</style>