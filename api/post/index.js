
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors');
const pool = require('../../db/db')
const MessagingResponse = require('twilio').twiml.MessagingResponse
const pino = require('koa-pino-logger')()
const app = new Koa()
  app.use(bodyParser())
  app.use(cors())
  app.use(pino)

app.use(async ctx => {
ctx.type = 'text/xml';
const todoItem = await ctx.request.body.Body
await createPost(todoItem);
const twiml = new MessagingResponse();
twiml.message('New todoList Item created');
ctx.log.info('New Item is created')
 ctx.body = twiml.toString()
})

async function createPost(todoItem) {
    try {
      const itemData = await pool.query(`INSERT INTO list(todoItem) VALUES ('${todoItem}');`)
      return itemData
    } catch (error) {
      console.log(error)
    }
  }

  module.exports = app.callback()

