const {express, routes} = require('./controller')
const path = require('path')
const app = express()
const cors = require('cors')
// Importing error handling middleware
const cookieParser = require('cookie-parser')
const errorHandling = require('./middleware/ErrorHandling')
const port = +process.env.PORT || 3000
//static
app.use(express.static('./static')),
app.use(express.urlencoded({
    extended: false}),
    routes
)
routes.get('^/$|/challenger', (req, res)=>{
    res.sendFile(path.resolve(__dirname,
        "../api/static/html/index.html"))
})
// Middleware - Application level
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Request-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});
// cookieParser & Router
// cookieParser should be set before router
app.use(cookieParser(), cors(),routes);
app.use(
    express.json(),
    express.urlencoded({
    extended: false,
  })
);
// Handling all errors
app.use(errorHandling);
// Server
app.listen(port, ()=>{
    console.log(`The server is running on port ${port}`);
})