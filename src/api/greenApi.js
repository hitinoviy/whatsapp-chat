function getApiUrl(idInstance) {
	return `https://${idInstance.slice(0, 4)}.api.green-api.com`
}

function buildUrl(creds, method, extra = '') {
	const apiUrl = getApiUrl(creds.idInstance)
	return `${apiUrl}/waInstance${creds.idInstance}/${method}/${creds.apiTokenInstance}${extra}`
}

async function request(url, options) {
	const response = await fetch(url, options)

	if (!response.ok) {
		throw new Error(`Ошибка запроса: ${response.status}`)
	}

	return response.json()
}

export function getStateInstance(creds) {
	return request(buildUrl(creds, 'getStateInstance'))
}

export function sendMessage(creds, chatId, message) {
	return request(buildUrl(creds, 'sendMessage'), {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ chatId, message }),
	})
}

export function receiveNotification(creds, timeout = 5) {
	return request(
		buildUrl(creds, 'receiveNotification', `?receiveTimeout=${timeout}`)
	)
}

export function deleteNotification(creds, receiptId) {
	return request(buildUrl(creds, 'deleteNotification', `/${receiptId}`), {
		method: 'DELETE',
	})
}
