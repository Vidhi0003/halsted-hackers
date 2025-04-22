import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { sendEmail } from "./nodemailer/nodemailer.js";
import { db, getAllChildrenGivenParent, getAllVaccinesForChild, getAllVaccinesForParent, initChild, initVaccineForChild, updateDoseForChild, updateDoseForParent } from "./firebase/firebase.js";
import morgan from "morgan";

import "./cron/cron.js" // run cron job

import { initialVaccines } from "./data.js";

dotenv.config()

const app = express()
app.use(morgan('[:date[iso]] :status :method :url'));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Backend for Safety Pinpoint!</h1>")
})

// get all vaccines for parent
app.get("/vaccine/:parentId/", async (req, res) => {
  try {
    const data = await getAllVaccinesForParent(req.params.parentId)
    res.json(data)
  }
  catch (err) {
    console.error("Something is wrong with getting all vaccines for parent", err)
    res.status(500).end()
  }
})

// get all vaccines for child
app.get("/vaccine/:parentId/:childId", async (req, res) => {
  try {
    const data = await getAllVaccinesForChild(req.params.parentId, req.params.childId)
    res.json(data)
  }
  catch (err) {
    console.error("Something is wrong with getting all vaccines for child", err)
    res.status(500).end()
  }
})

// initialize vaccines for parent
app.post("/vaccine/:parentId/", (req, res) => {

  res.json({msg: "success"})
})

// initialize vaccines for child
app.post("/vaccine/:parentId/:childId", async (req, res) => {
  try {
    await initChild(req.params.parentId, req.params.childId, req.body)
    await initVaccineForChild(req.params.parentId, req.params.childId)
    res.json({msg: "success"})
  }
  catch (err) {
    console.error("Something is wrong with initializing vaccines for child", err)
    res.status(500).end()
  }
})

// update dose for parent
app.post("/dose/:parentId/", async (req, res) => {
  try {
    const dose = req.body
    await updateDoseForParent(req.params.parentId, dose)
    res.json({msg: "success"})
  }
  catch(err) {
    console.error("Something is wrong with updating dose for child", err)
    res.status(500).end()
  }
})

// update doses for child
app.post("/dose/:parentId/:childId", async (req, res) => {
  try {
    const doses = req.body
    // console.log(doses)
    await updateDoseForChild(req.params.parentId, req.params.childId, doses)
    res.json({msg: "success"})
  }
  catch(err) {
    console.error("Something is wrong with updating dose for child", err)
    res.status(500).end()
  }
})

// get children
app.get("/children/:parentId", async (req, res) => {
  try {
    const childrenData = await getAllChildrenGivenParent(req.params.parentId)
    console.log(childrenData)
    res.json({children: childrenData})
  }
  catch (err) {
    console.error("Something is wrong with getting all children", err)
    res.status(500).end()
  }
})

// check test email
app.get("/email", (req, res) => {
  sendEmail("gunnysolike@gmail.com", "Test", "Test")
  res.send("<h1>Test send email to gunnysolike@gmail.com</h1>")
})

// check test store
app.get("/store", async (req, res) => {
  try {
    await db.collection("Test").doc("Test").set({
      test: "test"
    })
    res.send("Test storing success")
  }
  catch (err) {
    console.error("Test store error:", err)
    res.send("Test storing error")
  }
})


app.listen(5000, () => console.log("Server running on port 5000"));
