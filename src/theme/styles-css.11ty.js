/**
 * @file Outputs `/assets/theme/styles.css`.
 */

module.exports.data = {
	layout: 'layouts/css.njk',
	filename: 'styles.css',
	permalink: data => '/assets/theme/' + data.filename
};
