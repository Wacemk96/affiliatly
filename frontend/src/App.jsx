import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Blog from './Pages/Blog';
import Header from './components/Header-Footer/Header';
import Footer from './components/Header-Footer/Footer';
import {Routes, Route} from 'react-router-dom';
import Services from './Pages/Services';
export default function App() {
  return (
    <>
      <div className="dark:bg-slate-800">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="about"
            element={<About />}
          />
          <Route
            path="contact"
            element={<Contact />}
          />
          <Route
            path="services"
            element={<Services />}
          />
          <Route
            path="blog"
            element={<Blog />}
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
