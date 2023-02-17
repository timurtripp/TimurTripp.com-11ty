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
			if (dictionaryTermListingId[0] == '_') continue;
			const inclusion = returnObject[dictionaryTermListingId] = {};
			for (const tid of Object.keys(dictionaryTermListing))
				inclusion[tid] = {};
			index.forEach(indexItem => {
				const dataListing = data[indexItem.id];
				for (const [dataItemId, dataItem] of Object.entries(dataListing)) {
					if(dataItem && dataItem['_' + dictionaryTermListingId]) {
						dataItem['_' + dictionaryTermListingId].forEach(tid => {
							if(inclusion[tid]) {
								const dataItemTermInclusion = inclusion[tid][indexItem.id] || [];
								dataItemTermInclusion.push(dataItemId);
								inclusion[tid][indexItem.id] = dataItemTermInclusion;
							}
						})
					}
				}
			});
		}
		return returnObject;
	}
};
