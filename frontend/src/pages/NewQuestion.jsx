import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 



function NewQuestion() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets)

  const dispatch = useDispatch()
  const navigate = useNavigate()



  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    if(isError){
      toast.error(message) 
    }

    if(isSuccess){
      dispatch(reset())
      navigate('/faqs')
    }
    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createTicket({question}))
  };

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <>

    <BackButton url='/'/>
      <section className="heading">
        <h1>Ask a new Question</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name"> Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email"> Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
      

          <div className="form-group">
            <label htmlFor="question"> Question</label>
            <ReactQuill
              value={question}
              onChange={(value) => setQuestion(value)}
              placeholder="Please type your question here...."
            />
          </div>
          <div className="form-group form-group-submit-btn">
            <button className="btn btn-block submit-btn-new">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewQuestion;
