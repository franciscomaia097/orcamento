
import { Form, NavLink } from "react-router-dom"
//assets
import logomark from "../assets/logomark.svg"

//library
import { TrashIcon } from '@heroicons/react/24/solid'

const Nav = ({userName}) => {
  return (
    <nav>
        <NavLink 
        to="/"
        aria-label="Go to home"
        >
        <img src={logomark} height={30} />
        <span>HomeBudget</span>
        </NavLink>
        {
            userName && (
                <Form
                method="post"
                action="/logout"
                onSubmit={(event) => {
                    if(!confirm("Apagar conta e todas as informações?")){
                        event.preventDefault();
                    }
                }}
                >
                <button type="submit" className="btn btn--warning">
                    <span>Apagar utilizador</span>
                    <TrashIcon width={20} />
                </button>

                </Form>
            )
        }
    </nav>
  )
}

export default Nav