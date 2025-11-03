'use client';

import { Fragment, useMemo, useState } from 'react';
import {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    Transition,
} from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

// Список примеров подсказок для демонстрации работы поиска
// В реальном приложении эти данные будут приходить с сервера
const SUGGESTIONS = [
    'iPhone 15',
    'AirPods Pro',
    'Nintendo Switch',
    'MacBook Pro',
    'PlayStation 5',
    'Xbox Series X',
];

/**
 * Компонент формы поиска с автодополнением
 * Использует Headless UI Combobox для доступности и удобства использования
 */
export const SearchForm = () => {
    // Состояние для текущего текста в поле ввода
    const [query, setQuery] = useState('');
    // Состояние для выбранного пользователем элемента из списка подсказок
    const [selected, setSelected] = useState<string | null>(null);

    const { t } = useTranslation();

    // Мемоизированный список отфильтрованных подсказок
    // Пересчитывается только при изменении query
    // Фильтрует подсказки по введённому тексту (без учёта регистра)
    const filtered = useMemo(() => {
        // Если поле ввода пустое, не показываем подсказки
        if (!query) {
            return [];
        }
        // Фильтруем подсказки: проверяем, содержит ли каждая подсказка введённый текст
        return SUGGESTIONS.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase())
        );
    }, [query]);

    // Обработчик выбора элемента из списка подсказок
    const handleSelect = (value: string): void => {
        // Сохраняем выбранное значение
        setSelected(value);
        // Здесь должна быть логика запуска поиска по выбранному значению
        // Например: переход на страницу результатов или отправка запроса на сервер
        console.log('Поиск:', value);
    };

    return (
        // Обёртка для занимания всей доступной ширины
        <div className="w-full">
            {/* 
                Headless UI Combobox - доступный компонент выпадающего списка с поиском
                value: текущее выбранное значение
                onChange: обработчик выбора элемента из списка
            */}
            <Combobox value={selected} onChange={handleSelect}>
                {/* Контейнер с относительным позиционированием для размещения абсолютно позиционированных элементов */}
                <div className="relative">
                    {/* 
                        Иконка лупы слева от поля ввода
                        pointer-events-none: иконка не перехватывает клики
                        absolute: позиционирование относительно родителя
                    */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </div>
                    {/* 
                        Поле ввода для поиска
                        displayValue: функция, определяющая, что отображать в поле
                        (показываем выбранное значение, если оно есть, иначе - текущий текст запроса)
                    */}
                    <ComboboxInput
                        className="block w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-10 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
                        placeholder={t('searchPlaceholder')}
                        onChange={(e) => setQuery(e.target.value)}
                        displayValue={() => selected ?? query}
                    />

                    {/* 
                        Анимация появления/исчезновения выпадающего списка
                        Transition обеспечивает плавное исчезновение списка
                        Рендерим только когда пользователь ввёл текст (query !== '')
                    */}
                    {query !== '' && (
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            {/* 
                                Выпадающий список с подсказками
                                absolute: позиционируется относительно поля ввода
                                z-10: располагается поверх других элементов
                                max-h-60: максимальная высота списка с прокруткой
                            */}
                            <ComboboxOptions className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg focus:outline-none">
                                {/* 
                                    Если подсказок нет и пользователь что-то ввёл - показываем сообщение "Ничего не найдено"
                                    Иначе - рендерим список отфильтрованных подсказок
                                */}
                                {filtered.length === 0 ? (
                                    <div className="cursor-default px-4 py-2 text-sm text-gray-500 select-none">
                                        {t('nothingFound')}
                                    </div>
                                ) : (
                                    // Рендерим каждую подсказку как отдельный вариант выбора
                                    filtered.map((item) => (
                                        <ComboboxOption
                                            key={item}
                                            value={item}
                                            // className с функцией: focus - флаг, показывающий, что элемент в фокусе (выделен)
                                            // Если focus - подсвечиваем фоном (bg-blue-50) и меняем цвет текста (text-blue-700)
                                            // Иначе - обычный серый текст
                                            className={({ focus }) =>
                                                `cursor-pointer px-4 py-2 text-sm select-none ${focus ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}`
                                            }
                                        >
                                            {item}
                                        </ComboboxOption>
                                    ))
                                )}
                            </ComboboxOptions>
                        </Transition>
                    )}
                </div>
            </Combobox>
        </div>
    );
};

/**
 * Форма поиска на Headless UI (Combobox) с подсказками
 */
