"use client";

import { useEffect, useRef } from "react";
import { analyticsEvents, articleReadDepth, trackEvent } from "@/lib/analytics";

export function ArticleEngagement({ articleSlug }: { articleSlug: string }) {
  const fired = useRef({ 50: false, 90: false });

  useEffect(() => {
    fired.current = { 50: false, 90: false };
    function checkDepth() {
      const article = document.querySelector<HTMLElement>("[data-article-content]");
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const progress = articleReadDepth(articleTop, article.scrollHeight, window.scrollY + window.innerHeight);

      if (progress >= 50 && !fired.current[50]) {
        const sent = trackEvent(analyticsEvents.articleRead50, {
          article_slug: articleSlug,
          page_path: window.location.pathname,
          scroll_depth: 50
        });
        fired.current[50] = sent;
      }

      if (progress >= 90 && !fired.current[90]) {
        const sent = trackEvent(analyticsEvents.articleRead90, {
          article_slug: articleSlug,
          page_path: window.location.pathname,
          scroll_depth: 90
        });
        fired.current[90] = sent;
      }
    }

    checkDepth();
    window.addEventListener("scroll", checkDepth, { passive: true });
    window.addEventListener("resize", checkDepth);

    return () => {
      window.removeEventListener("scroll", checkDepth);
      window.removeEventListener("resize", checkDepth);
    };
  }, [articleSlug]);

  return null;
}
