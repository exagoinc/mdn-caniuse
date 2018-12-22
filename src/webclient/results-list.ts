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
				display: flex;
				width: 100%;
				max-width: 960px;
				margin: auto;
			}
			.truncated-message {
				color: gray;
				font-style: italic;
			}
		`;
		this.shadowRoot.appendChild(style);

		this.resultsList = document.createElement("div");
		this.shadowRoot.appendChild(this.resultsList);
	}

	public setResults(results: SearchResult[]): void
	{
		this.resultsList.innerHTML = "";

		let truncated = false;
		if (results.length > 20)
		{
			results.length = 20;
			truncated = true;
		}

		for (let result of results)
		{
			if (!result.compatData.__compat.mdn_url)
				continue;
			
			const resultView = document.createElement("result-view") as ResultView;
			this.resultsList.appendChild(resultView);
			resultView.value = result;
		}

		if (truncated)
		{
			const truncatedMessage = document.createElement("p");
			truncatedMessage.className = "truncated-message";
			truncatedMessage.textContent = "Truncated results to 20 items";
			this.resultsList.appendChild(truncatedMessage);
		}
	}
}
customElements.define("results-list", ResultsList);