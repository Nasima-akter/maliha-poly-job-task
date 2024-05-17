import axios from "axios";
import { useState } from "react";

const InputField = () => {
   const initialFieldCount = 5; // Initial number of input fields
  const [numbers, setNumbers] = useState(
    Array.from({ length: initialFieldCount }, (_, index) => ({
      id: index + 1,
      value: 0,
      isChecked: false,
    }))
  );
  const [nextId, setNextId] = useState(initialFieldCount + 1);

  const handleAddField = () => {
    const newField = { id: nextId, value: 0, isChecked: false };
    setNumbers([...numbers, newField]);
    setNextId(nextId + 1);
  };

  const handleCheckboxChange = (id) => {
    const updatedNumbers = [...numbers];
    const selectedCount = updatedNumbers.filter((num) => num.isChecked).length;

    // Toggle the checkbox
    updatedNumbers[id - 1].isChecked = !updatedNumbers[id - 1].isChecked;

    // Uncheck all other checkboxes if the maximum count (200) is exceeded
    if (updatedNumbers[id - 1].isChecked && selectedCount >= 200) {
      updatedNumbers.forEach((num) => {
        if (num.id !== id) {
          num.isChecked = false;
        }
      });
    }

    setNumbers(updatedNumbers);
  };

  const handleInputChange = (id, value) => {
    const updatedNumbers = [...numbers];
    updatedNumbers[id - 1].value = Number(value);
    setNumbers(updatedNumbers);
  };

  const handleSelectAll = () => {
   const updatedNumbers = numbers.map((num) => ({
     ...num,
     isChecked: true,
   }));
   setNumbers(updatedNumbers);
 };

  const calculateSum = () => {
    const selectedNumbers = numbers.filter((num) => num.isChecked);
    const sum = selectedNumbers.reduce((total, num) => total + num.value, 0);
    return sum;
  };

  const totalFieldCount = numbers.length;


  const handleSubmit = async () => {
   // Example: Save data to backend using Axios
   try {
     const response = await axios.post('http://localhost:5000/api/data');
     console.log(response.data);
   } catch (error) {
     console.error('Error:', error);
   }
 };

   return (
      <div>
         <h1>Sum Up to Maximum 200 Numbers</h1>
         <p>Select up to 200 numbers to include in the sum:</p>
         {numbers.map((num) => (
            <div key={num.id}>
               <input
                  type="checkbox"
                  checked={num.isChecked}
                  onChange={() => handleCheckboxChange(num.id)}
               />
               <label>Number {num.id}: </label>
               <input
                  type="number"
                  value={num.value}
                  onChange={(e) => handleInputChange(num.id, e.target.value)}
                  disabled={!num.isChecked}
               />
            </div>
         ))}
         <button onClick={handleAddField}>Add Field</button>
         <button onClick={handleSelectAll}>Select All</button>
         <p>Total Number of Fields: {totalFieldCount}</p>
         <p onClick={handleSubmit}>Total Sum: {calculateSum()} </p>
      </div>
   );
};

export default InputField;

