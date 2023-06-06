import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import Main, { mainLoader } from "./layouts/Main";
import { redirect } from "react-router-dom";


//Actions
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget";

//Library imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoarder } from "./pages/BudgetPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: mainLoader,
    errorElement: <Error/>,
    children:[
      {
        index: true,
        element: <Dashboard/>,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error/>
      },
      {
        path: "expenses",
        element: <ExpensesPage/>,
        loader: expensesLoader,
        errorElement: <Error/>,
        action: expensesAction
      },
      {
        path: "budget/:id",
        element: <BudgetPage/>,
        loader: budgetLoarder,
        action: budgetAction,
        errorElement: <Error/>,
        children:[
          {
            path: "delete",
            action: deleteBudget
          }
        ]
      },
      {
        path:"logout",
        action: logoutAction,
      }
    ]
    
  },
]);


function App() {
  return <div className="App">
  <RouterProvider router={router} />
  <ToastContainer/>
  </div>;
}

export default App;
