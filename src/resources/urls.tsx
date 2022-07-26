export const getDevicesURL = 'https://mockapi.lumi.systems/getdevices?userId=100&orgId=Lumi';

export const getDeviceInformationUrl = (deviceId : string) => {
    return 'https://mockapi.lumi.systems/getdevicedata?deviceId=' + deviceId;
} 