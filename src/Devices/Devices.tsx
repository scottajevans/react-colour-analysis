import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import { getDevicesURL } from '../resources/urls';
import Select from 'react-select';
import { DeviceOptionType } from '../resources/types';

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: '#000000',
    padding: 10,
    
  }),
  singleValue: (provided: any, state: { isDisabled: any; }) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

function getDevices(callback: Function): void {
  axios.get(getDevicesURL)
    .then(function (response) {
      callback(response.data.output);
    });
}

interface Props {
    selectedDevice : DeviceOptionType | null,
    setSelectedDevice: Function
}

const Devices: FunctionComponent<Props> = ({selectedDevice, setSelectedDevice}) => {
    const [devices, setDevices] = useState<Array<string>>([]);
    const [deviceOptions, setDeviceOptions] = useState<Array<DeviceOptionType>>([]);
  
    useEffect(() => {
      getDevices(setDevices);
    }, []);
  
    useEffect(() => {
      let deviceOptionsArr : Array<DeviceOptionType> = []
      devices && devices.forEach(function (device) {
        deviceOptionsArr.push({
          value: device,
          label: device
        })
      })
      deviceOptionsArr.length > 0 && setSelectedDevice(deviceOptionsArr[0]);
      setDeviceOptions(deviceOptionsArr);
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [devices]);
  
    const handleChange = (device : DeviceOptionType) => {
      setSelectedDevice(device)
    }

    return (
      <>
        {
          deviceOptions.length > 0 
          ? <>
          <label id='select-device-label'>Select a device:</label>
            <Select
              aria-labelledby='select-device-label'
              value={selectedDevice}
              options={deviceOptions}
              onChange={device => handleChange(device!)}
              styles={customStyles}
            />
          </>
          : <p>No devices found, please try again.</p>
        }
      </>
    )
}

export default Devices