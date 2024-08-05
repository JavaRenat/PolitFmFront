import {useEffect, useState} from "react";
import {Box, Stack, Typography} from "@mui/material";

import {fetchFromAPI} from "../utils/fetchFromAPI";
import {Videos, Sidebar} from "./";

const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [videos, setVideos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setVideos(null);

        setLoading(true);
        setError(null);

        fetchFromAPI(`video?part=snippet&type=${selectedCategory}`)
            .then((data) => {
                if (data.items.length === 0) {
                    setError("Видео не найдено");
                } else {
                    setVideos(data.items);
                    setError(null); // Убедитесь, что ошибка очищена при успешной загрузке
                }
            })
            .catch((err) => {
                setError("Произошла ошибка при загрузке данных.");
            })
            .finally(() => {
                setLoading(false); // Сброс состояния загрузки
            });
    }, [selectedCategory]);

    return (
        <Stack sx={{flexDirection: {sx: "column", md: "row"}}}>
            <Box sx={{height: {sx: "auto", md: "92vh"}, borderRight: "1px solid #3d3d3d", px: {sx: 0, md: 2}}}>
                <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

                <Typography className="copyright" variant="body2" sx={{mt: 1.5, color: "#fff",}}>
                    Copyright © 2024 Polit.FM
                </Typography>
            </Box>

            <Box p={2} sx={{overflowY: "auto", height: "90vh", flex: 2}}>
                {/*<Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>*/}
                {/*  {selectedCategory}*/}
                {/*</Typography>*/}
                {/*<Videos videos={videos} />*/}
                {loading && <Typography variant="h6" color="white">Загрузка...</Typography>}
                {error ? (
                    <Typography variant="h6" color="red">{error}</Typography>
                ) : (
                    <Videos videos={videos}/>
                )}
            </Box>
        </Stack>
    );
};

export default Feed;
