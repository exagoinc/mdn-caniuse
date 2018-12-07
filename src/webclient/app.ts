class App extends HTMLElement
{
	private mdnData: any;
	
	constructor() {
		super();

		this.attachShadow({mode: "open"});

		const input = document.createElement("input");
		input.type = "text";
		this.shadowRoot.appendChild(input);
	}

	public async init()
	{
		const response = await fetch("/mdn-data", {

		});

		if (!response.ok)
		{
			console.error(`Error fetching mdn data: ${response.status} ${response.statusText}`);
			return;
		}

		try
		{
			this.mdnData = await response.json();
		}
		catch
		{
			console.error(`Error fetching mdn data: ${await response.text()}`);
		}

		console.log(this.mdnData)
	}
}
customElements.define("x-app", App);

const app = document.getElementById("app") as App;
app.init();

