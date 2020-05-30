// app.js
import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import App from './App.vue';
import { createRouter } from './router/router'
import createStore from './store'
import { sync } from 'vuex-router-sync'

Vue.use(Vuex);
Vue.use(Meta, {
    ssrAppId: 1 // https://vue-meta.nuxtjs.org/guide/caveats.html#duplicated-tags-after-hydration-with-ssr
});

// 新しいアプリケーション、ルータ、ストアを作成するためのファクトリ関数をエクスポート
// インスタンス
export function createApp (context) {
    const router = createRouter()
    const store = createStore(context.state)

    // ルートの状態をストアの一部として利用できるよう同期します
    sync(store, router)

    const app = new Vue({
        router,
        store,
        // ルートインスタンスは単に App コンポーネントを描画します
        render: h => h(App)
    })
    // アプリケーションとルーターの両方を返す
    return { app, router, store }
}