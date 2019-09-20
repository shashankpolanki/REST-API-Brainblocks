var express   = require("express")
const request = require('request')

var path = __dirname + "/"
var app = express()

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//var router = express.Router()

//A function to return desired data from JSON block
function process(data, offset) {

  var offset = parseInt(offset)

  var temp = '<table class = "table table-striped table-hover">' +
              '<thead>'                     +
              '<tr>'                        +
                  '<th>Id</th>'             +
                  '<th>Name</th>'           +
                  '<th>Description</th>'    +
                  '<th>Category</th>'       +
                  '<th>Link</th>'           +
              '</tr>'                       +
              '</thead>'                    +
              '<tbody>';

  for (var i = 0, len = data.length; i < len; i++) {

     temp += '<tr><td> ' +  (offset + 1)   + ' </td>';
     temp += '<td><a target="_blank" href="https://' + data[i].link + '"> '     +  data[i].name     + '</a></td>';
     temp += '<td> '     +  data[i].description + ' </td>';
     temp += '<td> '     +  data[i].category + ' </td>';
     temp += '<td> '     +  data[i].link    + '</td></tr> ';
     offset++;
  }

    temp += '</tbody>'

    temp += "</table>"

    return temp;

}

//This path responds with the home page
app.get("/", (req, res) =>
  res.sendFile(path + "index.html")
),

//This path responds with counting the number of businesses
//in a database that match the status param.
app.post("/count_all", urlencodedParser, (req,res) => {

  var status = req.body.Status
  var limit = req.body.Limit

  request('http://localhost:3000/api/businesses/count/' + status,
  {json:true}, (err,response,body) => {
    if(err) return console.error(err)
      res.send("" + Math.ceil(body.count/limit))
  })

}),

//This path responds with counting the number of businesses
//in the database that match the status and category param.
app.post("/count_category", urlencodedParser, (req,res) => {

  var category = req.body.Category
  var status = req.body.Status
  var limit = req.body.Limit
  var link_content = category + "/" + status

  request('http://localhost:3000/api/businesses/count/category/' + link_content,
  {json:true}, (err,response,body) => {
    if(err) return console.error(err)
      res.send("" + Math.ceil(body.count/limit))
  })

}),

//This path retrieves businesses of all categories
//based on parameters: status, offset, and limit
app.post("/filter_all", urlencodedParser, (req, res) => {

  var status = req.body.Status
  var offset = req.body.Offset
  var limit = req.body.Limit

  var link_content = status + "/" + offset + "/" + limit

  request('http://localhost:3000/api/businesses/' + link_content,
    {json:true}, (err,response,body) => {
      if(err) return console.error(err)
        res.send(process(body,offset))
        console.log(body)
    })

}),

//This path retrieves businesses of a specific category
//based on parameters: category, status, offset, and limit
app.post("/filter_category", urlencodedParser, (req, res) => {

  var status = req.body.Status
  var category = req.body.Category
  var offset = req.body.Offset
  var limit = req.body.Limit

  var link_content = category + "/" + status + "/" + offset + "/" + limit

  request(('http://localhost:3000/api/businesses/category/' + link_content),
    {json:true}, (err,response,body) => {
      if(err) return console.error(err)
        res.send(process(body,offset))
        console.log(body)
    })

})

//This path based

app.post("/create",  urlencodedParser, (req, res) => {

     name = req.body.Name
     description = req.body.Description
     category = req.body.Category
     link = req.body.Link

     console.log(name + " " + description + " " + category + " " + link)

     body_obj = {"name": name, "description" : description, "category" : category, "link" : link}

     request.post({

      url : 'http://localhost:3000/api/businesses',
      body: body_obj,
      json: true

    }, function(error, response, body) {
        if(error) return console.error(error)
          res.send(process(body))
    });

})

var server = app.listen(4000, function(){
  console.log("Live at Port 4000")
})
