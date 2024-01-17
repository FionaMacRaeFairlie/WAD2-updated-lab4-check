const express = require("express");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));

const nedb = require("gray-nedb");
const db = new nedb({ filename: "emp.db", autoload: true });

const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");

// db.insert({ name:'Fred Flintstone'}, function(err, newDoc){
//     if(err) {
//         console.log('error',err);
//     } else {
//         console.log('document inserted',newDoc);
//     }
// });
// db.insert({ name:'Jane Doe'}, function(err, newDoc){
//     if(err) {
//         console.log('error',err);
//     } else {
//         console.log('document inserted',newDoc);
//     }
// });
// db.insert({ name:'Allan Grey'}, function(err, newDoc){
//     if(err) {
//         console.log('error',err);
//     } else {
//         console.log('document inserted',newDoc);
//     }
// });
// db.insert({ name:'John Brown'}, function(err, newDoc){
//     if(err) {
//         console.log('error',err);
//     } else {
//         console.log('document inserted',newDoc);
//     }
// });

// db.find({},function(err,docs){
//     if(err){
//         console.log('error');
//     }
//     else{ console.log('documents retrieved: ',docs);
//     }
// })
// db.find({name:'Fred Flintstone'},function(err,docs){
//     if(err){
//         console.log('error');
//     }
//     else{ console.log('documents retrieved: ',docs);
//     }
// })
// db.update({name:'Fred Flintstone'},{$set:{'name':'Wilma Flintstone'} },{},function(err,docs){
//     if(err){
//         console.log('error updating documents',err);
//     } else {
//         console.log(docs,'documents updated')
//     }
// })

// db.remove({name:'Jane Doe'},{}, function(err,docsRem){
//     if(err){
//         console.log('error deleting document');
//     } else {
//         console.log(docsRem, 'document removed from database')
//     }
// })

//add
app.post("/add", function (req, res) {
  db.insert({ name: req.body.name }, function (err, newDoc) {
    if (err) {
      console.log("error", err);
    } else {
      console.log("document inserted", newDoc);
    }
  });
});

// Show all
app.post("/showall", function (req, res) {
  db.find({}, function (err, docs) {
    if (err) {
      console.log("error");
    } else {
      console.log("documents retrieved: ", docs);

      res.render("employeeData", {
        employee: docs,
      });
      // res.json(docs);
    }
  });
});

// View
app.post("/view", function (req, res) {
  db.find({ name: req.body.name }, function (err, docs) {
    if (err) {
      console.log("error");
    } else {
      console.log("documents retrieved: ", docs);
      res.render("employeeData", {
        employee: docs,
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server listening on port: 3000");
});
