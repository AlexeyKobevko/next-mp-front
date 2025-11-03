/**
 * Типы данных для сущности "Компания"
 */

export interface Company {
	id: string
	name: string
	description?: string
	slogan?: string
	website?: string
	logo?: string
	location: string
	locations?: string[] // Дополнительные офисы
	foundedYear?: number
	employeesCount?: number
	activeVacancies?: number
	about?: string // Полное описание компании
	benefits?: string[] // Преимущества работы в компании
	industry?: string // Отрасль
}

/**
 * Утилита для создания slug из названия компании
 */
export const createCompanySlug = (name: string): string => {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9а-яё]+/g, '-')
		.replace(/^-+|-+$/g, '')
}

/**
 * Утилита для форматирования количества сотрудников
 */
export const formatEmployeesCount = (count?: number): string => {
	if (!count) {
		return 'Не указано'
	}

	if (count < 1000) {
		return `${count} сотрудников`
	}

	if (count < 10000) {
		const thousands = (count / 1000).toFixed(1)
		return `${thousands}K сотрудников`
	}

	const thousands = Math.floor(count / 1000)
	return `${thousands}K+ сотрудников`
}

