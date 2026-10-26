import { useEffect, useRef, useState } from 'react';
import Home from './pages/home';
import Waec from './pages/waec';
import Lowbee from './pages/lowbee';
import Knifebud from './pages/knifebud';
import Gates from './pages/gates';
import Jammies from './pages/jammies';
import About from './pages/about';
import { ThemeContext } from './components/ThemeToggle';

const routes = {
  '/': { View: Home, title: 'Ebenezer Olabinjo — User Researcher & Product Designer' },
  '/about': { View: About, title: 'About Eben — Research & Product Design' },
  '/work/waec': { View: Waec, title: 'WAEC Digital Certificate — Ebenezer Olabinjo' },
  '/work/lowbee': { View: Lowbee, title: 'Lowbee — Ebenezer Olabinjo' },
  '/work/knifebud': { View: Knifebud, title: 'Knifebud — Ebenezer Olabinjo' },
  '/work/gates': { View: Gates, title: 'Making it Real / DODO — Ebenezer Olabinjo' },
  '/jammies': { View: Jammies, title: 'Jammies — Gospel Platform & Community' },
};

function ImageViewer({ image, close }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!image) return;
    const dialog = ref.current;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [image]);
  if (!image) return null;
  return <dialog ref={ref} className="image-viewer" aria-label="Expanded project image"
    onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }}>
    <button type="button" className="viewer-close" onClick={close} autoFocus aria-label="Close expanded image">Close ×</button>
    <img src={image.src} alt={image.alt} />
    <p>{image.alt}</p>
  </dialog>;
}

function NotFound() {
  return <main id="main-content" className="site-page not-found"><h1>Page not found.</h1><p>Let’s get you back to the work.</p><a className="quiet-link" href="/">← Home</a></main>;
}

export default function App() {
  const [pathname, setPathname] = useState(() => location.pathname.replace(/\/$/, '') || '/');
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  const [image, setImage] = useState(null);
  const route = routes[pathname];
  const View = route?.View || NotFound;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#191919' : '#fafaf7';
    try { localStorage.setItem('bnzr-theme', theme); } catch { /* Private browsing can disable storage. */ }
  }, [theme]);

  useEffect(() => {
    document.title = route?.title || 'Page not found — Ebenezer Olabinjo';
    const id = location.hash.slice(1);
    requestAnimationFrame(() => id ? document.getElementById(id)?.scrollIntoView() : window.scrollTo(0, 0));
  }, [pathname, route]);

  useEffect(() => {
    const update = () => setPathname(location.pathname.replace(/\/$/, '') || '/');
    const click = e => {
      const anchor = e.target.closest('a[href]');
      if (!anchor || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || anchor.target === '_blank') return;
      const url = new URL(anchor.href);
      if (url.origin !== location.origin) return;
      e.preventDefault();
      history.pushState(null, '', url.pathname + url.hash);
      update();
      if (url.hash) requestAnimationFrame(() => document.getElementById(url.hash.slice(1))?.scrollIntoView());
    };
    document.addEventListener('click', click);
    window.addEventListener('popstate', update);
    return () => { document.removeEventListener('click', click); window.removeEventListener('popstate', update); };
  }, []);

  const inspectImage = e => {
    const img = e.target.closest('img[data-zoomable]');
    if (img && pathname !== '/' && !img.alt.startsWith('Portrait')) setImage({ src: img.src, alt: img.alt });
  };

  return <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === 'dark' ? 'light' : 'dark') }}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="site" onClick={inspectImage} onKeyDown={e => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('img[data-zoomable]')) { e.preventDefault(); inspectImage(e); }
    }}><View /></div>
    <ImageViewer image={image} close={() => setImage(null)} />
  </ThemeContext.Provider>;
}
