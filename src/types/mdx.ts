import { ComponentPropsWithoutRef } from 'react';

export interface MDXComponentsProps {
    heading: ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
    paragraph: ComponentPropsWithoutRef<'p'>;
    anchor: ComponentPropsWithoutRef<'a'>;
    blockquote: ComponentPropsWithoutRef<'blockquote'>;
    strong: ComponentPropsWithoutRef<'strong'>;
    list: ComponentPropsWithoutRef<'ul' | 'ol'>;
    listItem: ComponentPropsWithoutRef<'li'>;
}
