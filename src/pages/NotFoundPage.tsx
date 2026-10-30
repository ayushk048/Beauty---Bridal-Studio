import { Link } from 'react-router-dom';
import { buttonStyles } from '../components/ui/buttonStyles';
import { usePageMeta } from '../hooks/usePageMeta';

export const NotFoundPage = () => {
  usePageMeta('Page not found', 'The page you are looking for does not exist.');
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold-600">404</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Page not found</h1>
      <p className="mt-4 text-cocoa-600">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
      <Link to="/" className={buttonStyles('primary', 'md', 'mt-8')}>
        Back to home
      </Link>
    </section>
  );
};
