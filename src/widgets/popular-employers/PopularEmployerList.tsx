import { PopularEmployerCard } from './PopularEmployerCard';
import type { Company } from '@/entities/company';

interface PopularEmployerListProps {
    companies: Company[];
}

export const PopularEmployerList = ({
    companies,
}: PopularEmployerListProps) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {companies.map((company) => (
                <PopularEmployerCard key={company.id} company={company} />
            ))}
        </div>
    );
};
