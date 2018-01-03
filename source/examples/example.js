import Router from '../Router.class.js'

const route = new Router()

route.config({
  target: 'main',
  insert: 'main'
})

route.goTo('/', (data, res, req) => {
  res.style('main', {opacity: 0, transition: 'opacity .3s'})

  setTimeout(() => {
    res.style('main', {opacity: 1})
    res.render(data)
  }, 300)
})

route.goTo('/views/about', (data, res, req) => {
  res.render(data)
})

route.goTo('/views/contact', (data, res, req) => {
  res.style('main', {opacity: 0, transition: 'opacity .3s'})

  setTimeout(() => {
    res.style('main', {opacity: 1})
    res.render(data)
  }, 300)
})
