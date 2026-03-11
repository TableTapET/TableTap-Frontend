import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Feature from '@/components/Feature';
import TestimonialSection from '@/components/Testimonial';

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <main>
                <Feature />
                <TestimonialSection />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}
