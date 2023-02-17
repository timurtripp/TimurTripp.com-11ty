/**
 * @file Contains the configuration for Eleventy.
 */

require('dotenv').config();
const 
	fs = require('fs'),
	yaml = require('js-yaml'),
	htmlProcessor = require('./src/html-processor.js'),
	generatedDataPath = './_data/generated/';

module.exports = (eleventyConfig) => {
	// Run data generators
	if(!(fs.existsSync(generatedDataPath) && fs.lstatSync(generatedDataPath).isDirectory()))
		fs.mkdirSync(generatedDataPath);
	for(const [name, operation] of Object.entries(require('./src/data-generators.js')))
		fs.writeFileSync(generatedDataPath + name + '.json', JSON.stringify(operation()));

	// Enables support for YAML in place of JSON
	eleventyConfig.addDataExtension('yml', contents => yaml.load(contents));

	// Adds filters
	for(const [name, operation] of Object.entries(require('./src/filters.js')))
		eleventyConfig.addFilter(name, operation);

	// Adds shortcodes
	for(const [name, operation] of Object.entries(require('./src/shortcodes.js')))
		eleventyConfig.addShortcode(name, operation);

	// Transforms HTML output
	eleventyConfig.addTransform('htmltransform', function (content, outputPath) {
		if (outputPath && outputPath.indexOf('.html') > -1)
			return htmlProcessor.htmltransform(content);
		return content;
	});

	// Minfies HTML output
	eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
		if (outputPath && outputPath.indexOf('.html') > -1)
			return htmlProcessor.htmlmin(content);
		return content;
	});

	// Static asset passthrough
	for(const [source, destination] of Object.entries(require('./src/passthrough.js'))) {
		const passthrough = {};
		passthrough[source] = destination;
		eleventyConfig.addPassthroughCopy(passthrough);
	}

	// Markdown plugins
	eleventyConfig.setLibrary('md', require('markdown-it')({
		html: true,
		breaks: false,
		linkify: false
	}).use(require('markdown-it-anchor'), { permalink: false }));

	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));

	return {
		templateFormats: ['md', 'njk', '11ty.js'],
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dir: {
			input: '.',
			includes: '_includes',
			data: '_data',
			output: '_site'
		}
	};
};
