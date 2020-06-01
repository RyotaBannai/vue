### Vuex が解決すること
- プロパティ (props) として深く入れ子になったコンポーネントに渡すのは面倒で、兄弟コンポーネントでは単純に機能しない
- 親子のインスタンスを`直接参照`したり、イベントを介して複数の状態のコピーを変更、同期することを試みるソリューションに頼っていること
- => `コンポーネントから共有している状態を抽出し、それをグローバルシングルトンで管理する`
### vuex は状態を保持するコンテナ
- vuex ストアはリアクティブ
- ストアの状態を直接変更することはできない。明示的にミューテーションをコミットすることによってのみ、ストアの状態を変更
- `mapState` ヘルパーを使用することで複数の state を完結に監視することができる。
```vue
computed: {
    ...mapState([
      "count1", // 注意）プロパティ名は ' または " でくくる
      "count2"
    ])
  }
```
- getters: コンポネントのcomputeにロジックを複数のコンポネントで共有したい場合に使える。このロジックをstore自体に宣言する。
```vue
// store.index
getters: {
    doneTodoCount: (state) => { // 第1引数に state をもつ
      return state.todos.filter(todo => todo.done).length
    }
  }
// SomeRandomComponent.vue
computed: {
    doneTodoCount () {
      return this.$store.getters.doneTodoCount
    }
  }
```
- `mapGetters` ヘルパー関数: 複数のゲッターをコンポネントのcomputeの中に展開する。
- !! `getters` では`同期的な処理のみを記述`する。`Ajax等の非同期処理を実行したい場合`は、`actions` で定義する。
- 容易にstore.indexは肥大化するので moduleごとに分割する。（扱うデータごとに分割する）Vuex.Store({}) のmodules プロパティにキーバリューでmodulesを登録する。
- デフォルトでは各モジュールで宣言した getters , mutations, actions は`グローバル名前空間に登録される`ため、複数のモジュールが同じミューテーション/アクションタイプに反応する. => 名前空間をモジュール単位で登録したい場合は、モジュールの宣言時に `namespaced: true `を設定
- モジュールを分けたら、コンポネント側でも別々に記述する
```vue
...mapState("moduleA", {
      result_A: state => state.result
    }),
..mapActions("moduleA", {
      setResult_A (dispatch) {
        dispatch("setResult", this.input_A)
      },
      clearResult_A: "clearResult"
    }),
```
- [参考](https://qiita.com/nmt1119/items/27ed23e433ec54a9c950)
- [Uncle JS](https://uncle-javascript.com/vuex-modules)
### Module化したときの注意点
- store に記述するstateの値の参照方法に気を付ける。Vue.Storeにそのまま記述するなら、this.state.[Your value]でthisでアクセスしなくてはいけないが、module化したときは単にstate.[Your value]として`this`無しでアクセスしないと、値更新後が`undefined`になる。
- getter,  action, mutation の参照の仕方が変わる. module化するまえは、`this.$store.commit("increment");`　こんな感じで、モジュール[YourModule]にして分割したら、呼び出し方は、`this.$store.commit("YourModule/increment");`になる。注意したいのは、stateの呼び出し方はこれと異なること。stateはドットで連結してアクセスする。`this.$store.state.count.count` この違いは単に、`stateはオブジェクトのプロパティ`で、`getter, action, mutationは関数`だからである。getter は `this.$store.getters["moduleName/getterName"]`
- Vuex は `単一ステートツリー` (`single state tree`) を使います。つまり、この単一なオブジェクトはアプリケーションレベルの状態が全て含まれており、"信頼できる唯一の情報源 (`single source of truth`)" として機能します。(通常、アプリケーションごとに1つしかストアは持たない) 次のことをを容易になる。
    1. 単一ステートツリーは状態の特定の部分を見つけること
    2. デバッグのために現在のアプリケーションの状態のスナップショットを撮ること
- `mapState` はオブジェクトを返すため、`オブジェクトスプレッド演算子`でオブジェクトの内部をマージする。
### Actions vs Mutations
- そもそも`Mutation`は`同期`処理でなければならなず、`Action`は`非同期`処理も可能という違いがあります。これは、`Mutationで複数の状態の変更が非同期に行われた場合に挙動が予測不能になるのを防ぐ`という意図がある。(Action で非同期にMutationを呼んだら（`commit`したら）どうなのか=> Actionを呼び出すための`dispatchメソッドはPromiseを返すため、処理の順序を制御することが可能`=>MutationにもPromiseつけて非同期できるから、勘所は`非同期か同期で使い分けるため`)
- ミューテーションハンドラ：イベントハンドラのようなもので、mutationsのプロパティとして宣言。（commitで呼び出すときにはハンドラ名をタイプとして渡すことで呼びだす）
- typeを指定することもできる
```vue
store.commit({
  type: 'increment',
  amount: 10
})
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```
### getters
- `プロパティとしてアクセスされるゲッター`は Vue のリアクティブシステムの一部としてキャッシュされる
- `メソッドスタイルアクセス` (キャッシュされない): 関数を返り値にすることで、ゲッターに引数を渡すこともできます。これは特にストアの中の配列を検索する時に役立ちます
```vue
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```
- `mapGetters` ヘルパーはストアのゲッターをローカルの算出プロパティ
- state のフィールドを変更追加は極力避ける。=>初めに全て宣言しておく。
- どうしても必要な場合は`Vue.set(obj, 'newProp', 123)`　とするか、object spread syntax を使って`state.obj = { ...state.obj, newProp: 123 }`とする。
- ミューテーション・タイプを定数: 
    1. コードに対してリントツールのようなツールを利用できる
    2. 単一ファイルに全ての定数を設定することによって、共同で作業する人に、`アプリケーション全体で何のミューテーションが可能であるか`を一目見ただけで理解できるようにする
- `mapMutations` は mutation自体を `this.$store.commit()` にマッピングするため、関数のように呼び出すだけで良い。
- アクションハンドラはストアインスタンスのメソッドやプロパティのセットと同じものを呼び出せるコンテキストオブジェクトを受け取る（`context`）
- アクションは非同期：非同期でも実行の順序をコントロールしたい => action は `Promise`を返却する。つまり以下のようにコントロールする
```vue
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
store.dispatch('actionA').then(() => {
  // ...
})
```
- async/ await を使用する
```vue 
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData()) // commit 前に getData() でデータを取得して、それをpayloadに渡す
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // `actionA` が完了するのを待機する
    commit('gotOtherData', await getOtherData())
  }
}
```