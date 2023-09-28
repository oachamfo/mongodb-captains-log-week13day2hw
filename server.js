//initialize app
const express = require("express");
const app = express();

const jsxEngine = require("jsx-view-engine"); //require view engine
const mongoose = require("mongoose"); //require mongoose db
require("dotenv").config(); //require .env file

//method-override package: for spoofing HTTP methods
const methodOverride = require("method-override");

//adding view templating engine
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

//middleware
//body parser included in express; allows for req.body syntax to be used
app.use(express.urlencoded({ extended: true }));

//use methodOverride package for adding a query parameter to the delete form named _method
app.use(methodOverride("_method"));

//db connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

//listen on port 3000
app.listen(3000, () => {
  console.log("listening");
});

//models
const Log = require("./models/logs.js");

//routes
app.get("/", (req, res) => {
  res.send("Welcome to Captain's Log App");
});

//seed route
app.get("/logs/seed", (req, res) => {
  Log.create([
    {
      title: "title1",
      entry: "entry1",
      shipIsBroken: true,
    },
    {
      title: "title2",
      entry: "entry2",
      shipIsBroken: false,
    },
    {
      title: "title3",
      entry: "entry3",
    },
  ])
    .then(() => {
      res.redirect("/logs");
    })
    .catch((err) => {
      console.log(err);
    });
});

//logs index
app.get("/logs/", async (req, res) => {
  try {
    const logs = await Log.find();
    res.render("Index", { logs: logs });
  } catch (error) {
    console.error(error);
  }
});

//logs new
app.get("/logs/new", (req, res) => {
  res.render("New");
});

//logs delete
try {
  app.delete("/logs/:id", async (req, res) => {
    await Log.findByIdAndRemove(req.params.id);
    res.redirect("/logs"); //redirect back to logs index
  });
} catch {
  console.log("something went wrong...");
}

//logs update
app.put("/logs/:id", (req, res) => {
  if (req.body.shipIsBroken === "on") {
    req.body.shipIsBroken = true;
  } else {
    req.body.shipIsBroken = false;
  }
  Log.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedLog) => {
      console.log(updatedLog);
      res.redirect(`/logs/${req.params.id}`); //redirect to the Show page
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//logs create
app.post("/logs", async (req, res) => {
  try {
    if (req.body.shipIsBroken === "on") {
      //if ready to eat is checked by user
      req.body.shipIsBroken = true; //do some data correction
    } else {
      //if ready to eat is not checked by user
      req.body.shipIsBroken = false; //do some data correction
    }

    //store new log in cloud db
    await Log.create(req.body);

    res.redirect("/logs");
  } catch (error) {
    console.log(error);
  }
});

//logs edit
app.get("/logs/:id/edit", async (req, res) => {
  await Log.findById(req.params.id)
    .then((foundLog) => {
      res.render("Edit", {
        log: foundLog, //pass in the foundLog so we can use it to populate the form
      });
    })
    .catch((err) => {
      res.send({ msg: err.message });
    });
});

//logs show
app.get("/logs/:id", async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);

    res.render("Show", { log: log });
  } catch (error) {
    console.log(error);
  }
});
