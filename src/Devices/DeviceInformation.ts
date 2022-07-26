import axios, { AxiosResponse } from "axios";
import { DeviceOptionType } from "../resources/types";
import { getDeviceInformationUrl } from "../resources/urls";

const makeDeviceInformationCall = (url : string, callback : Function, setError : Function) => {
    axios.get(url)
    .then(function (response) {
        if (response.data.err) {
            setError(response.data.err);
            return;
        } else {
            setError();
        }

        const output = response.data.output;
        callback({
            cvmdata: output.cvmdata,
            videofiles: output.videofiles
        });
    })
    .catch(function (error) {
        console.log(error);
        setError('An error occured: ' + error);
    });
}

const makeGenericGet = (url : string, callback : Function) => {
    url && axios.get('https://thingproxy.freeboard.io/fetch/' + url)
    .then(function (response) {
        callback(response)
    });
}

export const getDeviceInformationFromOption = (deviceOption : DeviceOptionType, setDeviceInformation : Function, setError : Function) => {
    const url = deviceOption.value && getDeviceInformationUrl(deviceOption.value);
    makeDeviceInformationCall(url, setDeviceInformation, setError);
}

export const getFrameInformation = (url : string, setFrameInformation : Function) => {
    makeGenericGet(url, function (response : AxiosResponse) {
        setFrameInformation(response.data)
    })
}
