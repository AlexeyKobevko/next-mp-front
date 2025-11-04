import type { Company } from '../model/company.types';

/**
 * Получение популярных компаний
 * В будущем можно заменить на реальный API запрос
 */
export const getPopularCompanies = async (): Promise<Company[]> => {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 100));

    const companies: Company[] = [
        {
            id: 'tech-solutions-inc',
            name: 'Tech Solutions Inc.',
            description:
                'Ведущая IT-компания, специализирующаяся на разработке современных веб-приложений',
            slogan: 'Инновации в каждом проекте',
            website: 'https://techsolutions.example.com',
            location: 'Москва',
            locations: ['Москва', 'Санкт-Петербург', 'Новосибирск'],
            foundedYear: 2015,
            employeesCount: 250,
            activeVacancies: 12,
            industry: 'Информационные технологии',
        },
        {
            id: 'digital-innovations',
            name: 'Digital Innovations',
            description: 'Разработка цифровых решений для бизнеса',
            slogan: 'Цифровое будущее сегодня',
            location: 'Санкт-Петербург',
            locations: ['Санкт-Петербург', 'Москва'],
            foundedYear: 2018,
            employeesCount: 150,
            activeVacancies: 8,
            industry: 'Разработка ПО',
        },
        {
            id: 'cloud-tech',
            name: 'Cloud Tech Solutions',
            description: 'Специализация на облачных технологиях и DevOps',
            slogan: 'Облака для вашего бизнеса',
            location: 'Новосибирск',
            locations: ['Новосибирск'],
            foundedYear: 2020,
            employeesCount: 80,
            activeVacancies: 5,
            industry: 'Облачные технологии',
        },
        {
            id: 'mobile-first',
            name: 'Mobile First',
            description: 'Разработка мобильных приложений для iOS и Android',
            slogan: 'Мобильные решения мирового уровня',
            location: 'Москва',
            locations: ['Москва', 'Екатеринбург'],
            foundedYear: 2017,
            employeesCount: 120,
            activeVacancies: 6,
            industry: 'Мобильная разработка',
        },
        {
            id: 'ai-systems',
            name: 'AI Systems',
            description: 'Искусственный интеллект и машинное обучение',
            slogan: 'ИИ для бизнеса',
            location: 'Москва',
            locations: ['Москва'],
            foundedYear: 2019,
            employeesCount: 95,
            activeVacancies: 7,
            industry: 'Искусственный интеллект',
        },
        {
            id: 'web-studio',
            name: 'Web Studio Pro',
            description: 'Создание веб-сайтов и веб-приложений',
            slogan: 'Современный веб-дизайн',
            location: 'Казань',
            locations: ['Казань'],
            foundedYear: 2016,
            employeesCount: 60,
            activeVacancies: 4,
            industry: 'Веб-разработка',
        },
    ];

    return companies;
};
