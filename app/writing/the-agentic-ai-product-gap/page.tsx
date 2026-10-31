import {
  ArticleNotes,
  ArticleNoteSection,
  articleNotesMetadata,
} from "@/components/site/ArticleNotes";
import { getArticleBySlug, stackLayers } from "@/data/site";

const article = getArticleBySlug("the-agentic-ai-product-gap");
export const metadata = articleNotesMetadata(article);

const questions = [
  "Which part of the user’s work would improve, and where does the system enter that workflow?",
  "What happens when the system is wrong, and who bears the cost?",
  "Which tools, records, and external systems can it read or change?",
  "What can it do alone, what needs approval, and what must it never do?",
  "What evidence would justify a release or a change in its permissions?",
  "Who can inspect, correct, stop, or take over its work?",
  "Which signals reveal deteriorating quality, unexpected cost, or repeated human corrections?",
  "How can an incorrect action be contained, reversed, or escalated?",
  "What records make its actions and the responsible owner traceable?",
  "What changes for the customer and the business, and how will we know?",
];

export default function AgenticAiProductGapPage() {
  return (
    <ArticleNotes
      article={article}
      introduction="When an AI system can take action, a good answer is only part of the problem. This essay looks at the product decisions around its permissions, mistakes, recovery, and value."
      related={[
        { href: "/tools/agentic-product-stack-mapper", label: "Work through the framework with the mapper" },
        { href: "/writing/before-i-trust-an-ai-feature", label: "Notes on Before I Trust an AI Feature" },
      ]}
    >
      <ArticleNoteSection label="The argument" title="An action has consequences beyond the response.">
        <p>
          A system that updates a record, issues a refund, or moves work between
          teams needs a clearly defined relationship with the people and
          systems around it. The product question includes whether it took the
          right action, stayed within its authority, and left a way to recover
          when something went wrong.
        </p>
        <p>
          The Agentic Product Stack is a way to examine those decisions together.
          It connects the customer workflow to the rules for autonomy,
          evaluation, monitoring, and business value.
        </p>
      </ArticleNoteSection>
      <ArticleNoteSection label="The framework" title="Ten layers, each with a question to answer.">
        <ol className="article-question-list">
          {stackLayers.map((layer, index) => (
            <li key={layer}>
              <h3>{layer}</h3>
              <p>{questions[index]}</p>
            </li>
          ))}
        </ol>
      </ArticleNoteSection>
      <ArticleNoteSection label="Using the framework" title="Start with one workflow and a clear boundary.">
        <p>
          The layers are a way to expose open decisions. A proposed action might
          be useful but difficult to reverse. A good evaluation result might
          still leave uncertainty about when a person should approve it. Making
          those connections visible is the purpose of the framework.
        </p>
        <p>
          The companion mapper turns these questions into a draft brief. Its
          suggested answers are starting points for discussion and validation,
          rather than evidence that a product is ready.
        </p>
      </ArticleNoteSection>
    </ArticleNotes>
  );
}
