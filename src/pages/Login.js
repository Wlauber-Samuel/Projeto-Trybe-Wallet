import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btnDisabled: true,
  };

  validateInputs = () => {
    const { email, password } = this.state;
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const minLengthPassword = 6;
    const validateEmail = regex.test(email);
    const validatePassword = password.length >= minLengthPassword;

    if (validateEmail && validatePassword) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validateInputs);
  };

  handleS = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;

    dispatch(login(email));
    history.push('/carteira');
  };

  render() {
    const { btnDisabled } = this.state;
    return (
      <div>
        <h1>Trybe Wallet</h1>
        <h2>Login</h2>
        <form>
          <label htmlFor="email">
            E-mail:
            <input
              type="text"
              name="email"
              id="email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <br />
          <label htmlFor="password">
            Senha:
            <input
              minLength={ 6 }
              type="password"
              id="password"
              name="password"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ btnDisabled }
            onClick={ this.handleS }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
