import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ChatWindow } from './components/ChatWindow';
import { FAQPanel } from './components/FAQPanel';
import { ExploreCollege } from './components/ExploreCollege';
import { AboutCollege } from './components/AboutCollege';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [externalQuery, setExternalQuery] = useState<{ text: string; id: number } | null>(null);

  const handleQueryDispatch = (queryText: string) => {
    setExternalQuery({ text: queryText, id: Date.now() });
  };

  const handleAskAIClick = () => {
    const chatElement = document.getElementById('chatbot');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Sticky Professional Header */}
      <Header onAskAIClick={handleAskAIClick} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onStartChat={handleAskAIClick} />

        {/* 3. Main Chatbot & FAQ Two-Column Area */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* LEFT COLUMN: Main Chatbot Card (7 Cols on desktop) */}
            <div className="lg:col-span-7">
              <ChatWindow externalQuery={externalQuery} />
            </div>

            {/* RIGHT COLUMN: Frequently Asked Questions Panel (5 Cols on desktop) */}
            <div className="lg:col-span-5">
              <FAQPanel onQuestionClick={handleQueryDispatch} />
            </div>
          </div>
        </section>

        {/* 4. Explore Your College (6 Feature Cards) */}
        <ExploreCollege onCardClick={handleQueryDispatch} />

        {/* 5. About College Feature Overview */}
        <AboutCollege />
      </main>

      {/* 6. Dark Navy Footer */}
      <Footer />
    </div>
  );
};

export default App;
