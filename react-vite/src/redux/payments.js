const LOAD_PAYMENTS = 'payments/LOAD_PAYMENTS';
const RECEIVE_PAYMENTS = 'payments/RECEIVE_PAYMENTS';
const RECEIVE_PAYMENT = 'payments/RECEIVE_PAYMENT';
const UPDATE_PAYMENT = 'payments/UPDATE_PAYMENT';

const loadPayments = (expenseId, payments) => ({
    type: LOAD_PAYMENTS,
    expenseId,
    payments
});
const receivePayments = (payments) => ({
    type: RECEIVE_PAYMENTS,
    payments
});
const receivePayment = (expenseId, payment) => ({
    type: RECEIVE_PAYMENT,
    expenseId,
    payment
});
const updatePayment = (payment) => ({
    type: UPDATE_PAYMENT,
    payment
});

export const thunkGetAllPayments = () => async (dispatch) => {
    const response = await fetch('/api/payments/current');
    if (response.ok) {
        const data = await response.json();
        dispatch(receivePayments(data));
        return data;
    }
    return response;
};
export const thunkGetExpensePayments = (expenseId) => async (dispatch) => {
    const response = await fetch(`/api/expenses/${expenseId}/payments`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadPayments(expenseId, data));
        return data;
    }
    return response;
};
export const thunkCreatePayment = (expenseId, payment) => async (dispatch) => {
    const response = await fetch(`/api/expenses/${expenseId}/payments`, {
        method: 'POST',
        body: payment
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receivePayment(expenseId, data));
        return data;
    }
    return response;
};
export const thunkUpdatePayment = (payment) => async (dispatch) => {
    const paymentId = payment.get('id');
    const response = await fetch(`/api/payments/${paymentId}`, {
        method: 'PUT',
        body: payment
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updatePayment(data));
        return data;
    }
    return response;
};

function paymentsReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_PAYMENTS:
            const paymentsState = {};
            action.payments.payments.forEach((payment) => {
                paymentsState[payment.id] = payment;
            });
            return {...state, [action.expenseId]: paymentsState};
        case RECEIVE_PAYMENTS:
            return action.payments;
        case RECEIVE_PAYMENT:
            return {...state, [action.expenseId]: action.payment};
        case UPDATE_PAYMENT:
            return {...state, [action.payment.id]: action.payment};
        default:
            return state;
    }
}

export default paymentsReducer;
