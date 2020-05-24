## Vue
- [vue cheat sheet](https://flaviocopes.com/vue-cheat-sheet/)
- `ディレクティブ`: v-if, v-bind, v-modelなどのhtml上にロジックを埋めるためのコード（`データバインディング`）もっとも基本的な形は、`Mustache` 構文(`二重中括弧`)を利用したテキスト展開
- 動的引数: `in-DOM テンプレート` (HTML ファイルに直接書かれるテンプレート) を使う場合、ブラウザが強制的に属性名を小文字にするため、キー名を大文字にするのは避ける
```javascript
// in-DOM テンプレートの中では、v-bind:[someattr] に変換されます
<a v-bind:[someAttr]="value"> ... </a>
```
- 基本は`property`を`bind`するか(`v-bind`)、`event`を登録(`on`)するか(`v-on`)。
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
- `マスタッシュ内コード`の複雑なロジックをまとめる
- 算出プロパティは`リアクティブな依存関係にもとづきキャッシュされる`という違いがある。算出プロパティは、`リアクティブな依存関係が更新されたときにだけ再評価`されます。これはつまり、message が変わらない限りは、reversedMessage に何度アクセスしても、関数を再び実行することなく以前計算された結果を即時に返すということ。対称的に、`メソッド呼び出し`は、再描画が起きると常に関数を実行
- 算出プロパティはデフォルトでは getter 関数のみで、必要があれば setter 関数も使える
#### watch ウォッチャ
- データが変わるのに応じて`非同期`や`コストの高い処理を実行したいとき`に最も便利
- `非同期処理`( API のアクセス)の実行や、処理をどのくらいの頻度で実行するかを制御したり、`最終的な answer が取得できるまでは中間の状態にしておく`、といったことが可能。`これらはいずれも算出プロパティでは実現できない`。`処理を実行してもデータは返さない場合`も`watch`にかく。
### methods 
- 算出プロパティが使えない状況ではメソッドを使う。例えば、入れ子になった v-for のループの中): even はmethods
```html
<ul v-for="set in sets">
  <li v-for="n in even(set)">{{ n }}</li>
</ul>
```
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
new Vue({
    watch: {
       target_propaty_name: {
            handler: function (value_after[, value_before]) {
                // write down your own codes.
            },
            [deep: boolean],
            [immediate: boolean],
        }
    }
}
```
- watchの監視する値の対象が**オブジェクト**である場合、オブジェクトの`追加や削除`の検出は行われるが、`オブジェクト内の各プロパティの値の変更`は検出されない。 例えば以下の例であれば `value`の値の変更は検知されない。
```javascript
new Vue({
   el: "#sample",
   data: {
       obj: {
           value: ""
       }
   },
   watch: {
       obj: function () {　}
   },
})
```
- この場合 watchのオプションに`deep: true`を追加する
- `v-for` の`key`に配列インデックスを使ってはいけない（頻繁に変更される可能性のあるデータを`key`にしてはいけない）また、オブジェクトや配列のような`非プリミティブ値`を `v-for` のキーとして使わない。
```html
<li v-for="(item, index) in items" :key="index"><\li>
```
- Vue が `v-for` で描画された要素のリストを更新する際、標準では “その場でパッチを適用する” (`in-place patch`) 戦略を用いる。データのアイテムの順序が変更された場合、アイテムの順序に合わせて DOM 要素を移動する代わりに、 Vue は各要素にその場でパッチを適用して、`その特定のインデックスに何を描画するべきかを確実に反映`
- [`Vue.jsのライフサイクルダイアグラム`](https://jp.vuejs.org/v2/guide/instance.html#%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB%E3%83%80%E3%82%A4%E3%82%A2%E3%82%B0%E3%83%A9%E3%83%A0)
- 変更メソッド `push() pop() shift() unshift() splice() sort() reverse()` を監視対象の配列に適用すると画面も更新される。
***
###　注意点 
- JavaScript の制限のため、Vue は、配列やオブジェクトでは検出することができない変更のタイプがあり, [`reactivity`セクション](https://jp.vuejs.org/v2/guide/reactivity.html#%E5%A4%89%E6%9B%B4%E6%A4%9C%E5%87%BA%E3%81%AE%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%85)で議論されている。
#### オブジェクトに関して 
- Vueはオブジェクトの追加または消去を検出できない。そのためvmが作成された後にオブジェクトにプロパティを追加してもリアクティブにはならない。リアクティブにしたい場合は次のいずれかの方法を使う。
```javascript
Vue.set(object, propertyName, value)
this.$set(this.someObject, 'b', 2)

```
- `vm.$set` インスタンスメソッドを使用することもできる。これはグローバルの `Vue.set のエイリアス`
- 上の方法はプロパティを１つ追加する方法。複数追加したい場合は次の方法を使う。
```javascript
// `Object.assign(this.someObject, { a: 1, b: 2 })` の代わり
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```
- `元のオブジェクト`と`ミックスインオブジェクト`の`両方のプロパティを持つ新たなオブジェクト`を作成
#### 配列に関して
- Vue は、配列における次の変更は検知できない:
1. `インデックスと一緒にアイテムを直接セットする場合`、例えば `vm.items[indexOfItem] = newValue`
2. `配列の長さを変更する場合`、例えば `vm.items.length = newLength`
- これに対応するためにオブジェクト同様`Vue.set`または`Array.prototype.splice`を使う
```javascript
// 1.
Vue.set(vm.items, indexOfItem, newValue) // もちろんこれもok vm.$set(vm.items, indexOfItem, newValue)
vm.items.splice(indexOfItem, 1, newValue)
// 2. 
vm.items.splice(newLength)
```
#### リアクティブプロパティの宣言
- リアクティブなプロパティを動的に追加することはできないため、インスタンスの初期化時に前もって`全てのルートレベルのリアクティブな data プロパティを予め宣言する必要がある`
1. 依存性追跡システムにおける一連のエッジケースを排除するため
2. 後から見直したり別の開発者が読んだりしたときにコンポーネントのコードを簡単に理解できるため
#### 非同期更新キュー
- `vm.someData = 'new value'` をセットした時、`そのコンポーネントはすぐには再描画しない`。 次の “tick” でキューがフラッシュされる時に更新。データの変更後に Vue.js の DOM 更新の完了を待つには、データが変更された直後に `Vue.nextTick(callback)` を使用。そのコールバックは DOM が更新された`後に`呼ばれる。
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // データを変更
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
```
- または`vm.$nextTick()` インスタンスメソッドを使う。
```javascript
methods: {
    updateMessage: function () {
      this.message = 'updated'
      console.log(this.$el.textContent) // => 'not updated'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => 'updated'
      })
    }
  }
```
- `$nextTick()` は `Promise` を返却するため、新しい `ES2017 async/awai`t 構文を用いて、同じことができる。
```javascript
methods: {
  updateMessage: async function () {
    this.message = 'updated'
    console.log(this.$el.textContent) // => 'not updated'
    await this.$nextTick()
    console.log(this.$el.textContent) // => 'updated'
  }
}
```
***
- templateのroot domでv-forは使えないためtemplateでwrapする
```html
<template>
    <template>
        <tr v-for="item in items">
            <td v-for="(key, value) in items" v-bind:key="key">{{ value }}</td>
        </tr>
    </template>
</template>
```
- v-if と v-for を同時に利用することは 推奨されない。それらが同じノードに存在するとき、 v-for は v-if よりも高い優先度を持つ。
```html
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```
- `DOM テンプレート解析の注意事項`:  `<ul>` 要素の中では `<li>` のみが有効などのDOMの制限による物で、無効なコンテンツとしてつまみ出され、最終的に描画された出力にエラーが発生することがある。`is` を使う。
```html
<div id="todo-list-example">
  <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Add a todo</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="E.g. Feed the cat"
    >
    <button>Add</button>
  </form>
  <ul>
    <li
      is="todo-item"
      v-for="(todo, index) in todos"
      v-bind:key="todo.id"
      v-bind:title="todo.title"
      v-on:remove="todos.splice(index, 1)"
    ></li>
  </ul>
</div>
```
```javascript
Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
  props: ['title']
})
new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: [
      {
        id: 1,
        title: 'Do the dishes',
      },
      {
        id: 2,
        title: 'Take out the trash',
      },
      {
        id: 3,
        title: 'Mow the lawn'
      }
    ],
    nextTodoId: 4
  },
  methods: {
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})
```
- [delete element from list and object](https://stackoverflow.com/questions/35459010/vuejs-remove-element-from-lists)
### Event Handling
- インラインステートメントハンドラでオリジナルの DOM イベントを参照したい: pass $event 
```javascript
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```
- イベント修飾子(`event modifiers`): `.prevent .once .self`など
- .self: `event.target` が要素自身のときだけ、ハンドラが呼び出される。子要素のときは呼び出されない
#### [bubble and capture] (https://javascript.info/bubbling-and-capturing)
- [capturing phase and bubbling phase] (https://javascript.info/bubbling-and-capturing)
```html
<form class="outer"
     v-on:click.capture="doThis($event, 'Capture-outer')"
     v-on:click="doThis($event, 'Bubble-outer')">
  OUTER
  <div class="middle"
       v-on:click.capture="doThis($event, 'Capture-middle')"
       v-on:click="doThis($event, 'Bubble-middle')">
    MIDDLE
      <p class="inner"
           v-on:click.capture="doThis($event, 'Capture-inner')"
           v-on:click="doThis($event, 'Bubble-inner')">
        INNER
      </p>
  </div>
</form>
<style>
body * {
  margin: 10px;
  border: 1px solid blue;
}
</style>
```
```javascript
new Vue({
  el: '.outer',
  data: {
  },
  methods: {
    doThis: function(e, msg) {
      debugger;
      var target = e.target.classList[0];
      var currentTarget = e.currentTarget.classList[0];
      alert(msg + '\n' + "Clicked " + target + '\n' + "Triggered " + currentTarget)
    }
  }
})
```
- https://jsfiddle.net/1b02crhw/6/
- `bubble`: When an event happens on an element, `it first runs the handlers on it`, then on its parent, `then all the way up on other ancestors`.
- `<p>`のイベントは　`p　>　div　>　form`の順にハンドリングされる。
- `capture`: 内部要素を対象とするイベントは、その要素によって処理される前に処理される。
- `<p>`のイベントは `form > div > p` の順位ハンドリングされる。
- `addEventLister`: If it’s true, then the handler is set on the `capturing phase`.
```javascript
for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
}
```

- `The most deeply nested element`(`p`) that caused the event is called `a target element`, accessible as `event.target`. Note the differences from `this` (=`event.currentTarget`: the “`current`” element, the one that has `a currently running handler on it`.)
```javascript
form.onclick = function(event) { // 'this' is always 'form' because the handler runs on it.
  event.target.style.backgroundColor = 'yellow';
  setTimeout(() => {
    alert("target = " + event.target.tagName + ", this=" + this.tagName); // 'event.target' is the actual element inside the form that was clicked.
    event.target.style.backgroundColor = ''
  }, 0);
};
```
- `event.stopPropagation()` `stops the move upwards`, `but on the current element all other handlers will run`.
- passive: marking a touch or wheel listener as passive, the developer is promising `the handler won't call preventDefault to disable scrolling`. This frees the browser up to `respond to scrolling immediately without waiting for JavaScript`, thus ensuring a reliably smooth scrolling experience for the user. [ref](https://stackoverflow.com/questions/37721782/what-are-passive-event-listeners)
- `v-model + Vue インスタンスの動的なプロパティ`
```javascript
<select v-model="selected">
<!-- インラインオブジェクトリテラル -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```
- `propsに動的にプロパティを渡すにはv-bind を使う`
### コンポーネントで v-model を使う
- 以下は等価
```html
<input v-model="searchText">
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```
- 2つ目の例をコンポーネントで使用する場合次のように実装:
```html
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```
```javascript
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```
- v-modelならば
```html
<custom-input v-model="searchText"></custom-input>
```
- [`v-bind:is=""` を使うとタブ切替の実装が一瞬で完成できる。](https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-dynamic-components?file=/index.html:945-964)
- JavaScript のオブジェクトと配列は、参照渡しされることに注意。参照として渡されるため、子コンポーネント内で配列やオブジェクトを変更すると、 親の状態へと影響する。
- [既存の属性への置換とマージ](https://jp.vuejs.org/v2/guide/components-props.html#%E6%97%A2%E5%AD%98%E3%81%AE%E5%B1%9E%E6%80%A7%E3%81%B8%E3%81%AE%E7%BD%AE%E6%8F%9B%E3%81%A8%E3%83%9E%E3%83%BC%E3%82%B8): class および style 属性は少しスマートに作られていて、両方の値がマージされる。
### Event
- `コンポーネントやプロパティとは違い`、`イベント名の大文字と小文字は自動的に変換されません`。その代わり発火されるイベント名とイベントリスナ名は全く同じにする必要があります。例えばキャメルケース(`camelCase`)のイベント名でイベントを発火した場合:
```javascript
// fire an event
this.$emit('myEvent')
// listen the event
<my-component v-on:myEvent="doSomething"></my-component>
```
- さらに DOM テンプレート内の v-on イベントリスナは自動的に小文字に変換されます (`HTML が大文字と小文字を判別しないため`)。このため `v-on:myEvent` は `v-on:myevent` になり myEvent にリスナが反応することが`できなく`なります。こういった理由から `ケバブケース(kebab-case)`を使う。
- デフォルトではコンポーネントにある `v-model` は `value をプロパティとして、input をイベントして使う`が、チェックボックスやラジオボタンなどのインプットタイプは value 属性を別の目的で使う事があり、model オプションを使うことで衝突してしまう。解決方法はPG3.vueを参照。
### 双方向バインディング
- 子プロパティから親プロパティの値を変更する。
```html
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>

this.$emit('update:title', newTitle)
```
- .syncを使うと楽. `v-on:update.\[property name\] => v-on:\[property name\].sync`
```html
<text-document v-bind:title.sync="doc.title"></text-document>
```
- .sync 修飾子を v-bind に付けることでオブジェクトを使って複数のプロパティを一度にセットする事ができる
```html
<text-document v-bind.sync="doc"></text-document>
```
- doc がオブジェクトとして、doc内のtitleプロパティにv-onアップデートリスナがつけられる。