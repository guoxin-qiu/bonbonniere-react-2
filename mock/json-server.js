const jsonServer = require('json-server');

const server = jsonServer.create();
const dbJson = require('./db.json');

const router = jsonServer.router(dbJson);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  setTimeout(() => {
    next();
    // const expireTime = 1000 * 60;
    // res.header('Access-Control-Expose-Headers', 'access-token');

    // const now = Date.now();
    // let unauthorized = true;
    // const token = req.headers['access-token'];

    // if (token) {
    //   const expired = now - token > expireTime;
    //   if (!expired) {
    //     unauthorized = false;
    //     res.header('access-token', now);
    //   }
    // }

    // if (unauthorized) {
    //   res.sendStatus(401);
    // } else {
    //   next();
    // }
  }, Math.random() * 3000);
});

server.use('/api/1', router);
server.listen(3002, () => console.log('JSON Server is running...'));
