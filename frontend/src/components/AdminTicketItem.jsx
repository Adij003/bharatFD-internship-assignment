import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { updateAnswer } from "../features/tickets/ticketSlice";  // Import addAnswer action
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  // Import ReactQuill styles

function AdminTicketItem({ ticket }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets);
  const [isAnswering, setIsAnswering] = useState(false);  // To toggle the answer editing
  const [answer, setAnswer] = useState(ticket.answer || '');  // To store the current answer text
  const dispatch = useDispatch();

  const handleAnswerChange = (value) => {
    setAnswer(value);  // Update the answer input text with ReactQuill value
  };

  const handleSubmitAnswer = (ticketId) => {
    // Dispatch the updateAnswer action with the ticket ID and answer text
    dispatch(updateAnswer({ ticketId, answer }));
    setIsAnswering(false);  // After submit, close the input field
  };

  const handleCancelAnswer = () => {
    setAnswer(ticket.answer || '');  // Reset the answer field to the original answer (or empty if no answer)
    setIsAnswering(false);  // Close the answer editing mode
  };

  const handleUpdateClick = () => {
    setIsAnswering(true);  // Open the input field for updating the answer
  };

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
          {!ticket.answer && !isAnswering && (
            <button className='button-ans' onClick={() => setIsAnswering(true)}>Answer</button>
          )}

          {isAnswering ? (
            <div className="answer-edit">
              <ReactQuill
                value={answer}
                onChange={handleAnswerChange}
                placeholder="Write the answer here..."
              />
              <button className='submit-btn-ans' onClick={() => handleSubmitAnswer(ticket._id)}>Submit</button>
              <button className='cancel-button-ans' onClick={handleCancelAnswer}>Cancel</button>
            </div>
          ) : (
            <div className="answer-text">
              {ticket.answer && !isAnswering && (
                <div className='for-update-ans'> 
                  <div 
        dangerouslySetInnerHTML={{ __html: ticket.answer }} 
      />
                  <button className='button-update' onClick={handleUpdateClick}>Update Answer</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AdminTicketItem;
