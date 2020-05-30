import { createApp } from './app'

export default context => {
    return new Promise ((resolve, reject)=>{
        const { app, router, store } = createApp()

        // サーバーサイドのルーターの場所を設定します
        router.push(context.url)
        // ルーターが非同期コンポーネントとフックを解決するまで待機します
        router.onReady(()=>{
            const matchedComponents= router.getMatchedComponents()

            context.meta = app.$meta();

            // この `rendered` フックは、アプリケーションの描画が終えたときに呼び出されます
            context.rendered = () => {
                // アプリケーションが描画された後、ストアには、
                // コンポーネントからの状態で満たされています
                // 状態を context に付随させ、`template` オプションがレンダラに利用されると、
                // 状態は自動的にシリアライズされ、HTML 内に `window.__INITIAL_STATE__` として埋め込まれます
                context.state = store.state
            }

            // 一致するルートがない場合、404で拒否します
            if (!matchedComponents.length) {
                reject({ code: 404 })
            }

            resolve(app) // return ではなくresolve で返却
        }, reject)
    })
}
