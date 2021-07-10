var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var app = express();

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todolistDB",{ useNewUrlParser: true },{ useUnifiedTopology: true });
const itemShema={
    name:String
}
const Item = mongoose.model("Item",itemShema);
const item1=new Item({
    name:"food",
});

const item2=new Item({
    name:"study",
});

const item3=new Item({
    name:"sleep",
});

const d=[item1,item2,item3];

app.get("/",function(req,res)
{
    //res.send("<h1>Hey guys</h1>");
    Item.find({},function(err,f){
        if(f.length==0){
            Item.insertMany(d,function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("successfully saved");
                }
            })
            res.redirect("/");
        }
        else{
            res.render("list",{newListItems:f});
        }
        
    })
   
})

app.post("/",function(req,res)
{
     const itemName = req.body.n;
    // //console.log(i);
    // i1.push(i);
    // res.redirect("/");
    const item = new Item({
        name:itemName
    });
    item.save();
})

app.post("/delete",function(req,res){
    const check=req.body.checkbox;
  Item.findByIdAndRemove(check,function(err)
  {
      if(!err)
      {
          console.log("Successfully deleted");
          res.redirect("/");
      }
  })
})

app.listen(3000,function()
{
    console.log("Listening on 3000");
})