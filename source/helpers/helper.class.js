
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
    if (this instanceof Helper) throw new Error('This class can\'t be instanced')
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
   * @return {object} this class
   */
  static render (template, context, insert) {
    if (typeof Mustache === 'undefined') {
      const err = new Error('This application needs of Mustache library. Please, includes the library to continue')
      throw err.message
    }

    const html = Mustache.to_html(template, context)
    document.querySelector(insert).innerHTML = html
    return this
  }
}

export default Helper
