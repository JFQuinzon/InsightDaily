import { useState } from "react";
import { registerUser } from "../../api/Auth/register";

const useRegister = () => {
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const register = async (displayName, email, password) => {
    setLoading(true);
    setErrors([]);

    const { data, errors } = await registerUser(displayName, email, password);

    if (data) {
      const { succeeded } = data;
      setSuccess(succeeded);
    } else {
      if (errors) setErrors(errors);
      setSuccess(null);
    }

    setLoading(false);
  };

  return {
    success,
    errors,
    loading,
    register,
  };
};

export default useRegister;
