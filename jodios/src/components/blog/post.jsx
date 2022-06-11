import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getPost } from '../../service/blogService';
import Skeleton from '@mui/material/Skeleton';
import { formatTimestamp } from '../../utils/formatUtils';
import JDSRehype from '../common/jdsRehype';
import { Typography } from '@mui/material';


function Post() {
    const { slug } = useParams();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [post, setPost] = useState(undefined);

    useEffect(() => {
        const getContent = async() => {
            const post = await getPost(slug);
            setPost(post);
        };
        getContent();
    }, []);

    const imgLoader = <Skeleton animation='wave' variant='rectangular' width={900} height={500} />; 

    return (
        <div className='Post jds-container'>
            <div id='coverImage'>
                {!post && !imageLoaded &&
                    <Typography id='imageLoader'>
                        <Skeleton id='imageSkeleton' animation='wave' variant='rectangular' width={900} height={500} /> 
                    </Typography>
                || 
                    <img src={post.coverImage.url} 
                        onLoad={() => setImageLoaded(true)} 
                        alt='cover image'/>
                }
            </div>
            {post &&
                <div id='content'>
                    <div id='header'>
                        <div id='title'>{post.title}</div>
                        <div id='published'>{formatTimestamp(post.publishedAt)}</div>
                    </div>
                    <JDSRehype content={post.content} />
                </div>
                || 
                <Typography id='postContentLoader'>
                    {Array(5).fill(
                        <Skeleton id='postContentSkeleton' variant='rectangular'/>
                    )}
                    <Skeleton id='postContentSkeletonEnd' variant='rectangular'/>
                </Typography>
            }
        </div>
    );
}
export default Post;
