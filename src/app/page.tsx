import { SearchForm } from '@/features/search-form';

export default function Home() {
    return (
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
            <main className="row-start-2 w-full">
                <SearchForm />
            </main>
            <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]"></footer>
        </div>
    );
}
