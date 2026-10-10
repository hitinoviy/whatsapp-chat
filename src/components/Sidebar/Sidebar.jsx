import { useState } from 'react'
import {
	formatChatId,
	isValidPhone,
	normalizePhone,
	toChatId,
} from '../../utils/phone'
import styles from './Sidebar.module.css'

export default function Sidebar({
	chats,
	activeChatId,
	onSelectChat,
	onCreateChat,
	onLogout,
}) {
	const [phone, setPhone] = useState('')
	const [error, setError] = useState('')

	function handleSubmit(event) {
		event.preventDefault()
		const digits = normalizePhone(phone)

		if (!isValidPhone(digits)) {
			setError('Введите номер в международном формате')
			return
		}

		onCreateChat(toChatId(digits))
		setPhone('')
		setError('')
	}

	return (
		<aside className={styles.sidebar}>
			<header className={styles.header}>
				<span className={styles.title}>Чаты</span>
				<button className={styles.logout} onClick={onLogout}>
					Выйти
				</button>
			</header>

			<form className={styles.newChat} onSubmit={handleSubmit}>
				<input
					className={styles.input}
					placeholder='Номер телефона, напр. 79991234567'
					value={phone}
					onChange={e => setPhone(e.target.value)}
				/>
				<button className={styles.add} type='submit'>
					Создать
				</button>
			</form>
			{error && <p className={styles.error}>{error}</p>}

			<ul className={styles.list}>
				{chats.map(chat => {
					const lastMessage = chat.messages[chat.messages.length - 1]

					return (
						<li
							key={chat.chatId}
							className={`${styles.item} ${chat.chatId === activeChatId ? styles.active : ''}`}
							onClick={() => onSelectChat(chat.chatId)}
						>
							<div className={styles.avatar} />
							<div className={styles.info}>
								<div className={styles.name}>{formatChatId(chat.chatId)}</div>
								<div className={styles.preview}>
									{lastMessage ? lastMessage.text : 'Нет сообщений'}
								</div>
							</div>
						</li>
					)
				})}
			</ul>
		</aside>
	)
}
