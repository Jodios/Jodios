import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './App.scss'
import { gql, useQuery } from '@apollo/client';
import Markdown from 'react-markdown';
import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';

const authorQuery = gql`
  query MyQuery {
    author(where: {slug: "jodios"}) {
      name
      bio
    }
  }
`;

function App() {

  const { data, loading, error } = useQuery(authorQuery);

  const logLinkClick = (name) => {
    logEvent(analytics, "click", {"type": "link", "to": name})
  }

  return (
    <div className='App Container'>
      <section>
        <div id='sectionContent'>
          <div style={{ marginBottom: 200, fontSize: 50 }}>Jodios</div>
          <Link target='empty' to="https://www.linkedin.com/in/joel-ortiz-a3460ba3/" onClick={()=>{logLinkClick("LinkedIn")}}>
            <LinkedInIcon id='iconLink'/>
          </Link>
          <Link target='empty' to="https://github.com/jodios" onClick={()=>{logLinkClick("Github")}}>
            <GitHubIcon id='iconLink' />
          </Link>
          <Link to="/blog" id='link' onClick={()=>{logLinkClick("Blog")}}>Blog</Link>
          <a href="#aboutSection" id='link' onClick={()=>{logLinkClick("About")}}>About</a>
        </div>
      </section>
      <section id='aboutSection'>
        <div id='sectionContent'>
          {error && "Something went wrong..."}
          {!loading &&
            <>
              <Markdown>
                {data.author.bio}
              </Markdown>
              - {data.author.name}
            </>
          }
        </div>
      </section>
    </div>
  );
}

export default App;
