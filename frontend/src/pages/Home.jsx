import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {toast} from 'react-toastify'
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Home() {
  const { user } = useSelector((state) => state.auth);

  // Check if user exists before accessing isAdmin
  const [isAdmin] = useState(user ? user.isAdmin : false);

  return (
    <>
      <section className='heading'>
        {isAdmin ? (
          <h1>Welcome Admin</h1>  // If user is admin, show 'Welcome Admin'
        ) : (
          <h1>What do you need help with?</h1>  // If not, show 'What do you need help with?'
        )}

        {!isAdmin && <p>Please choose from an option below</p>}  
      </section>

      {!isAdmin && (  // Only show this link if the user is not an admin
        <Link to='/new-ticket' className='btn btn-reverse btn-block'>
          <FaQuestionCircle /> Ask a new Question
        </Link>
      )}

      
      <Link to={isAdmin ? '/admin-tickets' : '/tickets'} className='btn btn-block'>
        <FaTicketAlt /> View all FAQs
      </Link>
    </>
  )
}

export default Home
