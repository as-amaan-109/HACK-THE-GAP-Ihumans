"use client"
import React from 'react'
import Header from '../components/Header'

const MergePreviewLayout = ({children}) => {
  return (
    <>
    <Header/>
    {children}
    </>
  )
}

export default MergePreviewLayout