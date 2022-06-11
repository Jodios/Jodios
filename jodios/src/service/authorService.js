import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const url = 'https://api-us-west-2.graphcms.com/v2/cl3nsb6j5481m01xi8zyq9t7l/master';


const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache()
});

export const getAuthor = async (slug) => {
  const query = gql`
    query MyQuery {
      author(where: {slug: "${slug}"}) {
        interest
        intro
        name
        picture {
          url
        }
        bio
      }
    }
  `;
  return new Promise((resolve, reject) => {
    client.query({ query: query }).then(data => {
      resolve(data.data.author);
    }).catch(error => {
      reject(error);
    });
  });
};
