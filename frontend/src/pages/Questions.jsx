import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getTickets, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import Backbutton from '../components/BackButton'
import QuestionItem from '../components/QuestionItem'

function Questions() {
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
        <div className="tickets">
            <div className="ticket-headings">
                <div>Date</div>
                {/* {/* <div>Product</div> */}
                <div>Question</div> 
                <div></div>
            </div>
            {
                tickets.map((ticket) => (
                    <QuestionItem key={ticket._id} ticket={ticket} />
                ))
            }
        </div>
    </>
  )
}

export default Questions 