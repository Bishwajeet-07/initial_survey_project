
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';

const Main = () => {
    return (
        <App />
    )
};

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Main />
    </StrictMode>,
)