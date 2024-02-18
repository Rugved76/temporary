import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails';
import NotFound from './components/Notfound/NotFound';
import Userinfo from './components/Userinfo/Userinfo';
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Container } from '@mui/material';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import './App.css';

const App = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const scrollThreshold = 200;

            if (scrollY > scrollThreshold) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <ArrowUpwardRoundedIcon className={showScrollButton ? 'scrollup show' : 'scrollup hide'} onClick={scrollToTop} />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/posts" />} />
                    <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/posts" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/user/info/:id" element={<Userinfo />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
