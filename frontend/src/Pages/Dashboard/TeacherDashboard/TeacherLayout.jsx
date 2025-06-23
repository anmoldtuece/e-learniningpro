import React from 'react'
import DashboardTeacher from './DashboardTeacher'
import { Outlet } from 'react-router-dom'

function TeacherLayout() {
  return (
    <>
    <DashboardTeacher/>
    <Outlet/>
    </>
  )
}

export default TeacherLayout