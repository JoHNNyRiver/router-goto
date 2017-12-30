import Uri from './lib/Uri.class.js'
import Helper from './helpers/helper.class.js'

/**
* Class represents the initial application router
* this instance will make the magic happens
* @class
* @author  João Ribeiro <jlribeiroaugusto@gmail.com>
*/

class Router {
  /**
  * init and set the propertys necessary for this libary
  * @constructor
  * @property {object} _route - the object to store the request ans exectutation the callback
  * @property {object} _request - store the param of exist in goTo method
  * @property {objectt} _response - store the response of the request end method render
  */
  constructor () {
    this._route = {}
    this._request = {}
    this._response = {}
    this._links = [...document.querySelectorAll('a')].filter(item => !item.hasAttribute('target'))

    this.config({})
  }

  /**
  * @return {string} return the href
  */
  _linkHref () {
    let links = null

    this._links.forEach(link => {
      links = link.getAttribute('href')
    })

    return links
  }

  /**
  * @param  {String} the target to defined per default like body
  * @param  {string} the string defined if 404 heppen init value it's null
  * @param  {Boolean} if true the goTo method be executed on click event
  */
  config ({target = 'body', notfound = null, insert = 'body', engine = '.html'}) {
    this._target = target
    this._notFound = notfound
    this._engine = engine
    this._insert = insert
  }

  /**
  * @param  {String} the uri informed
  * @param  {Function} the callback function
  */
  goTo (uri, callback) {
    const treatedUri = Helper.verifyUri(uri, this._linkHref())
    const url = uri.replace(/^\/:.+\w$/gim, '')

    this._request['param'] = treatedUri
    this._response['style'] = (element, object) => Helper.style(element, object)
    this._route[url] = callback

    const AuxRouter = new Uri(url, this._route, this._engine, this._notFound, this._target, this._response, this._insert)

    this._links
      .filter(item => !item.hasAttribute('target'))
      .forEach(link => link.addEventListener('click', event => AuxRouter._event(event)))
  }
}

/**
* @module Router
*/
export default Router
