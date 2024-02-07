const LOAD_EXPENSES = 'expenses/LOAD_EXPENSES';
const RECEIVE_EXPENSE = 'expenses/RECEIVE_EXPENSE';
const UPDATE_EXPENSE = 'expenses/UPDATE_EXPENSE';
const DELETE_EXPENSE = 'expenses/DELETE_EXPENSE';

const loadExpenses = (expenses) => ({
    type: LOAD_EXPENSES,
    expenses
});
const receiveExpense = (expense) => ({
    type: RECEIVE_EXPENSE,
    expense
});
const updateExpense = (expense) => ({
    type: UPDATE_EXPENSE,
    expense
});
const deleteExpense = (expenseId) => ({
    type: DELETE_EXPENSE,
    expenseId
});

export const thunkGetAllExpenses = () => async (dispatch) => {
    const response = await fetch('/api/expenses');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadExpenses(data));
        return data;
    }
    return response;
};
export const thunkGetExpenseDetails = (expenseId) => async (dispatch) => {
    const response = await fetch(`api/expenses/${expenseId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveExpense(data));
        return data;
    }
    return response;
};
export const thunkCreateExpense = (expense) => async (dispatch) => {
    const response = await fetch('api/expenses', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(expense)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveExpense(data));
        return data;
    }
    return response;
};
export const thunkUpdateExpense = (expense) => async (dispatch) => {
    const response = await fetch(`api/expenses/${expense.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(expense)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateExpense(data));
        return data;
    }
    return response;
};
export const thunkDeleteExpense = (expenseId) => async (dispatch) => {
    const response = await fetch(`api/expenses/${expenseId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteExpense(expenseId));
        return data;
    }
    return response;
};

function expensesReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_EXPENSES:
            return {...state, ...action.expenses}
            // const expensesState = {...state};
            // action.expenses.expenses.forEach((expense) => {
            //     if (!expensesState[expense.id]) {
            //         expensesState[expense.id] = expense;
            //     }
            // });
            // return {...expensesState};
        case RECEIVE_EXPENSE:
            return {...state, [action.expense.id]: action.expense};
        case UPDATE_EXPENSE:
            return {...state, [action.expense.id]: action.expense};
        case DELETE_EXPENSE:
            const newState = {...state};
            delete newState[action.expenseId];
            return newState;
        default:
            return state;
    }
}

export default expensesReducer;
