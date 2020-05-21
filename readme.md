## Vue
- `ディレクティブ`: v-if, v-bind, v-modelなどのhtml上にロジックを埋めるためのコード
#### `vue router` 使い方
- `<router-view/>`は対象componentsの描画する役割があるため、`root component`(`App.vue`)に置いておく。コンポネントベース実装の`main content`のようなもの。再利用するもの（ `header` `fooder`）は、 `<router-view/>`の周りにおいておく。
- `<router-view/>`を置いてやってあとは、`<router-link>`でリンクを作ればいい感じに飛び回れる。
- `プログラム的遷移`: Script内で上記の記述を行うことは、`<router-link>`タグをクリックすることと同値。
- Notice that a` <router-link>` automatically gets the `.router-link-active` class **when its target route is matched**.
-　`動的セグメント`はコロン `:` を使って表現。この動的セグメントの値は全てのコンポーネント内で `this.$route.params` として利用可能
- 動的セグメントを使って、同じコンポネント再利用する場合（例えばユーザープロフィールを湯づけて表示する時）は、`同じコンポーネントインスタンスが再利用`される。 両方のルートが同じコンポーネントを描画するため、`古いインスタンスを破棄して新しいものを生成するよりも効率的`。しかしながら、これはコンポーネントの`ライフサイクルフック`が呼ばれないことを意味している。同じコンポネントで`パラメータの変化`を検知するためには、`$route`オブジェクトをwatchする。
```javascript
const User = {
  template: '...',
  watch: {
    $route (to, from) {
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
```vue
this.$router.push('/')
```
- historyに追加**せず**遷移（ブラウザの戻す、進むボタンを利用して遷移した際の挙動が異なる）
```vue
this.$router.replace('/')
```
- 現在のパスを確認
```vue
this.$router.path
```
- Keep in mind that `this.$router` is exactly the same as using `router`. The reason we use `this.$router` is because **we don't want to import the router in every single component** that needs to manipulate routing.
- `scrollBehavior`: 例えばルーターオブジェクト内において記述を追加すると、`ページ遷移ごとにスクロールが上端に戻る`挙動となる。`savedPosition`はオプションで、`指定すると戻る/進むボタンによる遷移を行った際、そのページにいた状態のスクロールが再現される。`
- 認証を実装： ルートメタフィールドの`requiredAuth`プロパティが`true`の場合、認証されているかどうかをチェックする挙動を実装する
```vue
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
#### Dynamic Import: 初期ロードの負荷を抑えるためにWebpackのCode Splittingを用いた機能
- 無名関数にするだけ？でchunkでロードされる。 `developer tool > network > js` でsize が(prefetch cache)でロードされる. [ref](https://vuedose.tips/tips/dynamic-imports-in-vue-js-for-better-performance/)
#### Error
- domを作っただけで、export default してない時のエラー。
```
using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
```

#### Slots フォールバックコンテンツ
- コンテンツがない場合にだけ描画されるフォールバック (つまり、デフォルトの) コンテンツ
```html
# child vue
<button type="submit">
    <slot>Submit</slot>
</button>
```
```html
# parent vue スロット指定しない-> デフォルトのslot適用 つまりSubmitを表示
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
# child
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
# parent
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
