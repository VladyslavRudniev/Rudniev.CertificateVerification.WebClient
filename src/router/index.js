import Vue from 'vue'
import VueRouter from 'vue-router'
import CertificateVerificationView from '../views/CertificateVerificationView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'certificateVerification',
    component: CertificateVerificationView
  }
]

const router = new VueRouter({
  routes
})

export default router
