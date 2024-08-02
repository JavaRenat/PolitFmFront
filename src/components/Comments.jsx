import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI'; // для получения комментариев
import WebApp from '@twa-dev/sdk';


const Comments = ({ videoId }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [user, setUser] = useState(null);
//
//     useEffect(() => {
//         const userInfo = WebApp.initDataUnsafe?.user;
//         if (userInfo) {
//             setUser(userInfo);
//         }
//     }, []);

    useEffect(() => {
        const userInfo = WebApp.initDataUnsafe?.user;
        if (userInfo) {
            setUser(userInfo);
        }
        setLoading(true);
        setError(null);
        // fetchFromAPI(`commentThreads?part=snippet&videoId=${videoId}`)
        //     .then((data) => {
        //         if (data.items) {
        //             setComments(data.items);
        //         } else {
        //             setComments([]);
        //         }
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         setError(error.message);
        //         setLoading(false);
        //     });
        // Имитация загрузки комментариев
        setTimeout(() => {
            // Фейковые комментарии
            setComments([
                {
                    snippet: {
                        topLevelComment: {
                            snippet: {
                                authorDisplayName: 'Иван Иванов',
                                textDisplay: 'Отличное видео! Спасибо за контент.',
                            },
                        },
                    },
                },
                {
                    snippet: {
                        topLevelComment: {
                            snippet: {
                                authorDisplayName: 'Алексей Смирнов',
                                textDisplay: 'Очень полезная информация. Подписываюсь!',
                            },
                        },
                    },
                },
                {
                    snippet: {
                        topLevelComment: {
                            snippet: {
                                authorDisplayName: 'Мария Петрова',
                                textDisplay: 'Согласна, видео очень интересное. Жду продолжения.',
                            },
                        },
                    },
                },
            ]);
            setLoading(false);
        }, 1000); // Имитация задержки загрузки
    }, [videoId]);

    const handleCommentSubmit = () => {
        // Логика для отправки комментария на сервер должна быть здесь
        // Пока просто добавляем комментарий в локальное состояние
        setComments([...comments, {
            snippet: {
                topLevelComment: {
                    snippet: {
                        authorDisplayName: user?.first_name, // Добавляем имя автора
                        textDisplay: comment,
                    },
                },
            },
        }]);
        setComment('');
    };

    if (loading) {
        return <Typography color="#fff">Загрузка комментариев...</Typography>;
    }

    if (error) {
        return <Typography color="#fff">Ошибка при загрузке комментариев: {error}</Typography>;
    }

    return (
        <Box sx={{ backgroundColor: '#fff', borderRadius: '8px', p: 2, mt: 2 }}>
            {/*<Typography variant="h6" gutterBottom>Комментарии</Typography>*/}
            <Box display="flex" flexDirection="column" mb={2}>
                <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={2}
                    maxRows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Введите комментарий"
                    sx={{
                        border: 'none',
                        borderBottom: '1px solid #ccc',
                        borderRadius: 0,
                        '& .MuiOutlinedInput-root': {
                            border: 'none',
                            borderRadius: 0,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '& .MuiInputBase-root': {
                            padding: 0,
                        },
                        mb: 2,
                    }}
                />
                <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
                    Комментировать
                </Button>
            </Box>
            <List>
                {comments.length === 0 ? (
                    <Typography>Пока нет комментариев. Оставьте первый комментарий!</Typography>
                ) : (
                    comments.map((comment, index) => (
                        <ListItem key={index} alignItems="flex-start">
                            <ListItemText
                                primary={comment.snippet.topLevelComment.snippet.authorDisplayName}
                                secondary={comment.snippet.topLevelComment.snippet.textDisplay}
                            />
                        </ListItem>
                    ))
                )}
            </List>
        </Box>
    );
};

export default Comments;
