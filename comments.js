// Create web server we run this file
// node comments.js
// http://localhost:3000/comments
// http://localhost:3000/comments/1
// http://localhost:3000/comments/2

// http://localhost:3000/comments?postId=1
// http://localhost:3000/comments?postId=2

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('comments.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
//server.use(jsonServer.bodyParser)
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})
