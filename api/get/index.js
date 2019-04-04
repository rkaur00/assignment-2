const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../db/db')
const pino = require('koa-pino-logger')()
const app = new Koa()
app.use(bodyParser())
app.use(pino)
app.use(async ctx => {
   const item = await show()
  ctx.log.info('Get all todo items')
  ctx.body = item
})

async function show() {
  try {
    const itemData = await pool.query(`SELECT * FROM list`)
    return itemData
  } catch (error) {
    console.log(error)
  }
}

module.exports = app.callback()

