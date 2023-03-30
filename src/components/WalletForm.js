import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { requestAPI,
  saveExpenses,
  setExpenses,
  setControlUpdate, editingExpenses, editFalse } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
    id: 0,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(requestAPI());
  }

  componentDidUpdate() {
    const { expenseEdit, controlUpdate, dispatch } = this.props;
    if (controlUpdate) {
      this.setState({
        value: expenseEdit.value,
        description: expenseEdit.description,
        currency: expenseEdit.currency,
        method: expenseEdit.method,
        tag: expenseEdit.tag,
      });
      dispatch(setControlUpdate(false));
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    const data = await saveExpenses();
    delete data.USDT;
    this.setState({
      exchangeRates: data,
    }, () => {
      dispatch(setExpenses(this.state));
      this.setState({
        value: '',
        description: '',
        id: id + 1,
      });
    });
  };

  // totalValue = () => {
  //   const { expenses } = this.props;
  //   const total = expenses.reduce((sum, { value, currency, exchangeRates }) => {
  //     sum += Number(value) * Number(exchangeRates[currency].ask);
  //     return Number(sum);
  //   }, 0).toFixed(2);
  //   dispatch(setTotal(total));
  // };

  handleEdit = () => {
    const { dispatch, expenseEdit, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const { id, exchangeRates } = expenseEdit;
    const newExpenseData = {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,
    };
    const newExpenses = expenses.map((expense) => {
      if (expense.id === id) {
        return { ...expense, ...newExpenseData };
      }
      return expense;
    });
    // expenses[index] = newExpenseData;
    console.log(newExpenses);
    dispatch(editingExpenses(newExpenses));
    dispatch(editFalse());
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { value, description } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form>
        <Header />
        <label htmlFor="value">
          Valor da despesa:
          <input
            data-testid="value-input"
            type="text"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          Descrição da despesa:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            { currencies.map((element) => (
              <option key={ element }>
                {element}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        { editor
          ? <button type="button" onClick={ this.handleEdit }>Editar despesa</button>
          : <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>}
      </form>
    );
  }
}

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  editor: globalState.wallet.editor,
  expenseEdit: globalState.wallet.expenseEdit,
  controlUpdate: globalState.wallet.controlUpdate,
  expenses: globalState.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
