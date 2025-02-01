import {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux"
import {getTicket, reset, closeTicket} from '../features/tickets/ticketSlice'
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import {useParams, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'



function Ticket() {
    const {ticket, isLoading, isSuccess, isError, message} = useSelector((state)=>state.tickets)
    const params = useParams()
    const dispatch = useDispatch()
    const {ticketId} = useParams()
    const navigate = useNavigate()

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        dispatch(getTicket(ticketId))

    }, [isError, message, ticketId])

    if(isLoading){
        return <Spinner/>
    }

    if(isError){
        return <h3>Someting went wrong</h3>
    }

  return (
    <div className='ticket-page'>
        <header className='ticket-header'> 
            <BackButton url='/tickets' />
            <h3>
                Question Id: {ticket._id}
            </h3>
            <hr />
            <div className="ticket-desc">
                <p>{ticket.description}</p>
            </div>
        </header>
        </div>
  )
}

export default Ticket