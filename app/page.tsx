import MainBanner from './components/landing/MainBanner';
import HowItWorks from './components/landing/HowItWorks';
import TrustUs from './components/landing/TrustUs';
import Footer from './components/landing/Footer';
import ContactForm from './components/landing/ContactForm';

export default function Landing() {
    return (
        <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden font-inter">
            <MainBanner />
            <HowItWorks />
            <TrustUs />
            <ContactForm />
            <Footer />
        </div>
    );
}
