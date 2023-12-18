import { Box } from '@mui/material'
import React from 'react'
import { gql, useQuery } from '@apollo/client';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useNavigate } from 'react-router-dom';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

import './blog.scss';

const PostQuery = gql`
    query MyQuery {
        posts(orderBy:publishedAt_DESC) {
            slug
            tags {
                tag
            }
            title
            publishedAt
            authors {
                name
            }
            coverImage {
                url
            }
        }
    }
`;

const Blog = () => {

    const { loading, error, data } = useQuery(PostQuery);
    const { width } = useWindowDimensions();
    const navigate = useNavigate();

    const handleCardClick = (slug) => {
        logEvent(analytics, "click", { "type": "blog_post", "to": slug })
        navigate(`/blog/${slug}`);
    }

    if (error) {
        logEvent(analytics, "exception", {"description": "failed to retrieve blog posts"})
        return (
            <div className='Blog Container'>
                <section>
                    <div id='sectionContent'>
                        ERROR...
                        {JSON.stringify(error)}
                    </div>
                </section>
            </div>
        )
    }

    if (loading) {
        return (
            <div className='Blog Container'>
                <section>
                    <div id='sectionContent'>
                        loading...
                    </div>
                </section>
            </div>
        )
    }

    return (
        <Box className='Blog Container'>
            <section>
                <div id='sectionContent'>
                    {data.posts && data.posts.map((post, i) =>
                        <Box id="BlogCard" onClick={() => { handleCardClick(post.slug) }} key={i}>
                            <img src={post.coverImage.url} />
                            <h1>{post.title}</h1>
                        </Box>
                    )}
                </div>
            </section>
        </Box>
    )
}

export default Blog