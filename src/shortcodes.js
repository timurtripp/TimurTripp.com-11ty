/**
 * @file Contains shortcodes.
 */

const
	readFileSync = require('fs').readFileSync,
	fg = require('fast-glob'),
	faBrands = require('@fortawesome/free-brands-svg-icons').fab,
	faSolids = require('@fortawesome/free-solid-svg-icons').fas,
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Constructs an SVG icon from a FontAwesome IconPack.
 * @param {import('@fortawesome/fontawesome-common-types').IconPack} iconPack The IconPack
 * @returns {string} The HTML code for the SVG icon
 */
function toIcon(iconPack) {
	if(iconPack)
		return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + iconPack.icon[0] + ' ' + iconPack.icon[1] + '"><path fill="currentColor" d="' + iconPack.icon[4] + '"/></svg>';
	return '';
}

/**
 * Constructs an SVG icon from the FontAwesome brand icon set.
 * @param {string} iconName The name of the icon
 * @returns {string} The HTML code for the SVG icon
 */
function faBrand(iconName) {
	return toIcon(faBrands['fa' + iconName]);
}

/**
 * Constructs an SVG icon from the FontAwesome solid icon set.
 * @param {string} iconName The name of the icon
 * @returns {string} The HTML code for the SVG icon
 */
function faSolid(iconName) {
	return toIcon(faSolids['fa' + iconName]);
}

/**
 * Shortcodes (can be called in templates)
 */
module.exports = {
	/**
	 * Merges multple JS or CSS files into a single aggregate file.
	 * @param {object[]} files The paths to the code files (files[x].path), or raw code (files[x].raw)
	 * @param {string} language The language (`JS` or `CSS`)
	 * @param {boolean} parse Whether or not to add comments or formatting to the returned code, or simply concatinate the files without adding anything
	 * @returns {string} The merged code
	 */
	mergeSource: function (files, language, parse) {
		const
			globalPreamble = parse ? '/*\n * Start of ' + language + '\n*/' : '',
			filePreamble = parse ? '\n\n\n/* file: %FILE% */\n\n' : '';
		let code = globalPreamble;
		if (files) {
			files.forEach((fileMatchingPath) => {
				if (fileMatchingPath.path)
					fg.sync(fileMatchingPath.path).forEach(filePath => code += filePreamble.replace('%FILE%', filePath) + readFileSync(filePath));
				else if (fileMatchingPath.raw)
					code += (parse ? '\n' : '') + fileMatchingPath.raw;
			});
		}
		return code;
	},

	/**
	 * Constructs an SVG brand icon for a social media site.
	 * @param {string} siteName The name of the social media site
	 * @returns {string} The HTML code for the SVG icon
	 */
	brandIcon: function(siteName) {
		let iconName = '';
		switch(siteName) { // The switch is here in case a special siteName -> faBrands icon name is needed (unlikely but possible)
			default:
				siteName.split(' ').forEach(word => iconName = iconName + word[0].toUpperCase() + word.substr(1).toLowerCase());
		}
		return faBrand(iconName);
	},

	faBrand: faBrand,

	faSolid: faSolid,

	dateFormatted: function(date) {
		const dateSplit = date.split('-');
		if (dateSplit.length == 3) // "2023-08-01" to "August 1, 2023"
			return months[parseInt(dateSplit[1]) - 1] + ' ' + parseInt(dateSplit[2]) + ', ' +  parseInt(dateSplit[0]);
		if (dateSplit.length == 2) // "2023-08" to "August 2023"
			return months[parseInt(dateSplit[1]) - 1] + ' ' + parseInt(dateSplit[0]);
		return date; // "2023" or other fallback
	}
};
