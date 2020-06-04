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
- 名前空間内でglobalなactionを登録したい場合は、アクションのrootプロパティ をtrueにして、そのアクション内容をhandlerプロパティ にかく。
```vue
modules: {
    foo: {
      namespaced: true,
       actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction' // here
        }
      }
    }
  }
```
- moduleはネストすることができるため次のようにすることができる。namespaced がない場合は、`名前空間は親モジュールから継承` 次のコードの`myPage`を参考。
```vue
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      // モジュールのアセット
      state: () => ({ ... }), // モジュールステートはすでにネストされており、名前空間のオプションによって影響を受けません
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      // ネストされたモジュール
      modules: {
        // 親モジュールから名前空間を継承する without namespaced: true
        myPage: {
          state: () => ({ ... }),
          getters: {
            rofile () { ... } // -> getters['account/profile'] // watch out!
          }
        },
        // さらに名前空間をネストする
        posts: {
          namespaced: true, // namespaced is true so namespaced becomes nested as well.
          state: () => ({ ... }),
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```
- [参考](https://qiita.com/nmt1119/items/27ed23e433ec54a9c950)
- [Uncle JS](https://uncle-javascript.com/vuex-modules)
- モジュール(module)のmutation やgetter の中では、渡される第1引数はモジュールの`ローカルステート`。同様に、モジュールの`action の中では` context.state はローカルステートにアクセスでき、`ルートのステート`は `context.rootState` で、getterでは`第３引数で`アクセスできる。
```vue 
const moduleA = {
    actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) { // here
        if ((state.count + rootState.count) % 2 === 1) {
            commit('increment')
        }
    },
    getters: {
        sumWithRootCount (state, getters, rootState) {  // here
          return state.count + rootState.count
        }
     }
}
```
- `rootGetters`も同様にアクセス可能。
- 名前空間内でdispatch(/commit)をするとそのmodule内のactionを参照する。そのためrootのaction(/commit)をdispatchしたいのであれば、第３引数に`{ root: true }`を渡す。
### createNamespacedHelpers
- namespaced 化したモジュールをcomponentで展開して使うのは冗長的
```vue
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}
// または・・・まだ冗長的
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```
- => createNamespaceHelpers を使う。（複数のモジュールを使いたい場合は`object destructing でrename`した方が良い）
```vue
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
// または
// const { mapState: AMapState, mapActions: AMapActions } = createNamespacedHelpers('some/nested/moduleA')
methods: {
    // `some/nested/module` を調べます
    ...mapActions([
      'foo',
      'bar'
    ])
  }
```
- 動的にモジュールを登録: `registerModule`（<-> `unregisterModule`） 他の Vue プラグインが、モジュールをアプリケーションのストアに動的に付属させることで、状態の管理に Vuex を活用できるようになる。
```vue
// `myModule` モジュールを登録
store.registerModule('myModule', {
  // ...
})
// ネストされた `nested/myModule` モジュールを登録
store.registerModule(['nested', 'myModule'], {
  // ...
})
```
- モジュールが登録されているかどうか: `store.hasModule(moduleName)`
### Module化したときの注意点
- store に記述するstateの値の参照方法に気を付ける。Vue.Storeにそのまま記述するなら、this.state.[Your value]でthisでアクセスしなくてはいけないが、module化したときは単にstate.[Your value]として`this`無しでアクセスしないと、値更新後が`undefined`になる。
- getter,  action, mutation の参照の仕方が変わる. module化するまえは、`this.$store.commit("increment");`　こんな感じで、モジュール[YourModule]にして分割したら、呼び出し方は、`this.$store.commit("YourModule/increment");`になる。注意したいのは、stateの呼び出し方はこれと異なること。stateはドットで連結してアクセスする。`this.$store.state.count.count` この違いは単に、`stateはオブジェクトのプロパティ`で、`getter, action, mutationは関数`だからである。getter は `this.$store.getters["moduleName/getterName"]`
- Vuex は `単一ステートツリー` (`single state tree`) を使います。つまり、この単一なオブジェクトはアプリケーションレベルの状態が全て含まれており、"信頼できる唯一の情報源 (`single source of truth`)" として機能します。(通常、アプリケーションごとに1つしかストアは持たない) 次のことをを容易になる。
    1. 単一ステートツリーは状態の特定の部分を見つけること
    2. デバッグのために現在のアプリケーションの状態のスナップショットを撮ること
- `mapState` はオブジェクトを返すため、`オブジェクトスプレッド演算子`でオブジェクトの内部をマージする
- `モジュールの再利用するときは、stateを関数で返して新しいインスタンスを作成する`こと。（例えば、`runInNewContext` オプションが `false` または `'once'` のとき、[SSR でステートフルなシングルトンを避けるため](https://ssr.vuejs.org/ja/structure.html#ステートフルなシングルトンの回避)。）
- vuex のいい感じの使い方を知りたいなら[`これ`](https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart)を参考に
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
### ホットリローディング
- vuex はデフォルトでミューテーション、モジュールのホットリロードされない。（アクション、ゲッターはホットリロードされる）つまりこれらを変更したら再起動しないと変更が反映されない（？）ミューテーションとモジュールのホットリローディングのために、`store.hotUpdate()` API メソッドを利用する必要がある。コード更新後、新しいインスタンスを自動的に作成して、既存のmutaitons とmodulesに反映させる、ということをする。
- [`動的モジュールホットリローディング`](https://vuex.vuejs.org/ja/guide/hot-reload.html#%E5%8B%95%E7%9A%84%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%83%9B%E3%83%83%E3%83%88%E3%83%AA%E3%83%AD%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0)というものがあり、もしstoreで使用するのが全てmoduleならこちらを使った方が完結にかける。
```vue
if (module.hot) {
  // ホットモジュールとしてアクションとモジュールを受け付けます
  module.hot.accept(['./mutations', './modules/a'], () => {
    // 更新されたモジュールをインポートする
    // babel 6 のモジュール出力のため、ここでは .default を追加しなければならない
    const newMutations = require('./mutations').default
    const newModuleA = require('./modules/a').default
    // 新しいモジュールとミューテーションにスワップ
    store.hotUpdate({
      mutations: newMutations,
      modules: {
        a: newModuleA
      }
    })
  })
}

```