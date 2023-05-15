/**
 * @file Contains shortcodes.
 */

const
	readFileSync = require('fs').readFileSync,
	fg = require('fast-glob'),
	faBrands = require('@fortawesome/free-brands-svg-icons').fab,
	dataManager = require('./data-manager.js');

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
		const iconData = faBrands['fa' + iconName];
		if(iconData)
			return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + iconData.icon[0] + ' ' + iconData.icon[1] + '"><path fill="currentColor" d="' + iconData.icon[4] + '"/></svg>';
		return '';
	},

	termLabel: function(termId, collectionId, dictionary, itemIndex, items, globalRelationships) {
		return new dataManager.Term(termId, collectionId, dictionary, itemIndex, items, globalRelationships).label();
	},
	termSummary: function(termId, collectionId, dictionary, itemIndex, items, globalRelationships) {
		return new dataManager.Term(termId, collectionId, dictionary, itemIndex, items, globalRelationships).summary();
	},
	termPage: function(termId, collectionId, dictionary, itemIndex, items, globalRelationships) {
		return new dataManager.Term(termId, collectionId, dictionary, itemIndex, items, globalRelationships).page();
	},
	termList: function(termIds, collectionId, dictionary, itemIndex, items, globalRelationships) {
		return dataManager.termList(termIds, collectionId, dictionary, itemIndex, items, globalRelationships);
	}
};
