import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import arrow icons

function QuestionItem({ ticket }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      
      <div className='ticket' onClick={() => setIsOpen(!isOpen)}>
        <div>{new Date(ticket.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
        {/* <div>{ticket.question}</div> */}
        <div 
        dangerouslySetInnerHTML={{ __html: ticket.question }} 
      />
        <div className="toggle-icon">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      
      {isOpen && (
  <div className='ticket answer-box'>
    <div className={`answer-text ${ticket.answer ? '' : 'unanswered'}`}>
      {ticket.answer ? (
        <div 
          dangerouslySetInnerHTML={{ __html: ticket.answer }} // Render HTML content here
        />
      ) : (
        "Not yet answered, we will respond to it shortly."
      )}
    </div>
  </div>
)}



    </>
  );
}

export default QuestionItem;
