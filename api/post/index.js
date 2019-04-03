
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors');
 const pool = require('../../db/db')
 const MessagingResponse = require('twilio').twiml.MessagingResponse
const app = new Koa()
app.use(bodyParser())
app.use(cors())


app.use(async ctx => {
  ctx.type = 'text/xml';
const todoItem = await ctx.request.body.item
const item = await createPost(todoItem)
 ctx.body = item;
const twiml = new MessagingResponse();
 twiml.message('New todoList Item created');
 ctx.body = twiml.toString()
 return twiml.toString();
})

async function createPost(todoItem) {
    try {
      const itemData = await pool.query(`INSERT INTO todo(todoItem) VALUES ('${todoItem}');`)
      return itemData
    } catch (error) {
      console.log(error)
    }
  }

  module.exports = app.callback()


