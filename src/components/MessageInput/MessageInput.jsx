import { useState } from 'react'
import styles from './MessageInput.module.css'

export default function MessageInput({ onSend }) {
	const [text, setText] = useState('')
	const [sending, setSending] = useState(false)
	const [error, setError] = useState('')

	async function handleSubmit(event) {
		event.preventDefault()
		const trimmed = text.trim()
		if (!trimmed || sending) return

		setSending(true)
		setError('')
		try {
			await onSend(trimmed)
			setText('')
		} catch {
			setError('Не удалось отправить сообщение')
		} finally {
			setSending(false)
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			{error && <p className={styles.error}>{error}</p>}
			<div className={styles.row}>
				<input
					className={styles.input}
					placeholder='Введите сообщение'
					value={text}
					onChange={e => setText(e.target.value)}
				/>
				<button
					className={styles.send}
					type='submit'
					disabled={sending || !text.trim()}
				>
					Отправить
				</button>
			</div>
		</form>
	)
}
