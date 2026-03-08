import type { ReactNode } from 'react';
import Link from 'next/link';

function Header() {
    return (
        <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <nav style={{ display: 'flex', gap: '1rem' }}>
                <Link href="/">Home</Link>
                <Link href="/auth/login">Staff Login</Link>
            </nav>
        </header>
    );
}

function Footer() {
    return <footer style={{ padding: '1rem', marginTop: 'auto' }}>Public Footer</footer>;
}

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main className="content-container" style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    );
}
