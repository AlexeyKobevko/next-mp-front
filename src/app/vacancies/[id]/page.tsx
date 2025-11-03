import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeftIcon,
    MapPinIcon,
    BuildingOfficeIcon,
    CurrencyDollarIcon,
    CalendarIcon,
    ComputerDesktopIcon,
    BuildingOffice2Icon,
    HomeIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon, ShareIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import {
    Transition,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react';
import cn from 'classnames';
import type { Vacancy } from '@/entities/vacancy';
import { formatSalary, formatPublishedDate } from '@/entities/vacancy';
import { createCompanySlug } from '@/entities/company';
import { Container } from '@/shared/ui/container';

// Временная функция для получения вакансии по ID
// В будущем можно заменить на реальный API запрос
const getVacancyById = async (id: string): Promise<Vacancy | null> => {
    // Демо-данные вакансии
    const demoVacancy: Vacancy = {
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
        tags: [
            'React',
            'Next.js',
            'TypeScript',
            'TailwindCSS',
            'Zustand',
            'Redux',
            'GraphQL',
        ],
        description:
            'Ищем опытного Frontend разработчика для работы над современными веб-приложениями. Работа в команде профессионалов, интересные проекты, возможность профессионального роста.\n\nВам предстоит:\n• Разработка пользовательских интерфейсов с использованием React и Next.js\n• Оптимизация производительности веб-приложений\n• Работа с современными инструментами разработки\n• Участие в code review и обсуждении архитектурных решений\n• Взаимодействие с дизайнерами и бэкенд-разработчиками',
        requirements: [
            'Опыт разработки на React от 3 лет',
            'Знание Next.js и SSR',
            'Опыт работы с TypeScript',
            'Понимание принципов FSD архитектуры',
            'Умение работать в команде',
            'Опыт работы с системами контроля версий (Git)',
        ],
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 дня назад
        popular: true,
    };

    // Простая проверка по ID (в реальном приложении это будет запрос к API)
    if (id === '1') {
        return demoVacancy;
    }

    return null;
};

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

interface VacancyPageProps {
    params: Promise<{ id: string }>;
}

export default async function VacancyPage({ params }: VacancyPageProps) {
    const { id } = await params;
    const vacancy = await getVacancyById(id);

    if (!vacancy) {
        notFound();
    }

    const TypeIcon = typeIcons[vacancy.type];

    // Определяем URL для компании
    const companyUrl = vacancy.companyId
        ? `/companies/${vacancy.companyId}`
        : `/companies/${createCompanySlug(vacancy.company)}`;

    return (
        <div className="bg-light-shades dark:bg-dark-shades min-h-screen">
            <Container className="py-8">
                {/* Кнопка "Назад" */}
                <Link
                    href="/"
                    className={cn(
                        'mb-6 inline-flex items-center gap-2',
                        'text-dark-shades dark:text-light-shades',
                        'hover:text-main-color',
                        'transition-colors duration-200'
                    )}
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span>Назад к списку вакансий</span>
                </Link>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Основной контент */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Хедер секция */}
                        <header className="space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    {vacancy.popular && (
                                        <div
                                            className={cn(
                                                'mb-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold',
                                                'bg-main-color text-white',
                                                'shadow-lg'
                                            )}
                                        >
                                            ⭐ Популярная
                                        </div>
                                    )}
                                    <h1
                                        className={cn(
                                            'mb-4 text-3xl font-bold md:text-4xl',
                                            'text-dark-shades dark:text-light-shades'
                                        )}
                                    >
                                        {vacancy.title}
                                    </h1>
                                    <Link
                                        href={companyUrl}
                                        className={cn(
                                            'group/company flex items-center gap-2',
                                            'hover:text-main-color',
                                            'transition-colors duration-200'
                                        )}
                                    >
                                        <BuildingOfficeIcon className="text-dark-accent dark:text-light-accent group-hover/company:text-main-color h-6 w-6 transition-colors duration-200" />
                                        <span className="text-dark-shades/80 dark:text-light-shades/80 group-hover/company:text-main-color text-xl">
                                            {vacancy.company}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </header>

                        {/* Основная информация - карточка */}
                        <div
                            className={cn(
                                'rounded-lg border p-6',
                                'bg-light-shades dark:bg-dark-shades',
                                'border-dark-accent/20 dark:border-light-accent/20',
                                'shadow-sm'
                            )}
                        >
                            <h2
                                className={cn(
                                    'mb-4 text-xl font-bold',
                                    'text-dark-shades dark:text-light-shades'
                                )}
                            >
                                Основная информация
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {/* Локация */}
                                <div className="flex items-center gap-3">
                                    <MapPinIcon className="text-dark-accent dark:text-light-accent h-5 w-5 flex-shrink-0" />
                                    <div>
                                        <div className="text-dark-shades/60 dark:text-light-shades/60 text-xs">
                                            Локация
                                        </div>
                                        <div className="text-dark-shades dark:text-light-shades">
                                            {vacancy.location}
                                        </div>
                                    </div>
                                </div>

                                {/* Зарплата */}
                                {vacancy.salary && (
                                    <div className="flex items-center gap-3">
                                        <CurrencyDollarIcon className="text-main-color h-5 w-5 flex-shrink-0" />
                                        <div>
                                            <div className="text-dark-shades/60 dark:text-light-shades/60 text-xs">
                                                Зарплата
                                            </div>
                                            <div
                                                className={cn(
                                                    'text-sm font-semibold',
                                                    'text-main-color'
                                                )}
                                            >
                                                {formatSalary(vacancy.salary)}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Тип работы */}
                                <div className="flex items-center gap-3">
                                    <TypeIcon className="text-dark-accent dark:text-light-accent h-5 w-5 flex-shrink-0" />
                                    <div>
                                        <div className="text-dark-shades/60 dark:text-light-shades/60 text-xs">
                                            Тип работы
                                        </div>
                                        <div className="text-dark-shades dark:text-light-shades">
                                            {typeLabels[vacancy.type]}
                                        </div>
                                    </div>
                                </div>

                                {/* Дата публикации */}
                                <div className="flex items-center gap-3">
                                    <CalendarIcon className="text-dark-accent/50 dark:text-light-accent/50 h-5 w-5 flex-shrink-0" />
                                    <div>
                                        <div className="text-dark-shades/60 dark:text-light-shades/60 text-xs">
                                            Опубликовано
                                        </div>
                                        <div className="text-dark-shades/70 dark:text-light-shades/70 text-sm">
                                            {formatPublishedDate(
                                                vacancy.publishedAt
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Теги/скиллы */}
                        {vacancy.tags.length > 0 && (
                            <div className="space-y-4">
                                <h2
                                    className={cn(
                                        'text-xl font-bold',
                                        'text-dark-shades dark:text-light-shades'
                                    )}
                                >
                                    Технологии и навыки
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {vacancy.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={cn(
                                                'rounded-full px-4 py-2 text-sm',
                                                'bg-light-accent/20 dark:bg-light-accent/10',
                                                'text-dark-shades dark:text-light-shades',
                                                'border-light-accent/30 dark:border-light-accent/20 border'
                                            )}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Описание вакансии */}
                        {vacancy.description && (
                            <div className="space-y-4">
                                <h2
                                    className={cn(
                                        'text-xl font-bold',
                                        'text-dark-shades dark:text-light-shades'
                                    )}
                                >
                                    О вакансии
                                </h2>
                                <div
                                    className={cn(
                                        'prose prose-sm dark:prose-invert max-w-none',
                                        'text-dark-shades/80 dark:text-light-shades/80',
                                        'whitespace-pre-line'
                                    )}
                                >
                                    {vacancy.description}
                                </div>
                            </div>
                        )}

                        {/* Требования */}
                        {vacancy.requirements &&
                            vacancy.requirements.length > 0 && (
                                <div className="space-y-4">
                                    <h2
                                        className={cn(
                                            'text-xl font-bold',
                                            'text-dark-shades dark:text-light-shades'
                                        )}
                                    >
                                        Требования
                                    </h2>
                                    <ul className="space-y-3">
                                        {vacancy.requirements.map(
                                            (requirement, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-3"
                                                >
                                                    <CheckCircleIcon
                                                        className={cn(
                                                            'mt-0.5 h-5 w-5 flex-shrink-0',
                                                            'text-main-color'
                                                        )}
                                                    />
                                                    <span
                                                        className={cn(
                                                            'text-dark-shades/80 dark:text-light-shades/80'
                                                        )}
                                                    >
                                                        {requirement}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                    </div>

                    {/* Боковая панель - действия */}
                    <aside className="lg:col-span-1">
                        <div
                            className={cn(
                                'sticky top-8 rounded-lg border p-6',
                                'bg-light-shades dark:bg-dark-shades',
                                'border-dark-accent/20 dark:border-light-accent/20',
                                'shadow-sm',
                                'space-y-4'
                            )}
                        >
                            {/* Кнопка "Откликнуться" */}
                            <button
                                type="button"
                                className={cn(
                                    'w-full rounded-md px-6 py-3 text-base font-semibold',
                                    'bg-main-color text-white',
                                    'hover:bg-main-color/90',
                                    'transition-colors duration-200',
                                    'focus:ring-main-color focus:ring-2 focus:ring-offset-2 focus:outline-none',
                                    'dark:focus:ring-offset-dark-shades',
                                    'shadow-lg'
                                )}
                            >
                                Откликнуться
                            </button>

                            {/* Меню действий */}
                            <div className="border-dark-accent/10 dark:border-light-accent/10 border-t pt-4">
                                <Menu as="div" className="relative">
                                    <MenuButton
                                        className={cn(
                                            'w-full rounded-md px-4 py-2 text-sm font-medium',
                                            'bg-light-accent/10 dark:bg-light-accent/5',
                                            'text-dark-shades dark:text-light-shades',
                                            'hover:bg-light-accent/20 dark:hover:bg-light-accent/10',
                                            'transition-colors duration-200',
                                            'focus:ring-main-color focus:ring-2 focus:ring-offset-2 focus:outline-none',
                                            'dark:focus:ring-offset-dark-shades'
                                        )}
                                    >
                                        Действия
                                    </MenuButton>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems
                                            className={cn(
                                                'absolute right-0 left-0 z-20 mt-2 origin-top rounded-lg shadow-lg',
                                                'bg-light-shades dark:bg-dark-shades',
                                                'border-dark-accent/20 dark:border-light-accent/20 border',
                                                'ring-1 ring-black/5 dark:ring-white/5',
                                                'focus:outline-none'
                                            )}
                                        >
                                            <div className="py-1">
                                                <MenuItem>
                                                    {({ focus }) => (
                                                        <button
                                                            type="button"
                                                            className={cn(
                                                                'flex w-full items-center gap-2 px-4 py-2 text-sm',
                                                                focus
                                                                    ? 'bg-main-color/10 text-main-color dark:bg-main-color/20'
                                                                    : 'text-dark-shades dark:text-light-shades'
                                                            )}
                                                        >
                                                            <BookmarkIcon className="h-4 w-4" />
                                                            Сохранить
                                                        </button>
                                                    )}
                                                </MenuItem>
                                                <MenuItem>
                                                    {({ focus }) => (
                                                        <button
                                                            type="button"
                                                            className={cn(
                                                                'flex w-full items-center gap-2 px-4 py-2 text-sm',
                                                                focus
                                                                    ? 'bg-main-color/10 text-main-color dark:bg-main-color/20'
                                                                    : 'text-dark-shades dark:text-light-shades'
                                                            )}
                                                        >
                                                            <ShareIcon className="h-4 w-4" />
                                                            Поделиться
                                                        </button>
                                                    )}
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </aside>
                </div>
            </Container>
        </div>
    );
}
