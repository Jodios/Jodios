
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, matchPath, useLocation } from 'react-router-dom';

const links = [
    {path: '/', label:'Home', id: 0, activations: ['/']},
    {path: '/blog', label:'Blog', id: 1, activations:['/blog/:slug', '/blog'], disabled: true},
    {path: '/photography', label:'Photography', id: 2, activations:['/photography/:slug', '/photography'], disabled: true}
];
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

const Nav = () => {
    const currentTab = getCurrentTab();

    return (
        <Box className='Nav'>
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
        </Box>
    );
};
export default Nav;
