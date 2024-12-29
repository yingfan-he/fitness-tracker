import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';


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
                </Routes>
            </div>
        </Router>
    );
}

export default App;