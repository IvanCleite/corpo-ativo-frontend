import { loginAPI } from "./authAPI.js";

export const loginService = async (cpf, password) => {
  const response = await loginAPI(cpf, password);

  console.log('response no service: ', response)

  if (!response.status === 401) {
    return { status: 401, message: response.message };
  }

  const expirationTime = new Date().getTime() + 60 * 60 * 3000; // 3h
  const userWithExpiration = {
    cpf: cpf,
    email: response.data.email,
    role: response.data.role,
    expiration: expirationTime,
  };

  sessionStorage.setItem("user", JSON.stringify(userWithExpiration));
  console.log('userWithExpiration: ', userWithExpiration)
  return userWithExpiration ;
};
