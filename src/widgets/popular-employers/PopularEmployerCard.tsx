import Link from 'next/link';
import Image from 'next/image';
import {
    BuildingOfficeIcon,
    MapPinIcon,
    BriefcaseIcon,
} from '@heroicons/react/24/outline';
import cn from 'classnames';
import type { Company } from '@/entities/company';
import { formatEmployeesCount } from '@/entities/company';

interface PopularEmployerCardProps {
    company: Company;
    className?: string;
}

export const PopularEmployerCard = ({
    company,
    className,
}: PopularEmployerCardProps) => {
    const companyUrl = `/companies/${company.id}`;

    return (
        <Link
            href={companyUrl}
            className={cn(
                'group relative block rounded-lg border p-6',
                'bg-light-shades dark:bg-dark-shades',
                'border-dark-accent/20 dark:border-light-accent/20',
                'shadow-sm transition-all duration-300',
                'hover:-translate-y-1 hover:shadow-lg',
                'hover:border-main-color/30 dark:hover:border-main-color/30',
                className
            )}
        >
            {/* Логотип компании */}
            <div className="mb-4 flex items-start justify-between">
                <div
                    className={cn(
                        'flex h-16 w-16 items-center justify-center rounded-lg',
                        'bg-main-color/10 dark:bg-main-color/20',
                        'border-main-color/20 border',
                        'group-hover:bg-main-color/20 dark:group-hover:bg-main-color/30',
                        'transition-colors duration-300'
                    )}
                >
                    {company.logo ? (
                        <Image
                            src={company.logo}
                            alt={company.name}
                            width={48}
                            height={48}
                            className="rounded object-contain"
                        />
                    ) : (
                        <BuildingOfficeIcon className="text-main-color h-8 w-8" />
                    )}
                </div>
            </div>

            {/* Название компании */}
            <h3
                className={cn(
                    'mb-2 text-xl font-bold',
                    'text-dark-shades dark:text-light-shades',
                    'transition-colors duration-300',
                    'group-hover:text-main-color'
                )}
            >
                {company.name}
            </h3>

            {/* Слоган или краткое описание */}
            {company.slogan && (
                <p
                    className={cn(
                        'mb-4 text-sm',
                        'text-dark-shades/70 dark:text-light-shades/70',
                        'line-clamp-2'
                    )}
                >
                    {company.slogan}
                </p>
            )}

            {/* Локация */}
            <div className="mb-4 flex items-center gap-2">
                <MapPinIcon className="text-dark-accent dark:text-light-accent h-4 w-4 flex-shrink-0" />
                <span className="text-dark-shades/70 dark:text-light-shades/70 text-sm">
                    {company.location}
                </span>
            </div>

            {/* Статистика */}
            <div className="mb-4 flex flex-wrap items-center gap-4">
                {/* Активные вакансии */}
                {company.activeVacancies !== undefined && (
                    <div className="flex items-center gap-2">
                        <BriefcaseIcon className="text-main-color h-4 w-4" />
                        <span
                            className={cn(
                                'text-sm font-semibold',
                                'text-main-color'
                            )}
                        >
                            {company.activeVacancies} вакансий
                        </span>
                    </div>
                )}

                {/* Количество сотрудников */}
                {company.employeesCount && (
                    <div className="flex items-center gap-2">
                        <span className="text-dark-shades/60 dark:text-light-shades/60 text-xs">
                            {formatEmployeesCount(company.employeesCount)}
                        </span>
                    </div>
                )}
            </div>

            {/* Кнопка действий */}
            <div className="border-dark-accent/10 dark:border-light-accent/10 border-t pt-4">
                <div
                    className={cn(
                        'inline-flex items-center gap-2 text-sm font-medium',
                        'text-main-color',
                        'group-hover:underline',
                        'transition-all duration-200'
                    )}
                >
                    <span>Посмотреть вакансии</span>
                    <svg
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
            </div>
        </Link>
    );
};
