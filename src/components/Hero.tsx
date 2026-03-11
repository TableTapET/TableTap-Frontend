import { Button } from '@/components/ui/button';

export default function Hero() {
    return (
        <section className="m-6 rounded-lg bg-[#777b61] py-20 text-center">
            <h2 className="text-5xl font-bold">Your menu, right in your hands</h2>
            <p className="mt-6 text-lg text-gray-600">
                Get your restaurant information with a touch of your fingers
            </p>
            <Button variant="outline" className="mt-6 bg-[#000000] text-[#FEFAE2]">
                Get Started
            </Button>
        </section>
    );
}
