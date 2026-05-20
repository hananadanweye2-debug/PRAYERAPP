// sw.js

// ==========================================
// INSTALL
// ==========================================
self.addEventListener("install", (event) => {
  console.log("Service Worker Installed");

  // Activate immediately
  self.skipWaiting();
});

// ==========================================
// ACTIVATE
// ==========================================
self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated");

  event.waitUntil(clients.claim());
});

// ==========================================
// OPTIONAL FETCH HANDLER
// ==========================================
self.addEventListener("fetch", (event) => {
  // Leave empty unless you want offline caching
});

// ==========================================
// RECEIVE MESSAGES FROM APP
// ==========================================
self.addEventListener("message", async (event) => {

  const data = event.data;

  // Morning Adhkar
  if (data.type === "MORNING_ADHKAR") {

    await self.registration.showNotification("🌅 Morning Adhkar", {
      body: "اللهم بك أصبحنا وبك أمسينا",
      icon: "/icon.png",
      badge: "/icon.png",
      vibrate: [200, 100, 200],
      requireInteraction: true,
      tag: "morning-adhkar",
      data: {
        url: "/"
      }
    });

  }

  // Evening Adhkar
  if (data.type === "EVENING_ADHKAR") {

    await self.registration.showNotification("🌙 Evening Adhkar", {
      body: "اللهم بك أمسينا وبك أصبحنا",
      icon: "/icon.png",
      badge: "/icon.png",
      vibrate: [200, 100, 200],
      requireInteraction: true,
      tag: "evening-adhkar",
      data: {
        url: "/"
      }
    });

  }

  // Sleep Adhkar
  if (data.type === "SLEEP_ADHKAR") {

    await self.registration.showNotification("🌙 Sleep Adhkar", {
      body: "باسمك اللهم أموت وأحيا",
      icon: "/icon.png",
      badge: "/icon.png",
      vibrate: [200, 100, 200],
      requireInteraction: true,
      tag: "sleep-adhkar",
      data: {
        url: "/"
      }
    });

  }

  // Daily Ayah
  if (data.type === "DAILY_AYAH") {

    await self.registration.showNotification("📖 Daily Ayah", {
      body: "Read today's Quran reminder",
      icon: "/icon.png",
      badge: "/icon.png",
      vibrate: [200, 100, 200],
      requireInteraction: true,
      tag: "daily-ayah",
      data: {
        url: "/"
      }
    });

  }

});

// ==========================================
// NOTIFICATION CLICK
// ==========================================
self.addEventListener("notificationclick", (event) => {

  event.notification.close();

  const targetUrl = event.notification.data.url || "/";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((clientList) => {

      // Focus existing tab
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && "focus" in client) {
          return client.focus();
        }
      }

      // Open new tab
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }

    })
  );

});

// ==========================================
// PUSH NOTIFICATIONS (for Firebase later)
// ==========================================
self.addEventListener("push", (event) => {

  if (!event.data) return;

  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon.png",
      badge: "/icon.png",
      vibrate: [200, 100, 200],
      requireInteraction: true,
      data: {
        url: data.url || "/"
      }
    })
  );

});