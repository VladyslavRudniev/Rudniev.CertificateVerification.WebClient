import Vue from 'vue'
import VueRouter from 'vue-router'
import CertificateVerificationView from '@/views/CertificateVerificationView.vue'
import NotFoundView from "@/views/NotFoundView.vue";
import HomeView from "@/views/HomeView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/CovidCertificate/',
    name: 'covidCertificate',
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
