export const setSessionStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  export const getSessionStorage = (user) => {
    const storedData = localStorage.getItem('user')
    return JSON.parse(storedData)
  };

  export const removeSessionStorage = () => {
    const storedData = localStorage.clear();
  };