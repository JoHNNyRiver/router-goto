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
  * @constructs
  * @property {object} _links - NodeList of hypelinks
  */
  constructor () {
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

    const request = {}
    const response = {}

    request['param'] = treatedUri
    response['style'] = (element, object) => Helper.style(element, object)

    const AuxRouter = new Uri(url, this._engine, this._notFound, this._target, response, this._insert, callback)

    AuxRouter.stateEvent(callback)

    this._links
      .forEach(link => link.addEventListener('click', event => AuxRouter._event(event, callback)))
  }
}

/**
* @module Router
*/
export default Router
