import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Search, PlusCircle } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex flex-col items-start">
                    <span className={`text-2xl font-bold font-['DM_Sans'] transition-colors ${isScrolled ? 'text-[#1B4332]' : 'text-white'}`}>
                        Salem 
                        <span className="italic font-['Playfair_Display'] text-[#C9973A] ml-2">Directory</span>
                    </span>
                    <span className={`text-[10px] uppercase tracking-widest font-['DM_Mono'] ${isScrolled ? 'text-gray-500' : 'text-white/70'}`}>
                        salem.idbf.in
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center space-x-10">
                    <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'text-[#C9973A]' : (isScrolled ? 'text-[#1A1A2E]' : 'text-white')}`}>Home</NavLink>
                    <NavLink to="/categories" className={({isActive}) => `nav-link ${isActive ? 'text-[#C9973A]' : (isScrolled ? 'text-[#1A1A2E]' : 'text-white')}`}>Categories</NavLink>
                    <NavLink to="/a-z" className={({isActive}) => `nav-link ${isActive ? 'text-[#C9973A]' : (isScrolled ? 'text-[#1A1A2E]' : 'text-white')}`}>A-Z List</NavLink>
                    <NavLink to="/about" className={({isActive}) => `nav-link ${isActive ? 'text-[#C9973A]' : (isScrolled ? 'text-[#1A1A2E]' : 'text-white')}`}>About</NavLink>
                    <NavLink to="/contact" className={({isActive}) => `nav-link ${isActive ? 'text-[#C9973A]' : (isScrolled ? 'text-[#1A1A2E]' : 'text-white')}`}>Contact</NavLink>
                </div>

                {/* Action Button */}
                <div className="hidden lg:block">
                    <Link to="/register" className="btn-gold flex items-center gap-2">
                        <PlusCircle size={20} />
                        Register Your Business
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={28} className={isScrolled ? 'text-black' : 'text-white'} /> : <Menu size={28} className={isScrolled ? 'text-black' : 'text-white'} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl py-6 px-10 animate-fade-in-down border-t">
                    <div className="flex flex-col space-y-6">
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-['DM_Sans']">Home</Link>
                        <Link to="/categories" onClick={() => setIsMenuOpen(false)} className="text-xl font-['DM_Sans']">Categories</Link>
                        <Link to="/a-z" onClick={() => setIsMenuOpen(false)} className="text-xl font-['DM_Sans']">A-Z List</Link>
                        <Link to="/register" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-[#C9973A]">Register Free</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
