import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import arrow icons
import { useSelector, useDispatch } from "react-redux";
import { updateAnswer } from "../features/tickets/ticketSlice";  // Import addAnswer action

function AdminTicketItem({ ticket }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets);
  const [isAnswering, setIsAnswering] = useState(false);  // To toggle the answer editing
  const [answer, setAnswer] = useState(ticket.answer || '');  // To store the current answer text
  const dispatch = useDispatch();

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);  // Update the answer input text
  };

  const handleSubmitAnswer = (ticketId) => {
    // Dispatch the addAnswer action with the ticket ID and answer text
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
        <div>{ticket.question}</div>
        <div className="toggle-icon">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {isOpen && (
        <div className='ticket answer-box'>
          {!ticket.answer && !isAnswering && (
            // Show the Answer button if there's no answer and not in edit mode
            <button className='button-ans' onClick={() => setIsAnswering(true)}>Answer</button>
          )}

          {isAnswering ? (
            // Show the textarea and submit/cancel buttons when in editing mode
            <div className="answer-edit">
              <textarea className='textarea-answer'
                value={answer}
                onChange={handleAnswerChange}
                placeholder="Write the answer here..."
              />
              <button className='submit-btn-ans' onClick={() => handleSubmitAnswer(ticket._id)}>Submit</button>
              <button className='cancel-button-ans' onClick={handleCancelAnswer}>Cancel</button>  {/* Cancel button */}
            </div>
          ) : (
            // If there's an answer, just display it
            <div className="answer-text">
              {ticket.answer && !isAnswering && ( <div className='for-update-ans'> 
                <div>
                    {ticket.answer}
                    </div>
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
