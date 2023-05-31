import express from "express";
import bodyParser from "body-parser";
import * as url from 'url';
import {writeFile} from "fs";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => res.render("index"));

app.post("/signup", (req, res) => {
	
	const fullName = req.body.fullName;

	if(!fullName || fullName.length <= 2)
	{
		res.redirect("/");
	}

	res.render("signup", { fullName })
});

function writeToFile(fileName, json) {
	writeFile(fileName, JSON.stringify(json), ()=>{});
}

function isValidUser(user) {
	if(user.userName.length < 4 || user.userName.length > 8) return false;

	if(user.email.indexOf("@") == -1) return false;

	if(user.password.length < 5 || user.password > 10 || user.password.indexOf("$") == -1) return false;

	return true;
}

app.post("/home", (req, res) => {

	let user = req.body;

	if(!isValidUser(user))
	{
		res.redirect("/");
	}

	writeToFile("user-"+user.userName+".json", user);

	res.render("home", user);
});

app.listen(5555, ()=> {
	console.log("[HOST] http://localhost:5555");
})