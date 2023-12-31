/**
 * @file Contains Term and TermFactory.
 */

/**
 * The struct for a Term, used in the term rendering templates.
 */
class Term {

  /**
   * Constructs a Term.
   *
   * @param { string } termId
   *   The id of this particular term.
   * @param { string } collectionId
   *   The id of the collection this particular term belongs to.
   * @param { Object<string, Object<string, Object>> } dictionary
   *   The data from `dictionary.yml`.
   * @param { Object[] } itemIndex
   *   The data from `index.yml`.
   * @param { Object<string, Object<string, Object>> } items
   *   The data from `items.yml`.
   * @param { Object<string, Object<string, { items: string[], terms: string[] }>? } globalRelationships
   *   The data from `generated.json` (if it exists).
   */
  constructor(termId, collectionId, dictionary, itemIndex, items, globalRelationships) {
    this.termId = termId;
    this.collectionId = collectionId;
    this.dictionary = dictionary;
    this.collection = dictionary[collectionId];
    this.itemIndex = itemIndex;
    this.items = items;
    this.relationships = globalRelationships ? globalRelationships[collectionId][termId] : {};
    this.meta = this.collection[termId] || { label: termId };
    if (collectionId != '_index')
      this.index = new Term(collectionId, '_index', this.dictionary, this.itemIndex, this.items, globalRelationships);
  }
}


/**
 * The class for a TermFactory, used to create a single instance of the Term struct or a list of them.
 */
class TermFactory {

  /**
   * Constructs a TermFactory.
   *
   * @param { Object<string, Object<string, Object>> } dictionary
   *   The data from `dictionary.yml`.
   * @param { Object[] } itemIndex
   *   The data from `index.yml`.
   * @param { Object<string, Object<string, Object>> } items
   *   The data from `items.yml`.
   * @param { Object<string, Object<string, { items: string[], terms: string[] }>? } globalRelationships
   *   The data from `generated.json` (if it exists).
   */
  constructor(dictionary, itemIndex, items, globalRelationships) {
    this.dictionary = dictionary;
    this.itemIndex = itemIndex;
    this.items = items;
    this.globalRelationships = globalRelationships;
  }

  /**
   * Creates a Term from the specified term id and collection id.
   *
   * @param { string } termId
   *   The id of this particular term.
   * @param { string } collectionId
   *   The id of the collection this particular term belongs to.
   * @returns { Term }
   */
  createTerm(termId, collectionId) {
    return new Term(termId, collectionId, this.dictionary, this.itemIndex, this.items, this.globalRelationships);
  }

  /**
   * Creates a list of Term instances from the specified term ids and collection id.
   *
   * @param { string[] } termIds
   *   The ids of the terms in the list.
   * @param { string } collectionId
   *   The id of the collection this particular term list belongs to.
   * @returns { Term[] }
   */
  termList(termIds, collectionId) {
    const termList = [];
    termIds.forEach(termId => termList.push(this.createTerm(termId, collectionId)));
    return termList;
  }
}

module.exports = { TermFactory };
