export function normalizePhone(input) {
	let digits = input.replace(/\D/g, '')

	if (digits.length === 11 && digits.startsWith('8')) {
		digits = '7' + digits.slice(1)
	}

	return digits
}

export function isValidPhone(digits) {
	return digits.length >= 10 && digits.length <= 15
}

export function toChatId(digits) {
	return `${digits}@c.us`
}

export function formatChatId(chatId) {
	return '+' + chatId.replace('@c.us', '')
}
