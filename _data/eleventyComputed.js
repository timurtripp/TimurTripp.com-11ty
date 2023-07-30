const package = require('../package.json');
const { TermFactory } = require('../src/term.js');

function termTitle(data) {
	const
		dictionary = data[data.termroot].dictionary,
		termDefinition = dictionary[data.termcategoryid][data.termid],
		indexDefinition = dictionary._index[data.termcategoryid];
	return (indexDefinition ? indexDefinition.label + ': ' : '') + termDefinition.label;
}

module.exports = {
	isDeveloperPage: data => data.page.inputPath.indexOf('/README') > -1 || data.page.inputPath.indexOf('/LICENSE') > -1 || data.page.inputPath.indexOf('/TEST') > -1,
	name: data => data.site.name || package.name,
	title: data => {
		const pageTitle = data.isDeveloperPage ? data.page.filePathStem.substr(1) + ' (Source Project for Developers)' : data.termid ? termTitle(data) : data.title;
		return (pageTitle ? pageTitle + ' | '  : '') + data.name;
	},
	author: data => data.author || data.site.author || package.author,
	description: data => data.description || data.site.description || package.description,
	keywords: data => new Set([...data.keywords, ...data.site.keywords, ...package.keywords]),
	version: data => data.site.version || package.version,
	license: data => data.site.license || package.license,
	noIndex: data => data.noIndex || data.isDeveloperPage,
	permalink: data => data.isDeveloperPage ? data.page.inputPath + '/' : data.permalink,
	termFactory: data => (dictionary, index, items, relationships) => new TermFactory(dictionary, index, items, relationships)
};
