import { getPosts, getTags } from '../../service/blogService'; 
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import JCard from './jCard';
import { Autocomplete, TextField } from '@mui/material';

const Blog = () => {

    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [hasMore, setHasMore] = useState(true);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getTags().then(tagsResponse => {
            setTags(tagsResponse.map(tags => tags.tag));
        });
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
        setFilteredPosts(filteredPosts.concat(postsResponse));
        setPage(page+1);
    };

    const filterChange = (event, values) => {
        if(values.length === 0) {
            setFilteredPosts(posts);
            return;
        }
        setFilteredPosts(posts.filter(post => {
            for(var i = 0; i < post.tags.length; i++){
                const tag = post.tags[i].tag;
                if(values.indexOf(tag) !== -1){
                    return true;
                }
            }
            return false;
        }));
    };

    return (
        <>
            <div id='tagSelector'>
                <Autocomplete multiple options={tags} onChange={filterChange}
                    renderInput={(params) => 
                        <TextField {...params} variant='standard' label='Tags'/>
                    }
                />
            </div>
            {filteredPosts && filteredPosts.length > 0 && 
                <InfiniteScroll pageStart={0} loadMore={handlePageChange} hasMore={true} className='Blog jds-container'>
                    {filteredPosts.map(post => 
                        <JCard id='post' {...post} key={post.id}></JCard>
                    )}
                </InfiniteScroll>
            }
        </>
    );
};
export default Blog;