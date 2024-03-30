const package = require('../package.json');
const { TermFactory } = require('../src/term.js');

const termTitle = (data) => {
	const
		dictionary = data[data.termroot].dictionary,
		termDefinition = dictionary[data.termcategoryid][data.termid],
		indexDefinition = dictionary._index[data.termcategoryid];
	return (indexDefinition ? indexDefinition.label + ': ' : '') + termDefinition.label;
}

const pageTitle = (data) => data.isDeveloperPage ? data.page.filePathStem.substr(1) + ' (Source Project for Developers)' : data.termid ? termTitle(data) : data.title

module.exports = {
	isDeveloperPage: data => data.page.inputPath.indexOf('/README') > -1 || data.page.inputPath.indexOf('/LICENSE') > -1 || data.page.inputPath.indexOf('/TEST') > -1,
	name: data => data.metadata.name || package.name,
  pageTitle: pageTitle,
	siteTitle: data => {
		const title = pageTitle(data);
		return (title ? title + ' | '  : '') + data.name;
	},
	author: data => data.author || data.metadata.author || package.author,
	description: data => data.description || data.metadata.description || package.description,
	keywords: data => new Set([...data.keywords, ...data.metadata.keywords, ...package.keywords]),
	version: data => data.metadata.version || package.version,
	license: data => data.metadata.license || package.license,
	noIndex: data => data.noIndex || data.isDeveloperPage,
	permalink: data => data.isDeveloperPage ? data.page.inputPath + '/' : data.permalink,
	termFactory: data => (dictionary, index, items, relationships) => new TermFactory(dictionary, index, items, relationships)
};
