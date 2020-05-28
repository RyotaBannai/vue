import Vue from 'vue'
import App from './App.vue'
// import About from './views/About'
// import Home from './views/Home'
// const App = () => import('./App.vue');
const About = () => import('./views/About');
const Home = () => import('./views/Home');
const Playground = () => import('./views/Playground');
const PG2 = () => import('./views/PG2');
const Post = () => import('./views/Post');
const SubContent = () => import('./views/SubContent');
const Comment = () => import('./views/Comment');
const Nologic = () => import('./views/Nologic');

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
      { path: '/pg2', name:'pg2', component: PG2 },
      { path: '/pg3', name:'pg3', component: () => import('./views/PG3') }, // Promise を返す関数
      { path: '/pg4', name:'pg4', component: () => import('./views/PG4') }, // Promise を返す関数
      { path: '/pg5', name:'pg5', component: () => import('./views/PG5') }, // Promise を返す関数
      { path: '/pg6', name:'pg6', component: () => import('./views/PG6') }, // Promise を返す関数
      {
        // post/ とマッチ
        path: '/post', component: Nologic },
      {
        path: '/post/:id', name:'post-id' +
              '', component: Post,
        children:[
            {   // post/:id/comment とマッチ
                // 注意：Comment は **Post の** <router-view> 内部で描画される
                path: 'comment',
                components: {
                    default: Comment,
                    sub: SubContent
                },
            },
            {
                // post/:id とマッチ
                // this is just for fallback.
                path: '', component: Nologic
            }
        ]
    },
      { path: '*', name:'notfound', component: Nologic },
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
