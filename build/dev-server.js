/*!
 * TEST SERVER
 **/


const
  koa = require('koa'),
  serve = require('koa-static'),
  config = require('./config'),
  port = config.devServerPort,
  oneYear = 1000 * 60 * 60 * 24 * 365,

  app = koa(),
  mount = require('koa-mount'),
  path = require('path'),
  Pug = require('koa-pug'),
  isProduction = false,
  cwd = process.cwd(),
  Router = require('koa-router'),
  router = new Router(),
  pack = require('../package.json')

//static files
app.use(function*(next) {
  this.set('Access-Control-Allow-Origin', '*')
  yield next
})

app.use(serve(path.resolve(__dirname, '../static'), {
  maxAge: oneYear
}))

app.use(
  mount(
    '/_bc',
    serve(path.resolve(__dirname, '../node_modules'), {
      maxAge: oneYear
    })
  )
)

app.use(
  mount(
    '/_dist',
    serve(path.resolve(__dirname, '../dist'), {
      maxAge: oneYear
    })
  )
)

router.get('/', function* (next) {
  this.render('index', {
    siteName: pack.name,
    siteDesc: pack.description,
    siteKeywords: pack.keywords.join(','),
    cdn: 'http://localhost:' + port,
    port: config.port
  })
})

app.use(router.routes())
app.use(router.allowedMethods())

//pug template
const pug = new Pug({
  viewPath: 'build/views',
  debug: !isProduction,
  pretty: !isProduction,
  compileDebug: !isProduction,
  noCache: true,
  app: app // equals to pug.use(app) and app.use(pug.middleware)
})

//start
app.listen(port, function() {
  console.log(new Date() + ' ' + pack.name + ' runs on port ' + port)
})