// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import Home from './pages/Home';
import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';
import EditStudentForm from './components/EditStudentForm';

function App() {
  return (
    <Router>
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
  <Link className="navbar-brand" to="/">StudentSys</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
    <ul className="navbar-nav d-flex flex-row gap-3">
      <li className="nav-item">
        <Link className="nav-link" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/students">Students</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/add">Add Student</Link>
      </li>
    </ul>
    </div>
   </nav>
   </div>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/add" element={<AddStudentForm />} />
          <Route path="/edit/:id" element={<EditStudentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;