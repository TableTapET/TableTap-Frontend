import type { ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

function Header() {
    return (
        // temporary links for testing - replace with actual protected routes later
        <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <nav style={{ display: 'flex', gap: '1rem' }}>
                <Link href="/kitchen">Kitchen Display</Link>
                <Link href="/pos">POS Register</Link>
                <Link href="/customer">Customer Menu</Link>
            </nav>
        </header>
    );
}

function Footer() {
    return <footer style={{ padding: '1rem', marginTop: 'auto' }}>Protected System Footer</footer>;
}

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    // TODO: MVP Scaffolding - Auth is not wired yet.
    // Replace this with actual AuthService check later.
    const isAuthenticated = true;

    if (!isAuthenticated) {
        redirect('/auth/login');
    }

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
