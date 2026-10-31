import {
  ArticleNotes,
  ArticleNoteSection,
  articleNotesMetadata,
} from "@/components/site/ArticleNotes";
import { ReadinessGateVisual, readinessLayer } from "@/components/site/ReadinessGateVisual";
import { getArticleBySlug } from "@/data/site";

const article = getArticleBySlug("before-i-trust-an-ai-feature");
export const metadata = articleNotesMetadata(article);

export default function BeforeITrustAnAiFeaturePage() {
  return (
    <ArticleNotes
      article={article}
      introduction="A successful demo answers one question: can the capability work? My essay asks what else a team needs to know before putting that capability into a product people depend on."
      related={[
        { href: "/writing/the-agentic-ai-product-gap", label: "Notes on The Agentic AI Product Gap" },
        { href: "/work/contact-center-ai", label: "Contact Center AI: the product work behind these questions" },
      ]}
    >
      <ArticleNoteSection label="The argument" title="Make readiness part of the product specification.">
        <p>
          Expected behavior, failure modes, evaluation evidence, and human
          control belong in the PRD. They give a team something concrete to
          review when deciding whether an AI feature is ready to launch.
        </p>
        <p>
          The point is to examine the situations a polished demonstration can
          leave out: ambiguous requests, weak evidence, incorrect outputs, and
          the moment a person needs to intervene.
        </p>
      </ArticleNoteSection>
      <ArticleNoteSection label="The framework" title="Four questions for the readiness review.">
        <ol className="article-question-list">
          {readinessLayer.map((dimension) => (
            <li key={dimension.label}>
              <h3>{dimension.label}</h3>
              <p>{dimension.description}</p>
            </li>
          ))}
        </ol>
      </ArticleNoteSection>
      <section className="py-10" aria-label="Readiness framework diagram">
        <p className="portfolio-eyebrow mb-6">Framework at a glance</p>
        <div className="article-visual max-w-4xl">
          <ReadinessGateVisual />
        </div>
      </section>
      <ArticleNoteSection label="The launch decision" title="The specification should make disagreement possible.">
        <p>
          “The feature looks good” leaves too much implicit. A review is more
          useful when people can point to the behavior expected, the failures
          they are prepared to accept, the evidence supporting that judgment,
          and the controls available after release.
        </p>
        <p>
          That also connects evaluation to a product decision. A result should
          help the team decide whether to launch, narrow the scope, add a review
          step, or keep testing.
        </p>
      </ArticleNoteSection>
    </ArticleNotes>
  );
}
