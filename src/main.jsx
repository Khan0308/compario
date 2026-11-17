import { Analytics } from '@vercel/analytics/react';
import React from 'react';import {createRoot} from 'react-dom/client';import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx';import {CompareProvider} from './context/CompareContext.jsx';import './styles/global.css';
createRoot(document.getElementById('root')).render(<BrowserRouter><CompareProvider><App/><Analytics /></CompareProvider></BrowserRouter>);
