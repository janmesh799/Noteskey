'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user)
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/login')
  }

  return (
    <div>
      <h1>Welcome to the Dashboard, {user}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}