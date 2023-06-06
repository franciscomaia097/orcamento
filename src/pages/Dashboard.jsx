//rrd imports
import { Link, useLoaderData } from "react-router-dom";

//helper functions
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../helpers"

//components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";




//library imports
import { toast } from "react-toastify";
import Table from "../components/Table";


//loader
export function dashboardLoader () {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");

    return { userName, budgets , expenses};
}

//action

export async function dashboardAction ({request}){

  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data);
  //new user submission
  if(_action === "newUser"){
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`)
    } catch(e) {
      throw new Error ("Houve um problema ao criar a sua conta.")
    }
  }
  if(_action === "createBudget"){
    try{
      //create budget
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      })

      return toast.success("Orçamento criado!")
    } catch(e){
      throw new Error ("Houve um problema a criar o orçamento")
    }
  }
  if(_action === "createExpense"){
    try{
      createExpense({
        name: values.newExpense, 
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget
      });

      return toast.success(`Expense ${values.newExpense} created!`)
    } catch(e){
      throw new Error ("Houve um problema a criar o orçamento!")
    }
  }
  if(_action === "deleteExpense"){
    try{
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });

      return toast.success("Despesa apagada!");
    } catch(e){
      throw new Error ("Houve um problema a criar o orçamento!")
    }
  }
}

const Dashboard = () => {
  const {userName, budgets, expenses} = useLoaderData();

  return (
    <>
      {
        userName ? (
          <div className="dashboard">
            <h1>Bem vindo de volta, <span className="accent">{userName}</span></h1>
            <div className="grid-sm">
            { 
              budgets && budgets.length > 0 ? (

              
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm/>
                  <AddExpenseForm budgets={budgets}/>
                </div>
                <h2>Orçamentos existentes</h2>
                <div className="budgets">
                  {
                    budgets.map((budget) => (
                      <BudgetItem key={budget.id} budget={budget}/>
                    ))
                  }
                </div>
                  {
                    expenses && expenses.length > 0 && (
                      <div className="grid-md">
                        <h2>Depesas recentes</h2>
                        <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)}/>
                        {expenses.length > 8 &&
                        <Link to="expenses" className="btn btn--dark">
                        Ver todas as despesas
                        </Link>
                        }
                      </div>
                    )
                  }
              </div>

              ) : (
              
                <div className="grid-sm">
                  <p>O orçamento pessoal é o segredo da liberdade financeira</p>
                  <p>Crie um orçamento para começar!</p>
                  <AddBudgetForm/>
                </div>

              )
            }
            </div>
          </div>
        ) : (
          <Intro/>
        )
      }
      
    </>
  )
}

export default Dashboard