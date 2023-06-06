import { Form, Link } from "react-router-dom";
import { calculateSpentByBudged, formartCurrency, formatPercentage } from "../helpers";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";

const BudgetItem = ({budget, showDelete=false}) => {
    const {id, name , amount , color} = budget;
    const spent = calculateSpentByBudged(id);


  return (
    <div 
    className="budget"
    style={{
        "--accent":color
    }}
    >
        <div className="progress-text">
            <h3>{name}</h3>
            <p>{formartCurrency(amount)} de orçamento</p>
        </div>
        <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
        </progress>
        <div className="progress-text">
            <small>
                {formartCurrency(spent)}
            </small>
            <small>
                {formartCurrency(amount - spent)}
            </small>
        </div>
        {
            showDelete ? (
                <div className="flex-sm">
                    <Form 
                    method="post"
                    action="delete"
                    onSubmit={(event) => {
                        if(!confirm("Tem a certeza que pretende apagar este orçamento?")){
                            event.preventDefault();
                        }
                    }}
                    >
                        <button type="submit" className="btn">
                            <span>Apagar orçamento</span>
                            <TrashIcon width={20}/>
                        </button>
                    </Form>
                </div>
               
            ) : (
            <div className="flex-sm">
             <Link to={`/budget/${id}`} className="btn">
                <span>Ver detalhes</span>
                <BanknotesIcon width={20}/>
             </Link>
            </div>
            )
        }
    </div>
  )
}

export default BudgetItem