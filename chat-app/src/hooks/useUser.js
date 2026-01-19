import { useState, useEffect } from 'react';

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    const storedStatus = localStorage.getItem('userStatus') || 'Dostępny';

    if (storedName) {
      setUser({
        name: storedName,
        status: storedStatus,
        initials: storedName
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()
      });
    }
    setLoading(false);
  }, []);

  const setUserData = (name, status = 'Dostępny') => {
    localStorage.setItem('username', name);
    localStorage.setItem('userStatus', status);
    setUser({
      name,
      status,
      initials: name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
    });
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userStatus');
    setUser(null);
  };

  return {
    user,
    setUserData,
    logout,
    loading
  };
};
