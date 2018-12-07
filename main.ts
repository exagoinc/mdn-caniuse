import * as mdnData from "mdn-browser-compat-data";
import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import bodyParser from "body-parser";
import expressHandlebars from "express-handlebars";

const handlebars = expressHandlebars.create();


// Let the process crash on unhandled promises
process.on('unhandledRejection', err => { throw err; });

// Load configuration settings from the .env file in the same directory as this script
dotenv.config();

const app = express();
app.use(compression());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.text());


// The route handler for when the user requests '/'
// Run handlebars on index.handlebars and respond with the output HTML
app.get("/", async (req, res, next) => {
	const html = await handlebars.render("index.handlebars", {
		exago_jsapi_url: process.env.EXAGO_WEB_URL + "WrScriptResource.axd?s=ExagoApi",
		exago_web_url: process.env.EXAGO_WEB_URL
	});

	res.send(html);
});

// Start the webserver
app.listen(process.env.PORT || 8080, () => {
	console.log(`Listening at port ${process.env.PORT}`);
});
