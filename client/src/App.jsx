import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Clients from './components/Clients';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      <Navbar />
      <Hero />
      <Education />
      <Projects />
      <Experience />
      <Skills />
      <Certifications />
      <Clients />
      <Footer />
    </div>
  );
}

export default App;
