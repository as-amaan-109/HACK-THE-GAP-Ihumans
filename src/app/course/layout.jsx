import React from 'react'
import Header from '../components/Header'

const CourseLayout = ({children}) => {
  return (
    <>
    <Header/>
    {children}
    </>
  )
}

export default CourseLayout