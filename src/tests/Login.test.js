import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Test Login', () => {
  it('Login with correct credentials', async () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByText(/e-mail/i);
    const password = screen.getByText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("", () => {

  });
});
