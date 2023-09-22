import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends Component {
  render() {
    return (
      <div>
        {/* <Header /> */}
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default connect()(Wallet);
