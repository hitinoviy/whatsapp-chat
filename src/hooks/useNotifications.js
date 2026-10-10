import { useEffect, useRef } from 'react'
import { deleteNotification, receiveNotification } from '../api/greenApi'
import { parseIncomingMessage } from '../utils/notifications'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function useNotifications(creds, onMessage) {
	const onMessageRef = useRef(onMessage)
	useEffect(() => {
		onMessageRef.current = onMessage
	})

	useEffect(() => {
		let active = true

		async function poll() {
			while (active) {
				try {
					const notification = await receiveNotification(creds)

					if (!active) break

					if (!notification) continue

					try {
						const parsed = parseIncomingMessage(notification.body)
						if (parsed) {
							onMessageRef.current(parsed.chatId, parsed.message)
						} else {
							console.debug('Пропущено уведомление', notification.body)
						}
					} finally {
						// удаляем всегда, иначе «плохое» уведомление навсегда заблокирует очередь
						await deleteNotification(creds, notification.receiptId)
					}
				} catch (error) {
					console.error('Ошибка получения уведомлений', error)
					await delay(3000)
				}
			}
		}

		poll()

		return () => {
			active = false
		}
	}, [creds])
}
