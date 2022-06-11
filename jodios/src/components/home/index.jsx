import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { getAuthor } from '../../service/authorService';
import GitHubIcrom from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import JDSRehype from '../common/jdsRehype';
import { useEffect, useState } from 'react';
import Nav from '../nav';

const Home = ({ setShowNav, value, setValue }) => {

    const [me, setMe] = useState(undefined);

    useEffect(() => {
        setShowNav(false);
        const getMyBio = async () => {
            const me = await getAuthor('jodios');
            setMe(me);
        };
        getMyBio();
        return (() => {
            setShowNav(true);
        });
    }, []);


    return (
        <div className='Home'>
            <div id='upperHalf'>
                <div id='title'>
                    <div>JODIOS</div>
                </div>
            </div>
            <div id='homeNav'>
                <Nav value={value} setValue={setValue} />
            </div>
            <div id='content' className='jds-container'>
                <div id='introHead'>
                    <div id='intro'>
                        {me ?
                            <div>
                                <div id='profilePicture'>
                                    <img src={me.picture.url}
                                        alt='Joels Profile picture' />
                                </div>
                                <div id='introText'>
                                    {me.intro}
                                </div>
                            </div>
                            :
                            <Typography  id='profileLoader'>
                                <Skeleton id='profilePictureSkeleton' variant='circular'/>
                                <Skeleton id='profileBioSkeleton' variant='rectangular'/>
                            </Typography>
                        }
                        <Stack direction='row' spacing={1} id="links">
                            <a href='https://www.github.com/jodios' rel='noreferrer' target='_blank'><GitHubIcrom id='link' /></a>
                            <a href='https://www.linkedin.com/in/joel-ortiz-a3460ba3/' rel='noreferrer' target='_blank'><LinkedInIcon id='link' /></a>
                            <a href="mailto: joelandapophis@gmail.com"><EmailIcon id='link' /></a>
                        </Stack>
                        {me ?
                            <div id='interests'>
                                <Chip label='Interests:' id='interest' color='primary' />
                                {me.interest.map(interes =>
                                    <Chip label={interes} color='primary' variant='outlined' id='interest' key={interes} />
                                )}
                            </div>
                            : 
                            <div id='interestLoader'>
                                {Array(12).fill(
                                    <Skeleton id='interestSkeleton' variant='rectangular' width={40} height={20}/> 
                                )}
                            </div>
                            
                        }
                    </div>
                    <div id="breaker" />
                    <div id='aboutMe'>
                        {me ?
                            <JDSRehype content={me.bio}/>
                            :
                            <Typography id='aboutMeLoader'>
                                {Array(5).fill(
                                    <Skeleton id='aboutMeSkeleton' variant='rectangular'/>
                                )}
                                <Skeleton id='aboutMeSkeletonEnd' variant='rectangular'/>
                            </Typography>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;
