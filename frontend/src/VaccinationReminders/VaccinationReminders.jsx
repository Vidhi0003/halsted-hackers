import './VaccinationReminders.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function VaccinationReminders() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState('');
  const [children, setChildren] = useState([]);
  const [newChildName, setNewChildName] = useState('');
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewChildName(''); 
  };

  const handleChildSelection = (e) => {
    setSelectedChild(e.target.value);
  };

  const handleSetReminder = () => {
    if (selectedChild) {
      navigate(`/set-reminder/children/${selectedChild.split(",")[1]}`);
    } else {
      alert('Please select a child before proceeding.');
    }
  };

  const handleAddChild = async () => {
      if (newChildName.trim()) {
        const newChild = {
          id: (children.length).toString(),
          name: newChildName.trim(),
        };
        try {
          await fetch(`http://localhost:5000/vaccine/0/${newChild.id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: newChild.name
            })
          })
          setChildren([...children, newChild]); 
          setNewChildName('');
          alert(`${newChild.name} has been added to the list.`);
        }
        catch (err) {
          console.error(err)
        }
      } else {
        alert('Please enter a valid name.');
      }
  };


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/children/0")
        if (!res.ok) {
          console.error("Getting all children error")
        }
        else {
          const data = await res.json()
          setChildren(data.children)
        }
      }
      catch(err) {
        console.error("Something is wrong with getting all children data", err)
      }
    }

    fetchData()

  }, [])

  return (
    <>
            <img src="/chart.png" alt="chart" style={{ marginTop: '1em', width: '470px' }} />
            <p style={{ fontSize: '0.8em', color: '#555', textAlign: 'center', marginBottom: '0'}}>
                * CDC 2025 Recommended Immunizations for Birth Through 6 Years Old
            </p>
        <div className="button-box source-sans-3">
            <span className="reminder-text">
                Schedule Vaccination Reminders <span className="gradient-text">-- For Children</span>
            </span>
            <button onClick={openModal} className="reminder-button source-sans-3">
                Set Reminder
            </button>
        </div>
        <div className="button-box source-sans-3">
            <span className="reminder-text">
                Schedule Vaccination Reminders <span className="gradient-text-parents">-- For Parents</span>
            </span>
            <Link to="/set-reminder/parent" className="reminder-button source-sans-3">
                Set Reminder
            </Link>
        </div>

        {isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <h2 className="modalTitle">Select a Child</h2>
                    <select value={selectedChild} onChange={handleChildSelection} className="child-select">
                        <option value="">-- Select a Child --</option>
                        {children.map((child) => (
                            <option key={child.id} value={child.id}>
                                {child.name}
                            </option>
                        ))}
                    </select>
                    <div className="add-child-section">
                        <h3 className="modalTitle">Add a New Child</h3>
                        <input
                            type="text"
                            value={newChildName}
                            onChange={(e) => setNewChildName(e.target.value)}
                            placeholder="Enter child's name"
                            className="child-input"
                        />
                        <button onClick={handleAddChild} className="add-child-button">
                            Add Child
                        </button>
                    </div>
                    <div className="modal-buttons">
                        <button onClick={handleSetReminder} className="modalButton">
                            Confirm
                        </button>
                        <button onClick={closeModal} className="modalButton">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
);
}

export default VaccinationReminders;
