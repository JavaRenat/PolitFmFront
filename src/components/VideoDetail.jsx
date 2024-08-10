import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import ReactPlayer from "react-player";
import {Typography, Box, Stack, Button, Collapse, IconButton} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {Videos, Loader} from "./";
import {fetchFromAPI} from "../utils/fetchFromAPI";
import Comments from "./Comments"; // Импортируем Comments
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import ThumbUpIcon from "@mui/icons-material/ThumbUp.js";
import ThumbDownIcon from "@mui/icons-material/ThumbDown.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShareIcon from '@mui/icons-material/Share';

const VideoDetail = () => {
    const [videoDetail, setVideoDetail] = useState(null);
    // const [videos, setVideos] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        fetchFromAPI(`video?id=${id}`)
            .then((data) => setVideoDetail(data.items[0]))

        // fetchFromAPI(`video?part=snippet&relatedToVideoId=${id}&type=video`)
        //     .then((data) => setVideos(data.items))
    }, [id]);

    if (!videoDetail?.snippet) return <Typography variant="h5" color="error">Не найдено.</Typography>; // Если данных нет, отображаем сообщение//<Loader/>;

    const {snippet: {title, channelId, channelTitle, videoUrl}, statistics: {viewCount, likes, dislikes}} = videoDetail;

    return (
        <Box minHeight="95vh">
            <Stack direction={{xs: "column", md: "row"}}>
                <Box flex={1}>
                    <Box sx={{width: "100%", position: "sticky", top: "86px"}}>
                        <ReactPlayer
                            url={videoUrl}
                            className="react-player"
                            controls
                            playsinline
                        />
                        <Typography color="#fff" variant="h6" fontWeight="bold" p={2}>
                          {title.slice(0, 35) + (title.length > 35 ? '...' : '')}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" sx={{color: "#fff"}} py={1} px={2}>
                            <Link to={`/channel/${channelId}`}>
                                <Typography variant={{sm: "subtitle1", md: 'h6'}} color="#fff">
                                    Канал
                                    <CheckCircleIcon sx={{fontSize: "12px", color: "gray", ml: "5px"}}/>
                                </Typography>
                            </Link>
                          <Stack direction="row" gap="20px" alignItems="center">
                            <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  border: '1px solid gray',
                                  borderRadius: '50px',
                                  padding: '5px 10px',
                                  ml: "50px"
                                }}
                            >
                              <IconButton
                                  sx={{
                                    p: 0,
                                    mr: 1,
                                    color: 'gray',
                                    transition: 'color 0.3s',
                                    '&:hover': {
                                      color: 'blue',
                                    },
                                    '&:active': {
                                      color: 'darkblue',
                                    },
                                  }}
                              >
                                <ThumbUpIcon sx={{ fontSize: "16px" }} />
                              </IconButton>
                              <Typography variant="body1" sx={{ opacity: 0.7, mr: 2 }}>
                                {likes.toLocaleString()}
                              </Typography>
                              <IconButton
                                  sx={{
                                    p: 0,
                                    mr: 1,
                                    color: 'gray',
                                    transition: 'color 0.3s',
                                    '&:hover': {
                                      color: 'red',
                                    },
                                    '&:active': {
                                      color: 'darkred',
                                    },
                                  }}
                              >
                                <ThumbDownIcon sx={{ fontSize: "16px" }} />
                              </IconButton>
                              <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                {dislikes.toLocaleString()}
                              </Typography>
                            </Box>
                          </Stack>

                        </Stack>
                      <Box sx={{display: 'flex', justifyContent: 'space-between', px: 2, py: 1}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                          <VisibilityIcon sx={{fontSize: "16px", color: "gray", mr: 1}}/>
                          <Typography variant="body1" sx={{opacity: 0.7, color: '#fff'}}>
                            {viewCount.toLocaleString()}
                          </Typography>
                        </Box>
                        <Button variant="contained"
                                sx={{backgroundColor: 'gray', color: '#fff', borderRadius: '20px'}}>
                          Подписаться
                        </Button>
                        <Button variant="contained"
                                sx={{backgroundColor: 'gray', color: '#fff', borderRadius: '20px'}}>
                          <ShareIcon sx={{ml: 1, mr: 2}} />
                        </Button>
                      </Box>
                    </Box>
                </Box>
                {/*<Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >*/}
                {/*  <Videos videos={videos} direction="column" />*/}
                {/*</Box>*/}
                <Box px={2} py={{md: 1, xs: 0}} justifyContent="center" alignItems="center">
                    <Comments videoId={id}/> {/* Используем компоненту Comments */}
                </Box>
            </Stack>
        </Box>
    );
};

export default VideoDetail;
