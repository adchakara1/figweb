// =====================================================
//  English Language Assessment Portal — Service Worker
//  Provides full offline support after first visit
// =====================================================

const CACHE_NAME = 'ela-portal-v1';
const OFFLINE_PAGE = '/index.html';

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// External CDN resources to cache on first fetch
const CDN_HOSTS = [
  'cdn.jsdelivr.net',
  'cdnjs.cloudflare.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

// ── Install ──────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── Activate ─────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch ─────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Never intercept Google Apps Script calls — they must go to the network
  if (url.hostname.includes('script.google.com')) {
    return; // Let browser handle directly
  }

  // CDN resources: cache-first (they rarely change)
  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        }).catch(() => new Response('', { status: 503 }));
      })
    );
    return;
  }

  // App shell: network-first with cache fallback
  if (request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(OFFLINE_PAGE).then(cached => cached || new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } }))
        )
    );
    return;
  }

  // Everything else: cache-first
  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request))
  );
});
