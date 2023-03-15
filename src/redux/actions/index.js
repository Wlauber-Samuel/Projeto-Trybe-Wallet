export const LOGIN = 'LOGIN';
export const SAVE_USER = 'SAVE_USER';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SET_EXPENSES = 'SET_EXPENSIES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const EDITING_EXPENSES = 'EDITING_EXPENSES';
export const EDITED_EXPENSES = 'EDITED_EXPENSES';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const setExpenses = (expenses) => ({
  type: SET_EXPENSES,
  payload: expenses,
});

export const deleteExpenses = (payload) => ({
  type: DELETE_EXPENSES,
  payload,
});

export const editExpenses = (id) => ({
  type: EDIT_EXPENSES,
  id,
});

export const editingExpenses = (payload) => ({
  type: EDITING_EXPENSES,
  payload,
});

export const editedExpenses = (payload) => ({
  type: EDITED_EXPENSES,
  payload,
});

export const requestAPI = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  delete data.USDT;
  return dispatch(saveCurrencies(Object.keys(data)));
};

export const saveExpenses = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  delete data.USDT;
  return data;
};
