import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { formatTimestamp } from '../../utils/formatUtils';

const JCard = ({slug, publishedAt, tags, title, authors, coverImage}) => {
  const mainAuthor = authors[0];
  let date = formatTimestamp(publishedAt);

  return (
      <Card className='JCard'>
        <CardHeader
          avatar={
            <Avatar aria-label={mainAuthor.name} 
            src={mainAuthor.picture.url} alt={mainAuthor.name}/>
          }
          title={mainAuthor.name}
          subheader={date}
        />
        <CardMedia
          component='img'
          height='140'
          image={coverImage.url}
          alt='cover image'
        />
        <CardContent>
          <div>
            {title}
          </div>
          <br/>
          {tags.map(tag => 
            <Chip label={tag.tag} color="primary" variant="outlined" id="tag" key={tag.tag}/>
          )}
        </CardContent>
        <CardActions id='cardFooter'>
          <Link to={`/blog/${slug}`}>
            <Button size='small' variant='outlined'>Read...</Button>
          </Link>
        </CardActions>
      </Card>
  );
};

export default JCard;