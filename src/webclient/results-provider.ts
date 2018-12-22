class ResultsProvider
{
	constructor(private compatData: CompatData)
	{
	}

	public search(searchText: string): SearchResult[]
	{
		if (searchText === "")
			return [];
		
		const apiData = this.compatData.api;

		const results = [] as SearchResult[];
		for (let featureName in apiData)
		{
			const feature = (apiData[featureName] as Identifier).__compat;
			
			if (featureName.toLowerCase().includes(searchText))
			{
				const result: SearchResult = {
					name: featureName,
					support: [],
				};
				results.push(result);

				for (let browser in this.compatData.browsers)
				{
					let support = feature.support[browser];

					// No compatability data for this browser
					if (typeof support === "undefined")
					{
						result.support.push({ browser: browser as BrowserNames, supported: null });
						continue;
					}

					if (typeof support.length === "undefined")
						support = [support];

					support = support[0];

					if (support.version_added != null)
					{
						result.support.push({ browser: browser as BrowserNames, supported: true });
					}
					else
					{
						result.support.push({ browser: browser as BrowserNames, supported: false });
					}
				}
			}
		}

		return results;
	}
}

interface SearchResult
{
	name: string;
	support: SearchResultSupport[];
}

interface SearchResultSupport
{
	browser: BrowserNames;
	supported: boolean;
}