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
			}
			.grid {
				display: grid;
				justify-items: center;
			}
			.title-row {
				grid-column: 1 / -1;
				text-align: center;
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
		this.resultBox.style.gridTemplateColumns = `repeat(${Object.keys(App.browsers).length}, 50px)`;

		const titleRow = document.createElement("div");
		titleRow.className = "title-row";
		titleRow.textContent = this.result.name;
		this.resultBox.appendChild(titleRow);

		for (let browser in App.browsers)
		{
			const browserIcon = document.createElement("img");
			browserIcon.src = `images/${browser}.svg`;
			this.resultBox.appendChild(browserIcon);
		}

		for (let browser in App.browsers)
		{
			const browserSupport = document.createElement("div");
			const support = this.result.compatData.__compat.support;

			if (!support[browser])
			{
				browserSupport.textContent = "no";
			}
			else
			{
				const singleSupport = (Array.isArray(support[browser]) ? support[browser][0] : support[browser]) as SimpleSupportStatement;
				
				if (singleSupport.version_added == null)
				{
					browserSupport.textContent = "?";
				}
				else if (typeof singleSupport.version_added === "string")
				{
					browserSupport.textContent = singleSupport.version_added;
				}
				else if (typeof singleSupport.version_added === "boolean")
				{
					browserSupport.textContent = "yes";
				}
				else
				{
					throw "Unhandled value for version_added";
				}
			}

			this.resultBox.appendChild(browserSupport);
		}
	}
}
customElements.define("result-view", ResultView);