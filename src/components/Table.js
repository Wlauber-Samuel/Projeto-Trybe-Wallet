import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses, editExpenses } from '../redux/actions/index';

class Table extends Component {
  handleEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpenses(id));
  };

  handleDelete = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpenses(id));
  };

  render() {
    const { expenses, editor } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { Number(expense.exchangeRates[expense.currency]
                    .ask).toFixed(2) }

                </td>
                <td>
                  { ((Number(expense.value))
                    * (Number(expense.exchangeRates[expense.currency].ask))).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    disabled={ editor }
                    onClick={ () => this.handleEdit(expense.id) }
                  >
                    Editar despesa
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDelete(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
  editor: globalState.wallet.editor,
});

Table.propTypes = {
  dispatch: PropTypes.func,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Table);
