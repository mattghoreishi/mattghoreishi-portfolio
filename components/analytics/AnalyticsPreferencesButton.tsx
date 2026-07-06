"use client";

export function AnalyticsPreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.openAnalyticsPreferences?.()}
      className="hover:text-white"
    >
      Analytics preferences
    </button>
  );
}
