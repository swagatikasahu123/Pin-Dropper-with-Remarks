// PinSidebar.js
import React from 'react';

function PinSidebar({ pins }) {
  return (
    <div style={{ width: '20%', padding: '10px', overflowY: 'auto', backgroundColor: '#f5f5f5' }}>
      <h3>Saved Pins</h3>
      <ul>
        {pins.map((pin) => (
          <li key={pin.id}>
            <p><strong>Remarks:</strong> {pin.remarks}</p>
            <p><strong>Address:</strong> {pin.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PinSidebar;
