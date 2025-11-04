import { SearchForm } from '@/features/search-form';
import { PopularVacancyList } from '@/widgets/popular-vacancy';
import { PopularEmployerList } from '@/widgets/popular-employers';
import type { Vacancy } from '@/entities/vacancy';
import type { Company } from '@/entities/company';

// Демо-данные популярной вакансии
const demoVacancies: Vacancy[] = [
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

// Демо-данные популярных работодателей
const demoCompanies: Company[] = [
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

export default function Home() {
    return (
        <div className="grid min-h-screen gap-16 p-8 pb-20 font-sans sm:p-20">
            <section>
                <SearchForm />
            </section>

            {/* Секция популярных вакансий */}
            <section className="w-full">
                <h2 className="text-dark-shades dark:text-light-shades mb-6 text-2xl font-bold">
                    Популярные вакансии
                </h2>
                <PopularVacancyList
                    vacancies={demoVacancies}
                    // onVacancyClick={(vacancy) => {
                    //     console.log('Открыть детали вакансии:', vacancy.id);
                    // }}
                />
            </section>

            {/* Секция популярных работодателей */}
            <section className="w-full">
                <h2 className="text-dark-shades dark:text-light-shades mb-6 text-2xl font-bold">
                    Популярные работодатели
                </h2>
                <PopularEmployerList companies={demoCompanies} />
            </section>
        </div>
    );
}
