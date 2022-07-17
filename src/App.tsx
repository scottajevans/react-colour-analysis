import React, { useState } from 'react';
import './App.css';
import Devices from './Devices/Devices';
import { DeviceOptionType } from './resources/types';

function App() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceOptionType | null>(null);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Devices
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
        />
    </div>
  );
}

export default App;
