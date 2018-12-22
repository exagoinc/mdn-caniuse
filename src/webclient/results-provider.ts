class ResultsProvider
{
	constructor(private compatData: CompatData)
	{
	}

	public search(searchText: string): SearchResult[]
	{
		if (searchText === "")
			return [];

		const results = this.getResults(searchText, null, this.compatData);

		return results.sort((a, b) => {
			return a.name.length < b.name.length ? -1 : a.name.length > b.name.length ? 1 : 0;
		});
	}

	private getResults(searchText: string, nodeName: string, data: any): SearchResult[]
	{
		if (typeof data !== "object")
			return [];
		
		let results = [] as SearchResult[];

		if ("__compat" in data)
		{
			if (nodeName.toLowerCase().includes(searchText))
			{
				return [{ name: nodeName, compatData: data }];
			}
		}
		
		for (let key in data)
		{
			if (key === "__compat")
				continue;
			
			results = results.concat(this.getResults(searchText, key, data[key]));
		}

		return results;
	}
}

interface SearchResult
{
	name: string;
	compatData: Identifier;
}