import React from 'react'
import { Form } from 'react-router-dom'

//library
import { UserPlusIcon } from '@heroicons/react/24/solid'

//assets
import illustration from '../assets/illustration.jpg'

const Intro = () => {
  return (
    <div className='intro'>
        <div>
            <h1>
                Assuma o controlo do <span className='accent'>seu dinheiro</span>
            </h1>
            <p>
                Orçamento pessoal é o segredo da liberdade financeira. Comece sua jornada hoje.
            </p>
            <Form method='post'>
                <input 
                type="text" 
                name='userName' 
                placeholder='Introduza o seu nome' 
                autoComplete='given-name'
                required/>
                <input type="hidden" name='_action' value="newUser"/>
                <button type='submit' className='btn btn--dark'>
                    <span>Criar Conta</span>
                    <UserPlusIcon width={20}/>
                </button>
            </Form>
        </div>
        <img src={illustration} alt="Person with money" width={600}/>
    </div>
  )
}

export default Intro