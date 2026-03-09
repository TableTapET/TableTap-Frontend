import type { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    // TODO: MVP Scaffolding - Auth is not wired yet.

    return (
        <div className="flex min-h-screen flex-col">
            <Header isProtected={true} />
            <main className="flex-1 p-6">{children}</main>
            <Footer text="Protected System Footer" />
        </div>
    );
}
