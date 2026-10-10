export function parseIncomingMessage(body) {
	if (body.typeWebhook !== 'incomingMessageReceived') return null

	const { chatId } = body.senderData

	// групповые чаты не поддерживаем
	if (chatId.endsWith('@g.us')) return null

	const { typeMessage } = body.messageData
	let text

	if (typeMessage === 'textMessage') {
		text = body.messageData.textMessageData.textMessage
	} else if (typeMessage === 'extendedTextMessage') {
		text = body.messageData.extendedTextMessageData.text
	} else {
		return null
	}

	return {
		chatId,
		message: {
			id: body.idMessage,
			text,
			outgoing: false,
			timestamp: body.timestamp * 1000,
		},
	}
}
