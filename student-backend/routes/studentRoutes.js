const express = require("express");

const router = express.Router();

const {
    createStudent,
    getStudents,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

// Create Student
router.post("/students", createStudent);

// Get All Students
router.get("/students", getStudents);

// Update Student
router.put("/students/:id", updateStudent);

// Delete Student
router.delete("/students/:id", deleteStudent);

module.exports = router;