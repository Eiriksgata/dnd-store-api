const Koa = require('koa');
const app = new Koa();


// response
app.use(async ctx => {
  ctx.body = {
    code: '0',
    message: 'ok',
    data: ''
  };
});

app.listen(3000);