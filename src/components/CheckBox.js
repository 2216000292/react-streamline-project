import React, { useState } from 'react';

function CheckBox({ id, onCheck }) {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    onCheck(id, event.target.checked);
  };

  return (
    <input 
      type="checkbox" 
      id={id} 
      checked={checked}
      onChange={handleChange}
    />
  );
}

export default CheckBox;
