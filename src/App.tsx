import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './App.css';
import { getDeviceInformationFromOption, getFrameInformation } from './Devices/DeviceInformation';
import Devices from './Devices/Devices';
import DeviceFrames from './DeviceFrames/DeviceFrames'
import { DeviceFramesType, DeviceInformationType, DeviceOptionType } from './resources/types';
import FrameBox from './DeviceFrames/FrameBox';

function App() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceOptionType | null>(null);
  const [deviceInformation, setDeviceInformation] = useState<DeviceInformationType | null>();
  const [frameInformation, setFrameInformation] = useState<DeviceFramesType>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    console.log(selectedDevice)
    if (selectedDevice && selectedDevice.value) {
      getDeviceInformationFromOption(selectedDevice!, setDeviceInformation, setError);
    }
  }, [selectedDevice])

  useEffect(() => {
    getFrameInformation(deviceInformation?.cvmdata!, setFrameInformation)
  }, [deviceInformation])

  return (
    <div className="App">
      <Devices
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
        />
      { error && <p>{error}</p> }
      {
        deviceInformation &&
        deviceInformation!.videofiles &&
        <ReactPlayer url={deviceInformation!.videofiles} width="100%" height="100%" controls={true} />
      }
      {frameInformation && <FrameBox frameInformation={frameInformation.RoI} />}
      {frameInformation && <DeviceFrames frameInformation={frameInformation.frame_data} />}
    </div>
  );
}

export default App;
