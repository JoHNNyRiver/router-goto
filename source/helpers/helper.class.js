/**
 * If instanced will throw an error
 * @class
 */
class Helper {
  /**
  * will throw an error if instanced
  * @constructs
  */
  constructor () {
    if (this instanceof Helper) {
      throw new Error('This class can\'t be instanced')
    }
  }

  /**
   * @param  {strin} get the string returned of the route
   * @param  {object} get the context defined by user
   * @param  {elemnt} insert the return of Mustache lib the element defined by user
   * @return {object} return this class (chain method)
   */
  static render (template, context, insert) {
    const html = Mustache.to_html(template, context)
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
