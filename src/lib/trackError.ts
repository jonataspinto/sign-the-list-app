//TODO: Utility for error tracking. Can be integrated with TrackJS, Sentry, etc. in the future

export function trackError(error: unknown) {
  if (error instanceof Error) {
    console.error("Tracked error:", error.message, error.stack);
  } else {
    console.error("Tracked error:", error);
  }
}
