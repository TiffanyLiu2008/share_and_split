import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import ExpenseIndex from '../components/ExpenseIndex';
import CreateExpense from '../components/CreateExpense';
import ExpenseDetails from '../components/ExpenseDetails';
import UpdateExpense from '../components/UpdateExpense';
import FriendIndex from '../components/FriendIndex';
import PaymentIndex from '../components/PaymentIndex';

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/friends",
        element: <FriendIndex/>,
        exact: true
      },
      {
        path: "/payments",
        element: <PaymentIndex/>,
        exact: true
      },
      {
        path: "/expenses/new",
        element: <CreateExpense/>,
        exact: true
      },
      {
        path: "/expenses/:expenseId/edit",
        element: <UpdateExpense/>,
      },
      {
        path: "/expenses/:expenseId",
        element: <ExpenseDetails/>,
      },
      {
        path: "/expenses",
        element: <ExpenseIndex/>,
        exact: true
      },
      {
        path: "/",
        element: <HomePage/>,
        exact: true
      },
    ],
  },
]);
