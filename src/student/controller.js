const pool = require("../../db");
const quieries = require("./queries");

const getStudents = (req, res) => {
  pool.query(quieries.getStudents, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
const getStudentBYID = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(quieries.getStudentById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  pool.query(quieries.checkEmailExist, [email], (error, results) => {
    if (results.rows.length) {
      res.send(" Email Already Exist");
    }
    pool.query(
      quieries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).send("Student Created Successfully!");
      }
    );
  });
};

const deleteStudentBYID = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(quieries.getStudentById, [id], (error, results) => {
    const noStudentsFound = !results.rows.length;
    if (noStudentsFound) {
      res.send("student does not exist in database");
    }
    pool.query(quieries.removeStudentById, [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Student Deleted Successfully!");
    });
  });
};
const updateStudentBYID = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  pool.query(quieries.getStudentById, [id], (error, results) => {
    const noStudentsFound = !results.rows.length;
    if (noStudentsFound) {
      res.send("student does not exist in database");
    }
    pool.query(quieries.updateStudentById, [name, id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Student updated Successfully!");
    });
  });
};

module.exports = {
  getStudents,
  getStudentBYID,
  addStudent,
  deleteStudentBYID,
  updateStudentBYID,
};
