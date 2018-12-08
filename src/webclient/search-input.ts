class SearchInput extends HTMLElement
{
	private input: HTMLInputElement;
	
	constructor()
	{
		super();

		this.attachShadow({mode: "open"});

		this.input = document.createElement("input");
		this.input.type = "search";
		this.shadowRoot.appendChild(this.input);

		const style = document.createElement("style");
		style.textContent = `
			input[type='search'] {
				display: block;
				margin: auto;
				outline: none;
			}
			input[type='search']:focus {
				border: 1px solid black;
			}
		`;
		this.shadowRoot.appendChild(style);

		this.input.addEventListener("keydown", () =>
		{
			requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => {
				const searchText = this.input.value;
				this.fireOnChangeEvent(searchText);
			})));
		});
	}

	public focus(): void
	{
		this.input.focus();
	}

	private fireOnChangeEvent(searchText: string): void
	{
		const e = new CustomEvent("change", {bubbles: false, detail: searchText});
    	this.dispatchEvent(e);
	}
}
customElements.define("search-input", SearchInput);
