class Validation {
  isEmailExists(email: string): boolean {
    if (!email || typeof email !== "string") {
      return false;
    }
    return true;
  }
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isPasswordExists(password: string): boolean {
    if (!password || typeof password !== "string") {
      return false;
    }
    return true;
  }
  isValidPassword(password: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password && password.length < 8) {
      return false;
    }
    return passwordRegex.test(password);
  }

  isValidUsername(username: string): boolean {
    if (!username || typeof username !== "string") {
      return false;
    }
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    return usernameRegex.test(username);
  }
}
export default Validation;
