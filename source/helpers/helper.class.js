/**
 * If instanced will throw an error
 * @class
 */
class Helper {
  /**
  * will throw an error if instanced
  * @constructor
  */
  constructor () {
    if (this instanceof Helper) {
      throw new Error('This class can\'t be instanced')
    }
  }

  /**
  * @param  {String} verify if uri don't contains parameter
  * @param  {uri} replaces uri if contains parameters in uri
  * @return {string} return string treadted
  */
  static verifyUri (uri, link) {
    const newUri = uri.replace(/\//g, '').split(':')
    const linkArray = link.split('/')

    const regexp = /:\w+/gmi
    const total = newUri.length - 1
    const param = {}

    linkArray.splice(0, linkArray.length - total)
    newUri.shift()

    if (regexp.test(uri)) {
      linkArray.forEach((item, index) => {
        param[newUri[index]] = linkArray[index]
      })

      return param
    }
  }

  /**
   * @param  {strin} get the string returned of the route
   * @param  {object} get the context defined by user
   * @param  {elemnt} insert the return of Mustache lib the element defined by user
   * @return {object} return this class (chain method)
   */
  static render (template, context, insert) {
    if (typeof Mustache === 'undefined') {
      const err = new Error('This application needs of Mustache library. Please, includes the library to continue')
      throw err.message
    }

    const html = window.Mustache.to_html(template, context)
    document.querySelector(insert).innerHTML = html
    return this
  }

  /**
   * This Method help at do style on element more simple en routes defined
   * @param  {string} element take the string adn includes on method querySelector
   * @param  {object} object  take the definition of the styles en transform in array
   * @return {object} return the Helper class (chain method)
   */
  static style (element, object) {
    const objectToArrayKeys = Object.keys(object)
    const objectToArrayValue = Object.values(object)

    objectToArrayKeys.forEach((item, index) => {
      document.querySelector(element).style[item] = objectToArrayValue[index]
    })

    return this
  }
}

/**
* @module Helper
*/
export default Helper
