class ResultsProvider
{
	constructor(private compatData: any) { }

	public search(searchText: string): SearchResult[]
	{
		if (searchText === "")
			return [];
		
		const apiData = this.compatData.api;

		const results = [] as SearchResult[];
		for (let featureName in apiData)
		{
			const feature = apiData[featureName].__compat;
			
			if (featureName.toLowerCase().includes(searchText))
			{
				const result: SearchResult = {
					name: featureName
				};
				results.push(result);

				for (let browser of ["chrome", "chrome_android", "edge", "firefox", "safari", "safari_ios", "ie"])
				{
					let support = feature.support[browser];

					// No compatability data for this browser
					if (typeof support === "undefined")
						continue;

					if (typeof support.length === "undefined")
						support = [support];

					support = support[0];

					if (support.version_added != null)
					{
						result[browser] = true;
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
	chrome?: boolean;
	chrome_android?: boolean;
	edge?: boolean;
	firefox?: boolean;
	ie11?: boolean;
	safari?: boolean;
	safari_ios?: boolean;
}