const Vue=require('vue')
const server=require('express')()
const fs=require('fs')
const renderer=require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('templates/index.template.html', 'utf-8')
})
const createApp = require('./app') // 元々は毎回MVインスタンスを作成するだけのファイル

server.get('*', (req, res)=>{
    const context = {
        title: 'hello',
        meta: `<meta charset="UTF-8">`,
    }
    const app = createApp(context)

    renderer.renderToString(app, context, (err, html)=>{
        if(err){
            res.status(500).end('Inernal Server Error')
            return
        }
        else{
            res.end(html)
        }

    })
})

server.listen(8080) // node main.js to run server