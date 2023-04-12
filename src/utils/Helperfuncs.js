export function getStoredToken() {
  try {
    return localStorage.getItem("token");
  } catch (e) {
    return null;
  }
}
