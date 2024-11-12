import { useState } from "react";
import { loginUser } from "../../api/Auth/login";
import { useAuthContext } from "../../context/AuthContext";

const useLogin = () => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const { saveUserData, fetchUserData } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setErrors(null);

    const { data, error } = await loginUser(email, password);

    if (data) {
      setData(data);

      saveUserData(data);
      fetchUserData();
    } else {
      if (error) setErrors(error.message);
      setData(null);
    }

    setLoading(false);
  };

  return {
    data,
    errors,
    loading,
    login,
  };
};

export default useLogin;
