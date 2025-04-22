import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { initialVaccines } from "../data.js";

const activeApps = getApps();
const serviceAccount = {
  "type": process.env.SERVER_TYPE,
  "project_id": process.env.SERVER_PROJECT_ID,
  "private_key_id": process.env.SERVER_PRIVATE_KEY_ID,
  "private_key": process.env.SERVER_PRIVATE_KEY,
  "client_email": process.env.SERVER_CLIENT_EMAIL,
  "client_id": process.env.SERVER_CLIENT_ID,
  "auth_uri": process.env.SERVER_AUTH_URI,
  "token_uri": process.env.SERVER_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.SERVER_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.SERVER_CLIENT_X509_CERT_URL,
  "universe_domain": process.env.SERVER_UNIVERSE_DOMAIN
}

console.log("number of active apps:", activeApps.length)

const initApp = () => {
  console.info('Loading service account from env.')
  return initializeApp({
    credential: cert(serviceAccount)
  })
}

export const app = activeApps.length === 0 ? initApp() : activeApps[0];
export const auth = getAuth(app)
export const db = getFirestore(app)

export const getAllVaccinesForParent = async (parentId) => {
  const docSnap = await db.collection("VaccinesForParent").doc(parentId).get()
  if (!docSnap.exists) {
    throw Error("Doc does not exist")
  }

  const vaccines = docSnap.data()
  for (const vaccine of vaccines.vaccines) {
    for (const dose of vaccine.doses) {
      dose.start_date = dose.start_date.toDate().toISOString()
      dose.end_date = dose.end_date.toDate().toISOString()
    }
  }
  return vaccines
}

export const getAllVaccinesForChild = async (parentId, childId) => {
  const docSnap = await db.collection("VaccinesForChildren").doc(`${parentId},${childId}`).get()
  if (!docSnap.exists) {
    throw Error("Doc does not exist")
  }

  const vaccines = docSnap.data()
  for (const vaccine of vaccines.vaccines) {
    for (const dose of vaccine.doses) {
      dose.start_date = dose.start_date.toDate().toISOString()
      dose.end_date = dose.end_date.toDate().toISOString()
    }
  }
  return vaccines
}

export const initChild = async (parentId, childId, child) => {
  await db.collection("Children").doc(`${parentId},${childId}`).set(child)
}

export const initVaccineForChild = async (parentId, childId) => {
  const vaccines = initialVaccines()
  await db.collection("VaccinesForChildren").doc(`${parentId},${childId}`).set(vaccines)
}

export const updateDoseForParent = async (parentId, dose) => {
  const docSnap = await db.collection("VaccinesForParent").doc(parentId).get()
  if (!docSnap.exists) {
    throw Error("Doc does not exist")
  }

  const vaccines = docSnap.data()
  const vaccine = vaccines.vaccines.find(vaccine => vaccine.vaccine_name === dose.vaccine_name)
  if (!vaccine) {
    throw Error("Vaccine not found")
  }
  
  const foundDose = vaccine.doses.find(_dose => _dose.dose_name === dose.dose_name)
  if (!foundDose) {
    throw Error("Dose not found")
  }
  
  foundDose.status = dose.dose_status
  await db.collection("VaccinesForParent").doc(parentId).set(vaccines)
}

export const updateDoseForChild = async (parentId, childId, doses) => {
  const docSnap = await db.collection("VaccinesForChildren").doc(`${parentId},${childId}`).get()
  if (!docSnap.exists) {
    throw Error("Doc not found")
  }

  const vaccines = docSnap.data()
  
// doses vaccines
  console.log("start")
  for (const vaccine of doses.vaccines) {
    const foundVaccine = vaccines.vaccines.find(_vac => _vac.vaccine_name === vaccine.vaccine_name)
    for (const dose of vaccine.doses)  {
      console.log(dose)
      const foundDose = foundVaccine.doses.find(_dose => _dose.dose_name === dose.dose_name)
      console.log("found", foundDose)
      if (foundDose) {
        foundDose.dose_status = true
      }
    }
  }
  

  
  console.log(vaccines)
  await db.collection("VaccinesForChildren").doc(`${parentId},${childId}`).set(vaccines)
}

export const getAllChildrenGivenParent = async (parentId) => {
  const snapshot = await db.collection("Children").get()
  if (snapshot.empty) {
    return []
  }

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  return data
}
