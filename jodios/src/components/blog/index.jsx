import { getPosts } from '../../service/blogService'; 
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import JCard from './jCard';

const Blog = () => {

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        getCards();
    }, []);

    const handlePageChange = () => {
        getCards();
    };

    const getCards = async() => {
        const postsResponse = await getPosts(pageSize, page * pageSize);
        if (postsResponse.length <= 0) {
            setHasMore(false);
            return;
        }
        setPosts(posts.concat(postsResponse));
        setPage(page+1);
    };

    return (
        <>
            {posts && posts.length > 0 && 
                <InfiniteScroll pageStart={0} loadMore={handlePageChange} hasMore={true} className='Blog jds-container'>
                    {posts.map(post => 
                        <JCard id='post' {...post} key={post.id}></JCard>
                    )}
                </InfiniteScroll>
            }
        </>
    );
};
export default Blog;