import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes da página de Login, Carteira e do componente Header', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
  });

  const emailInput = 'email-input';
  const pwInput = 'password-input';
  const delBtn = 'delete-btn';

  describe('Testando os inputs de interação do usuário na página de Login', () => {
    test('Devem existir os campos Usuário e Senha e o botão Entrar', () => {
      expect(screen.getByTestId(emailInput)).toBeInTheDocument();
      expect(screen.getByTestId(pwInput)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    });

    test('O botão Entrar deve estar desabilitado caso não cumpra as exigências de conteúdo', () => {
      expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled();
    });

    test('O botão Entrar deve estar ativo quando um e-mail for digitado e uma senha com 6 dígitos ou mais for inserida', () => {
      userEvent.type(screen.getByTestId(emailInput), 'viniciusraposo@gmail.com');
      userEvent.type(screen.getByTestId(pwInput), 'senhaforte');

      expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled();
    });
  });

  describe('Teste dos campos da página da Carteira e do componente Header', () => {
    beforeEach(() => {
      userEvent.type(screen.getByTestId(emailInput), 'viniciusraposo@gmail.com');
      userEvent.type(screen.getByTestId(pwInput), 'senhaforte');
      userEvent.click(screen.getByRole('button', { name: /entrar/i }));
    });

    test('Devem ser exibidos na carteira os campos: valor, moeda, método de pagamento, categoria, descrição e o botão adicionar despesa', () => {
      expect(screen.getByTestId('value-input')).toBeInTheDocument();
      expect(screen.getByTestId('currency-input')).toBeInTheDocument();
      expect(screen.getByTestId('method-input')).toBeInTheDocument();
      expect(screen.getByTestId('tag-input')).toBeInTheDocument();
      expect(screen.getByTestId('description-input')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /adicionar despesa/i })).toBeInTheDocument();
    });

    test('Devem ser exibidos no Header: e-mail, despesas e a moeda deve ser BRL', () => {
      expect(screen.getByRole('heading', { name: /wallet/i, level: 1 })).toBeInTheDocument();
      expect(screen.getByText(/e-mail: viniciusraposo@gmail\.com/i)).toBeInTheDocument();
      expect(screen.getByTestId('total-field')).toBeInTheDocument();
      expect(screen.getByTestId('header-currency-field')).toBeInTheDocument();
    });

    test('Testando adicão, edição e remoção de despesas', async () => {
      userEvent.type(screen.getByTestId('value-input'), '150');
      userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
      await waitFor(() => expect(screen.getByTestId(delBtn)).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId('edit-btn')).toBeInTheDocument());

      userEvent.click(screen.getByTestId('edit-btn'));
      expect(screen.getByTestId(delBtn)).toBeDisabled();
      expect(screen.getByRole('heading', { name: /editando despesa: 0/i, level: 5 })).toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /editar despesa/i }));
      userEvent.click(screen.getByTestId(delBtn));
    });
  });
});
