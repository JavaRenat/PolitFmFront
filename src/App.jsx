import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed } from './components';

const App = () => (
    <BrowserRouter>
        <Box sx={{ backgroundColor: '#000' }}>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Feed />} />
                <Route path='/video/:id' element={<VideoDetail />} />
                <Route path='/channel/:id' element={<ChannelDetail />} />
                <Route path='/search/:searchTerm' element={<SearchFeed />} />
            </Routes>
        </Box>
    </BrowserRouter>
);

export default App;

//
// import { useEffect, useState } from 'react';
// import WebApp from '@twa-dev/sdk';
// import './App.css'
//
//
// function App() {
//     const [user, setUser] = useState(null);
//
//     useEffect(() => {
//         const userInfo = WebApp.initDataUnsafe?.user;
//         if (userInfo) {
//             setUser(userInfo);
//         }
//     }, []);
//
//   return (
//       <>
//           <div>
//               {user ? (
//                   <div>
//                       <h1>Welcome, {user.first_name}!</h1>
//                       <p>User ID: {user.id}</p>
//                       <p>Username: {user.username}</p>
//                   </div>
//               ) : (
//                   <p>Use telegram</p>
//               )}
//           </div>
//       </>
//   )
// }
//
// export default App
