import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import arrow icons

function TicketItem({ ticket }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      
      <div className='ticket' onClick={() => setIsOpen(!isOpen)}>
        <div>{new Date(ticket.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
        <div>{ticket.question}</div>
        <div className="toggle-icon">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      
      {isOpen && (
  <div className='ticket answer-box'>
    <div className={`answer-text ${ticket.answer ? '' : 'unanswered'}`}>
      {ticket.answer ? ticket.answer : "Not yet answered, we will respond to it shortly."}
    </div>
  </div>
)}


    </>
  );
}

export default TicketItem;
