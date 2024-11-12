import axios from "axios";

const api = process.env.REACT_APP_ASP_API;

export const validate = async (token) => {
  try {
    const response = await axios.post(
      `${api}/api/auth/validate-token`,
      { token: token }, // Ensure you send an object with the 'token' field
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 && response.data.valid) {
      return { valid: true, message: response.data.message };
    } else {
      return { valid: false, message: response.data.message };
    }
  } catch (error) {
    return { valid: false, message: "Token is invalid" };
  }
};
