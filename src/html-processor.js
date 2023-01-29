const cheerio = require('cheerio'), htmlMinifier = require('html-minifier');

module.exports = {
	/**
	 * Performs transformations on HTML, enabling things like an auto-generated single-page navigation based on the headings found on the page.
	 * @param {string} content The original HTML
	 * @returns The transformed HTML
	 */
	htmltransform: content => {
		const $ = cheerio.load(content);
		let h2Index = 0;
		$('h2').each(function(index, e) {
			const element = $(e), id = e.attribs.id || (element.text().toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9_\-]/g, '') + '-' + (++h2Index));
			if (id) {
				e.attribs.id = id;
				element.append('<a href="#' + id + '"><span class="visually-hidden">Jump to heading</span> <span aria-hidden="true">#</span></a>');
			}
		});
		return $.html();
	},

	/** 
	 * Minifies HTML code.
	 * @param {string} content The original HTML
	 * @return The minified HTML
	 */
	htmlmin: content => htmlMinifier.minify(content, {
		useShortDoctype: true,
		removeComments: true,
		collapseWhitespace: false
	})
};
