export type DeviceOptionType = {
    value: string,
    label: string
  }

export type DeviceInformationType = {
  cvmdata: string,
  videofiles: string
}

export type FrameDataType = {
  avgB: number,
  avgG: number,
  avgR: number,
  histDiff: number
}

export type DeviceFramesType = {
  RoI: Array<number>,
  frame_data: Array<FrameDataType>
}