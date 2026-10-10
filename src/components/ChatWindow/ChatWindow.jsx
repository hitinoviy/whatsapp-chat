import { useEffect, useRef } from 'react'
import { formatChatId } from '../../utils/phone'
import Message from '../Message/Message'
import MessageInput from '../MessageInput/MessageInput'
import styles from './ChatWindow.module.css'

export default function ChatWindow({ chat, onSend, onBack }) {
	const bottomRef = useRef(null)

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [chat.messages.length, chat.chatId])

	return (
		<section className={styles.window}>
			<header className={styles.header}>
				<button className={styles.back} onClick={onBack} aria-label='Назад'>
					←
				</button>
				<div className={styles.avatar} />
				<span className={styles.name}>{formatChatId(chat.chatId)}</span>
			</header>

			<div className={styles.messages}>
				{chat.messages.map(message => (
					<Message key={message.id} message={message} />
				))}
				<div ref={bottomRef} />
			</div>

			<MessageInput onSend={onSend} />
		</section>
	)
}
