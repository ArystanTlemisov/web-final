const express = require("express")
const app = express();
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'));
app.use(express.static("public"))

let items = []
let workList = []
app.get("/", function(req, res){
  res.render("index", {winner:"none", results:"",team1:"", team2:"", goal1:"", goal2:"", error:""})
})



app.get("/about", function(req, res){
  res.sendfile("views/aboutus.html")
})

let team1 = []
let team2 = []
let arr = []
let goals = []
combination = []
app.post("/get_winner", function(req, res){

	console.log("TEAM #1:")
	text=req.body.team1area
	team1 = text.split("\r\n") 
	for (var i = 0; i < team1.length; i++) {
		team1[i] = team1[i].trim()
	}
	team1.forEach(member => console.log(member))


	console.log("TEAM #2:")
	text2=req.body.team2area
	team2 = text2.split("\r\n")
	for (var i = 0; i < team2.length; i++) {
		team2[i] = team2[i].trim()
	}
	team2.forEach(member => console.log(member))

	n = req.body.team1goal
    m = req.body.team2goal

    if (parseInt(n) + parseInt(m) > 7) {
    	console.log(n+m)
    	res.render("index", {winner:"none", results:"",team1:"", team1:text.trim(), team2:text2.trim(), goal1:n, goal2:m, error:"Number of goals cannot exceed 7!"})
    }
   	if (team1.length > 11 || team2.length > 11) {
    	res.render("index", {winner:"none", results:"",team1:"", team1:text.trim(), team2:text2.trim(), goal1:n, goal2:m, error:"Number of players cannot exceed 11!"})
   	} 

	goals = []
	combination = []
	arr = []
	for (i = 0; i < n; i++) {
		for(j = 0; j < n; j++){
			goals.push(i+1) 
		} 
	} 
	console.log("answer 1")
	func(0,n,n)
	let combo1 = arr
	console.log(arrayToString(combo1))


	goals = []
	combination = []
	arr = []
	for (i = 0; i < m; i++) {
		for(j = 0; j < m; j++){
			goals.push(i+1)
		}
	}

	console.log("\nanswer 2")
	func(0,m,m)
	let combo2 = arr
	console.log(arrayToString(combo2))
    
	winner = "Team 1"
	if (n < m) {
		winner = "Team 2"
	}
	if (n == m) {
		winner = "DRAW"
	}
	results = [arrayToString(combo1), arrayToString(combo2)]
	console.log(results)
    res.render("index", {winner: winner, results: results,team1:text.trim(), team2:text2.trim(), goal1:n, goal2:m, error:""})


})



function arrayToString(a) {
	ans = ""
	for (i = 0; i < a.length; i++) {
		ans += "("
		a[i].forEach(elem => {
			ans += elem + ", "
		})
		ans = ans.slice(0, -2)
		ans += "), "
	}
	ans = ans.slice(0, -2)
	return ans
}


function func(offset,k,n){
	if(k == 0){
		return
	}
	for(var i = offset; i <= goals.length - k; ++i){
		combination.push(goals[i])
		sum = 0
		combination.forEach(num => {sum += num})

		if (sum == n) {
			a = new Array()

			combination.forEach(elem => a.push(elem))
			contain = false
			for (j = 0; j < arr.length; j++) {

				if (arr[j].length != a.length)continue
				
				c = 0
				
				for(k = 0; k < arr[j].length; k++){
					if (arr[j][k] == a[k]) {
						c++;
					}
				}			
				
				if (c == a.length) {
					contain = true
					break
				}

			}
			if (!contain) {
				arr.push(a)
			}
		}
		func(i+1, k-1, n)
		combination.pop()

	}
}

app.get("/video", function(req, res){
  res.status(301).redirect("https://www.youtube.com/watch?v=yXS8iNKqsCM&ab_channel=RLFComps")
})

app.get("/about/team_photo", function(req, res){
  res.sendfile("public/img/football_team.jpg")
})


app.listen(3000, function(){
  console.log("Listening to localhost:3000/")
})


