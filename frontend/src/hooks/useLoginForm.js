import React from 'react'
import { useChat } from './useChat';
import { useState } from 'react';
import { baseApi } from '../api/base';
import { useNavigate } from 'react-router-dom';

const useLoginForm = () => {
  const { setAuth, setIsLoggedIn } = useChat();
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userErrors, setUserErrors] = useState([]);
  const [passErrors, setPassErrors] = useState([]);
  const navigate = useNavigate();

    const handleUsername = (e) => {
      let usernameInput = e.target.value;
      setUsername(usernameInput);
    };
  
    const handlePassword = (e) => {
      let passwordInput = e.target.value;
      setPassword(passwordInput);
    };

    const handleGuestSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await baseApi.post("login", {
        Username: import.meta.env.VITE_GUEST,
        Password: import.meta.env.VITE_PASSWORD,
      });

      setAuth(response.data);
      setIsLoggedIn(true);

      if (response.status == 200) {
        navigate("/chatroom");
      }
      clearInput();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setUserErrors([]);
    try {
      const response = await baseApi.post("login", {
        Username: username,
        Password: password,
      });

      setAuth(response.data);
      setIsLoggedIn(true);

      if (response.status == 200) {
        navigate("/chatroom");
      }
      clearInput();
    } catch (error) {
      console.log("response: ", error.response);
      console.log("data: ", error.response.data);
      if (error.status === 400) {
        setUserErrors((prevErr) => [...prevErr, error.response.data]);
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setUserErrors([]);
    setPassErrors([]);
    try {
      const response = await baseApi.post("signup", {
        Username: username,
        Password: password,
      });
      setAuth(response.data);
      setIsLoggedIn(true);

      if (response.status == 200) {
        navigate("/chatroom");
      }
      clearInput();
    } catch (error) {
      if (error.response.status === 400) {
        const errorData = error.response?.data;
        setUserErrors(errorData?.usernameErrors ?? []);
        setPassErrors(errorData?.passwordErrors ?? []);
      } else if (error.response.status === 404) {
        setUserErrors((prevErr) => [...prevErr, error.response.data]);
      }
    }
  };

  const clearInput = () => {
    setUsername("");
    setPassword("");
  };

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
    setUserErrors([]);
    setPassErrors([]);
    clearInput();
  };

  return {    
    handleGuestSubmit,
    isSignUp,
    handleRegisterSubmit,
    username,
    password,
    handleUsername,
    handlePassword,
    userErrors,
    passErrors,
    handleLoginSubmit,
    toggleSignUp
  }
}

export default useLoginForm