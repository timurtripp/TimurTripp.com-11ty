const nunjucks = require('nunjucks');

class Term {
	constructor(termId, collectionId, dictionary, itemIndex, globalRelationships) {
		this.termId = termId;
		this.collectionId = collectionId;
		this.dictionary = dictionary;
		this.collection = dictionary[collectionId];
		this.itemIndex = itemIndex;
		this.globalRelationships = globalRelationships;
		this.relationships = globalRelationships[collectionId][termId];
		this.meta = this.collection[termId] || { label: termId };
		if (collectionId != '_index')
			this.index = this.termFrom(collectionId, '_index');
	}
	termFrom(termId, collectionId) {
		return new Term(termId, collectionId, this.dictionary, this.itemIndex, this.globalRelationships);
	}
	termListFrom(termIds, collectionId) {
		return termList(termIds, collectionId, this.dictionary, this.itemIndex, this.globalRelationships);
	}
	label(asLink = true) {
		return nunjucks.renderString('{% include "_includes/components/dictionary/term-label.njk" %}', { asLink: asLink, term: this });
	}
	description(asSummary = true) {
		return nunjucks.renderString('{% include "_includes/components/dictionary/term-description.njk" %}', { asSummary: asSummary, term: this });
	}
	summary() {
		return nunjucks.renderString('{% include "_includes/components/dictionary/term-summary.njk" %}', { term: this });
	}
	page() {
		return nunjucks.renderString('{% include "_includes/components/dictionary/term-page.njk" %}', { term: this });
	}
	toString() {
		return this.summary();
	}
};

function termList(termIds, collectionId, dictionary, itemIndex, globalRelationships) {
	const terms = [];
	termIds.forEach(termId => terms.push(new Term(termId, collectionId, dictionary, itemIndex, globalRelationships)))
	return nunjucks.renderString('{% include "_includes/components/dictionary/term-list.njk" %}', { terms: terms });
}

module.exports = { Term: Term, termList: termList };
