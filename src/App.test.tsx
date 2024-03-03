import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import React from 'react';

import App from './App';

test('renders hello world', () => {
    render(<App />);
    const aboutPageTitle = screen.getByText(/hello world/i);
    expect(aboutPageTitle).toBeInTheDocument();
});
