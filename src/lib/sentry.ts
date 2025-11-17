import * as Sentry from "@sentry/react";

/**
 * Initialize Sentry error tracking
 * Only runs in production with valid DSN
 * Uses Sentry free tier (5k events/month)
 */
export const initSentry = () => {
  // Only initialize in production and if DSN is configured
  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE,

      // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 0.1, // 10% of transactions for free tier

      // Capture Replay for 10% of all sessions,
      // plus for 100% of sessions with an error
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,

      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],

      // Filter out sensitive information
      beforeSend(event, hint) {
        // Don't send events in development
        if (import.meta.env.DEV) {
          return null;
        }

        // Remove sensitive data from event
        if (event.request) {
          delete event.request.cookies;
          delete event.request.headers;
        }

        return event;
      },

      // Ignore common browser errors
      ignoreErrors: [
        // Browser extensions
        'top.GLOBALS',
        // Random plugins/extensions
        'originalCreateNotification',
        'canvas.contentDocument',
        'MyApp_RemoveAllHighlights',
        // Facebook borked
        'fb_xd_fragment',
        // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
        'bmi_SafeAddOnload',
        'EBCallBackMessageReceived',
        // Network errors
        'NetworkError',
        'Network request failed',
      ],
    });
  } else if (import.meta.env.DEV) {
    console.info("Sentry not initialized: Running in development mode or DSN not configured");
  }
};
