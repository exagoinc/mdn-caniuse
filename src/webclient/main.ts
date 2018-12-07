class App
{
	private mdnData: any;
	
	constructor() { }

	private async Init()
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

const app = new App();
app.Init()