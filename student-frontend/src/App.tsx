import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [students, setStudents] = useState<Student[]>([]);

  const [editId, setEditId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch Students
  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/students"
      );

      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Register / Update Student
  const registerStudent = async () => {
    if (!name || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (isEditing) {
        const response = await axios.put(
          `http://localhost:5000/api/students/${editId}`,
          {
            name,
            email,
            phone,
          }
        );

        alert(response.data.message);

        setIsEditing(false);
        setEditId("");
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/students",
          {
            name,
            email,
            phone,
          }
        );

        alert(response.data.message);
      }

      setName("");
      setEmail("");
      setPhone("");

      fetchStudents();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // Edit Student
  const editStudent = (student: Student) => {
    setName(student.name);
    setEmail(student.email);
    setPhone(student.phone);

    setEditId(student._id);
    setIsEditing(true);
  };

  // Delete Student
  const deleteStudent = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/students/${id}`
      );

      alert(response.data.message);

      fetchStudents();
    } catch (error) {
      console.log(error);
      alert("Unable to delete student");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

    return (
    <div className="container">
      <h1>🎓 Student Registration System</h1>

      <div className="form-container">
        <h2>
          {isEditing
            ? "Update Student"
            : "Student Registration"}
        </h2>

        <input
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={registerStudent}>
          {isEditing
            ? "Update Student"
            : "Register Student"}
        </button>

        {isEditing && (
          <button
            style={{
              marginTop: "10px",
              background: "#6c757d",
            }}
            onClick={() => {
              setName("");
              setEmail("");
              setPhone("");
              setEditId("");
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <div className="table-container">
        <h2>Registered Students</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  No Students Registered
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        editStudent(student)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteStudent(student._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;