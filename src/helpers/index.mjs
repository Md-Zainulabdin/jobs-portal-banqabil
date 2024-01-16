export const verifyEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // testing left
  
    if (!emailRegex.test(email)) {
      return true;
    }
  
    return false;
  };
  