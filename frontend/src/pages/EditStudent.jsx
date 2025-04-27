import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    department: '',
    enrollmentyear: currentYear,
    isactive: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://student-management-1-oil5.onrender.com/api/student/${id}`);
        const student = response.data;
        
        // Format date to YYYY-MM-DD for input[type="date"]
        const formattedDob = student.dob ? new Date(student.dob).toISOString().split('T')[0] : '';
        
        setFormData({
          ...student,
          dob: formattedDob
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student:', error);
        toast.error('Failed to fetch student details');
        navigate('/students');
      }
    };

    fetchStudent();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate first name
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'First name is required';
    } else if (formData.firstname.trim().length < 2) {
      newErrors.firstname = 'First name must be at least 2 characters';
    }
    
    // Validate last name
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Last name is required';
    } else if (formData.lastname.trim().length < 2) {
      newErrors.lastname = 'Last name must be at least 2 characters';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = 'Enter a valid email address';
      }
    }
    
    // Validate date of birth
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }
    
    // Validate department
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    
    // Validate enrollment year
    if (!formData.enrollmentyear) {
      newErrors.enrollmentyear = 'Enrollment year is required';
    } else {
      const year = parseInt(formData.enrollmentyear);
      if (isNaN(year) || year < 2000 || year > currentYear) {
        newErrors.enrollmentyear = `Year must be between 2000 and ${currentYear}`;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }
    
    try {
      await axios.put(`https://student-management-1-oil5.onrender.com/api/student/${id}`, formData);
      toast.success('Student updated successfully');
      navigate('/students');
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error('Failed to update student');
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading student information...</p>
      </div>
    );
  }

  return (
    <div className="edit-student">
      <div className="card">
        <div className="card-header bg-warning">
          <h4 className="mb-0">Edit Student</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstname" className="form-label">First Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
              </div>
              
              <div className="col-md-6 mb-3">
                <label htmlFor="lastname" className="form-label">Last Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="dob" className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
              </div>
              
              <div className="col-md-6 mb-3">
                <label htmlFor="department" className="form-label">Department</label>
                <input
                  type="text"
                  className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                  id="department"
                  name="department"
                  value={formData.department}
                  placeholder="e.g., Computer Science"
                  onChange={handleChange}
                />
                {errors.department && <div className="invalid-feedback">{errors.department}</div>}
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="enrollmentyear" className="form-label">Enrollment Year</label>
                <input
                  type="number"
                  className={`form-control ${errors.enrollmentyear ? 'is-invalid' : ''}`}
                  id="enrollmentyear"
                  name="enrollmentyear"
                  min="2000"
                  max={currentYear}
                  value={formData.enrollmentyear}
                  onChange={handleChange}
                />
                {errors.enrollmentyear && <div className="invalid-feedback">{errors.enrollmentyear}</div>}
              </div>
              
              <div className="col-md-6 mb-3">
                <div className="form-check mt-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isactive"
                    name="isactive"
                    checked={formData.isactive}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="isactive">
                    Active Student
                  </label>
                </div>
              </div>
            </div>
            
            <div className="d-flex justify-content-end mt-3">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate('/students')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-warning">
                Update Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;