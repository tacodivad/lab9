import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    salary: ''
  });

  // Fetch employees
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await axios.get('http://localhost:4000/employees');
        setEmployees(res.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    }
    fetchEmployees();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/employees', form);
      const res = await axios.get('http://localhost:4000/employees');
      setEmployees(res.data);
      setForm({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        salary: ''
      });
    } catch (err) {
      console.error('Error adding employee:', err);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Employees</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" />
        <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
        <input name="state" value={form.state} onChange={handleChange} placeholder="State" />
        <input name="zip" value={form.zip} onChange={handleChange} placeholder="ZIP" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input
          name="salary"
          type="number"
          step="0.01"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
        />
        <button type="submit">Add Employee</button>
      </form>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>ZIP</th>
            <th>Email</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName || '-'}</td>
              <td>{emp.lastName || '-'}</td>
              <td>{emp.address || '-'}</td>
              <td>{emp.city || '-'}</td>
              <td>{emp.state || '-'}</td>
              <td>{emp.zip || '-'}</td>
              <td>{emp.email || '-'}</td>
              <td>{emp.salary ? parseFloat(emp.salary).toFixed(2) : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
