export function useDetectLogin() {
  const token = localStorage.getItem("jwt")
    ? localStorage.getItem("jwt")
    : null;
  return token;
}
