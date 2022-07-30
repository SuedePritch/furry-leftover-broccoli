import React from 'react'
import AdminNav from '../components/AdminNav'
import { useState } from 'react';
function AdminMain() {
  const [page ,setPage] = useState('Products')
  
  return (
    <AdminNav state={{page, setPage}}/>
  )
}

export default AdminMain