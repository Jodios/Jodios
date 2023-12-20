import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { funky as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';
import remarkGfm from 'remark-gfm';

import './post.scss';

const postQuery = (slug) => gql`
    query MyQuery {
        post(where: {slug: "${slug}"}) {
            authors {
                name
            }
            files {
                fileName
                url
            }
            coverImage {
                url
            }
            content
            publishedAt
            slug
            tags {
                tag
            }
            title
            updatedAt
        }
    }
`;

const Post = () => {
    const { slug } = useParams();
    const { loading, error, data } = useQuery(postQuery(slug));

    const download = (url, name) => {
        logEvent(analytics, "file_download", { "description": `downloading ${name} from ${slug}` })
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const blobURL = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobURL;
                a.style = "display: none";

                if (name && name.length) a.download = name;
                document.body.appendChild(a);
                a.click();
            })
            .catch((e) => console.log("Failed to download: ", e));
    }

    if (error) {
        logEvent(analytics, "exception", { "description": `failed to load post: ${slug}` })
        return (
            <div className='Post Container'>
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
            <div className='Post Container'>
                <section>
                    <div id='sectionContent'>
                        loading...
                    </div>
                </section>
            </div>
        )
    }

    const generateSlug = (string) => {
        let str = string.replace(/^\s+|\s+$/g, "");
        str = str.toLowerCase();
        str = str
            .replace(/[^a-z0-9 -]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
        const heading = {
            title: string,
            href: str,
        };
        
        return str;
    };

    const tableOfConent = [...data.post.content.matchAll('(###.*|##.*)')].map(result => {
        const heading = result[0].replace("###", "").replace("##", "").trim();
        const href = `#${generateSlug(heading)}` 
        return (
            <li id="tocItem"><a href={href}>{heading}</a></li>
        );
    });

    return (
        <Box className='Post Container'>
            <section>
                <Box id='sectionContent'>
                    <Box id="heading">
                        <img src={data.post.coverImage.url} />
                        <h1>{data.post.title}</h1>
                        <Box id="createdDate">
                            <CalendarTodayIcon id="icon" />
                            {new Date(data.post.publishedAt).toLocaleDateString("en-us").replaceAll("/", "-")}
                            <PermIdentityIcon sx={{ marginLeft: 2 }} id="icon" />
                            {data.post.authors[0].name}
                        </Box>
                        <Box id="Files">
                            {data.post.files.length > 0 && data.post.files.map((file, i) =>
                                <Box key={i} id="File">
                                    <FolderOpenIcon />
                                    <Box onClick={() => (download(file.url, file.fileName))}>{file.fileName}</Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Divider id="divider" />
                    <Box id='toc'>
                        <h2>Table of content</h2>
                        <ul>{tableOfConent}</ul>
                    </Box>
                    <Markdown
                        remarkPlugins={[remarkMath, remarkGfm]}
                        rehypePlugins={[rehypeKatex]}
                        children={data.post.content}
                        components={{
                            code(props) {
                                const { children, className, node, ...rest } = props
                                const match = /language-(\w+)/.exec(className || '')
                                return match ? (
                                    <SyntaxHighlighter
                                        {...rest}
                                        PreTag="div"
                                        children={String(children).replace(/\n$/, '')}
                                        language={match[1]}
                                        style={codeStyle}
                                    />
                                ) : (
                                    <code {...rest} className={className}>
                                        {children}
                                    </code>
                                )
                            },
                            h3: ({ node, ...props }) => {
                                return <h3 id={generateSlug(props.children)} {...props}></h3>
                            },
                            h2: ({ node, ...props }) => {
                                return <h2 id={generateSlug(props.children)} {...props}></h2>
                            },
                        }}
                    />
                </Box>
            </section>
        </Box>
    );
}

export default Post;