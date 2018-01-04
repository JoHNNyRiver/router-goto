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

route.goTo('/views/about/:id', (data, res, req) => {
  console.log(req.param.id)
  res.render(data)
})

route.goTo('/views/contact/:id', (data, res, req) => {
  res.style('main', {opacity: 0, transition: 'opacity .3s'})
  console.log(req.param.id)

  setTimeout(() => {
    res.style('main', {opacity: 1})
    res.render(data, {contact: 'Aqui está sendo interpolado com a lib Mustache'})
  }, 300)
})

route.preRender('/views/contact', {
  contact: 'Aqui está sendo interpolado com a lib Mustache'
})
