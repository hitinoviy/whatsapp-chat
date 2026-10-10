import { useState } from 'react'
import ChatPage from './components/ChatPage/ChatPage'
import Login from './components/Login/Login'
const STORAGE_KEY = 'greenApiCreds'

function loadCreds() {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY))
	} catch {
		return null
	}
}

export default function App() {
	const [creds, setCreds] = useState(loadCreds)

	function handleLogin(newCreds) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newCreds))
		setCreds(newCreds)
	}

	function handleLogout() {
		localStorage.removeItem(STORAGE_KEY)
		setCreds(null)
	}

	if (!creds) {
		return <Login onLogin={handleLogin} />
	}

	return <ChatPage creds={creds} onLogout={handleLogout} />
}
