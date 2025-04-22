import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './SetReminder.module.css';
import { vaccines, vaccines2 } from './vaccineData';

function SetReminder() {
  const params = useParams()
  const isParent = window.location.pathname.includes('parent');
  const type = isParent ? 'parent' : 'child';
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parentVaccines, setParentVaccines] = useState([{ name: '', startDate: '' }]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedItems((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleParentInputChange = (index, field, value) => {
    const updatedVaccines = [...parentVaccines];
    updatedVaccines[index][field] = value;
    setParentVaccines(updatedVaccines);
  };

  const addParentVaccine = () => {
    setParentVaccines([...parentVaccines, { name: '', startDate: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);

    const parentId = "0";
    const childId = params.selectedChild;

    const formattedData = {
      vaccines: vaccines.map((vaccine) => ({
        vaccine_name: vaccine.name,
        doses: vaccine.doses
          .filter(dose => selectedItems.includes(`${vaccine.name} - ${dose.dose_name}`))
          .map(dose => ({
            dose_name: dose.dose_name,
            dose_status: true
          })),
      })),
    };

    console.log("Formatted Data:", formattedData);

    try {
      const response = await fetch(`http://localhost:5000/dose/${parentId}/${childId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        console.log("Data successfully sent to the backend!");
        setIsModalOpen(true);
      } else {
        console.error("Failed to send data to the backend:", response.statusText);
      }
    } catch (error) {
      console.error("Error while sending data to the backend:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (type === 'parent') {
      setParentVaccines([{ name: '', startDate: '' }]);
    } else {
      window.location.reload()
      // setSelectedItems([]);
    }
  };

  const resetForm = () => {
    setSelectedItems([]);
    setIsModalOpen(false);
    navigate('/vaccination-reminders');
  };


  // Calculate unselected vaccines and doses
  const unselectedVaccines = vaccines.map((vaccine) => {
    console.log(vaccine)
    const unselectedDoses = vaccine.doses
      .map(dose => dose.dose_name)
      .filter((dose) => {
        return !selectedItems.includes(`${vaccine.name} - ${dose.dose_name}`)});
    return { name: vaccine.name, doses: unselectedDoses };
  }).filter((vaccine) => vaccine.doses.length > 0); // Only include vaccines with unselected doses

  console.log("unselected:", unselectedVaccines)
  console.log("selected", selectedItems)

  useEffect(() => {
    const fetchVaccines = async () => {
      const childId = params.selectedChild
      const res = await fetch(`http://localhost:5000/vaccine/0/${childId}`)
      if (!res.ok) {
        console.error("Cannot fetch vaccines for child")
        return
      }

      const datas = await res.json()
      console.log(datas)

      const newSelectedItems = []
      for (const vaccine of datas.vaccines) {
        for (const dose of vaccine.doses) {
          if (dose.dose_status) {
            newSelectedItems.push(`${vaccine.vaccine_name} - ${dose.dose_name}`)
          }
        }
      }
      setSelectedItems(newSelectedItems)
    }

    fetchVaccines()
  }, [])

  return (
    <div className={styles.formBox}>

      {type === 'parent' ? (
        <>
          <h2 className={styles.questionTitle}>Enter Vaccines You Want to Be Notified About</h2>
          <form className={styles.formItems} onSubmit={handleSubmit}>
            {parentVaccines.map((vaccine, index) => (
              <div key={index} className={styles.vaccineRow}>
                <input
                  type="text"
                  placeholder="Vaccine Name"
                  value={vaccine.name}
                  onChange={(e) => handleParentInputChange(index, 'name', e.target.value)}
                  className={styles.inputField}
                />
                <input
                  type="date"
                  value={vaccine.startDate}
                  onChange={(e) => handleParentInputChange(index, 'startDate', e.target.value)}
                  className={styles.inputField}
                />
              </div>
            ))}
            <button type="button" onClick={addParentVaccine} className={styles.closeButton}>
              Add Another Vaccine
            </button>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <span className={styles.questionTitle}>Which vaccines has your child already received?</span>
          <form className={styles.formItems} onSubmit={handleSubmit}>
            <div className={styles.headerRow}>
              <span>Vaccine</span>
              {Array.from({ length: 6 }).map((_, doseIndex) => (
                <span key={doseIndex}>Dose {doseIndex + 1}</span>
              ))}
            </div>
            {/* {vaccines.map((vaccine, index) => (
              <div key={index} className={styles.vaccineRow}>
                <label
                  className={styles.vaccineLabel}
                  data-tooltip={vaccine.tooltip}
                >
                  {vaccine.name}
                </label>
                {vaccine.doses.map((dose, doseIndex) => (
                  <input
                    key={doseIndex}
                    type="checkbox"
                    value={`${vaccine.name} - ${dose.dose_name}`}
                    onChange={handleCheckboxChange}
                    disabled={dose.dose_status}
                    checked={selectedItems.includes(`${vaccine.name} - ${dose.dose_name}`)}
                  />
                ))}
              </div>
            ))} */}
            {vaccines2.map((vaccine2, index) => (
              <div key={index} className={styles.vaccineRow}>
                <label
                  className={styles.vaccineLabel}
                  data-tooltip={vaccine2.tooltip}
                >
                  {vaccine2.name}
                </label>
                {Array.from({ length: vaccine2.doses }).map((_, doseIndex)  => (
                  <input
                    key={doseIndex}
                    type="checkbox"
                    value={`${vaccine2.name} - Dose ${doseIndex + 1}`}
                    onChange={handleCheckboxChange}
                    checked={selectedItems.includes(`${vaccine2.name} - Dose ${doseIndex + 1}`)}
                  />
                ))}
              </div>
            ))}

            <div className={styles.submitButtonBox}>
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </div>
          </form>
        </>
      )}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.questionTitle}>
              {type === 'parent'
                ? 'Your Vaccine Notifications Have Been Set!'
                : 'Yay! Your reminders for the following vaccines have been set:'}
            </h2>
            <ul>
              {type === 'parent'
                ? parentVaccines.map((vaccine, index) => (
                  <li key={index} className={styles.vaccineLabel}>
                    <strong>Vaccine:</strong> {vaccine.name || 'N/A'} <br />
                    <strong>Start Date:</strong> {vaccine.startDate || 'N/A'}
                  </li>
                ))
                : unselectedVaccines.map((vaccine, index) => (
                  <li key={index} className={styles.vaccineLabel}>
                    <strong>{vaccine.name}:</strong> {vaccine.doses.join(', ')}
                  </li>
                ))}
            </ul>
            <div className={styles.buttonsBox}>
              <button onClick={closeModal} className={styles.closeButton}>
                Close
              </button>
              <button onClick={resetForm} className={styles.closeButton}>
                {type === 'parent'
                  ? 'Add More Vaccines'
                  : 'Set Reminders For Another Child'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SetReminder;
