import { SearchForm } from '@/features/search-form';
import { PopularVacancyList } from '@/widgets/popular-vacancy';
import type { Vacancy } from '@/entities/vacancy';

// Демо-данные популярной вакансии
const demoVacancy: Vacancy = {
    id: '1',
    title: 'Senior Frontend Developer (React/Next.js)',
    company: 'Tech Solutions Inc.',
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
};

export default function Home() {
    return (
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
            <main className="row-start-2 w-full space-y-8">
                <SearchForm />

                {/* Секция популярных вакансий */}
                <section className="w-full">
                    <h2 className="text-dark-shades dark:text-light-shades mb-6 text-2xl font-bold">
                        Популярные вакансии
                    </h2>
                    <PopularVacancyList
                        vacancies={[demoVacancy]}
                        // onVacancyClick={(vacancy) => {
                        //     console.log('Открыть детали вакансии:', vacancy.id);
                        // }}
                    />
                </section>
            </main>
            <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]"></footer>
        </div>
    );
}
