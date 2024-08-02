import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import VisibilityIcon from '@mui/icons-material/Visibility';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const VideoCard = ({ video: { id: { videoId }, snippet } }) => (
  <Card sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 0 }}>
    <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY` }>
      <CardMedia image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title} 
        sx={{ width: { xs: '100%', sm: '358px'}, height: 180 }} 
      />
    </Link>
    <CardContent sx={{ backgroundColor: "#1E1E1E", height: '106px' }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl } >
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
          {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
        </Typography>
      </Link>
      <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
        <Typography variant="subtitle2" color="gray">
          {snippet?.channelTitle || demoChannelTitle}
          <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
        </Typography>
      </Link>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <VisibilityIcon sx={{ fontSize: "16px", color: "gray", mr: 1 }} />
            <Typography variant="body2" color="gray" sx={{ mr: 2 }}>
                {snippet?.viewCount !== undefined ? `${snippet.viewCount} просмотров` : '0'}
            </Typography>
            <ThumbUpIcon sx={{ fontSize: "16px", color: "gray", mr: 1 }} />
            <Typography variant="body2" color="gray" sx={{ mr: 2 }}>
                {snippet?.likes !== undefined ? snippet.likes : '0'}
            </Typography>
            <ThumbDownIcon sx={{ fontSize: "16px", color: "gray", mr: 1 }} />
            <Typography variant="body2" color="gray">
                {snippet?.dislikes !== undefined ? snippet.dislikes : '0'}
            </Typography>
            <Typography variant="body2" color="gray" sx={{ ml: 2 }}>
                  {formatDate(snippet?.publishedAt)}
            </Typography>
        </Box>

    </CardContent>
  </Card>
);

export default VideoCard