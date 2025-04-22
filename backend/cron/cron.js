import cron from "node-cron";
import { db,  } from "../firebase/firebase.js";
import { sendEmail } from "../nodemailer/nodemailer.js";

cron.schedule("*/5 * * * *", async () => {
  console.log("Running every minute:", new Date().toLocaleTimeString());

  try {
    // check for all children
    const snapshot = await (db.collection("VaccinesForChildren").get())
    const allVaccines = snapshot.docs.map(docSnap => ({
      id: docSnap.id, ...docSnap.data()
    }))
    const childrenVaccines = allVaccines.filter(vaccine => vaccine.id.split(",")[0] === "0") 
    

    // text
    let topics = []

    // for each group remind them
    const today = new Date()
    for (const vaccines of childrenVaccines) {
      console.log(vaccines)
      const snap = await (db.collection("Children").doc(vaccines.id).get())
      const childName = snap.data().name
      console.log(childName)
      topics.push(childName)

      // for each vaccine, check that if the closest dose are in the period
      for (const vaccine of vaccines.vaccines) {
        for (const dose of vaccine.doses) {
          // if dose is not done then check if it is in the deadline
          if (!dose.dose_status) {
            const start_date = dose.start_date.toDate()
            const end_date = dose.end_date.toDate()
            // console.log(start_date.toLocaleString(), end_date.toLocaleString())
            if (today >= start_date && today <= end_date) {
              const topic = `    Reminder to get vaccinated: ${vaccine.vaccine_name} - ${dose.dose_name}`
              console.log(topic)
              topics.push(topic)
            }
            else if (today > end_date) {
              const topic = `    Warning: you miss getting you child to vaccinate: ${vaccine.vaccine_name} - ${dose.dose_name}`
              console.log(topic)
              topics.push(topic)
            }
            break
          }
        }
      }
    }

    sendEmail("phanducmanh03@gmail.com", "Child vacination", topics.join("\n"))
  }
  catch (err) {
    console.error(err)
  }


  return 

  //

});
