import React from 'react'
import AdminNav from '../components/AdminNav'
import { useState } from 'react';
function AdminMain() {
  const [page ,setPage] = useState('Delivery')
  
  return (
    <AdminNav state={{page, setPage}}/>
  )
}

export default AdminMain