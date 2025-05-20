// src/hooks/useAuthNavbar.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../slices/authSlice';
import { RootState } from '../../store/store';
import toast from 'react-hot-toast';

interface UseAuthNavbarReturn {
  isLoggedIn: boolean;
  userName: string | null;
  userInitials: string;
  dropdownOpen: boolean;
  isMobileMenuOpen: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  handleLogout: () => void;
  toggleMobileMenu : () => void;
}

const useNavbar = (): UseAuthNavbarReturn => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  // const user = useSelector((state: RootState) => state.auth.user);
  // const userName = user || 'Guest';
  const userName = localStorage.getItem('user') ?? 'Guest';
  const userInitials = userName
    .split(' ')
    .map((n:any) => n[0])
    .join('')
    .toUpperCase();
  
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout = () => {
    closeDropdown();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutUser());
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return {
    isLoggedIn,
    userName,
    userInitials,
    dropdownOpen,
    toggleDropdown,
    closeDropdown,
    handleLogout,
    isMobileMenuOpen,
    toggleMobileMenu
  };
};

export default useNavbar;
