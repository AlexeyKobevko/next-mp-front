import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import cn from 'classnames'
import { Container } from '@/shared/ui/container'

export default function NotFound() {
	return (
		<div className="min-h-screen bg-light-shades dark:bg-dark-shades flex items-center justify-center">
			<Container className="text-center">
				<h1
					className={cn(
						'text-4xl font-bold mb-4',
						'text-dark-shades dark:text-light-shades'
					)}
				>
					Вакансия не найдена
				</h1>
				<p
					className={cn(
						'text-lg mb-8',
						'text-dark-shades/70 dark:text-light-shades/70'
					)}
				>
					К сожалению, запрашиваемая вакансия не существует или была удалена.
				</p>
				<Link
					href="/"
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
					<ArrowLeftIcon className="h-5 w-5" />
					<span>Вернуться к списку вакансий</span>
				</Link>
			</Container>
		</div>
	)
}

