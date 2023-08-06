import React, { useState,useEffect } from 'react';

function CheckBox({ id, onCheck,initialChecked  }) {
  const [checked, setChecked] = useState(initialChecked);

  useEffect(() => {
    setChecked(initialChecked);
  }, [initialChecked]);

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
