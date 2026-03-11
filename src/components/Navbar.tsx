import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function Navbar() {
    return (
        <nav className="flex justify-between p-6">
            <div className="flex items-center space-x-2">
                <Image src="/logo_rounded.svg" alt="TableTap logo" width={32} height={32} />
                <h1 className="text-xl font-bold">TableTap</h1>
            </div>
            <div className="space-x-6">
                <Button variant="link">Feature</Button>
                <Button variant="link">About Us</Button>
                <Button variant="link">
                    <Link href="https://github.com/TableTapET">Github</Link>
                </Button>
            </div>
        </nav>
    );
}
