import Link from 'next/link';

export function Header({ isProtected = false }: { isProtected?: boolean }) {
    return (
        <header className={`border-b p-4 ${isProtected ? 'bg-gray-100' : 'bg-gray-200'}`}>
            <nav className="flex gap-4">
                {isProtected ? (
                    <>
                        <Link href="/kitchen" className="hover:underline">
                            Kitchen Display
                        </Link>
                        <Link href="/pos" className="hover:underline">
                            POS Register
                        </Link>
                        <Link href="/customer" className="hover:underline">
                            Customer Menu
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/" className="hover:underline">
                            Home
                        </Link>
                        <Link href="/auth/login" className="hover:underline">
                            Staff Login
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}
