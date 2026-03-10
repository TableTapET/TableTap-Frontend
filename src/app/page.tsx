import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Footer from "@/components/Footer"
import Feature from "@/components/Feature"

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <main>
                <Feature />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}
