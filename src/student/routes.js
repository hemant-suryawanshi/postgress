const { Router } = require("express");
const contrller = require("./controller");

const router = Router();

router.get("/", contrller.getStudents);
router.post("/", contrller.addStudent);
router.get("/:id", contrller.getStudentBYID);
router.delete("/:id", contrller.deleteStudentBYID);
router.put("/:id", contrller.updateStudentBYID);

module.exports = router;
