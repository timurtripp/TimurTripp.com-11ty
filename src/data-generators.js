module.exports = {
	portfolio: function() {
		const
			fs = require('fs'),
			yaml = require('js-yaml'),
			dictionary = yaml.load(fs.readFileSync('_data/portfolio/dictionary.yml')),
			data = yaml.load(fs.readFileSync('_data/portfolio/data.yml')),
			index = yaml.load(fs.readFileSync('_data/portfolio/index.yml')),
			returnObject = {};
		for (const [dictionaryTermListingId, dictionaryTermListing] of Object.entries(dictionary)) {
			const inclusion = returnObject[dictionaryTermListingId] = {};
			for (const tid of Object.keys(dictionaryTermListing))
				inclusion[tid] = {dataInclusion: {}, termInclusion: {}};
			if (dictionaryTermListingId[0] === '_') continue;
			index.forEach(indexItem => {
				const dataListing = data[indexItem.id];
				for (const [dataItemId, dataItem] of Object.entries(dataListing)) {
					if(dataItem && dataItem['_' + dictionaryTermListingId]) {
						dataItem['_' + dictionaryTermListingId].forEach(tid => {
							if(inclusion[tid].dataInclusion) {
								const dataItemTermInclusion = inclusion[tid].dataInclusion[indexItem.id] || [];
								dataItemTermInclusion.push(dataItemId);
								inclusion[tid].dataInclusion[indexItem.id] = dataItemTermInclusion;
							}
						})
					}
				}
			});
		}
		for (const [collectionid, collection] of Object.entries(dictionary)) {
			for (const [termid, term] of Object.entries(collection)) {
				if(term.descriptors) {
					term.descriptors.forEach(descriptor => {
						if(returnObject[descriptor.collection] && returnObject[descriptor.collection][descriptor.term]) {
							const termCollectionInclusion = returnObject[descriptor.collection][descriptor.term].termInclusion[collectionid] || [];
							termCollectionInclusion.push(termid);
							returnObject[descriptor.collection][descriptor.term].termInclusion[collectionid] = termCollectionInclusion;
						}
					});
				}
			}
		}
		return returnObject;
	}
};
