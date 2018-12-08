class ResultView extends HTMLElement
{
	private result: SearchResult;
	private resultBox: HTMLElement;
	
	constructor()
	{
		super();

		this.attachShadow({mode: "open"});

		const style = document.createElement("style");
		style.textContent = `
			:host {
				display: block;
				width: 300px;
			}
			.grid {
				display: grid;
				grid-template-columns: repeat(7, 50px);
			}
			.title-row {
				grid-column: 1 / span 7;
			}
		`;
		this.shadowRoot.appendChild(style);

		this.resultBox = document.createElement("div");
		this.resultBox.className = "grid";
		this.shadowRoot.appendChild(this.resultBox);
	}

	public set value(result: SearchResult)
	{
		this.result = result;

		const titleRow = document.createElement("div");
		titleRow.className = "title-row";
		titleRow.textContent = this.result.name;
		this.resultBox.appendChild(titleRow);

		for (let browser of ["chrome", "chrome_android", "edge", "firefox", "safari", "safari_ios", "ie"])
		{
			const browserIcon = document.createElement("img");
			browserIcon.src = `images/${browser}.svg`;
			this.resultBox.appendChild(browserIcon);
		}

		for (let browser of ["chrome", "chrome_android", "edge", "firefox", "safari", "safari_ios", "ie"])
		{
			const browserSupport = document.createElement("div");
			browserSupport.textContent = this.result[browser] ? "yes" : "no";
			this.resultBox.appendChild(browserSupport);
		}
	}
}
customElements.define("result-view", ResultView);