import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import WorkoutsPage from "./pages/WorkoutsPage";
import CreatinePage from "./pages/CreatinePage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";




// <Router>                    // The entire building
//     <Routes>                // The building directory
//         <Route path="/" element={<Lobby />} />          // "Ground floor → Lobby"
//         <Route path="/gym" element={<GymArea />} />     // "2nd floor → Gym"
//         <Route path="/pool" element={<Pool />} />       // "3rd floor → Pool"
//     </Routes>
// </Router>

function App() {
    return (
        // Router component wraps our whole app
        <Router>
            <div>
                {/* Navbar will appear on every page */}
                <Navbar />

                {/* Routes defines where pages should display */}
                <Routes>
                    {/* Route maps a URL path to a component */}
                    {/* When path is "/", show HomePage component */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/workouts" element={<WorkoutsPage />} />
                    <Route path="/creatine" element={<CreatinePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;