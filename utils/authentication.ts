import axios, { isAxiosError } from "axios";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY!;

const handleFirebaseError = (error: any): never => {
  if (isAxiosError(error) && error.response) {
    const errorCode = error.response.data.error?.message;

    switch (errorCode) {
      case "EMAIL_EXISTS":
        throw new Error("This email is already in use.");
      case "INVALID_EMAIL":
        throw new Error("This email address is invalid.");
      case "WEAK_PASSWORD : Password should be at least 6 characters":
        throw new Error("The password must be at least 6 characters.");
      case "EMAIL_NOT_FOUND":
        throw new Error("Email not found");
      case "INVALID_PASSWORD":
        throw new Error("Email or password is invalid.");
      case "INVALID_LOGIN_CREDENTIALS":
        throw new Error("Invalid credentials.");
      default:
        throw new Error("An unknown error occurred.");
    }
  }
  throw new Error("Network error. Check your internet connection.");
};

interface AuthResponse {
  idToken: string;
  [key: string]: any;
}

type Props = {
  email: string;
  password: string;
};

export const signUpService = async ({
  email,
  password,
}: Props): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
    return response.data;
  } catch (error) {
    return handleFirebaseError(error);
  }
};

export const loginService = async ({
  email,
  password,
}: Props): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
    return response.data;
  } catch (error) {
    return handleFirebaseError(error);
  }
};
