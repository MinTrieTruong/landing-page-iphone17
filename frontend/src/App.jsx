import React from 'react';
import { AppProvider } from './context/AppContext';
import { useScrollReveal } from './hooks/useScrollReveal';

// Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AppleIntelligence } from './components/AppleIntelligence';
import { Camera } from './components/Camera';
import { Performance } from './components/Performance';
import { SpecsAndColors } from './components/SpecsAndColors';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';

// Lazy load below-the-fold components
const FAQ = React.lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const ProductLineup = React.lazy(() => import('./components/ProductLineup').then(m => ({ default: m.ProductLineup })));
const ViewedHistory = React.lazy(() => import('./components/ViewedHistory').then(m => ({ default: m.ViewedHistory })));
const OrderForm = React.lazy(() => import('./components/OrderForm').then(m => ({ default: m.OrderForm })));
const Chatbot = React.lazy(() => import('./components/Chatbot').then(m => ({ default: m.Chatbot })));

const MainLayout = () => {
  // Apply our dynamic intersection observer scroll reveal transitions
  useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* Dynamic Toasts */}
      <ToastContainer />

      {/* Navigation Header */}
      <Header />

      {/* Scrollytelling Panels */}
      <main className="flex-grow">
        {/* Section 1: Hero Phone Focus */}
        <Hero />

        {/* Section 2: Apple Intelligence Grid */}
        <AppleIntelligence />

        {/* Section 3: Camera Tech Tabs */}
        <Camera />

        {/* Section 4: Performance Chips & Battery charts */}
        <Performance />

        {/* Section 5: Specs & Color Details Table */}
        <SpecsAndColors />

        {/* Section 8: FAQ collapsible Accordions */}
        <React.Suspense fallback={<div className="container max-w-7xl mx-auto px-4 py-8"><div className="h-40 bg-zinc-50 dark:bg-zinc-900 rounded-2xl animate-pulse" /></div>}>
          <FAQ />
        </React.Suspense>

        {/* Section 6: E-commerce cards shop */}
        <React.Suspense fallback={<div className="container max-w-7xl mx-auto px-4 py-12"><div className="h-[500px] bg-zinc-50 dark:bg-zinc-900 rounded-2xl animate-pulse" /></div>}>
          <ProductLineup />
        </React.Suspense>

        {/* Section 7: Browsed products Carousel */}
        <React.Suspense fallback={<div className="container max-w-7xl mx-auto px-4 py-8"><div className="h-32 bg-zinc-50 dark:bg-zinc-900 rounded-2xl animate-pulse" /></div>}>
          <ViewedHistory />
        </React.Suspense>

        {/* Section 9: Pre-order validation form */}
        <React.Suspense fallback={<div className="container max-w-7xl mx-auto px-4 py-12"><div className="h-96 bg-zinc-50 dark:bg-zinc-900 rounded-2xl animate-pulse" /></div>}>
          <OrderForm />
        </React.Suspense>
      </main>

      {/* Floating Chatbot Assistant */}
      <React.Suspense fallback={null}>
        <Chatbot />
      </React.Suspense>

      {/* Dynamic Branding Footer */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
