import { createApp } from './app'

// クライアント固有の初期化ロジック
const { app, router, store} = createApp()
// これは App.vue テンプレートのルート要素が id="app" だから

if (window.__INITIAL_STATE__) {
    // サーバから注入されたデータでストアの状態を初期化します
    store.replaceState(window.__INITIAL_STATE__)
}


router.onReady(()=>{
    app.$mount('#app')
});