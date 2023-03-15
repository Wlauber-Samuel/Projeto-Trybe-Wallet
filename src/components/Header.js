import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    const { expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          Email:
          {email}
        </p>

        <p data-testid="total-field">
          { expenses.reduce((sum, { value, currency, exchangeRates }) => {
            sum += Number(value) * Number(exchangeRates[currency].ask);
            return Number(sum);
          }, 0).toFixed(2) }

        </p>

        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
// commit
