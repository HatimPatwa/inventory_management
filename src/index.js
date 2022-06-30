const express = require("express");
const ejs = require("ejs");
const path = require("path");
const app = express();


require("./db/connect");

const items = require("./models/items")


const { json } = require("express");
const { urlencoded } = require("express");

const PORT = process.env.PORT || 8080


const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views")


app.use(express.static(static_path));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', template_path);




app.get("/", (req, res) => {

    res.render("index", {})

})

app.post("/", async (req, res) => {

    try {
        const itemName = req.body.itemName;
        const container = req.body.container;
        const qty = req.body.qty;

        console.log(itemName, container, qty);

        const addItem = new items({
            item: itemName,
            container: container,
            qty: qty
        })

        const added = await addItem.save();
        res.status(201).render("index", {
            msg: "added successfully"
        });

    } catch (error) {

        console.log("Couldn't complete submition error: " + error);

    }



})


app.post("/search", async (req, res) => {

    const searchItem = req.body.searchItem;
    console.log(searchItem);

    const data = await items.find({
        item: {
            $regex: ".*" + searchItem + ".*", $options: 'i'
        }
    })
        ;
    console.log(data);
    res.render("search", {
        items: data
    });

})

app.get("/delete/:id",async (req,res)=>{

    const itemID = req.params.id;

    items.remove({_id:itemID}).then(() => {
        res.redirect("/all");
    }).catch((err) => {
        console.log(err);
        res.send("An error has occured :- "+err);
    });

})

app.get("/all", async (req, res) => {

    const data = await items.find();
    res.render("search", {
        items: data
    })
})







app.listen(PORT, () => {
    console.log("The App is running on port 8080");
})