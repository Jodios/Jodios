import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const url = 'https://api-us-west-2.graphcms.com/v2/cl3nsb6j5481m01xi8zyq9t7l/master';

const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache()
});

export const getPosts = async (first, skip) => {
  const query = gql`
  query MyQuery {
      posts(orderBy:publishedAt_DESC, first: ${first}, skip: ${skip}) {
        slug
        tags {
          tag
        }
        title
        publishedAt
        authors {
          name
          slug
          picture {
            url
          }
        }
        coverImage {
          url
        }
      }
    }
  `;
  return new Promise((resolve, reject) => {
    client.query({ query: query }).then(data => {
      resolve( data.data.posts );
    }).catch(error => {
      reject(error);
    });
  });
};

export const getPost = async (slug) => {
  const postQuery = gql`
  query MyQuery {
    post(where: {slug: "${slug}"}) {
      authors {
        name
        picture {
          url
        }
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
  return new Promise((resolve, reject) => {
    client.query({ query: postQuery }).then(data => {
      resolve(data.data.post);
    }).catch(error => {
      reject(error);
    });
  });
};
