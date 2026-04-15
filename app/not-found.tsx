import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark px-4">
      <div className="text-center max-w-md">
        <h1 className="mb-2 font-display text-8xl font-black text-gradient">
          404
        </h1>
        <h2 className="mb-4 font-display text-2xl font-bold text-foreground-light dark:text-foreground-dark">
          Page Not Found
        </h2>
        <p className="mb-8 text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
