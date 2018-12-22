class App extends HTMLElement
{
	public static browsers: Browsers;
	private resultsProvider: ResultsProvider;
	private searchBox: SearchInput;
	
	constructor()
	{
		super();

		this.attachShadow({mode: "open"});

		this.searchBox = document.createElement("search-input") as SearchInput;
		this.shadowRoot.appendChild(this.searchBox);
		const resultsList = document.createElement("results-list") as ResultsList;
		this.shadowRoot.appendChild(resultsList);

		const style = document.createElement("style");
		style.textContent = `
			:host {
				font-family: Roboto, sans-serif;
			}
		`;
		this.shadowRoot.appendChild(style);

		this.searchBox.addEventListener("change", (evt: CustomEvent) => {
			resultsList.setResults(this.resultsProvider.search(evt.detail));
		});
	}

	public connectedCallback()
	{
		this.searchBox.focus();
	}

	public async init()
	{
		const response = await fetch("/mdn-data", {});

		if (!response.ok)
		{
			console.error(`Error fetching mdn data: ${response.status} ${response.statusText}`);
			return;
		}

		let mdnData: any;
		try
		{
			mdnData = await response.json();
		}
		catch
		{
			console.error(`Error fetching mdn data: ${await response.text()}`);
		}

		console.log(mdnData)
		this.resultsProvider = new ResultsProvider(mdnData);
		App.browsers = mdnData.browsers;
	}
}
customElements.define("x-app", App);

const app = document.getElementById("app") as App;
app.init();

