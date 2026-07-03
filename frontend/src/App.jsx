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
import { ProductLineup } from './components/ProductLineup';
import { ViewedHistory } from './components/ViewedHistory';
import { FAQ } from './components/FAQ';
import { OrderForm } from './components/OrderForm';
import { Chatbot } from './components/Chatbot';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';

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
        <FAQ />

        {/* Section 6: E-commerce cards shop */}
        <ProductLineup />

        {/* Section 7: Browsed products Carousel */}
        <ViewedHistory />

        {/* Section 9: Pre-order validation form */}
        <OrderForm />
      </main>

      {/* Floating Chatbot Assistant */}
      <Chatbot />

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
