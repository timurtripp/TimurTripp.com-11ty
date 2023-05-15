class TermFactory {
	constructor(dictionary, itemIndex, items, globalRelationships) {
		this.dictionary = dictionary;
		this.itemIndex = itemIndex;
		this.items = items;
		this.globalRelationships = globalRelationships;
	}
	createTerm(termId, collectionId) {
		return new Term(termId, collectionId, this.dictionary, this.itemIndex, this.items, this.globalRelationships);
	}
	termList(termIds, collectionId) {
		const termList = [];
		termIds.forEach(termId => termList.push(this.createTerm(termId, collectionId)));
		return termList;
	}
}

class Term {
	constructor(termId, collectionId, dictionary, itemIndex, items, globalRelationships) {
		this.termId = termId;
		this.collectionId = collectionId;
		this.dictionary = dictionary;
		this.collection = dictionary[collectionId];
		this.itemIndex = itemIndex;
		this.items = items;
		this.globalRelationships = globalRelationships;
		this.relationships = globalRelationships[collectionId][termId];
		this.meta = this.collection[termId] || { label: termId };
		if (collectionId != '_index')
			this.index = new Term(collectionId, '_index', this.dictionary, this.itemIndex, this.items, this.globalRelationships);
	}
}

module.exports = { TermFactory };
