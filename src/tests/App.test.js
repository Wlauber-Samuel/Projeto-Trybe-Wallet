import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import Header from '../components/Header';

describe('App', () => {
  test('test App', () => {
    renderWithRouterAndRedux(<App />);
  });
});

describe('Component Login', () => {
  test('Testa se  rota para esta página é "/" , se é renderizado um botão com o texto "Entrar", se foram realizadas as seguintes verificações nos campos de email, senha e botão e se a rota é alterada para "/carteira" após o clique no botão ', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const buttonLogin = screen.getByRole('button', { name: 'Entrar' });
    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toBeDisabled();

    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(buttonLogin);

    expect(history.location.pathname).toBe('/carteira');
  });
});
describe('Testes do componente Table', () => {
  test('Se os elementos do formulário são renderizados', () => {
    renderWithRouterAndRedux(<Table />);
    const description = screen.getByRole('columnheader', { name: /descrição/i });
    const tag = screen.getByRole('columnheader', { name: /tag/i });
    const type = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const value = screen.getByRole('columnheader', { name: 'Valor' });
    const coin = screen.getByRole('columnheader', { name: 'Moeda' });
    const method = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const exchange = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const converter = screen.getByRole('columnheader', { name: /valor convertido/i });
    const converterCurrency = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    const edit = screen.getByRole('columnheader', { name: /editar\/excluir/i });

    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(coin).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(exchange).toBeInTheDocument();
    expect(converter).toBeInTheDocument();
    expect(converterCurrency).toBeInTheDocument();
    expect(edit).toBeInTheDocument();
  });
});
describe('Testa component Wallet.js', () => {
  test('Testa se valores do form são preenchidos corretamente', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const description = screen.getByTestId('description-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const value = screen.getByTestId('value-input');
    const currency = screen.getAllByTestId('currency-input');
    const btn = screen.getByRole('button');

    userEvent.type(description, 'Almoço');
    userEvent.type(method, 'Dinheiro');
    userEvent.type(tag, 'Trabalho');
    userEvent.type(value, '24');
    userEvent.type(currency, 'USD');
    userEvent.click(btn);
  });
  test('Testa se os elementos do form são renderizados', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const description = screen.getByTestId('description-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const value = screen.getByTestId('value-input');
    const currency = await screen.findByTestId('currency-input', { name: 'USD' });
    const btn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(description).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });
});
describe('Testa componente Header', () => {
  test('Header', () => {
    renderWithRouterAndRedux(<Header />);
    expect(screen.getByTestId('header-currency-field')).toBeInTheDocument();
    expect(screen.getByTestId('total-field')).toBeInTheDocument();
  });
});
