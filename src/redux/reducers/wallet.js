import { SAVE_CURRENCIES,
  SET_EXPENSES,
  DELETE_EXPENSES,
  EDIT_EXPENSES,
  EDITED_EXPENSES,
  SET_CONTROL_UPDATE,
  EDITING_EXPENSES,
  EDIT_FALSE,
  // SET_TOTAL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  expenseEdit: {}, // objeto que armazena a despesa que esta sendo editada
  controlUpdate: false, // valor booleano que indica se o estado expenseEdit deve ser atualizado
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      controlUpdate: true,
      expenseEdit: state.expenses.find((expense) => expense.id === action.id),
    };
  case EDITED_EXPENSES:
    return {
      ...state,
      expenseEdit: state.expenses.find((expense) => expense.id === action.id),
    };
  case SET_CONTROL_UPDATE:
    return {
      ...state,
      controlUpdate: action.status,
    };
  case EDITING_EXPENSES:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDIT_FALSE:
    return {
      ...state,
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
