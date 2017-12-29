import Router from '../Router.class.js'

const route = new Router()

route.config({
  target: 'main',
  insert: 'main'
})

route.goTo('/views/about', (data, res, req) => {
  res.render(data, {name: 'João Ribeiro'})
})
