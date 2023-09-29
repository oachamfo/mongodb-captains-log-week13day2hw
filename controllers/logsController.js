//initialize controller
const express = require("express");
const router = express.Router();
const Log = require("../models/logs.js");

//seed route
router.get("/seed", (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find();
    res.render("Index", { logs: logs });
  } catch (error) {
    console.error(error);
  }
});

//logs new
router.get("/new", (req, res) => {
  res.render("New");
});

//logs delete
try {
  router.delete("/:id", async (req, res) => {
    await Log.findByIdAndRemove(req.params.id);
    res.redirect("/logs"); //redirect back to logs index
  });
} catch {
  console.log("something went wrong...");
}

//logs update
router.put("/:id", (req, res) => {
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
router.post("/", async (req, res) => {
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
router.get("/:id/edit", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);

    res.render("Show", { log: log });
  } catch (error) {
    console.log(error);
  }
});

//export router object
module.exports = router;
