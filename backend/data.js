import { Timestamp } from "firebase-admin/firestore";

export const vaccines = [
  { 
    name: 'Rotavirus',
    doses: [
      {
        dose_name: "Dose 1",
        start_month: 0, // should be 2
        duration: 1
      },
      {
        dose_name: "Dose 2",
        start_month: 1, // should be 4
        duration: 1
      },
      {
        dose_name: "Dose 3",
        start_month: 6,
        duration: 1
      },
    ],
    tooltip: 'Protects against rotavirus infections, a contagious viral infection of the gut; spread through the mouth from hands and food contaminated with stool. Disease complications can lead to Severe diarrhea, dehydration, and death.'
  },
  { name: 'DTaP',
    doses: [
      {
        dose_name: "Dose 1",
        start_month: 0, // 2
        duration: 1
      },
      {
        dose_name: "Dose 2",
        start_month: 1, // 4
        duration: 1
      },
      {
        dose_name: "Dose 3",
        start_month: 6,
        duration: 1
      },
      {
        dose_name: "Dose 4",
        start_month: 15,
        duration: 4
      },
    ],
    tooltip: 'Protects against diphtheria, tetanus, and pertussis. Not getting vaccinated can cause swelling of the heart muscle, heart failure, coma, paralysis, death, infections of lungs, etc.'
  },
  { name: 'Hib',
    doses: [
      {
        dose_name: "Dose 1",
        start_month: 2,
        duration: 1
      },
      {
        dose_name: "Dose 2",
        start_month: 4,
        duration: 1
      },
      {
        dose_name: "Dose 3",
        start_month: 6,
        duration: 1
      },
      {
        dose_name: "Dose 4",
        start_month: 12,
        duration: 4
      },
    ],
    tooltip: 'Prevents Haemophilus influenzae type b infections. Disease complications depend on the part of the body infected, but can include brain damage, hearing loss, loss of arm or leg, and death.'
  },
];

export const initialVaccines = () => {
  return ({
    vaccines: vaccines.map((vaccine) => ({
      vaccine_name: vaccine.name,
      doses: vaccine.doses.map(dose => {
        const start_date = new Date()
        start_date.setMonth(start_date.getMonth() + dose.start_month)

        const end_date = new Date()
        end_date.setMonth(end_date.getMonth() + dose.start_month + dose.duration)

        return {
          dose_name: dose.dose_name,
          dose_status: false,
          start_date: Timestamp.fromDate(start_date),
          end_date: Timestamp.fromDate(end_date),
        }
      })
    })),
  }
)};

// GET /vaccine/:parentId : get all vaccines for parent
const getVaccinesForParent = {
  vaccines: [
    {
      vaccine_name: "vaccine_name",
      doses: [
        {
          dose_name: "dose_name",
          dose_status: true, // boolean
          start_date: new Date(),
          end_date: new Date(),
        },
      ]
    },
  ]
}

// GET /vaccine/:parentId/:childId : get all vaccines for child
const getVaccinesForChild = {
  vaccines: [
    {
      vaccine_name: "vaccine_name",
      doses: [
        {
          dose_name: "dose_name",
          dose_status: true, // boolean
          start_date: new Date(),
          end_date: new Date(),
        },
      ]
    },
  ]
}

// POST /vaccine/:parentId/:childId : add a new child will send below data
const initializeVaccines = {
  vaccines: [
    {
      vaccine_name: "vaccine_name",
      num_dose_complete: 1
    }
  ]
}

// POST /dose/:parentId : update dose for parent
const postDoseForParent = {
  vaccine_name: "vaccine_name",
  dose_name: "dose_name",
  dose_status: true
}

// POST /dose/:parentId/:childId : update dose for child
const postDoseForChild = {
  vaccine_name: "vaccine_name",
  dose_name: "dose_name",
  dose_status: true
}
