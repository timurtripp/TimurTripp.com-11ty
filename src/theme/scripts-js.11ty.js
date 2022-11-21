/**
 * @file Outputs `/assets/theme/scripts.js`.
 */

module.exports.data = {
	layout: 'layouts/js.njk',
	filename: 'scripts.js',
	permalink: data => '/assets/theme/' + data.filename
};
