import Vue from 'vue'
import VueRouter from 'vue-router'
import CertificateVerificationView from '@/views/CertificateVerificationView.vue'
import NotFoundView from "@/views/NotFoundView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'certificateVerification',
    component: CertificateVerificationView
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFoundView
  }
];

const router = new VueRouter({
  mode: "history",
  routes: routes
})

export default router
