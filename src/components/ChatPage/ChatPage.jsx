import { useEffect, useState } from 'react'
import { sendMessage } from '../../api/greenApi'
import { useNotifications } from '../../hooks/useNotifications'
import ChatWindow from '../ChatWindow/ChatWindow'
import Sidebar from '../Sidebar/Sidebar'
import styles from './ChatPage.module.css'

export default function ChatPage({ creds, onLogout }) {
	const [chats, setChats] = useState([])
	const [activeChatId, setActiveChatId] = useState(null)

	useEffect(() => {
		function handlePopState() {
			setActiveChatId(null)
		}

		window.addEventListener('popstate', handlePopState)
		return () => window.removeEventListener('popstate', handlePopState)
	}, [])

	function openChat(chatId) {
		if (!window.history.state?.chatOpen) {
			window.history.pushState({ chatOpen: true }, '')
		}
		setActiveChatId(chatId)
	}

	function closeChat() {
		if (window.history.state?.chatOpen) {
			window.history.back()
		} else {
			setActiveChatId(null)
		}
	}

	function createChat(chatId) {
		setChats(prev =>
			prev.some(chat => chat.chatId === chatId)
				? prev
				: [{ chatId, messages: [] }, ...prev]
		)
		openChat(chatId)
	}

	function addMessage(chatId, message) {
		setChats(prev => {
			const exists = prev.some(chat => chat.chatId === chatId)

			if (!exists) {
				return [{ chatId, messages: [message] }, ...prev]
			}

			return prev.map(chat => {
				if (chat.chatId !== chatId) return chat

				if (chat.messages.some(m => m.id === message.id)) return chat

				return { ...chat, messages: [...chat.messages, message] }
			})
		})
	}
	useNotifications(creds, addMessage)

	async function handleSend(text) {
		const result = await sendMessage(creds, activeChatId, text)

		addMessage(activeChatId, {
			id: result.idMessage,
			text,
			outgoing: true,
			timestamp: Date.now(),
		})
	}

	const activeChat = chats.find(chat => chat.chatId === activeChatId)

	return (
		<div className={`${styles.page} ${activeChat ? styles.chatOpen : ''}`}>
			<Sidebar
				chats={chats}
				activeChatId={activeChatId}
				onSelectChat={openChat}
				onCreateChat={createChat}
				onLogout={onLogout}
			/>

			{activeChat ? (
				<ChatWindow
					chat={activeChat}
					onSend={handleSend}
					onBack={closeChat}
				/>
			) : (
				<div className={styles.empty}>
					Выберите чат или создайте новый по номеру телефона
				</div>
			)}
		</div>
	)
}
