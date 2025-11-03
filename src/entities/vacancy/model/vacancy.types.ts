/**
 * Типы данных для сущности "Вакансия"
 */

export interface Vacancy {
    id: string;
    title: string;
    company: string;
    location: string;
    salary?: {
        from?: number;
        to?: number;
        currency: string;
    };
    type: 'remote' | 'office' | 'hybrid';
    tags: string[];
    description?: string;
    requirements?: string[];
    publishedAt: Date | string;
    popular?: boolean;
}

export type VacancyType = Vacancy['type'];

/**
 * Утилита для форматирования зарплаты
 */
export const formatSalary = (salary: Vacancy['salary']): string => {
    if (!salary) {
        return 'По договорённости';
    }

    const { from, to, currency } = salary;

    if (from && to) {
        return `${from.toLocaleString('ru-RU')} - ${to.toLocaleString('ru-RU')} ${currency}`;
    }

    if (from) {
        return `от ${from.toLocaleString('ru-RU')} ${currency}`;
    }

    if (to) {
        return `до ${to.toLocaleString('ru-RU')} ${currency}`;
    }

    return 'По договорённости';
};

/**
 * Утилита для форматирования даты публикации
 */
export const formatPublishedDate = (date: Date | string): string => {
    const published = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInMs = now.getTime() - published.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        return 'Сегодня';
    }

    if (diffInDays === 1) {
        return 'Вчера';
    }

    if (diffInDays < 7) {
        return `${diffInDays} дня назад`;
    }

    if (diffInDays < 30) {
        const weeks = Math.floor(diffInDays / 7);
        return `${weeks} ${weeks === 1 ? 'неделя' : 'недели'} назад`;
    }

    const months = Math.floor(diffInDays / 30);

    return `${months} ${months === 1 ? 'месяц' : 'месяца'} назад`;
};
