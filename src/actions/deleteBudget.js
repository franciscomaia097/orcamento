import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";
import { redirect } from "react-router-dom";

export function deleteBudget({params}){
    try {
        deleteItem({
            key: "budgets",
            id: params.id
        });

        const associatedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id
        });

        associatedExpenses.forEach((expenses) => {
            deleteItem({
                key:"expenses",
                id:expenses.id
            })
        })

        toast.success("Orçamento excluído com sucesso!");
    }
    catch(e){
        throw new Error("Ocorreu um problema ao excluir seu orçamento.")
    }

    return redirect("/");
}