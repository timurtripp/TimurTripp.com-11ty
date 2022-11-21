/**
 * @file Contains passthrough file copy source -> destination mappings.
 */

const bootstrapVersion = require('../_data/bootstrapVersion.js');

/**
 * Passthrough file copy source -> destination mappings
 */
module.exports = {
	// Static asset passthrough
	'assets': 'assets',

	// Passthrough of fonts
	'node_modules/@fontsource/eb-garamond/files/*all-400-*.woff': 'assets/theme/fonts/files',
	'node_modules/@fontsource/eb-garamond/files/*latin-400-*.woff2': 'assets/theme/fonts/files',
	'node_modules/@fontsource/eb-garamond/files/*latin-ext-400-*.woff2': 'assets/theme/fonts/files',
	'node_modules/@fontsource/eb-garamond/files/*cyrillic-400-*.woff2': 'assets/theme/fonts/files',
	'node_modules/@fontsource/eb-garamond/files/*all-700-*.woff': 'assets/theme/fonts/files',
	'node_modules/@fontsource/eb-garamond/files/*latin-700-*.woff2': 'assets/theme/fonts/files',
	'node_modules/@fontsource/eb-garamond/files/*latin-ext-700-*.woff2': 'assets/theme/fonts/files',
	'node_modules/@fontsource/eb-garamond/files/*cyrillic-700-*.woff2': 'assets/theme/fonts/files',

	// Passthrough of Bootstrap files 
	'node_modules/bootstrap/dist/js/bootstrap.min.js': 'assets/theme/bootstrap/' + bootstrapVersion + '/bootstrap.min.js',
	'node_modules/bootstrap/dist/js/bootstrap.min.js.map': 'assets/theme/bootstrap/' + bootstrapVersion + '/bootstrap.min.js.map',
	'node_modules/bootstrap/dist/css/bootstrap.min.css': 'assets/theme/bootstrap/' + bootstrapVersion + '/bootstrap.min.css',
	'node_modules/bootstrap/dist/css/bootstrap.min.css.map': 'assets/theme/bootstrap/' + bootstrapVersion + '/bootstrap.min.css.map',

	// Passthrough of syntax highlighting CSS
	'node_modules/prismjs-vs/dist/prism-vs-light.css': 'assets/theme/syntax/prism-vs-light.css',
	'node_modules/prismjs-vs/dist/prism-vs-dark.css': 'assets/theme/syntax/prism-vs-dark.css'
};
