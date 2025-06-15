import { Router } from "express";
import {
  createHardcodedAdmin,
  adminLogin,
  adminLogout,
  approveStudent,
  approveTeacher,
  checkStudentDocuments,
  checkTeacherDocuments,
  forApproval,
  sendmessage,
  allmessages,
  readMessage,
  toapproveCourse,
  approveCourse
} from "../controllers/admin.controller.js";
import { authAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router();

// Admin registration (hardcoded or signup)
router.route("/createHardcodedAdmin").post(createHardcodedAdmin)
// Can also use createHardcodedAdmin if needed

// Admin login
router.route("/login").post(adminLogin);

// Approve pending users
router.route("/:adminID/approve").post(authAdmin, forApproval);

// Approve specific student or teacher
router.route("/:adminID/approve/student/:studentID").post(authAdmin, approveStudent);
router.route("/:adminID/approve/teacher/:teacherID").post(authAdmin, approveTeacher);

// Check documents of student or teacher
router.route("/:adminID/documents/student/:studentID").get(authAdmin, checkStudentDocuments);
router.route("/:adminID/documents/teacher/:teacherID").get(authAdmin, checkTeacherDocuments);

// Admin logout
router.route("/logout").post(authAdmin, adminLogout);

// Contact us message (no auth needed)
router.route("/contact-us").post(sendmessage);

// Admin read all messages
router.route("/messages/all").get(authAdmin, allmessages);
router.route("/message/read").patch(authAdmin, readMessage);

// Courses waiting for approval
router.route("/:adminID/approve/course").get(authAdmin, toapproveCourse);
router.route("/:adminID/approve/course/:courseID").post(authAdmin, approveCourse);

export default router;
