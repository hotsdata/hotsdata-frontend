const TOKEN_KEY = "hotsdata.token";
const USER_KEY = "hotsdata.user";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function getToken() {
  if (!canUseStorage()) return null;
  return (
    window.localStorage.getItem(TOKEN_KEY) ||
    window.localStorage.getItem("token")
  );
}

export function getStoredUser() {
  if (!canUseStorage()) return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (_error) {
    return null;
  }
}

export function persistSession({ token, user }) {
  if (!canUseStorage()) return;
  if (token) {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem("token", token);
  }
  if (user) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function clearSession() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.localStorage.removeItem("token");
}
