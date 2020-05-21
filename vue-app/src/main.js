import Vue from 'vue'
import App from './App.vue'
// import About from './views/About'
// import Home from './views/Home'
// const App = () => import('./App.vue');
const About = () => import('./views/About');
const Home = () => import('./views/Home');
const Playground = () => import('./views/Playground');

import Router from 'vue-router'

Vue.use(Router);

// function loadView (view) {
//   return () => import(`@/views/${view}.vue`) /* webpackChunkName: "view-[request]" */
// }

const router = new Router({
  mode: 'history',
  routes:[
    { path: '/', name:'home', component: Home },
    { path: '/about', name:'about', component: About },
    { path: '/playground', name:'playground', component: Playground },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
