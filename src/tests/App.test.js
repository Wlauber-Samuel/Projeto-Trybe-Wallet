import React from 'react';
import { screen } from '@testing-library/react';
// import App from '../App';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testando o componente Header', () => {
  it('Verifica se o component Header renderiza informações sobre email e moeda(BRL)', async () => {
    renderWithRouterAndRedux(<Header />);
    const email = screen.getByText(/email/i);
    const currency = screen.getByText(/brl/i);

    expect(email).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
  });

  it('Verifica se o componente Header contém os data-testid corretos', async () => {
    renderWithRouterAndRedux(<Header />);

    const emailField = screen.getByTestId('email-field');
    const totalField = screen.getByTestId('total-field');
    const currencyField = screen.getByTestId('header-currency-field');

    expect(emailField).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();
    expect(currencyField).toBeInTheDocument();
  });
});

describe('Testando o componente Table', () => {
  it('Verifica se o componente Table renderiza os elementos corretamente', () => {
    renderWithRouterAndRedux(<Table />);

    const description = screen.getByText(/descrição/i);
    const tag = screen.getByText(/tag/i);
    const method = screen.getByText(/método de pagamento/i);
    const value = screen.getByText('Valor');
    const currency = screen.getByText('Moeda');
    const exchangeRates = screen.getByText(/câmbio utilizado/i);
    const convertedValue = screen.getByText(/valor convertido/i);
    const currencyName = screen.getByText(/moeda de conversão/i);
    const edit = screen.getByText(/editar\/excluir/i);

    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(exchangeRates).toBeInTheDocument();
    expect(convertedValue).toBeInTheDocument();
    expect(currencyName).toBeInTheDocument();
    expect(edit).toBeInTheDocument();
  });

  it('Verifica se é possível excluir uma despesa', () => {
    renderWithRouterAndRedux(<Table />, {
      expenses: [
        {

          id: 0,
          value: 10,
          description: 'descrição',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Alimentação',
          exchangeRates: {
            USD: {
              ask: 5,
              name: 'Dólar Comercial',
            },
          },
        },
      ],
    });

    const deleteButton = screen.getByRole('button', { name: /excluir/i });
    userEvent.click(deleteButton);
    expect(deleteButton[1]).not.toBeInTheDocument();
  });
});

describe('Testando o componente WalletForm', () => {
  it('WalletForm with correct credentials', async () => {
    renderWithRouterAndRedux(<WalletForm />);

    const value = screen.getByText(/valor da despesa/i);
    const description = screen.getByText(/descrição/i);
    const currency = screen.getByText(/moeda/i);
    const method = screen.getByText(/método de pagamento/i);

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
  });
});

describe('Testando o componente Login', () => {
  it('Login with correct credentials', async () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByText(/e-mail/i);
    const password = screen.getByText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Verifica se o botão é habilitado somente após preencher todos os inputs', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();
    userEvent.type(email, '');

    expect(button).toBeDisabled();
    userEvent.type(password, '');

    expect(button).toBeDisabled();
  });

  it('Verifica se o email é preenchido com caracteres válidos', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();

    userEvent.type(email, 'test@email.com');
    userEvent.type(password, '123456');
    expect(button).toBeEnabled();
  });
});
