import { PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom'

const AddExpenseForm = ({ budgets }) => {
    const fetcher = useFetcher();

    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() =>{
        if(!isSubmitting){
            //clear form
            formRef.current.reset();


            //reset focus
            focusRef.current.focus;

        }
    }, [isSubmitting])

  return (
    <div className='form-wrapper'>
        <h2 className='h3'>Adicionar nova despesa a {" "} <span className="accent">{budgets.length === 1 && `${budgets.map((bud) => 
            bud.name)}`}
        </span>{" "}
        
        </h2>
        <fetcher.Form 
        method='post'
        className='grid-sm'
        ref={formRef}
        >

            <div className="expense-inputs">
                <div className="grid-xs">
                    <label htmlFor="newExpense">Nome da despesa</label>
                    <input 
                    type="text"
                    name='newExpense'
                    id='newExpense'
                    placeholder='Exemplo: Café'
                    ref={focusRef}
                    required
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newExpenseAmount">Quantidade</label>
                    <input 
                    type="number"
                    step="0.01"
                    inputMode='decimal'
                    name='newExpenseAmount'
                    id='newExpenseAmount'
                    placeholder='Exemplo: 2.50'
                    required
                    />
                </div>
                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">Categoria</label>
                    <select name="newExpenseBudget" id="newExpenseBudget" required>
                        {
                            budgets.sort((a, b) => a.createdAt - b.createdAt).map((budget) =>{
                                return ( 
                                    <option key={budget.id} value={budget.id}>
                                        {budget.name}
                                    </option>
                                    )
                            })
                        }
                    </select>
                </div>
            </div>
            <input type="hidden" name='_action' value="createExpense" />
            <button type='submit' className='btn btn--dark' disabled={isSubmitting}>
             {
                isSubmitting ? (
                <span>Submitting...</span>
                ) : (
                    <>
                        <span>Adicionar despesa</span>
                        <PlusCircleIcon width={20}/>
                    </>
                )
             }
            </button>
        </fetcher.Form>
    </div>
  )
}

export default AddExpenseForm