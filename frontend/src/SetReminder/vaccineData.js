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

export const vaccines2 = [
  { name: 'RSV antibody', doses: 2, tooltip: 'Protects against contagious viral RSV infections of the lungs These infections are especially dangerous for infants and young children.' },
  { name: 'Hepatitis B', doses: 3, tooltip: 'Prevents Hepatitis B virus infection of the liver. Not getting vaccinated cause chronic liver infection, liver failure, liver cancer, and death.' },
  { name: 'Rotavirus', doses: 3, tooltip: 'Protects against rotavirus infections, a contagious viral infection of the gut; spread through the mouth from hands and food contaminated with stool. Disease complications can lead to Severe diarrhea, dehydration, and death.' },
  { name: 'DTaP', doses: 5, tooltip: 'Protects against diphtheria, tetanus, and pertussis. Not getting vaccinated can cause swelling of the heart muscle, heart failure, coma, paralysis, death, infections of lungs, etc.' },
  { name: 'Hib', doses: 5, tooltip: 'Prevents Haemophilus influenzae type b infections. Disease complications depend on the part of the body infected, but can include brain damage, hearing loss, loss of arm or leg, and death.' },
  { name: 'Pneumococcal', doses: 5, tooltip: 'Protects against pneumococcal infections. Disease complications depend on the part of the body infected, but can include infection of the lungs (pneumonia), blood poisoning, infection of the lining of the brain and spinal cord, and death.' },
  { name: 'Polio', doses: 5, tooltip: 'Prevents poliovirus infections of nerves and brain spread through the mouth from stool on contaminated hands, food or liquid, and by air and direct contact. If caught, paralysis and death are common.' },
  { name: 'COVID-19', doses: 1, tooltip: 'Protects against COVID-19, a contagious viral infection of the nose, throat, or lungs; may feel like a cold or flu. Spread through air and direct contact.' },
  { name: 'Influenza/Flu', doses: 6, tooltip: 'Protects against seasonal influenza. Complications are infection of the lungs (pneumonia), sinus and ear infections, worsening of underlying heart or lung conditions, and death.' },
  { name: 'MMR', doses: 2, tooltip: 'Protects against measles, mumps, and rubella. Measles and Mumps can cause brain swelling; Rubella is very dangerous in pregnant women.' },
  { name: 'Chickenpox', doses: 2, tooltip: 'Prevents chickenpox (varicella), which is a contagious viral infection that causes fever, headache, and an itchy, blistering rash; spread through air and direct contact.' },
  { name: 'Hepatitis A', doses: 2, tooltip: 'Prevents Hepatitis A virus infection. Disease complications include liver failure and death.' },
];
