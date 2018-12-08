class ResultsList extends HTMLElement
{
	private resultsList: HTMLElement;
	
	constructor()
	{
		super();

		this.attachShadow({mode: "open"});

		const style = document.createElement("style");
		style.textContent = `
			:host {
				display: block;
				height: 200px;
				width: 100%;
				max-width: 960px;
				margin: auto;
			}
		`;
		this.shadowRoot.appendChild(style);

		this.resultsList = document.createElement("div");
		this.shadowRoot.appendChild(this.resultsList);
	}

	public setResults(results: SearchResult[]): void
	{
		this.resultsList.innerHTML = "";
		
		for (let result of results)
		{
			const resultView = document.createElement("result-view") as ResultView;
			this.resultsList.appendChild(resultView);
			resultView.value = result;
		}
	}
}
customElements.define("results-list", ResultsList);