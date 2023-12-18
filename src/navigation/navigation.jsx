import React, { useState } from 'react'
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';
import './navigation.scss';

const Navigation = () => {
    return (
        <Box className="Navigation">
            <ul>
                <li>
                    <Link to="/" onClick={()=>{logEvent(analytics, "click", { "type": "navigation_link", "to": "home" })}}>Home</Link>
                </li>
                <li>
                    <Link to="/blog" onClick={()=>{logEvent(analytics, "click", { "type": "navigation_link", "to": "blog" })}}>Blog</Link>
                </li>
            </ul>
        </Box>
    );
}

export default Navigation;