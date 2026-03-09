import type { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header isProtected={false} />
            <main className="flex-1 p-6">{children}</main>
            <Footer text="Public Footer" />
        </div>
    );
}
