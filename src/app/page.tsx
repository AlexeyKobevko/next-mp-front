import { SearchForm } from '@/features/search-form';
import { PopularVacancyList } from '@/widgets/popular-vacancy';
import { PopularEmployerList } from '@/widgets/popular-employers';
import { getPopularVacancies } from '@/entities/vacancy';
import { getPopularCompanies } from '@/entities/company';

// Принудительно используем статическую генерацию для SEO
export const dynamic = 'force-static';
export const revalidate = 3600; // Ревалидация каждый час

const h2Styles =
    'text-dark-shades dark:text-light-shades mb-6 text-2xl font-bold';

export default async function Home() {
    // Получаем данные с "сервера" - используем allSettled для отказоустойчивости
    const [vacanciesResult, companiesResult] = await Promise.allSettled([
        getPopularVacancies(),
        getPopularCompanies(),
    ]);

    // Извлекаем данные из результатов, обрабатывая возможные ошибки
    const vacancies =
        vacanciesResult.status === 'fulfilled' ? vacanciesResult.value : [];

    const companies =
        companiesResult.status === 'fulfilled' ? companiesResult.value : [];

    // Опционально: логирование ошибок в production
    if (vacanciesResult.status === 'rejected') {
        console.error('Ошибка получения вакансий:', vacanciesResult.reason);
    }

    if (companiesResult.status === 'rejected') {
        console.error('Ошибка получения компаний:', companiesResult.reason);
    }

    return (
        <div className="grid min-h-screen gap-16 p-8 pb-20 font-sans sm:p-20">
            <section>
                <SearchForm />
            </section>

            {/* Секция популярных вакансий */}
            {vacancies.length > 0 && (
                <section className="w-full">
                    <h2 className={h2Styles}>Популярные вакансии</h2>
                    <PopularVacancyList vacancies={vacancies} />
                </section>
            )}

            {/* Секция популярных работодателей */}
            {companies.length > 0 && (
                <section className="w-full">
                    <h2 className={h2Styles}>Популярные работодатели</h2>
                    <PopularEmployerList companies={companies} />
                </section>
            )}
        </div>
    );
}
