import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getTickets, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import Backbutton from '../components/BackButton'

import AdminTicketItem from '../components/AdminTicketItem'

function AdminTickets() {
    const {tickets, isLoading, isSuccess} = useSelector((state) => state.tickets)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])
    useEffect(() => {
        return () => {
            if(isSuccess){
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    if(isLoading){
        return <Spinner/>
    }

  return (
    <>
    <Backbutton url='/'/>
        <h1>All FAQs</h1> 
        <p>Welcome to view all queries, you can answer the user FAQs from here</p>
        <div className="tickets">
            <div className="ticket-headings">
                <div>Date</div>
                {/* {/* <div>Product</div> */}
                <div>Question</div> 
                <div></div>
            </div>
            {
                tickets.map((ticket) => (
                    <AdminTicketItem key={ticket._id} ticket={ticket} />
                ))
            }
        </div>
    </>
  )
}

export default AdminTickets 