import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://management-sys-backend.onrender.com/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://management-sys-backend.onrender.com/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="student-list-container" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 className="mb-4">Student List</h2>
      <Link to="/add" className="btn btn-primary mb-3"><button >Add New Student</button></Link>
      <table className="table table-bordered table-hover" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={tableHeaderStyle}>Student ID</th>
            <th style={tableHeaderStyle}>First Name</th>
            <th style={tableHeaderStyle}>Last Name</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>DOB</th>
            <th style={tableHeaderStyle}>Department</th>
            <th style={tableHeaderStyle}>Enrollment Year</th>
            <th style={tableHeaderStyle}>Active</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center" style={{ padding: '10px' }}>No students found.</td>
            </tr>
          ) : (
            students.map(student => (
              <tr key={student._id}>
                <td style={tableCellStyle}>{student.studentId}</td>
                <td style={tableCellStyle}>{student.firstname}</td>
                <td style={tableCellStyle}>{student.lastname}</td>
                <td style={tableCellStyle}>{student.email}</td>
                <td style={tableCellStyle}>{student.dob}</td>
                <td style={tableCellStyle}>{student.department}</td>
                <td style={tableCellStyle}>{student.enrollmentYear}</td>
                <td style={tableCellStyle}>{student.isactive ? 'Yes' : 'No'}</td>
                <td style={tableCellStyle}>
                  <div className="action-buttons" style={{ display: 'flex', gap: '5px' }}>
                    <Link to={`/edit/${student._id}`} className="edit-btn" style={actionButtonStyle}>Edit</Link>
                    <button onClick={() => handleDelete(student._id)} className="delete-btn" style={actionButtonStyle}>Delete</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  padding: '10px',
  border: '1px solid #dee2e6',
  fontWeight: 'bold',
  textAlign: 'left',
};

const tableCellStyle = {
  padding: '10px',
  border: '1px solid #dee2e6',
};

const actionButtonStyle = {
  padding: '5px 10px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.9rem',
};

export default StudentList;
