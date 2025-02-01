import axios from 'axios'

const API_URL = '/api/faqs/'

// Create new ticket

const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, ticketData, config)

    return response.data
}

const getTickets = async () => {
   

    const response = await axios.get(API_URL)

    console.log('getting all the faqs: ', response.data)

    return response.data
}

const getTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + ticketId, config)

    return response.data
}

const closeTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + ticketId, {status: 'closed'}, config)

    return response.data
}

// Update answer

const updateAnswer = async (ticketId, answer, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + ticketId, { answer }, config)
    return response.data
}


const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket,
    updateAnswer
}

export default ticketService