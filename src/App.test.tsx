import {MockedProvider} from '@apollo/client/testing';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import React from 'react';

import App from './App';
import {CREATE_CONTACT_ENTRY_MUTATION} from './components/contactMeModal';

const mocks = [
    {
        request: {
            query: CREATE_CONTACT_ENTRY_MUTATION,

            variables: {
                name: 'Test User',
                email: 'test@example.com',
                description: 'lorem ipsum dolor set.',
            },
        },

        result: {
            data: {
                success: true,
                code: 200,
                message: 'Your contact request has been submitted.',
            },
        },
    },
];

test('renders learn react link', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <App />
        </MockedProvider>,
    );
    const aboutPageTitle = screen.getByText(/Jamie Flynn/i);
    expect(aboutPageTitle).toBeInTheDocument();
});
