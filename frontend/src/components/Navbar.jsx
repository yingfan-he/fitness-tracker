import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Home, LogIn, Dumbbell, Pill, User, Menu, X } from 'lucide-react';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { to: "/", text: "Home", icon: <Home size={20} /> },
        { to: "/auth", text: "Login/Register", icon: <LogIn size={20} /> },
        { to: "/workouts", text: "Workouts", icon: <Dumbbell size={20} /> },
        { to: "/creatine", text: "Creatine Tracker", icon: <Pill size={20} /> },
        { to: "/profile", text: "Profile", icon: <User size={20} /> }
    ];

    return (
        <nav className="bg-[#0F1420] border-b border-gray-800">
            {/* Desktop Navigation */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <span className="text-blue-500 text-xl font-bold">GymSync</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                            >
                                {item.icon}
                                <span>{item.text}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-300 hover:text-white"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-[#0F1420] border-t border-gray-800">
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.icon}
                                <span>{item.text}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;