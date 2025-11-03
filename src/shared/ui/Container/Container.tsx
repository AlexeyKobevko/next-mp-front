import { type ComponentPropsWithoutRef } from 'react';
import cn from 'classnames';

export function Container({
    className,
    ...props
}: ComponentPropsWithoutRef<'div'>) {
    return (
        <div
            className={cn('mx-auto w-7xl max-w-full px-4', className)}
            {...props}
        />
    );
}

/**
 * Контейнер для контента с максимальной шириной 1280px (max-w-7xl)
 * - Горизонтальное центрирование (mx-auto)
 * - Отступы по бокам (px-4/6/8)
 */
