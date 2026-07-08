// Thin HTTP client for the "MyPertamina App Service Mock" (Anggota 1's app
// service, documented in pertamina-apps/README (1).md). backend/ never
// touches that service's database directly and never verifies its JWT
// itself — every request is proxied over its public REST API, and its
// token is forwarded as-is.
//
// That service wraps every response as { success, message, data }. This
// client unwraps `data` for callers and turns a falsy `success`/non-2xx
// status into a thrown AppServiceError carrying the upstream message.
const APP_SERVICE_BASE_URL = process.env.APP_SERVICE_BASE_URL || 'http://localhost:4000/api';

class AppServiceError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function request(method, path, { token, body } = {}) {
  let res;
  try {
    res = await fetch(`${APP_SERVICE_BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new AppServiceError(503, 'Layanan MyPertamina App Service sedang tidak aktif, silakan coba lagi nanti');
  }

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  if (!res.ok || payload?.success === false) {
    throw new AppServiceError(
      res.ok ? 500 : res.status,
      payload?.message || 'Terjadi kesalahan pada layanan MyPertamina App Service'
    );
  }
  return payload?.data ?? null;
}

module.exports = {
  get: (path, opts) => request('GET', path, opts),
  post: (path, opts) => request('POST', path, opts),
  AppServiceError,
};
