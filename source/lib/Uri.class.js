import Ajax from '/node_modules/ajaxabstractjs/ajaxabstractjs.js'
import Helper from '../helpers/helper.class.js'

/**
 * Class treate the uri's and get datas bring the library Ajaxabstractjs
 * @class
 */
class Uri {
  /**
  * Properties necessery to make this lib works
  * @constructor
  */
  constructor (uri, route, engine, notFound, target, response, insert) {
    this._route = route
    this._uri = uri
    this._engine = engine
    this._notFound = notFound
    this._target = target
    this._response = response
    this._insert = insert
  }

  /**
  * This method it main methos taht get the information necessary to continue app running
  * @param  {event} event get of the information on click event
  * @return {object} return the method informed on goTo method
  */
  _event (event) {
    event.preventDefault()

    setTimeout(() => {
      Array.prototype
        .filter.call(document.querySelectorAll(`${this._target} a`), item => !item.hasAttribute('target'))
        .forEach(link => link.addEventListener('click', event => this._event(event)))
    }, 500)

    const href = event.target.getAttribute('href')
    const route = this._route.hasOwnProperty(href)
    const url = (href === '/') ? '/' : href + this._engine

    // const { pathname } = window.location
    const { sessionStorage } = window

    if (sessionStorage.hasOwnProperty(href)) {
      this._response['render'] = (template, context) => Helper.render(template, context, this._insert)
      return this._route[href](sessionStorage.getItem(href), this._response, this._request)
    }

    if (route) {
      Ajax.get(url, (res, err) => {
        if (err && !this._notFound) {
          this._notFound = err.message
          this._response.staus = err.status
          this._response['render'] = (template, context) => Helper.render(template, context, this._insert)
          document.title = '404 - NOT FOUND'

          return this._route[href](this._notFound, this._response, this._request)
        }

        const content = res.parsed.querySelector(this._target).innerHTML
        document.title = res.parsed.title

        this._response['render'] = (template, context) => Helper.render(template, context, this._insert)

        sessionStorage.setItem(href, content)

        return this._route[href](content, this._response, this._request)
      })
    }
  }
}

/**
 * @module Uri;
 */
export default Uri
