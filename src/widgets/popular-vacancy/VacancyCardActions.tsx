'use client';

import { Fragment } from 'react';
import {
    Transition,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react';
import {
    EllipsisVerticalIcon,
    BookmarkIcon,
    ShareIcon,
} from '@heroicons/react/24/outline';
import cn from 'classnames';

/**
 * Клиентский компонент для меню действий карточки вакансии
 */
export const VacancyCardActions = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                'absolute top-2 right-2',
                'transition-transform duration-300',
                className
            )}
        >
            <Menu as="div" className="relative inline-block text-left">
                <MenuButton
                    className={cn(
                        'inline-flex items-center justify-center rounded-full p-2',
                        'bg-light-shades/50 dark:bg-dark-shades/50',
                        'hover:bg-light-shades dark:hover:bg-dark-shades',
                        'focus:outline-none',
                        'transition-colors duration-200',
                        'cursor-pointer'
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    <EllipsisVerticalIcon className="text-dark-shades dark:text-light-shades h-5 w-5" />
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
    );
};
