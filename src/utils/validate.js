/**
 * Created by QiuZi on 21/06/05.
 */

/**
 * @param {string} path
 * @returns {boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 *
 * @param {string} mobile
 */
export function validMobile (mobile) {
  return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(mobile)
}
