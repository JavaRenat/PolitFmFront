import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import ReactPlayer from "react-player";
import {Box, Button, IconButton, Stack, Typography} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {fetchFromAPI, fetchFromAPIGeneral} from "../utils/fetchFromAPI";
import Comments from "./Comments"; // Импортируем Comments
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import ThumbUpIcon from "@mui/icons-material/ThumbUp.js";
import ThumbDownIcon from "@mui/icons-material/ThumbDown.js";
import ShareIcon from '@mui/icons-material/Share';
import WebApp from "@twa-dev/sdk";

/*
Эта компонента нужна для проигрывания видео
 */

const VideoDetail = () => {
    const [videoDetail, setVideoDetail] = useState(null);
    // const [videos, setVideos] = useState(null);
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const [authorId, setAuthorId] = useState(null);
    const [authorTelegramName, setAuthorTelegramName] = useState(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // состояние для управления отображением описания


    useEffect(() => {
        const userInfo = WebApp.initDataUnsafe?.user;
        if (userInfo) {
            setUser(userInfo);
            setAuthorId(userInfo.id);
            setAuthorTelegramName(userInfo.username || 'Виктор Цой');
        }
        fetchFromAPI(`video?id=${id}`)
            .then((data) => setVideoDetail(data.items[0]))
    }, [id]);

    if (!videoDetail?.snippet) return <Typography variant="h5" color="error">...</Typography>; // Если данных нет, отображаем сообщение//<Loader/>;

    const {snippet: {title, channelId, videoUrl, description}, statistics: {viewCount, likes, dislikes}} = videoDetail;

    const handleLike = async () => {
        try {
            const likeData = {
                author: authorId !== undefined && authorId !== null ? authorId : 666,
                authorDisplayName: authorTelegramName !== undefined && authorTelegramName !== null ? authorTelegramName : 'Земфира'
            };

            const response = await fetchFromAPIGeneral(`videos/${id}/like`, 'POST', JSON.stringify(likeData));

            if (response.ok) {
                setVideoDetail(prevDetail => ({
                    ...prevDetail,
                    statistics: {
                        ...prevDetail.statistics,
                        likes: prevDetail.statistics.likes + 1
                    }
                }));
            } else {
                console.error('Ошибка отправки лайка');
            }

        } catch (error) {
            console.error('Error liking the video:', error);
        }
    };

    const handleDislike = async () => {
        const dislikeData = {
            author: authorId !== undefined && authorId !== null ? authorId : 666,
            authorDisplayName: authorTelegramName !== undefined && authorTelegramName !== null ? authorTelegramName : 'Земфира'
        };
        try {
            const response = await fetchFromAPIGeneral(`videos/${id}/dislike`, 'POST', JSON.stringify(dislikeData));

            if (response.ok) {
                setVideoDetail(prevDetail => ({
                    ...prevDetail,
                    statistics: {
                        ...prevDetail.statistics,
                        dislikes: prevDetail.statistics.dislikes + 1
                    }
                }));
            } else {
                console.error('Ошибка отправки дизлайка');
            }
        } catch (error) {
            console.error('Error disliking the video:', error);
        }
    };

    const handleShareClick = async () => {
        const videoUrlPolitFM = `https://t.me/politfm_bot/politfm?startapp=video${id}`; // Формируем ссылку на видео

        try {
            // Попробуем использовать Web Share API, если он доступен
            if (navigator.share) {
                await navigator.share({
                    title: 'Посмотрите это видео',
                    url: videoUrlPolitFM,
                });
            } else {
                // Если Web Share API недоступен, копируем ссылку в буфер обмена
                await navigator.clipboard.writeText(videoUrlPolitFM);
                alert('Ссылка скопирована в буфер обмена');
            }
        } catch (error) {
            console.error('Ошибка при шаринге или копировании:', error);
        }
    };

    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded); // Переключаем состояние
    };

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
                                        onClick={handleLike}
                                    >
                                        <ThumbUpIcon sx={{fontSize: "16px"}}/>
                                    </IconButton>
                                    <Typography variant="body1" sx={{opacity: 0.7, mr: 2}}>
                                        {videoDetail?.statistics.likes?.toLocaleString()}
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
                                        onClick={handleDislike}
                                    >
                                        <ThumbDownIcon sx={{fontSize: "16px"}}/>
                                    </IconButton>
                                    <Typography variant="body1" sx={{opacity: 0.7}}>
                                        {videoDetail?.statistics.dislikes?.toLocaleString()}
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
                                    sx={{backgroundColor: 'gray', color: '#fff', borderRadius: '20px'}}
                                    onClick={handleShareClick}>
                                <ShareIcon sx={{ml: 1, mr: 2}}/>
                            </Button>
                        </Box>
                        <Typography color="#fff" variant="body2" p={2}>
                            {isDescriptionExpanded ? title + '\n' + description : title + '\n' + description.slice(0, 30) + '... '}
                            <Button
                                variant="text"
                                sx={{color: '#03A9F4'}}
                                onClick={toggleDescription}
                            >
                                {isDescriptionExpanded ? 'Свернуть' : 'еще'}
                            </Button>
                        </Typography>
                        <Box px={2} py={{md: 1, xs: 0}} justifyContent="center" alignItems="center">
                            <Comments videoId={id}/>
                        </Box>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
};

export default VideoDetail;
