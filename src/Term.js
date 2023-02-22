const 
	nunjucks = require('nunjucks');

class Term {
	constructor(termId, collectionId, dictionary, dataIndex, globalRelationships) {
		this.termId = termId;
		this.collectionId = collectionId;
		this.dictionary = dictionary;
		this.collection = dictionary[collectionId];
		this.dataIndex = dataIndex;
		this.globalRelationships = globalRelationships;
		this.relationships = globalRelationships[collectionId][termId];
		this.meta = this.collection[termId] || { label: termId };
		if (collectionId != '_index')
			this.index = this.newTermFrom(collectionId, '_index');
	}
	newTermFrom(termId, collectionId) {
		return new Term(termId, collectionId, this.dictionary, this.dataIndex, this.globalRelationships);
	}
	termListFrom(termIds, collectionId) {
		return termList(termIds, collectionId, this.dictionary, this.dataIndex, this.globalRelationships);
	}
	label(renderAsLink = true) {
		return nunjucks.renderString('{% include "_includes/components/dictionary/term-label.njk" %}', { renderAsLink: renderAsLink, term: this });
	}
	description(summary = false) {
		return nunjucks.renderString('{% include "_includes/components/dictionary/term-description.njk" %}', { summary: summary, term: this });
	}
	summary() {
		return nunjucks.renderString('{% include "_includes/components/dictionary/term-summary.njk" %}', { term: this });
	}
	page() {
		return nunjucks.renderString('{% include "_includes/components/dictionary/term-page.njk" %}', { term: this });
	}
};

function termList(termIds, collectionId, dictionary, dataIndex, globalRelationships) {
	const terms = [];
	termIds.forEach(termId => terms.push(new Term(termId, collectionId, dictionary, dataIndex, globalRelationships)))
	return nunjucks.renderString('{% include "_includes/components/dictionary/term-list.njk" %}', { terms: terms });
}

module.exports = { Term: Term, termList: termList };
