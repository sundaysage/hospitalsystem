import React from 'react'
import Link from 'next/link'

const loginoption = () => {
  return (
    <div>
        <Link href='./patientlogin'>
        Patient
        </Link>
        <Link href='./doctorlogin'>
        Doctor
        </Link>
    </div>
  )
}

export default loginoption