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
  toggleDropdown: () => void;
  closeDropdown: () => void;
  handleLogout: () => void;
}

const useNavbar = (): UseAuthNavbarReturn => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const user = useSelector((state: RootState) => state.auth.user);
  const userName = user?.name || null;
console.log(user)
  const userInitials = userName
    ? userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  const handleLogout = () => {
    closeDropdown();
    localStorage.removeItem('token');
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
  };
};

export default useNavbar;
