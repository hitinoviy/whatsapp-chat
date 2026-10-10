import { useState } from 'react'
import { getStateInstance } from '../../api/greenApi'
import styles from './Login.module.css'

export default function Login({ onLogin }) {
	const [idInstance, setIdInstance] = useState('')
	const [apiTokenInstance, setApiTokenInstance] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	async function handleSubmit(event) {
		event.preventDefault()
		setError('')

		const creds = {
			idInstance: idInstance.trim(),
			apiTokenInstance: apiTokenInstance.trim(),
		}

		if (!creds.idInstance || !creds.apiTokenInstance) {
			setError('Заполните все поля')
			return
		}

		setLoading(true)
		try {
			const state = await getStateInstance(creds)

			if (state.stateInstance !== 'authorized') {
				setError(`Инстанс не авторизован (статус: ${state.stateInstance})`)
				return
			}

			onLogin(creds)
		} catch {
			setError('Не удалось подключиться. Проверьте данные.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h1 className={styles.title}>Вход в GREEN-API</h1>

				<input
					className={styles.input}
					placeholder='idInstance'
					value={idInstance}
					onChange={e => setIdInstance(e.target.value)}
				/>
				<input
					className={styles.input}
					placeholder='apiTokenInstance'
					value={apiTokenInstance}
					onChange={e => setApiTokenInstance(e.target.value)}
				/>

				{error && <p className={styles.error}>{error}</p>}

				<button className={styles.button} type='submit' disabled={loading}>
					{loading ? 'Проверяем...' : 'Войти'}
				</button>
			</form>
		</div>
	)
}
