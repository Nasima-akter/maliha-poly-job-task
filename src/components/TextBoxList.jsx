
import { useState } from 'react';

const TextBoxList = () => {
   const [selectedItems, setSelectedItems] = useState([]);
   const [totalSum, setTotalSum] = useState(0);

   const handleCheckboxChange = (item) => {
      const selectedIndex = selectedItems.indexOf(item);
      if (selectedIndex === -1) {
         setSelectedItems([...selectedItems, item]);
      } else {
         const updatedItems = [...selectedItems];
         updatedItems.splice(selectedIndex, 1);
         setSelectedItems(updatedItems);
      }
   };

   const calculateTotalSum = () => {
      const sum = selectedItems.reduce((total, item) => total + item.value, 0);
      setTotalSum(sum);
   };

   const formatSelectedItems = () => {
      if (selectedItems.length === 0) {
         return 'No items selected';
      }

      const positions = selectedItems.map((item) => item.position).join(', ');
      const itemCount = selectedItems.length;

      if (itemCount === 1) {
         return `Selected 1 item, its position is ${positions} and Total Sum`;
      } else {
         return `Selected ${itemCount} items, their positions are ${positions} and Total Sum`;
      }
   };
   return (
      <div>
         {selectedItems.map((item) => (
            <div key={item.id}>
               <input
                  type="checkbox"
                  checked={true}
                  onChange={() => handleCheckboxChange(item)}
               />
               <span>{`Item ${item.id}`}</span>
               <span>{`Value: ${item.value}`}</span>
            </div>
         ))}
         <button onClick={calculateTotalSum}>Calculate Total Sum</button>
         <p>{formatSelectedItems()}</p>
         <p>{`Total Sum: ${totalSum}`}</p>
      </div>
   );
};


export default TextBoxList;
