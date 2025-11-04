import {
    MapPinIcon,
    BuildingOfficeIcon,
    CurrencyDollarIcon,
    CalendarIcon,
    ComputerDesktopIcon,
    BuildingOffice2Icon,
    HomeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import cn from 'classnames';
import type { Vacancy } from '@/entities/vacancy';
import { formatSalary, formatPublishedDate } from '@/entities/vacancy';

interface VacancyCardProps {
    vacancy: Vacancy;
    className?: string;
}

const typeIcons = {
    remote: HomeIcon,
    office: BuildingOffice2Icon,
    hybrid: ComputerDesktopIcon,
};

const typeLabels = {
    remote: 'Удалённо',
    office: 'Офис',
    hybrid: 'Гибрид',
};

export const VacancyCard = ({ vacancy, className }: VacancyCardProps) => {
    const TypeIcon = typeIcons[vacancy.type];

    const cardContent = (
        <article
            className={cn(
                'group relative rounded-lg border p-6',
                'bg-light-shades dark:bg-dark-shades',
                'border-dark-accent/20 dark:border-light-accent/20',
                'shadow-sm transition-all duration-300',
                'cursor-pointer hover:-translate-y-1 hover:shadow-lg',
                className
            )}
        >
            {/* Заголовок вакансии */}
            <h3
                className={cn(
                    'mb-3 text-xl font-bold',
                    'text-dark-shades dark:text-light-shades',
                    'transition-colors duration-300',
                    'group-hover:text-main-color'
                )}
            >
                {vacancy.title}
            </h3>

            {/* Компания */}
            <div className="mb-4 flex items-center gap-2">
                <BuildingOfficeIcon className="text-dark-accent dark:text-light-accent h-5 w-5" />
                <span className="text-dark-shades/80 dark:text-light-shades/80">
                    {vacancy.company}
                </span>
            </div>

            {/* Информация: локация, зарплата, тип */}
            <div className="mb-4 space-y-2">
                {/* Локация */}
                <div className="flex items-center gap-2">
                    <MapPinIcon className="text-dark-accent dark:text-light-accent h-4 w-4" />
                    <span className="text-dark-shades/70 dark:text-light-shades/70 text-sm">
                        {vacancy.location}
                    </span>
                </div>

                {/* Зарплата */}
                {vacancy.salary && (
                    <div className="flex items-center gap-2">
                        <CurrencyDollarIcon className="text-main-color h-4 w-4" />
                        <span
                            className={cn(
                                'text-sm font-semibold',
                                'text-main-color'
                            )}
                        >
                            {formatSalary(vacancy.salary)}
                        </span>
                    </div>
                )}

                {/* Тип работы */}
                <div className="flex items-center gap-2">
                    <TypeIcon className="text-dark-accent dark:text-light-accent h-4 w-4" />
                    <span className="text-dark-shades/70 dark:text-light-shades/70 text-sm">
                        {typeLabels[vacancy.type]}
                    </span>
                </div>
            </div>

            {/* Теги/скиллы */}
            {vacancy.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                    {vacancy.tags.slice(0, 4).map((tag) => (
                        <span
                            key={tag}
                            className={cn(
                                'rounded-full px-3 py-1 text-xs',
                                'bg-light-accent/20 dark:bg-light-accent/10',
                                'text-dark-shades dark:text-light-shades',
                                'border-light-accent/30 dark:border-light-accent/20 border'
                            )}
                        >
                            {tag}
                        </span>
                    ))}
                    {vacancy.tags.length > 4 && (
                        <span
                            className={cn(
                                'rounded-full px-3 py-1 text-xs',
                                'text-dark-shades/70 dark:text-light-shades/70'
                            )}
                        >
                            +{vacancy.tags.length - 4}
                        </span>
                    )}
                </div>
            )}

            {/* Футер: дата и кнопка */}
            <div className="border-dark-accent/10 dark:border-light-accent/10 flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="text-dark-accent/50 dark:text-light-accent/50 h-4 w-4" />
                    <span className="text-dark-shades/60 dark:text-light-shades/60 text-xs">
                        {formatPublishedDate(vacancy.publishedAt)}
                    </span>
                </div>
            </div>
        </article>
    );

    // Оборачиваем в Link для навигации
    return (
        <Link href={`/vacancies/${vacancy.id}`} className="block">
            {cardContent}
        </Link>
    );
};
