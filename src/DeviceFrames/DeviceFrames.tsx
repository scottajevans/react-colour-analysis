import React, { FunctionComponent } from 'react';
import { FrameDataType } from '../resources/types';

interface Props {
    frameInformation : Array<FrameDataType>
}

const DeviceFrames: FunctionComponent<Props> = ({frameInformation}) => {


  return (
    <>
      <p> Hello world</p>
    </>
  )
}   

export default DeviceFrames
