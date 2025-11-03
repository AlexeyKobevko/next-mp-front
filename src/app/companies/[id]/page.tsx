import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
	ArrowLeftIcon,
	MapPinIcon,
	BuildingOfficeIcon,
	CalendarIcon,
	UsersIcon,
	BriefcaseIcon,
	GlobeAltIcon,
	BookmarkIcon,
	ShareIcon,
	CheckCircleIcon,
} from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import {
	Transition,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/react'
import cn from 'classnames'
import type { Company } from '@/entities/company'
import { formatEmployeesCount, createCompanySlug } from '@/entities/company'
import { Container } from '@/shared/ui/container'
import { VacancyCard } from '@/shared/ui/vacancy-card'
import type { Vacancy } from '@/entities/vacancy'

// Временная функция для получения компании по ID
// В будущем можно заменить на реальный API запрос
const getCompanyById = async (id: string): Promise<Company | null> => {
	// Демо-данные компании
	const demoCompany: Company = {
		id: 'tech-solutions-inc',
		name: 'Tech Solutions Inc.',
		description: 'Ведущая IT-компания, специализирующаяся на разработке современных веб-приложений',
		slogan: 'Инновации в каждом проекте',
		website: 'https://techsolutions.example.com',
		location: 'Москва',
		locations: ['Москва', 'Санкт-Петербург', 'Новосибирск'],
		foundedYear: 2015,
		employeesCount: 250,
		activeVacancies: 12,
		about:
			'Tech Solutions Inc. — динамично развивающаяся IT-компания, основанная в 2015 году. Мы специализируемся на разработке современных веб-приложений и мобильных решений для крупных корпоративных клиентов.\n\nЗа годы работы мы реализовали более 200 успешных проектов, работая с клиентами из разных отраслей: финансы, ритейл, медиа и образование. Наша команда состоит из талантливых разработчиков, дизайнеров и менеджеров проектов, которые постоянно совершенствуют свои навыки и следят за последними трендами в технологиях.\n\nМы ценим профессионализм, инициативность и стремление к постоянному развитию. В нашей компании созданы все условия для профессионального роста и реализации амбициозных проектов.',
		benefits: [
			'Гибкий график работы и возможность удалённой работы',
			'Конкурентная зарплата и бонусная система',
			'Обучение за счёт компании (конференции, курсы, сертификации)',
			'Медицинское страхование и дополнительные льготы',
			'Современное оборудование и комфортный офис',
			'Корпоративные мероприятия и тимбилдинги',
		],
		industry: 'Информационные технологии',
	}

	// Простая проверка по ID или slug (в реальном приложении это будет запрос к API)
	if (id === 'tech-solutions-inc' || id === '1') {
		return demoCompany
	}

	return null
}

// Временная функция для получения вакансий компании
const getCompanyVacancies = async (companyId: string): Promise<Vacancy[]> => {
	// Демо-данные вакансий компании
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
			description: 'Ищем опытного Frontend разработчика',
			publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
			popular: true,
		},
		{
			id: '2',
			title: 'Middle Backend Developer (Node.js)',
			company: 'Tech Solutions Inc.',
			companyId: 'tech-solutions-inc',
			location: 'Москва',
			salary: {
				from: 200000,
				to: 300000,
				currency: '₽',
			},
			type: 'office',
			tags: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis'],
			description: 'Разработка серверной части приложений',
			publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
		},
		{
			id: '3',
			title: 'UI/UX Designer',
			company: 'Tech Solutions Inc.',
			companyId: 'tech-solutions-inc',
			location: 'Санкт-Петербург',
			salary: {
				from: 180000,
				to: 250000,
				currency: '₽',
			},
			type: 'hybrid',
			tags: ['Figma', 'Adobe XD', 'Design Systems', 'Prototyping'],
			description: 'Создание пользовательских интерфейсов',
			publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
		},
	]

	if (companyId === 'tech-solutions-inc' || companyId === '1') {
		return demoVacancies
	}

	return []
}

interface CompanyPageProps {
	params: Promise<{ id: string }>
}

export default async function CompanyPage({ params }: CompanyPageProps) {
	const { id } = await params
	const company = await getCompanyById(id)

	if (!company) {
		notFound()
	}

	const vacancies = await getCompanyVacancies(company.id)

	return (
		<div className="min-h-screen bg-light-shades dark:bg-dark-shades">
			<Container className="py-8">
				{/* Кнопка "Назад" */}
				<Link
					href="/"
					className={cn(
						'inline-flex items-center gap-2 mb-6',
						'text-dark-shades dark:text-light-shades',
						'hover:text-main-color',
						'transition-colors duration-200'
					)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
					<span>Назад к списку вакансий</span>
				</Link>

				{/* Хедер секция */}
				<header
					className={cn(
						'rounded-lg border p-8 mb-8',
						'bg-light-shades dark:bg-dark-shades',
						'border-dark-accent/20 dark:border-light-accent/20',
						'shadow-sm'
					)}
				>
					<div className="flex items-start justify-between gap-6">
						<div className="flex-1">
							{/* Логотип компании (placeholder) */}
							<div
								className={cn(
									'w-20 h-20 rounded-lg mb-4 flex items-center justify-center',
									'bg-main-color/10 dark:bg-main-color/20',
									'border border-main-color/20'
								)}
							>
								<BuildingOfficeIcon className="h-10 w-10 text-main-color" />
							</div>

							{/* Название компании */}
							<h1
								className={cn(
									'text-3xl md:text-4xl font-bold mb-2',
									'text-dark-shades dark:text-light-shades'
								)}
							>
								{company.name}
							</h1>

							{/* Слоган */}
							{company.slogan && (
								<p
									className={cn(
										'text-lg mb-4',
										'text-dark-shades/70 dark:text-light-shades/70'
									)}
								>
									{company.slogan}
								</p>
							)}

							{/* Краткое описание */}
							{company.description && (
								<p
									className={cn(
										'text-base mb-4',
										'text-dark-shades/80 dark:text-light-shades/80'
									)}
								>
									{company.description}
								</p>
							)}

							{/* Отрасль и локация */}
							<div className="flex flex-wrap items-center gap-4 mt-4">
								{company.industry && (
									<div className="flex items-center gap-2">
										<BriefcaseIcon className="text-dark-accent dark:text-light-accent h-5 w-5" />
										<span className="text-dark-shades/70 dark:text-light-shades/70 text-sm">
											{company.industry}
										</span>
									</div>
								)}
								<div className="flex items-center gap-2">
									<MapPinIcon className="text-dark-accent dark:text-light-accent h-5 w-5" />
									<span className="text-dark-shades/70 dark:text-light-shades/70 text-sm">
										{company.location}
									</span>
								</div>
								{company.website && (
									<a
										href={company.website}
										target="_blank"
										rel="noopener noreferrer"
										className={cn(
											'flex items-center gap-2',
											'text-main-color hover:text-main-color/80',
											'transition-colors duration-200',
											'text-sm'
										)}
									>
										<GlobeAltIcon className="h-5 w-5" />
										<span>Сайт компании</span>
									</a>
								)}
							</div>
						</div>

						{/* Меню действий */}
						<Menu as="div" className="relative">
							<MenuButton
								className={cn(
									'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium',
									'bg-light-accent/10 dark:bg-light-accent/5',
									'text-dark-shades dark:text-light-shades',
									'hover:bg-light-accent/20 dark:hover:bg-light-accent/10',
									'transition-colors duration-200',
									'focus:outline-none focus:ring-2 focus:ring-main-color focus:ring-offset-2',
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
										'absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-lg shadow-lg',
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
													Подписаться на обновления
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
				</header>

				<div className="grid gap-8 lg:grid-cols-3">
					{/* Основной контент */}
					<div className="lg:col-span-2 space-y-6">
						{/* Статистика */}
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{/* Активные вакансии */}
							<div
								className={cn(
									'rounded-lg border p-4',
									'bg-light-shades dark:bg-dark-shades',
									'border-dark-accent/20 dark:border-light-accent/20',
									'shadow-sm'
								)}
							>
								<div className="flex items-center gap-3 mb-2">
									<BriefcaseIcon className="text-main-color h-6 w-6" />
									<div>
										<div className="text-xs text-dark-shades/60 dark:text-light-shades/60">
											Вакансий
										</div>
										<div className="text-xl font-bold text-dark-shades dark:text-light-shades">
											{company.activeVacancies || 0}
										</div>
									</div>
								</div>
							</div>

							{/* Сотрудники */}
							<div
								className={cn(
									'rounded-lg border p-4',
									'bg-light-shades dark:bg-dark-shades',
									'border-dark-accent/20 dark:border-light-accent/20',
									'shadow-sm'
								)}
							>
								<div className="flex items-center gap-3 mb-2">
									<UsersIcon className="text-main-color h-6 w-6" />
									<div>
										<div className="text-xs text-dark-shades/60 dark:text-light-shades/60">
											Сотрудников
										</div>
										<div className="text-lg font-bold text-dark-shades dark:text-light-shades">
											{formatEmployeesCount(company.employeesCount)}
										</div>
									</div>
								</div>
							</div>

							{/* Год основания */}
							{company.foundedYear && (
								<div
									className={cn(
										'rounded-lg border p-4',
										'bg-light-shades dark:bg-dark-shades',
										'border-dark-accent/20 dark:border-light-accent/20',
										'shadow-sm'
									)}
								>
									<div className="flex items-center gap-3 mb-2">
										<CalendarIcon className="text-main-color h-6 w-6" />
										<div>
											<div className="text-xs text-dark-shades/60 dark:text-light-shades/60">
												Основана
											</div>
											<div className="text-xl font-bold text-dark-shades dark:text-light-shades">
												{company.foundedYear}
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Офисы */}
							{company.locations && company.locations.length > 0 && (
								<div
									className={cn(
										'rounded-lg border p-4',
										'bg-light-shades dark:bg-dark-shades',
										'border-dark-accent/20 dark:border-light-accent/20',
										'shadow-sm'
									)}
								>
									<div className="flex items-center gap-3 mb-2">
										<MapPinIcon className="text-main-color h-6 w-6" />
										<div>
											<div className="text-xs text-dark-shades/60 dark:text-light-shades/60">
												Офисов
											</div>
											<div className="text-lg font-bold text-dark-shades dark:text-light-shades">
												{company.locations.length}
											</div>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* О компании */}
						{company.about && (
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
										'text-2xl font-bold mb-4',
										'text-dark-shades dark:text-light-shades'
									)}
								>
									О компании
								</h2>
								<div
									className={cn(
										'prose prose-sm dark:prose-invert max-w-none',
										'text-dark-shades/80 dark:text-light-shades/80',
										'whitespace-pre-line'
									)}
								>
									{company.about}
								</div>
							</div>
						)}

						{/* Преимущества работы */}
						{company.benefits && company.benefits.length > 0 && (
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
										'text-2xl font-bold mb-4',
										'text-dark-shades dark:text-light-shades'
									)}
								>
									Преимущества работы в компании
								</h2>
								<ul className="space-y-3">
									{company.benefits.map((benefit, index) => (
										<li key={index} className="flex items-start gap-3">
											<CheckCircleIcon
												className={cn(
													'h-5 w-5 flex-shrink-0 mt-0.5',
													'text-main-color'
												)}
											/>
											<span className={cn('text-dark-shades/80 dark:text-light-shades/80')}>
												{benefit}
											</span>
										</li>
									))}
								</ul>
							</div>
						)}

						{/* Локации офисов */}
						{company.locations && company.locations.length > 1 && (
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
										'text-2xl font-bold mb-4',
										'text-dark-shades dark:text-light-shades'
									)}
								>
									Офисы компании
								</h2>
								<div className="space-y-2">
									{company.locations.map((location, index) => (
										<div key={index} className="flex items-center gap-2">
											<MapPinIcon className="text-dark-accent dark:text-light-accent h-4 w-4" />
											<span className="text-dark-shades/80 dark:text-light-shades/80">
												{location}
											</span>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Активные вакансии */}
						{vacancies.length > 0 && (
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h2
										className={cn(
											'text-2xl font-bold',
											'text-dark-shades dark:text-light-shades'
										)}
									>
										Активные вакансии
									</h2>
								</div>
								<div className="grid gap-4">
									{vacancies.slice(0, 3).map((vacancy) => (
										<VacancyCard key={vacancy.id} vacancy={vacancy} />
									))}
								</div>
								{vacancies.length > 3 && (
									<div className="text-center">
										<Link
											href={`/vacancies?company=${company.id}`}
											className={cn(
												'inline-flex items-center gap-2',
												'px-6 py-3 rounded-md',
												'bg-main-color text-white',
												'hover:bg-main-color/90',
												'transition-colors duration-200',
												'focus:ring-main-color focus:ring-2 focus:ring-offset-2 focus:outline-none',
												'dark:focus:ring-offset-dark-shades'
											)}
										>
											Посмотреть все вакансии ({vacancies.length})
										</Link>
									</div>
								)}
							</div>
						)}
					</div>

					{/* Боковая панель */}
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
							{/* Кнопка "Подписаться на обновления" */}
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
								Подписаться на обновления
							</button>

							{/* Быстрая информация */}
							<div
								className={cn(
									'border-t border-dark-accent/10 dark:border-light-accent/10 pt-4',
									'space-y-3'
								)}
							>
								<h3
									className={cn(
										'text-lg font-semibold',
										'text-dark-shades dark:text-light-shades'
									)}
								>
									Краткая информация
								</h3>
								<div className="space-y-2 text-sm">
									{company.industry && (
										<div>
											<span className="text-dark-shades/60 dark:text-light-shades/60">
												Отрасль:{' '}
											</span>
											<span className="text-dark-shades dark:text-light-shades">
												{company.industry}
											</span>
										</div>
									)}
									{company.foundedYear && (
										<div>
											<span className="text-dark-shades/60 dark:text-light-shades/60">
												Основана:{' '}
											</span>
											<span className="text-dark-shades dark:text-light-shades">
												{company.foundedYear}
											</span>
										</div>
									)}
									{company.employeesCount && (
										<div>
											<span className="text-dark-shades/60 dark:text-light-shades/60">
												Сотрудников:{' '}
											</span>
											<span className="text-dark-shades dark:text-light-shades">
												{formatEmployeesCount(company.employeesCount)}
											</span>
										</div>
									)}
									<div>
										<span className="text-dark-shades/60 dark:text-light-shades/60">
											Локация:{' '}
										</span>
										<span className="text-dark-shades dark:text-light-shades">
											{company.location}
										</span>
									</div>
								</div>
							</div>
						</div>
					</aside>
				</div>
			</Container>
		</div>
	)
}

