// App.js
import React, { useState, useEffect } from 'react';
import Map from './Map';
import PinSidebar from './PinSidebar';

function App() {
  const [pins, setPins] = useState([]);

  // Load pins from localStorage on initial render
  useEffect(() => {
    const savedPins = JSON.parse(localStorage.getItem('pins')) || [];
    setPins(savedPins);
  }, []);

  // Update localStorage whenever pins state changes
  useEffect(() => {
    localStorage.setItem('pins', JSON.stringify(pins));
  }, [pins]);

  const addPin = (pin) => {
    setPins([...pins, pin]);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Map pins={pins} addPin={addPin} />
      <PinSidebar pins={pins} />
    </div>
  );
}

export default App;
