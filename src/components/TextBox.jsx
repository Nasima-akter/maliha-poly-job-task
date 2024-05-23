import axios from "axios";
import { useState } from "react";

const TextBox = () => {
  const saveTotalSumToServer = async () => {
    try {
      const response = await axios.post("http://localhost:7000/saveTotalSum");
      console.log(response.data); // Log success message from server
    } catch (error) {
      console.error("Error saving total sum to server:", error);
    }
  };
  // console.log(totalSum)
  saveTotalSumToServer();

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

    if (updatedNumbers[id - 1].isChecked && selectedCount >= 2000) {
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

  const selectedNumbers = numbers.filter((num) => num.isChecked);
  const selectedCount = selectedNumbers.length;
  const selectedIds = selectedNumbers.map((num) => num.id);
  const selectedPositions = selectedIds.join(", ");

  return (
    <div className="flex justify-center border-inherit border py-5">
      <div>
        <h1 className="text-2xl font-bold bg-emerald-300 text-center rounded-md border border-indigo-600 py-2">
          step 1
        </h1>
        <div className="flex gap-2 my-2">
          <p className="rounded-md border border-orange-300 px-1 bg-orange-100">
            Number of textbox:
          </p>
          <span className="rounded-md border border-slate-600 px-20">
            {" "}
            {numbers.length}
          </span>
        </div>
        <div className="flex flex-col	items-end">
          <button className="btn btn-primary w-32  " onClick={handleAddField}>
            Add Field
          </button>
          <button
            className="rounded-md border border-orange-300 px-1 bg-orange-100 p-2 my-2"
            onClick={handleSelectAll}
          >
            Select All
          </button>
        </div>
        {numbers.map((num) => (
          <div className="flex gap-2 my-2 items-center" key={num.id}>
            <input
              className="checkbox checkbox-accent checkbox-md"
              type="checkbox"
              checked={num.isChecked}
              onChange={() => handleCheckboxChange(num.id)}
            />
            <input
              className="input input-bordered w-full"
              type="number"
              value={num.value}
              onChange={(e) => handleInputChange(num.id, e.target.value)}
              disabled={!num.isChecked}
            />
          </div>
        ))}

        <div className="flex gap-2 items-center">
          <p>Output is: </p>
          <div className="bg-orange-100 p-4">
            {selectedCount === numbers.length ? (
              <p>
                Selected all{" "}
                <span className="font-bold">{numbers.length} items</span>, and
                Total Number is: {calculateSum()}
              </p>
            ) : (
              <p className="">
                Selected {selectedCount} item{selectedCount !== 1 ? "s" : ""},
                their{" "}
                <span className="font-bold">
                  position is{selectedPositions}
                </span>
                ,and Total Number is: {calculateSum()}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* <div>
        <h1>step 2</h1>
        <p>
          Number of textbox:<span> {numbers.length}</span>
        </p>
        <div className="flex flex-col	">
          <button onClick={handleAddField}>Add Field</button>
          <button onClick={handleSelectAll}>Select All</button>
        </div>
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
        {selectedCount === numbers.length ? (
          <p>Selected all, Total Sum: {calculateSum()}</p>
        ) : (
          <p>
            Selected {selectedCount} item{selectedCount !== 1 ? "s" : ""}, their
            position is {selectedPositions}, Total Sum: {calculateSum()}
          </p>
        )}
      </div> */}
    </div>
  );
};

export default TextBox;
