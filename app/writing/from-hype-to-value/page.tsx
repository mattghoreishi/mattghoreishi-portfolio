import {
  ArticleNotes,
  ArticleNoteSection,
  articleNotesMetadata,
} from "@/components/site/ArticleNotes";
import { getArticleBySlug } from "@/data/site";

const article = getArticleBySlug("from-hype-to-value");
export const metadata = articleNotesMetadata(article);

const questions = [
  ["Business value", "Which customer or operating metric should change? Establish what it looks like before the pilot."],
  ["Data and workflow", "What useful data can the product use, and how will its output become part of someone’s actual work?"],
  ["Evaluation and cost", "What quality, latency, and operating cost are acceptable for this use case?"],
  ["Control and rollout", "Who owns the release, what needs review, and how will the team stop or reverse a change?"],
];

export default function FromHypeToValuePage() {
  return (
    <ArticleNotes
      article={article}
      introduction="This essay considers why a promising AI pilot can struggle to become a useful product. It brings the discussion back to data, the customer’s workflow, evaluation, and the economics of running it."
      related={[
        { href: "/writing/the-agentic-ai-product-gap", label: "The follow-up: The Agentic AI Product Gap" },
        { href: "/work/contact-center-ai", label: "A product example: Contact Center AI" },
      ]}
    >
      <ArticleNoteSection label="The argument" title="A pilot needs a path into the operating workflow.">
        <p>
          An AI pilot can demonstrate capability while leaving the practical
          questions unanswered: how someone will use its output, which data
          makes it useful, what operating cost it introduces, and who owns it
          after the experiment.
        </p>
        <p>
          The essay argues for treating those questions as product work from
          the start. Data access, integration, adoption, evaluation, and
          governance all affect whether the initial promise becomes a result
          the business can sustain.
        </p>
      </ArticleNoteSection>
      <ArticleNoteSection label="Questions to take into a pilot" title="Define what the experiment needs to resolve.">
        <ol className="article-question-list">
          {questions.map(([title, question]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{question}</p>
            </li>
          ))}
        </ol>
      </ArticleNoteSection>
      <ArticleNoteSection label="What follows" title="Use the result to make an investment decision.">
        <p>
          A pilot should leave the team better able to choose: expand the
          product, change the approach, narrow the use case, or stop. That
          requires a connection between the technical result and the work,
          costs, and customer outcomes the product is meant to change.
        </p>
      </ArticleNoteSection>
    </ArticleNotes>
  );
}
