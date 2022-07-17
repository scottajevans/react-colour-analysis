/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import Devices from './Devices';
import { DeviceOptionType } from '../resources/types';
import axios from 'axios';
import selectEvent from 'react-select-event';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const succesfulResponse = {
    data: {
        output: [
            'first device',
            'another device',
            'testing123'
        ]
    },
    status: 200,
    statusText: 'Ok',
    headers: {},
    config: {},
}

const emptyResponse = {
    data: {
        output: []
    },
    status: 200,
    statusText: 'Ok',
    headers: {},
    config: {},
}

describe('Devices', () => {
    const renderDevices = (
        selectedDevice: DeviceOptionType | null = null,
        setSelectedDevice: Function = jest.fn()
        ) => {
        return render(
            <Devices selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
            );
    }

    test('renders and can select devices', async () => {
        mockedAxios.get.mockResolvedValue(succesfulResponse);

        const { getByLabelText, findByLabelText } = renderDevices();

        await findByLabelText('Select a device:');
        const select = getByLabelText('Select a device:');

        await selectEvent.select(select, ['first device']);
    });

    test('renders error when no devices found', async () => {
        mockedAxios.get.mockResolvedValue(emptyResponse);

        const {getByText} = renderDevices();

        expect(getByText('No devices found, please try again.')).toBeTruthy();
    });
})

