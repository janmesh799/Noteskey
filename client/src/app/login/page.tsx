'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { login } from '@/store/authSlice'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [username, setUsername] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const handleLogin = () => {
    // In a real app, you'd validate credentials here
    dispatch(login(username))
    document.cookie = `auth_token=${username}; path=/;`
    router.push('/dashboard')
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}