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
			:host {
				margin-top: 20px;
				display: block;
			}	
			input[type='search'] {
				display: block;
				margin: auto;
				outline: none;
				border: none;
				box-shadow: 0 0 2px 1px rgba(0,0,0,.2);
				box-sizing: border-box;
				height: 40px;
				width: 90%;
				max-width: 400px;
				font-size: 20px;
				padding: 0 14px;
				border-radius: 5px;
				cursor: pointer;
				transition: all .2s ease-out;
			}
			input[type='search']:focus {
				cursor: text;
				box-shadow: 0 2px 7px 2px rgba(0,0,0,.2);
				transform: translateY(-2px);
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
