/**
* utils.js
* @author Christopher Smith
* @description Utility functions that can be used throughout the application
* @created 2020-05-09T11:09:45.412Z-07:00
* @last-modified 2020-05-09T11:11:11.505Z-07:00
*/


// ----------------------------------------------------

/**
 * Generate a random id of specified length. Characters include all lowercase letters, and digits
 *
 * @param {number} length The length of the id we want to generate
 */
export function makeId(length) {
  let result = '';
  let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i=0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
