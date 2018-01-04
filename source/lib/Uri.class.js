import Ajax from '../../node_modules/ajaxabstractjs/ajaxabstractjs.js'
import Helper from '../helpers/helper.class.js'

/**
 * Class treate the uri's and get datas bring the library Ajaxabstractjs
 * @class
 */
class Uri {
  /**
  * Properties necessery to make this lib works
  * @property {String} _uri
  * @property {string} _engine
  * @property {string} _notFound
  * @property {strign} _target
  * @property {object} _response
  * @property {string} _insert
  * @property {object} _route
  *
  * @constructs
  */
  constructor (uri, engine, notFound, target, response, insert, request) {
    this._uri = uri
    this._engine = engine
    this._notFound = notFound
    this._target = target
    this._response = response
    this._request = request
    this._insert = insert
    this._route = {}
  }

  /**
  * This method verify the data before the trigger Ajaxabstract lib
  * @param  {object} res
  * @param  {object} err
  * @param  {string} href
  * @param  {object} sessionStorage
  * @param  {object} history
  * @return {function}
  */
  _verifyData (res, err, href, sessionStorage, history) {
    if (err && !this._notFound) {
      this._notFound = err.message
      this._response.staus = err.status
      this._response['render'] = (template, context) => Helper.render(template, context, this._insert)
      document.title = '404 - NOT FOUND'

      return this._route[href](this._notFound, this._response, this._request)
    }

    const content = res.parsed.querySelector(this._target).innerHTML
    document.title = res.parsed.title

    sessionStorage.setItem(href, JSON.stringify({content: content, title: res.parsed.title}))
    history.pushState({href: href}, res.parsed.title, this._uri)

    this._response['render'] = (template, context) => Helper.render(template, context, this._insert)
    return this._route[href](content, this._response, this._request)
  }

  /**
  * This method it main methos taht get the information necessary to continue app running
  * @param  {event} event get of the information on click event
  * @return {object} return the method informed on goTo method
  */
  _event (event, callback) {
    event.preventDefault()

    this._route[this._uri] = callback

    setTimeout(() => {
      Array.prototype
        .filter.call(document.querySelectorAll(`${this._target} a`), item => !item.hasAttribute('target'))
        .forEach(link => link.addEventListener('click', event => this._event(event, callback)))
    }, 500)

    let href = event.target.getAttribute('href')

    if (this._request.param) {
      const newHref = href.replace(/\/\d/gim, '')
      href = newHref
    }

    const router = this._route.hasOwnProperty(href)
    const url = (href === '/' || href === '') ? '/' : href + this._engine

    const { sessionStorage, history, location } = window
    const { pathname } = location

    if (sessionStorage.hasOwnProperty(href) && router && href !== pathname) {
      const { content, title } = JSON.parse(sessionStorage.getItem(href))
      document.title = title

      history.pushState({href: href}, title, this._uri)

      this._response['render'] = (template, context) => Helper.render(template, context, this._insert)
      return this._route[href](content, this._response, this._request)
    }

    if (router && href !== pathname) {
      Ajax.get(url, (res, err) => this._verifyData(res, err, href, sessionStorage, history))
    }
  }

  /**
  * This method it's resposible of the capture state event and execute the route defined
  * @param  {Function} callback
  * @return {Function}
  */
  _stateEvent (callback) {
    window.addEventListener('popstate', event => {
      const href = (!event.state) ? '/' : event.state.href

      setTimeout(() => {
        Array.prototype
          .filter.call(document.querySelectorAll(`${this._target} a`), item => !item.hasAttribute('target'))
          .forEach(link => link.addEventListener('click', event => this._event(event, callback)))
      }, 500)

      const router = this._route.hasOwnProperty(href)
      const url = (href === '/' || href === '') ? '/' : href + this._engine

      const { sessionStorage, history } = window

      if (sessionStorage.hasOwnProperty(href) && router) {
        const { content, title } = JSON.parse(sessionStorage.getItem(href))

        document.title = title

        this._response['render'] = (template, context) => Helper.render(template, context, this._insert)
        return this._route[href](content, this._response, this._request)
      }

      if (router) Ajax.get(url, (res, err) => this.verifyData(res, err, href, sessionStorage, history))
    })
  }
}

/**
* @module Uri;
*/
export default Uri
