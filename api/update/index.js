const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../db/db')

const app = new Koa()

app.use(bodyParser())

app.use(async ctx => {
  const updateBody = await ctx.request.body
  await updateList(updateBody.status, updateBody.title)
  ctx.body = { "todoItem": `${updateBody.title}`, "todoStatus": `${updateBody.status}` }
})

async function updateList(status, title) {
  try {
    const updatedList= await pool.query(`UPDATE list SET todoStatus = ${status} WHERE todoItem LIKe '%${title}%';`)
    return updatedList
  }catch(e){
    console.error(e)
  }
}

module.exports = app.callback()
