//使用 require 載入 Express
const express = require('express')
const app = express()
const port = 3001

//使用 require 載入 Express-handlebars
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')

//setting template-engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//告訴 Express 靜態檔案的資料夾位置
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })
})

app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.find(movie => movie.id == req.params.movie_id)
  res.render('show', { movie: movie })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie => {
    return movie.title.toLocaleLowerCase().includes(keyword)
  })
  res.render('index', { movies: movies, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})