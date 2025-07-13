import { Router } from "express";
import { addClass, addCourseStudent, addCourseTeacher, canStudentEnroll, enrolledcourseSTD, enrolledcourseTeacher, getCourse, getcourseTeacher, stdEnrolledCoursesClasses, teacherEnrolledCoursesClasses, getStudentClasses } from "../controllers/course.controller.js";
import { authSTD } from "../middlewares/stdAuth.middleware.js";
import { authTeacher } from "../middlewares/teacherAuth.middleware.js";
import { course } from "../models/course.model.js";
import { student } from "../models/student.model.js"; // adjust path if needed

const router = Router()


router.route("/all").get(getCourse)

router.route("/:coursename").get(getcourseTeacher)

router.route("/:coursename/create/:id").post(authTeacher, addCourseTeacher)

router.route("/:coursename/:courseID/add/student/:id").post(authSTD, addCourseStudent)

router.route("/:coursename/:courseID/verify/student/:id").post(authSTD, canStudentEnroll)

router.route("/student/:id/enrolled").get(authSTD, enrolledcourseSTD)

router.route("/teacher/:id/enrolled").get(authTeacher, enrolledcourseTeacher)

router.route("/:courseId/teacher/:teacherId/add-class").post(authTeacher, addClass)

router.route("/classes/student/:studentId").get(authSTD, stdEnrolledCoursesClasses)

router.route("/classes/teacher/:teacherId").get(authTeacher, teacherEnrolledCoursesClasses)

router.get('/classes/student/:ID', getStudentClasses);

router.patch('/teacher/:teacherId/course/:courseId/complete', authTeacher, async (req, res) => {
  try {
    const { courseId } = req.params;
    const updatedCourse = await course.findByIdAndUpdate(
      courseId,
      { status: 'completed' },
      { new: true }
    );
    if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course marked as completed', data: updatedCourse });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.route("/student/:id/completed").get(authSTD, async (req, res) => {
  try {
    const stdID = req.params.id;
    if (!stdID || stdID !== req.Student._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch current student details
    const studentDoc = await student.findById(stdID);
    const studentName = studentDoc
      ? `${studentDoc.Firstname} ${studentDoc.Lastname}`
      : "N/A";

    // Find completed courses and populate teacher
    const completedCourses = await course.find({
      enrolledStudent: stdID,
      status: "completed"
    })
    .populate('enrolledteacher', 'Firstname Lastname');

    // Map names to response
    const coursesWithNames = completedCourses.map(c => ({
      ...c.toObject(),
      teacherName: c.enrolledteacher
        ? `${c.enrolledteacher.Firstname} ${c.enrolledteacher.Lastname}`
        : "N/A",
      studentName, // always current student
    }));

    res.json({ success: true, data: coursesWithNames });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.route("/teacher/:id/completed").get(authTeacher, async (req, res) => {
  try {
    const teacherId = req.params.id;
    const completedCourses = await course.find({
      enrolledteacher: teacherId,
      status: "completed"
    });
    res.json({ data: completedCourses });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;