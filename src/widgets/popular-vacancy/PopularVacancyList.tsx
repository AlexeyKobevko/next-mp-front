'use client';

import { PopularVacancyCard } from './PopularVacancyCard';
import type { Vacancy } from '@/entities/vacancy';

interface PopularVacancyListProps {
    vacancies: Vacancy[];
}

export const PopularVacancyList = ({ vacancies }: PopularVacancyListProps) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vacancies.map((vacancy) => (
                <PopularVacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
        </div>
    );
};
