// import { StrictMode } from 'react'; // <- нужен ли строгий режим ? тогда считает дважды...
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>
);
