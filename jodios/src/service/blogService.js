import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const url = 'https://api-us-west-2.graphcms.com/v2/cl3nsb6j5481m01xi8zyq9t7l/master';

const postsQuery = gql`
  query MyQuery {
      posts {
        slug
        tags
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

const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache()
});

export const getPosts = async () => {
    return new Promise((resolve, reject) => {
        client.query({query: postsQuery}).then(data => {
            resolve(data.data.posts);
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
      tags
      title
      updatedAt
    }
  }
    `;
    return new Promise((resolve, reject) => {
        client.query({query: postQuery}).then(data => {
            resolve(data.data.post);
        }).catch(error => {
            reject(error);
        });
    });
};
