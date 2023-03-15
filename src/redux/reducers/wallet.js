import { SAVE_CURRENCIES,
  SET_EXPENSES,
  DELETE_EXPENSES,
  EDIT_EXPENSES,
  EDITED_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
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
      idToEdit: action.id,
    };
  case EDITED_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return expense;
      }),
    };
  default:
    return state;
  }
};

export default wallet;

// step 1: iniciar edição;
// Quando o usuario começar a editar troca o valor de editor para true e o idToEdit recebe o id da despesa que esta sendo editada
// step 2: Capturar o valor que está armazenado refererente ao idToEdit e coloca-lo no valor do input;
// step 3: Substituir o valor atual e salvar no redux; map or reduce;
// step 4: Quando o usuario clicar em salvar troca o valor de editor para false e o idToEdit recebe 0;
// step 5: Quando o usuario clicar em cancelar troca o valor de editor para false e o idToEdit recebe 0;
