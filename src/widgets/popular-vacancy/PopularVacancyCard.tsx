import cn from 'classnames';
import { VacancyCard } from '@/shared/ui/vacancy-card';
import { VacancyCardActions } from './VacancyCardActions';
import type { Vacancy } from '@/entities/vacancy';

interface PopularVacancyCardProps {
    vacancy: Vacancy;
    className?: string;
}

export const PopularVacancyCard = ({
    vacancy,
    className,
}: PopularVacancyCardProps) => {
    return (
        <div className={cn('group/card relative pt-8', className)}>
            {/* Бейдж "Популярная" */}
            <div
                className={cn(
                    'absolute top-0 left-4 rounded-full px-3 py-1 text-xs font-bold',
                    'bg-main-color text-white',
                    'shadow-lg',
                    'transition-transform duration-300',
                    'group-hover/card:-translate-y-1'
                )}
            >
                ⭐ Популярная
            </div>

            {/* Карточка вакансии */}
            <div className="relative">
                <VacancyCard
                    vacancy={vacancy}
                    className="group-hover/card:-translate-y-1 group-hover/card:shadow-lg"
                />

                {/* Меню действий - клиентский компонент */}
                <VacancyCardActions className="group-hover/card:-translate-y-1" />
            </div>
        </div>
    );
};
