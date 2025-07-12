import { Router } from "express";
import { addClass, addCourseStudent, addCourseTeacher, canStudentEnroll, enrolledcourseSTD, enrolledcourseTeacher, getCourse, getcourseTeacher, stdEnrolledCoursesClasses, teacherEnrolledCoursesClasses, getStudentClasses } from "../controllers/course.controller.js";
import { authSTD } from "../middlewares/stdAuth.middleware.js";
import { authTeacher } from "../middlewares/teacherAuth.middleware.js";
import { course } from "../models/course.model.js";

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

export default router;