import service from "./service.config";

const signup = (userData) => {
  return service.post("/auth/signup", userData);
};

export default { signup };