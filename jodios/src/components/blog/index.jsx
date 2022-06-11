import { getPosts } from '../../service/blogService'; 
import { useEffect, useState } from 'react';
import JCard from './jCard';

const Blog = () => {

    const [posts, setPosts] = useState(undefined);

    useEffect(() => {
        const getCards = async() => {
            const posts = await getPosts();
            setPosts(posts);
        };
        getCards();
    }, []);

    return (
        <div className='Blog jds-container'>
            {posts && posts.map(post => 
                <JCard id='post' {...post} key={post.id}></JCard>
            )}
        </div>
    );
};
export default Blog;