import { useChatContext } from '../context/ChatContext';

export const useUser = () => {
  const { user, login, logout } = useChatContext();

  const setUserData = (name, status = 'Dostępny') => {
    login(name, status);
  };

  return {
    user,
    setUserData,
    logout,
  };
};
