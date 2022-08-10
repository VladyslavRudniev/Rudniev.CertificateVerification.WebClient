<template>
  <div class="row">
    <sidebar class="col s3 m3 l2 13 sidebar" :isSearchPage.sync="isSearchPage" :isAddPage.sync="isAddPage"/>
    <CertificateForm class="col s9 m9 l8 19" v-if="isAddPage"/>
    <certificate-search class="col s9 m9 l8 19" v-if="isSearchPage"/>
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
      isSearchPage: false,
      isAddPage: true,
    }
  }
}
</script>

<style scoped>
.sidebar {
  height: 100vh;
}
</style>