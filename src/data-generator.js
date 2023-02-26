const
	fs = require('fs'),
	yaml = require('js-yaml'),
	paths = {
		'portfolio': '_data/portfolio/'
	};

module.exports = () => {
	const generated = {};
	for(const [pathName, pathSource] of Object.entries(paths)) {
		const 
			dictionary = yaml.load(fs.readFileSync(pathSource + 'dictionary.yml')),
			items = yaml.load(fs.readFileSync(pathSource + 'items.yml')),
			index = yaml.load(fs.readFileSync(pathSource + 'index.yml')),
			pathObject = {};
		for (const [dictionaryTermListingId, dictionaryTermListing] of Object.entries(dictionary)) {
			const inclusion = pathObject[dictionaryTermListingId] = {};
			for (const tid of Object.keys(dictionaryTermListing))
				inclusion[tid] = {items: {}, terms: {}};
			if (dictionaryTermListingId[0] === '_') continue;
			index.forEach(indexItem => {
				const dataListing = items[indexItem.id];
				for (const [dataItemId, dataItem] of Object.entries(dataListing)) {
					if(dataItem && dataItem['_' + dictionaryTermListingId]) {
						dataItem['_' + dictionaryTermListingId].forEach(tid => {
							if(inclusion[tid].items) {
								const dataItemterms = inclusion[tid].items[indexItem.id] || [];
								dataItemterms.push(dataItemId);
								inclusion[tid].items[indexItem.id] = dataItemterms;
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
						if(pathObject[descriptor.collection] && pathObject[descriptor.collection][descriptor.term]) {
							const termCollectionInclusion = pathObject[descriptor.collection][descriptor.term].terms[collectionid] || [];
							termCollectionInclusion.push(termid);
							pathObject[descriptor.collection][descriptor.term].terms[collectionid] = termCollectionInclusion;
						}
					});
				}
			}
		}
		generated[pathName] = pathObject;
	}
	fs.writeFile('_data/generated.json', JSON.stringify(generated), function (error) {
		if (error) console.error(error);
		else console.log('Successfully generated file `_data/generated.json`');
	});
};
