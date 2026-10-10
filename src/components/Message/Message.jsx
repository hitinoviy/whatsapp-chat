import styles from './Message.module.css'

function formatTime(timestamp) {
	return new Date(timestamp).toLocaleTimeString('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
	})
}

export default function Message({ message }) {
	return (
		<div
			className={`${styles.bubble} ${message.outgoing ? styles.outgoing : styles.incoming}`}
		>
			<span className={styles.text}>{message.text}</span>
			<span className={styles.time}>{formatTime(message.timestamp)}</span>
		</div>
	)
}
