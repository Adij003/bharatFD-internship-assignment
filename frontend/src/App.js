import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import NewQuestion from "./pages/NewQuestion";
import PrivateRoute from "./components/PrivateRoute";
import Questions from "./pages/Questions";

import AdminQuestion from "./pages/AdminQuestion";

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-faq" element={<PrivateRoute />}>
              <Route path="/new-faq" element={<NewQuestion />} />
            </Route>
            
              <Route path="/faqs" element={<Questions />} />
              <Route path="/admin-tickets" element={<PrivateRoute />}>
              <Route path="/admin-tickets" element={<AdminQuestion />} />
            </Route>
            
            
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
