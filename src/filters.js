/**
 * @file Contains filters.
 */

const
	DateTime = require('luxon').DateTime, 
	CleanCSS = require('clean-css'),
	terser = require('terser');

/**
 * Filters (can be called in templates)
 */
module.exports = {
	/**
	 * Date formatting (human readable)
	 * @param {Date} dateObj The date
	 * @returns {string} The human-readable date
	 */
	readableDate: dateObj => DateTime.fromJSDate(dateObj).toFormat('dd LLL yyyy'),

	/**
	 * Date formatting (machine readable)
	 * @param {Date} dateObj The date
	 * @returns {string} The machine-readable date
	 */
	machineDate: dateObj => DateTime.fromJSDate(dateObj).toFormat('yyyy-MM-dd'),

	/**
	 * Minifies JS code.
	 * @param {string} code The original JS
	 * @returns The minified JS (or the original JS if an error occured)
	 */
	jsmin: async function (code) {
		const minified = await terser.minify(code);
		if (minified.error) {
			console.log('Terser error: ', minified.error);
			return code;
		}
		return minified.code;
	},

	/**
	 * Minifies CSS code.
	 * @param {string} code The original CSS
	 * @returns {string} The minified CSS
	 */
	cssmin: code => new CleanCSS({}).minify(code).styles,

	/**
	 * Formats text as a CSS class name.
	 * @param {string} text The original text
	 * @returns {string} The text converted to a CSS class name
	 */
	classify: text => text.toLowerCase().replace(/ /g, '-').replace(/\./g, ''),

	/**
	 * Converts an object to an array of its keys.
	 * @param {object} object 
	 * @returns The array of the object's keys.
	 */
	keys: object => Object.keys(object),

	/**
	 * Selects only the allowed keys of an object.
	 * @param {object} object 
	 * @param {string[]} allowedKeys The allowed keys.
	 * @returns A copy of the object with only the allowed keys included.
	 */
	selectkeys: (object, allowedKeys) => Object.keys(object).filter(key => (allowedKeys || []).includes(key)).reduce((newObject, key) => { newObject[key] = object[key]; return newObject }, {}),

	min: array => Math.min(...array),
	max: array => Math.max(...array)
};
