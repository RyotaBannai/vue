## Vue
- `ディレクティブ`: v-if, v-bind, v-modelなどのhtml上にロジックを埋めるためのコード（`データバインディング`）もっとも基本的な形は、`Mustache` 構文(`二重中括弧`)を利用したテキスト展開
- 動的引数: `in-DOM テンプレート` (HTML ファイルに直接書かれるテンプレート) を使う場合、ブラウザが強制的に属性名を小文字にするため、キー名を大文字にするのは避ける
```javascript
// in-DOM テンプレートの中では、v-bind:[someattr] に変換されます
<a v-bind:[someAttr]="value"> ... </a>
```
- 基本的には property をbindするか、eventを登録するか。
```javascript
<!-- 完全な構文 -->
<a v-bind:href="url"> ... </a>

<!-- 省略記法 -->
<a :href="url"> ... </a>

<!-- 動的引数の省略記法 (2.6.0 以降) -->
<a :[key]="url"> ... </a>
```
```javascript
<!-- 完全な構文 -->
<a v-on:click="doSomething"> ... </a>

<!-- 省略記法 -->
<a @click="doSomething"> ... </a>

<!-- 動的引数の省略記法 (2.6.0 以降) -->
<a @[event]="doSomething"> ... </a>
```
#### computed 算出プロパティ
- マスタッシュ内コードの複雑なロジックをまとめる
- 算出プロパティは`リアクティブな依存関係にもとづきキャッシュされる`という違いがあります。算出プロパティは、`リアクティブな依存関係が更新されたときにだけ再評価`されます。これはつまり、message が変わらない限りは、reversedMessage に何度アクセスしても、関数を再び実行することなく以前計算された結果を即時に返すということです。対称的に、`メソッド呼び出し`は、再描画が起きると常に関数を実行します
- 算出プロパティはデフォルトでは getter 関数のみですが、必要があれば setter 関数も使えます:
#### ウォッチャ
- データが変わるのに応じて`非同期`や`コストの高い処理を実行したいとき`に最も便利です。
- 非同期処理( API のアクセス)の実行や、処理をどのくらいの頻度で実行するかを制御したり、最終的な answer が取得できるまでは中間の状態にしておく、といったことが可能になっています。`これらはいずれも算出プロパティでは実現できません`。
### `vue router` 使い方
- vue-router のデフォルトは hash モード - 完全な URL を hash を使ってシミュレートし、 URL が変更された時にページのリロードが起きません。
- `<router-view/>`は対象componentsの描画する役割があるため、`root component`(`App.vue`)に置いておく。コンポネントベース実装の`main content`のようなもの。再利用するもの（ `header` `fooder`）は、 `<router-view/>`の周りにおいておく。
- `<router-view/>`を置いてやってあとは、`<router-link>`でリンクを作ればいい感じに飛び回れる。(`宣言的なナビゲーションとしてアンカータグ`)
- `プログラム的遷移`: Script内で上記の記述を行うことは、`<router-link>`タグをクリックすることと同値。
- Notice that a` <router-link>` automatically gets the `.router-link-active` class **when its target route is matched**.
-　`動的セグメント`はコロン `:` を使って表現。この動的セグメントの値は全てのコンポーネント内で `this.$route.params` として利用可能
- 動的セグメントを使って、同じコンポネント再利用する場合（例えばユーザープロフィールを湯づけて表示する時）は、`同じコンポーネントインスタンスが再利用`される。 両方のルートが同じコンポーネントを描画するため、`古いインスタンスを破棄して新しいものを生成するよりも効率的`。しかしながら、これはコンポーネントの`ライフサイクルフック`が呼ばれないことを意味している。同じコンポネントで`パラメータの変化`を検知するためには（変更(例: ユーザー情報の取得など)に反応するためには）、`$route`オブジェクトをwatchする。(例: /users/1 -> /users/2 のようにあるプロファイルから他へ) 
```javascript
const User = {
  template: '...',
  watch: {
    $route (to, from) {};
```
- または `beforeRouteUpdate` [要理解](https://router.vuejs.org/ja/guide/advanced/navigation-guards.html#%E3%82%B0%E3%83%AD%E3%83%BC%E3%83%90%E3%83%AB%E3%83%93%E3%83%95%E3%82%A9%E3%83%BC%E3%82%AC%E3%83%BC%E3%83%89)
```javascript
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // ルート変更に反応する...
    // next() を呼び出すのを忘れないでください
  }
}
```
- 異なる URL へ遷移するときに `router.push`。このメソッドは `history スタックに新しいエントリを追加`。それによってユーザーがブラウザの戻るボタンをクリックした時に前の URL に戻れるようになる。このメソッドは `<router-link>` をクリックした時に内部的に呼ばれています。つまり `<router-link :to="...">` をクリックすることは　`router.push(...)` を呼ぶことと等価
```javascript
this.$router.push('/')
```
- `history`に追加**せず**遷移（ブラウザの戻す、進むボタンを利用して遷移した際の挙動が異なる）`現在のエントリを置換`
```javascript
this.$router.replace('/')
```
- 現在のパスを確認
```javascript
this.$router.path
```
- Keep in mind that `this.$router` is exactly the same as using `router`. The reason we use `this.$router` is because **we don't want to import the router in every single component** that needs to manipulate routing.
- `scrollBehavior`: 例えばルーターオブジェクト内において記述を追加すると、`ページ遷移ごとにスクロールが上端に戻る`挙動となる。`savedPosition`はオプションで、`指定すると戻る/進むボタンによる遷移を行った際、そのページにいた状態のスクロールが再現される。`
- 認証を実装： ルートメタフィールドの`requiredAuth`プロパティが`true`の場合、認証されているかどうかをチェックする挙動を実装する
```javascript
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/sign-in',
      name: 'sign-in',
      component: loadView('PageSignIn')
    },
    {
      path: '/',
      name: 'home',
      component: loadView('Home'),
      meta: { requiredAuth: true } //Homeコンポーネントの表示には認証が必要と定義する
    }
  ]
})
```
###　プログラムによるナビゲーション
- 注意: path が渡された場合は params は無視されます（query は上の例の通り無視されません）。代わりに name でルート名を渡すか、path にすべてのパラメータを含める必要がある。
```javascript
// 文字列パス
router.push('home')
// オブジェクト
router.push({ path: 'home' })
// 名前付きルート
router.push({ name: 'user', params: { userId: '123' } })
// 結果的に /register?plan=private になる query
router.push({ path: 'register', query: { plan: 'private' } })
```
- ナビゲーションが正常に終了した場合、中止された場合のhook. `router.push(location, onComplete?, onAbort?)`
- Route alias. 
```javascript
{ path: '/root', component: Root, alias: '/root-alias' } // /root-aliasにアクセスすると　/root をrender
```
- `ナビゲーションガード`：バックエンドのmiddlewareのような役割。ガードは全てのルートの前後にまとめてつけられるし、ルート単位でつけることもできる。componentsの変化を感知する`beforeRouteUpdate` はルート単位の`コンポーネント内ガード`である。
- `beforeRouteEnter` ガードは `this` へのアクセスはできないです。なぜならば、ナビゲーションが確立する前にガードが呼び出されるからです。したがって、新しく入ってくるコンポーネントはまだ作られていないです。しかしながら、`next` にコールバックを渡すことでインスタンスにアクセスすることができます。このコールバックはナビゲーションが確立した時に呼ばれ、コンポーネントインスタンスはそのコールバックの引数として渡されます。(`beforeRouteUpdate` と`beforeRouteLeave` の場合、 `this` は既に利用可能)
```javascript
beforeRouteEnter (to, from, next) {
  next(vm => {
    // `vm` を通じてコンポーネントインスタンスにアクセス
  })
}
```
- `leave` ガードは、通常、ユーザが保存されていない編集内容で誤って経路を離れるのを防ぐために使用されます。ナビゲーションは `next(false)` を呼び出すことで取り消すことができます。
```javascript
beforeRouteLeave (to, from, next) {
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
```
- `routes` 設定の中の各`ルートオブジェクト`は`ルートレコード`と呼ばれます。ルートレコードはネストされているかもしれません。したがって、ルートがマッチした時に、`潜在的には 1 つ以上のルートレコードがマッチされる可能性があります`。例えば上記のルート設定で、 /foo/bar という URL は親のルートレコードにも子のルートレコードにもマッチします。 マッチしたルートのいずれかのアクセスが制限されている場合の処理例。
```javascript
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})
```
- watch の使用例
```javascript
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
```
#### データの取得
- `ルートが有効化された時`にサーバーからデータを取得する必要がしばしばあります。例えば、ユーザープロフィールを`描画する前`に、サーバーからユーザーデータを取得する必要があります。これを実現するためには 2 種類の方法があります。
1. ナビゲーション`後`の取得: ナビゲーションを先に実行し、その後次に入ってくる`コンポーネントのライフサイクルフック内`でデータを取得します。`データ取得中にローディングを表示`します。このアプローチを取る時は次に来るコンポーネントが即座にナビゲーションされ、描画されます。そして、コンポーネントの `created フックの中`でデータを取得します。
2. ナビゲーション`前`の取得: `ルートに入るガード内`でナビゲーション前にデータ取得をします。そして、`データ取得後にナビゲーションを実行`します。次に入ってくる`コンポーネント内の beforeRouteEnter ガード`でデータ取得を実行できます。データ取得が完了したら `next を呼ぶだけ`です。
```javascript
// 1. の場合 + proertyが変更の監視のためのwatch をセット
created () {
    // view が作られた時にデータを取得し、
    // そのデータは既に監視されています
    this.fetchData()
  },
  watch: {
    // ルートが変更されたらこのメソッドを再び呼び出します
    '$route': 'fetchData'
  },
```                                                                          
```javascript
// 2. の場合 Enterの前はインスタンスが作られてないためコールバックにする. 更新はbeforeRouteUpdateを使う.
beforeRouteEnter (route, redirect, next) {
    getPost(route.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
```
#### スクロールの振る舞い
1. `新しいルートに対してスクロールをトップへ移動させたい`
2. `実際のページリロードがしているように history 要素のスクロールポジションを保持したい`
- この機能は ブラウザが `history.pushState` をサポートしている場合のみ動作する。
```javascript
// 1. の例
scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }　
}
```
```javascript
// 2. の例
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
```
#### Slots フォールバックコンテンツ
- コンテンツがない場合にだけ描画されるフォールバック (つまり、デフォルトの) コンテンツ
```html
<!-- child vue-->
<button type="submit">
    <slot>Submit</slot>
</button>
```
```html
<!--parent vue スロット指定しない-> デフォルトのslot適用 つまりSubmitを表示-->
<Button></Button>
# parent vue スロット指定-> Saveを表示
<Button>Save</Button>
```
#### Named slots
- 複数のslotsを扱う際には `parents component` の中で`v-slot:XXXX`を使うと良い。`<template>` に対して `<template v-slot:XXXX><template>`　として使う。
- 。v-slot を使った <template> で囲まれて`いない`コンテンツは、`デフォルトスロット`に対するものだとみなされます。
- `child component`では　`<slot name="XXXX"></slot>` とする。
- name を指定しないときは、`default`になる。（**slotが一つのみに限る**）
#### Scoped slots
- スロットコンテンツから、子コンポーネントの中だけで利用可能なデータにアクセスできると便利。ただ次の例は間違いで、というのもuser にアクセスすることができるのは `<current-user>` コンポーネントだけで、ここで指定しているコンテンツは**親コンポーネントで描画されるから**です。つまり、child data をparentから使いたいときは別の方法をとる。
```html
# child
<span>
  <slot>{{ user.lastName }}</slot>
</span>
# parent
<current-user>
  {{ user.firstName }}
</current-user>
```
- childのslotにv-bindでデータをつける。これを`スロットプロパティ`という。以下の例の`slotProps`は任意の変数。
```html
<!-- child-->
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
<!-- parent-->
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```
#### `default`だけの時の省略記法。
```html
<current-user v-slot:default="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```
```html
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```
#### 分割代入 Destructing Assignment
- 実は`スロットプロパティ`は分割代入するととができる。つまり使うプロパティのみ取得できるようにする。user プロパティのみを取得。
```html
<current-user v-slot="{ user }">
  {{ user.firstName }}
</current-user>
```
- rename version.
```html
<current-user v-slot="{ user: person }">
  {{ person.firstName }}
</current-user>
```
- フォールバックを指定。
```html
<current-user v-slot="{ user = { firstName: 'Guest' } }">
  {{ user.firstName }}
</current-user>
```
#### ディレクティの動的引数 v-slot : `動的なスロット名の定義`が可能
- dynamicSlotNameをdata(){} とかで指定する。
```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```
#### 名前付きスロットの省略記法
- v-on や v-bind と同様に v-slot にも省略記法があり、引数の前のすべての部分 (v-slot:) を特別な記号 `#` で置き換えます。例えば、v-slot:header は #header に書き換えることができます:
```html
<base-layout>
  <template #XXXX>...</template>
</base-layout>
```
- defaultの場合は、`#default`
```html
<template #main="{ user }"></template>
```
#### Dynamic Import: 初期ロードの負荷を抑えるためにWebpackのCode Splittingを用いた機能
- 無名関数にするだけ？でchunkでロードされる。 `developer tool > network > js` でsize が(prefetch cache)でロードされる. [ref](https://vuedose.tips/tips/dynamic-imports-in-vue-js-for-better-performance/)
#### Error
- domを作っただけで、export default してない時のエラー。
```
using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
```

### Watch プロパティ
- テンプレート
```javascript
watch: {
   target_propaty_name: function (value_after[, value_before]) {
      // write down your own codes.
 }
}
``` 
- watch プロパティのオプション `deep` `immediate`
- `deep`(Optional) : trueの場合、監視するプロパティがオブジェクトの場合`ネストされた値の変更も検知`
- `immediate`(Optional) : `true`の場合、`初期読み込み時`にも呼び出す -> `prop`で`マウント時に変更を適用することができる`ので**親での値の変化にも対応**できるようになる(`computed`プロパティのような初期の読み込み時の処理)
- オプションも使うときのテンプレート
```javascript
watch: {
   target_propaty_name: {
        handler: function (value_after[, value_before]) {
            // write down your own codes.
        },
        [deep: boolean],
        [immediate: boolean],
    }
}
```
- 