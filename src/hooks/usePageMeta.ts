import { useEffect } from 'react';

/** Sets the document title and meta description for the current route. */
export const usePageMeta = (title: string, description: string): void => {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);
};
