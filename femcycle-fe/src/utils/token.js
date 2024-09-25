export const getToken = () => {
    try {
      return { token: JSON.parse(localStorage.getItem("token")) };
    } catch (err) {
      return null;
    }
  };
  
  export const setToken = (args) => {
    localStorage.setItem(args.name, args.value);
  };
  
  export const removeToken = (args) => {
    localStorage.removeItem(args.name);
  };
  