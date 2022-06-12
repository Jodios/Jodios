import '@emotion/react';
import { createElement, Fragment,useEffect, useState } from 'react';
import { unified } from 'unified';
import rehypeReact from 'rehype-react';
import remarkRehype from 'remark-rehype';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';

const JDSRehype = ({content}) => {

    const [parsedContent, setParsedContent] = useState(<div className='mdContent'></div>);
    useEffect(() => {
        unified()
        .use(remarkParse)
        .use(remarkRehype, {allowDangerousHtml: true})
        .use(rehypeFormat)
        .use(rehypeStringify, {allowDangerousHtml: true})
        .use(rehypeReact, {createElement, Fragment})
        .process(content)
        .then((res) => {
            setParsedContent(
                <div className='mdContent'>{res.result}</div>
            );
        });

    }, [content]);
    return parsedContent;
};
export default JDSRehype;