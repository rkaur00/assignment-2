const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../db/db')

const app = new Koa()
app.use(bodyParser())

app.use(async ctx => {
  const dbtitle = await ctx.request.body.title
  const item = await show(dbtitle)
  ctx.body = item
})

async function show(title) {
  try {
    const itemData = await pool.query(`DELETE  FROM list WHERE todoItem  LIKE '${title}'`)
    return ("Item deleted")
  } catch (error) {
    console.log(error)
  }
}

module.exports = app.callback()