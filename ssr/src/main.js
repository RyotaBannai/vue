const Vue=require('vue')
const server=require('express')()
const fs=require('fs')
const renderer=require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('templates/index.template.html', 'utf-8')
})

server.get('*', (req, res)=>{
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div> The visisted URL is: {{ url }}</div>`
    })
    const context = {
        title: 'hello',
        meta: `<meta charset="UTF-8">`
    }

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