import type { Vacancy } from '../model/vacancy.types';

/**
 * Получение популярных вакансий
 * В будущем можно заменить на реальный API запрос
 */
export const getPopularVacancies = async (): Promise<Vacancy[]> => {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 100));

    const vacancies: Vacancy[] = [
        {
            id: '1',
            title: 'Senior Frontend Developer (React/Next.js)',
            company: 'Tech Solutions Inc.',
            companyId: 'tech-solutions-inc',
            location: 'Москва',
            salary: {
                from: 250000,
                to: 400000,
                currency: '₽',
            },
            type: 'hybrid',
            tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Zustand'],
            description:
                'Ищем опытного Frontend разработчика для работы над современными веб-приложениями. Работа в команде профессионалов, интересные проекты, возможность профессионального роста.',
            requirements: [
                'Опыт разработки на React от 3 лет',
                'Знание Next.js и SSR',
                'Опыт работы с TypeScript',
                'Понимание принципов FSD архитектуры',
            ],
            publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 дня назад
            popular: true,
        },
        {
            id: '2',
            title: 'Senior Frontend Developer (React/Next.js)',
            company: 'Tech Solutions Inc.',
            companyId: 'tech-solutions-inc',
            location: 'Москва',
            salary: {
                from: 250000,
                to: 400000,
                currency: '₽',
            },
            type: 'office',
            tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Zustand'],
            description:
                'Ищем опытного Frontend разработчика для работы над современными веб-приложениями. Работа в команде профессионалов, интересные проекты, возможность профессионального роста.',
            requirements: [
                'Опыт разработки на React от 3 лет',
                'Знание Next.js и SSR',
                'Опыт работы с TypeScript',
                'Понимание принципов FSD архитектуры',
            ],
            publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 дня назад
            popular: true,
        },
    ];

    return vacancies;
};
