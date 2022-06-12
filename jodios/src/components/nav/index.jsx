
import { Tabs, Tab, Box, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const links = [
    {path: '/', label:'Home', id: 0, activations: ['/']},
    {path: '/blog', label:'Blog', id: 1, activations:['/blog/:slug', '/blog'], disabled: false},
    {path: '/photography', label:'Photography', id: 2, activations:['/photography/:slug', '/photography'], disabled: true}
];

const Nav = () => {

    const [isOpen, setIsOpen] = useState(false); 
    const currentTab = getCurrentTab();

    const menuClick = (event) => {
        setIsOpen(!isOpen);
    };

    return (
        <Box className='Nav'>
            <div id='smallNav'>
                {!isOpen && 
                    <AppBar position='static'>
                        <Toolbar variant='dense'>
                            <IconButton edge='start' color='inherit' aria-label='menu' onClick={menuClick}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant='h6' color='inherit' component='div'>
                                Jodios
                            </Typography>
                        </Toolbar>
                    </AppBar>
                }
                <Drawer anchor='left' open={isOpen} onClose={menuClick}>
                    <List>
                        {links.map(link => 
                            <ListItem key={link.path}>
                                <ListItemButton onClick={menuClick} disabled={link.disabled} component={Link} to={link.path} divider>
                                    <ListItemText>{link.label}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Drawer>
            </div>
            <div id='normalNav'>
                <Tabs value={currentTab} centered>
                    {links.map(link => 
                            <Tab id={link.disabled ? 'disabledLink':'enabledLink'} 
                                label={link.label} 
                                key={link.id} 
                                disabled={link.disabled}
                                value={link.path}
                                to={link.path}
                                LinkComponent={Link}
                                />
                    )}
                </Tabs>
            </div>
        </Box>
    );
};
export default Nav;

const useRouteMatch = (patterns) => {
    const { pathname } = useLocation();
    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }
    return null;
};

const getCurrentTab = () => {
    for(let i = 0; i < links.length; i++){
        let possibleMatch = useRouteMatch(links[i].activations);
        if (possibleMatch){
            return links[i].path;
        }
    }
};