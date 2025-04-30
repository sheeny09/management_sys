import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AddStudentForm.css';
const AddStudentForm = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true,
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://management-sys-backend.onrender.com/students', student);
      Swal.fire('Success!', 'Student added successfully!', 'success');
      navigate('/students');
    } catch (error) {
      console.error('Error adding student:', error);
      Swal.fire('Error!', 'Could not add student.', 'error');
    }
  };

  return (
    <div className="add-student-container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit} className="add-student-form">
        <div className="form-group">
          <label htmlFor="studentId" className="form-label">
            Student ID:
          </label>
          <input
            type="text"
            name="studentId"
            id="studentId"
            className="form-control"
            value={student.studentId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="form-control"
            value={student.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="form-control"
            value={student.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={student.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob" className="form-label">
            Date of Birth:
          </label>
          <input
            type="date"
            name="dob"
            id="dob"
            className="form-control"
            value={student.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department" className="form-label">
            Department:
          </label>
          <input
            type="text"
            name="department"
            id="department"
            className="form-control"
            value={student.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="enrollmentYear" className="form-label">
            Enrollment Year:
          </label>
          <input
            type="number"
            name="enrollmentYear"
            id="enrollmentYear"
            className="form-control"
            value={student.enrollmentYear}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isActive" className="form-label">
            Active:
          </label>
          <select
            name="isActive"
            id="isActive"
            className="form-select"
            value={student.isActive}
            onChange={handleChange}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudentForm;
