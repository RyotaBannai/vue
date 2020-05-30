<template>
    <div v-if="item">{{ item.title }}</div>
    <div v-else>...</div>
</template>

<script>
    export default {
        computed: {
            // ストアの状態から item を表示します
            item () {
                return this.$store.state.items[this.$route.params.id]
            }
        },

        // サーバサイドのみ
        // これは自動的にサーバレンダラによって呼ばれます
        serverPrefetch () {
            // コンポーネントが描画前に待機するように
            // アクションから Promise を返す
            return this.fetchItem()
        },

        // クライアントサイドのみ
        mounted () {
            // まだサーバ上で描画されていない場合
            // item (最初に読み込み中テキストが表示されます) をフェッチします
            // ロジックが 2 回実行されないようにするために、コンポーネントは mounted フックでサーバサイドで描画されているかどうかチェックする
            if (!this.item) {
                this.fetchItem()
            }
        },

        methods: {
            fetchItem () {
                // アクションから Promise を返す
                return store.dispatch('fetchItem', this.$route.params.id)
            }
        }
    }
</script>