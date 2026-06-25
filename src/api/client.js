import { getToken } from "./authStorage.js";

const DEFAULT_API_HOST = "http://localhost:8080";

export function getApiHost() {
  return import.meta.env.VITE_API_HOST || DEFAULT_API_HOST;
}

export function useFixtures() {
  return import.meta.env.VITE_USE_FIXTURES === "true";
}

export function cloneFixture(fixture) {
  return JSON.parse(JSON.stringify(fixture));
}

export function resolveApiUrl(pathOrUrl) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return `${getApiHost()}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export async function requestJson(pathOrUrl, options = {}, fixture) {
  if (useFixtures() && fixture !== undefined) {
    return cloneFixture(fixture);
  }

  const headers = new Headers(options.headers || {});
  const token = getToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(resolveApiUrl(pathOrUrl), {
      ...options,
      headers,
      body:
        options.body && !(options.body instanceof FormData)
          ? JSON.stringify(options.body)
          : options.body,
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      return Promise.reject({
        status: response.status,
        message: data?.msg || data?.message || response.statusText,
        data,
      });
    }

    return data;
  } catch (error) {
    if (fixture !== undefined) {
      return cloneFixture(fixture);
    }

    return Promise.reject(normalizeError(error));
  }
}

export async function requestForm(pathOrUrl, formData, fixture) {
  return requestJson(pathOrUrl, { method: "POST", body: formData }, fixture);
}

export function normalizeError(error) {
  if (error?.message) return error;
  if (error?.status)
    return { message: error.statusText || `Request failed: ${error.status}` };
  return { message: "The request failed. Please try again." };
}
