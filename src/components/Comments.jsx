import {useState, useEffect} from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Avatar,
    Collapse
} from '@mui/material';
import {ThumbUp, ThumbDown, ExpandMore, ExpandLess} from '@mui/icons-material';
import WebApp from '@twa-dev/sdk';
import {fetchFromAPI, fetchFromAPIGeneral} from "../utils/fetchFromAPI.jsx";

// Компонент для отображения одной иконки с первой буквой имени
const CommentAvatar = ({name}) => {
    const initials = name ? name.charAt(0).toUpperCase() : '?';
    return (
        <Avatar sx={{bgcolor: '#f50057', color: '#fff', width: 40, height: 40}}>
            {initials}
        </Avatar>
    );
};

const postComment = async (videoId, commentText, author) => {
    try {
        const commentData = {
            text: commentText,
            author: author !== undefined && author !== null ? author : 6666666,
        };

        const response = await fetchFromAPIGeneral(`videos/${videoId}/comment`, 'POST', JSON.stringify(commentData));

        if (!response.ok) {
            throw new Error('Ошибка отправки комментария');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

const Comments = ({videoId}) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [replayComment, setReplayComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [expandedCommentId, setExpandedCommentId] = useState(null); // Для управления раскрытием комментариев
    const [replyTo, setReplyTo] = useState(null); // Хранит ID комментария, на который идет ответ

    useEffect(() => {
        const userInfo = WebApp.initDataUnsafe?.user;
        if (userInfo) {
            setUser(userInfo);
        }
        setLoading(true);
        setError(null);
        fetchFromAPI(`videos/${videoId}/commentThreads`)
            .then((data) => {
                if (data.items) {
                    setComments(data.items);
                } else {
                    setComments([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [videoId]);



    const handleCommentSubmit = async () => {
        if (comment.trim() === '') {
            return; // Не выполняем дальнейшие действия, если комментарий пустой
        }
        setComments([{
            id: (comments.length + 1).toString(), // Генерация уникального ID
            snippet: {
                topLevelComment: {
                    snippet: {
                        authorDisplayName: user?.first_name, // Добавляем имя автора
                        textDisplay: comment,
                        likeCount: 0,
                        dislikeCount: 0,
                        replyCount: 0
                    },
                },
                replies: []
            },
        }, ...comments]);

        try {
            await postComment(videoId, comment, user?.id);
        } catch (error) {
            console.error('Не удалось отправить комментарий:', error.message);
        }
        setComment('');
        setReplyTo(null); // Сброс ID ответа
    };

    const handleReplayCommentSubmit = () => {
        if (replayComment.trim() === '') {
            return; // Не выполняем дальнейшие действия, если комментарий пустой
        }

        const updatedComments = comments.map((comment) => {
            if (comment.id === replyTo) {
                return {
                    ...comment,
                    snippet: {
                        ...comment.snippet,
                        topLevelComment: {
                            ...comment.snippet.topLevelComment,
                            snippet: {
                                ...comment.snippet.topLevelComment.snippet,
                                replyCount: comment.snippet.topLevelComment.snippet.replyCount + 1
                            }
                        },
                        replies: [
                            ...comment.snippet.replies,
                            {
                                id: `${comment.id}-${comment.snippet.replies.length + 1}`,
                                snippet: {
                                    authorDisplayName: user?.first_name, // Добавляем имя автора
                                    textDisplay: replayComment,
                                    likeCount: 0,
                                    dislikeCount: 0
                                }
                            }
                        ]
                    }
                };
            }
            return comment;
        });

        setComments(updatedComments);
        setReplayComment('');
        setReplyTo(null); // Сброс ID ответа
    };

    const handleReplyClick = (commentId) => {
        setReplyTo(replyTo === commentId ? null : commentId); // Переключение видимости поля ввода
    };

    const handleExpandClick = (commentId) => {
        setExpandedCommentId(expandedCommentId === commentId ? null : commentId);
    };

    if (loading) {
        return <Typography color="#fff">Загрузка комментариев...</Typography>;
    }

    if (error) {
        return <Typography color="#fff">Ошибка при загрузке комментариев: {error}</Typography>;
    }

    return (
        <Box sx={{backgroundColor: '#fff', borderRadius: '8px', p: 2, mt: 2, maxWidth: '600px'}}>
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCommentSubmit}
                    disabled={comment.trim() === ''}
                    sx={{
                        borderRadius: '50px',
                        padding: '10px 20px',
                        textTransform: 'none',
                        fontSize: '16px',
                        '&:hover': {
                            backgroundColor: '#D32F2F',
                        }
                    }}
                >
                    Комментировать
                </Button>
            </Box>
            <List>
                {comments.length === 0 ? (
                    <Typography>Пока нет комментариев. Оставьте первый комментарий!</Typography>
                ) : (
                    comments.map((comment) => (
                        <Box key={comment.id} mb={1}>
                            <ListItem alignItems="flex-start" sx={{width: '100%'}}>
                                <CommentAvatar name={comment.snippet.topLevelComment.snippet.authorDisplayName}/>
                                <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, ml: 2 }}>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                {comment.snippet.topLevelComment.snippet.authorDisplayName}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: '#000',
                                                    fontSize: '1rem',
                                                    overflowWrap: 'break-word', // Обеспечивает перенос длинных слов
                                                    whiteSpace: 'pre-wrap', // Обеспечивает сохранение пробелов и переносов строк
                                                    wordBreak: 'break-word', // Разрывает длинные слова для предотвращения переполнения
                                                    width: '100%', // Занимает всю ширину контейнера
                                                    display: 'inline-block' // Устанавливает display: inline-block для правильного обтекания текста
                                                }}
                                            >
                                                {comment.snippet.topLevelComment.snippet.textDisplay}
                                            </Typography>
                                        }
                                    />
                                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', mt: 1}}>
                                            <IconButton size="small">
                                                <ThumbUp/>
                                            </IconButton>
                                            <Typography variant="body2" sx={{mx: 0.5}}>
                                                {comment.snippet.topLevelComment.snippet.likeCount}
                                            </Typography>
                                            <IconButton size="small">
                                                <ThumbDown/>
                                            </IconButton>
                                            <Typography variant="body2" sx={{mx: 0.5}}>
                                                {comment.snippet.topLevelComment.snippet.dislikeCount}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                            <Button
                                                onClick={() => handleReplyClick(comment.id)}
                                                sx={{ml: 2}}
                                            >
                                                Ответить
                                            </Button>
                                            {comment.snippet.topLevelComment.snippet.replyCount > 0 && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                    <IconButton size="small" onClick={() => handleExpandClick(comment.id)}>
                                                        {expandedCommentId === comment.id ? <ExpandLess /> : <ExpandMore />}
                                                    </IconButton>
                                                    <Typography variant="body2" sx={{ ml: 1 }}>
                                                        {comment.snippet.topLevelComment.snippet.replyCount}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                        {/* Поле ввода для ответа на комментарий */}
                                        {replyTo === comment.id && (
                                            <Box sx={{mt: 2}}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    multiline
                                                    minRows={2}
                                                    maxRows={4}
                                                    value={replayComment}
                                                    onChange={(e) => setReplayComment(e.target.value)}
                                                    placeholder="Введите ответ"
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
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleReplayCommentSubmit}
                                                    disabled={replayComment.trim() === ''}
                                                    sx={{
                                                        borderRadius: '50px',
                                                        padding: '10px 20px',
                                                        textTransform: 'none',
                                                        fontSize: '16px',
                                                        '&:hover': {
                                                            backgroundColor: '#D32F2F',
                                                        }
                                                    }}
                                                >
                                                    Комментировать
                                                </Button>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </ListItem>
                            <Collapse in={expandedCommentId === comment.id}>
                                <List sx={{pl: 4}}>
                                    {comment.snippet.replies && comment.snippet.replies.length > 0 ? (
                                        comment.snippet.replies.map((reply) => (
                                            <ListItem key={reply.id} alignItems="flex-start">
                                                <CommentAvatar name={reply.snippet.authorDisplayName}/>
                                                <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, ml: 2 }}>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                            {reply.snippet.authorDisplayName}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                color: '#000',
                                                                fontSize: '1rem',
                                                                overflowWrap: 'break-word', // Обеспечивает перенос длинных слов
                                                                whiteSpace: 'pre-wrap', // Обеспечивает сохранение пробелов и переносов строк
                                                                wordBreak: 'break-word', // Разрывает длинные слова для предотвращения переполнения
                                                                width: '100%', // Занимает всю ширину контейнера
                                                                display: 'inline-block' // Устанавливает display: inline-block для правильного обтекания текста
                                                            }}
                                                        >
                                                            {reply.snippet.textDisplay}
                                                        </Typography>
                                                    }
                                                />
                                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                    <IconButton size="small">
                                                        <ThumbUp/>
                                                    </IconButton>
                                                    <Typography variant="body2" sx={{mx: 0.5}}>
                                                        {reply.snippet.likeCount}
                                                    </Typography>
                                                    <IconButton size="small">
                                                        <ThumbDown/>
                                                    </IconButton>
                                                    <Typography variant="body2" sx={{mx: 0.5}}>
                                                        {reply.snippet.dislikeCount}
                                                    </Typography>
                                                </Box>
                                                </Box>
                                            </ListItem>
                                        ))
                                    ) : (
                                        <Typography variant="body2" sx={{px: 2}}>
                                            Нет ответов
                                        </Typography>
                                    )}
                                </List>
                            </Collapse>
                        </Box>
                    ))
                )}
            </List>
        </Box>
    );
};

export default Comments;
