import { Link } from 'react-router-dom';



function Navbar() {
    return (
        <nav>
            <ul>
                {/* Link components create clickable navigation */}
                {/* 'to' prop specifies where the link should go */}
                <li><Link to="/">Home</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/workouts">Workouts</Link></li>
                <li><Link to="/creatine">Creatine Tracker</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </nav>
    );
}


export default Navbar;