// server.js
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// GET all employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await prisma.employees.findMany();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new employee
app.post('/employees', async (req, res) => {
  const { firstName, lastName, address, city, state, zip, email, salary } = req.body;

  try {
    const newEmployee = await prisma.employees.create({
      data: {
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        email,
        salary: salary ? parseFloat(salary) : null,
      },
    });
    res.json(newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
