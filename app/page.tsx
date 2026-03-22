import Header from './components/landing/Header';
import MainBanner from './components/landing/MainBanner';
import HowItWorks from './components/landing/HowItWorks';
import TrustUs from './components/landing/TrustUs';
import Footer from './components/landing/Footer';
import { LanguageProvider } from './hooks/languageContext';

export default function Landing() {
    return (
        <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden font-inter">
            <LanguageProvider>
                <Header />
                <MainBanner />
                <HowItWorks />
                <TrustUs />
                <Footer />
            </LanguageProvider>
        </div>
    );
}