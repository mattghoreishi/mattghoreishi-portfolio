import { ProductStory } from "@/components/work/ProductStory";
import { pageMetadata } from "@/components/site/Portfolio";
export const metadata = pageMetadata(
  "From Inline Apps to video",
  "Matt Ghoreishi’s Inline Apps and video work at Cafe Bazaar: category-level behavior, retention, and the choice to focus a broad platform on video.",
  "/work/inline-apps-to-video",
);
export default function VideoCase() {
  return (
    <ProductStory
      label="Cafe Bazaar / Case study / During 2016–2020"
      title="From Inline Apps to video"
      introduction="I had helped build a platform with more than five million monthly active users. Looking at what those users returned for led me to recommend a narrower product."
      ownership="Product Development Manager. Product direction and prioritization across the Inline Apps initiative and the move toward VOD."
      facts={[
        { value: "5M+", label: "Monthly active users reached by Inline Apps" },
        { value: "200+", label: "Apps in the Inline Apps ecosystem" },
        {
          value: "11M+",
          label: "Monthly active users reached by the VOD product",
        },
      ]}
      sections={[
        {
          label: "The starting point",
          title: "Five million users did not tell the whole story.",
          paragraphs: [
            "At Cafe Bazaar, I worked on Inline Apps, a way to offer app experiences within the wider marketplace. The initiative reached more than five million monthly active users and included more than 200 apps.",
            "Those totals were encouraging, but they combined very different kinds of use. Breaking usage down by category revealed substantial churn in parts of the platform. I needed to understand which experiences people wanted to return to before treating overall reach as a reason to expand.",
          ],
        },
        {
          label: "What changed my thinking",
          title: "Separate interest in video from loyalty to our product.",
          paragraphs: [
            "Video stood out in the early engagement. We also saw users leave for native apps. That combination mattered: there was interest in the use case, but the existing experience wasn’t a strong enough reason to stay.",
            "I had to separate the demand for a category from the performance of the platform as a whole. More users across more categories would not, by itself, resolve that problem.",
          ],
          observations: [
            {
              observation: "High aggregate reach",
              implication: "Distribution was working. The total did not show which categories had a reason to keep growing.",
            },
            {
              observation: "Churn varied by category",
              implication: "The next decision needed a category-level view rather than one platform-wide growth target.",
            },
            {
              observation: "Video engagement, followed by exits to native apps",
              implication: "There was interest in the use case, alongside a reason to question how we were serving it.",
            },
          ],
        },
        {
          label: "The call to make",
          title: "Focus the work on video.",
          paragraphs: [
            "I chose to stop pursuing the other categories and focus on video. This changed the scope of the work: from sustaining a broad app platform to developing a more focused video product.",
            "I had helped build the broader initiative, so narrowing it also meant letting go of part of my own work. Keeping every category would have preserved that breadth, but it would not have answered what the usage data was telling us.",
          ],
        },
        {
          label: "What followed",
          title: "The VOD product reached 11M+ monthly active users.",
          paragraphs: [
            "The VOD product later reached more than eleven million monthly active users. My contribution was in product direction and prioritization through the move toward video; the outcome belongs to the team that built and grew the product.",
            "The five-million and eleven-million figures describe different products at different points in their development. They show the scale of the work, rather than a controlled before-and-after measure of the pivot.",
          ],
        },
        {
          label: "What stayed with me",
          title: "I ask a different question when a product has traction.",
          paragraphs: [
            "I want to know who is coming back, what they are coming back for, and what happens before they leave. A healthy total can contain both a promising use case and a product that is struggling to serve it.",
            "That is the part of this work I still find useful: looking underneath a reassuring number until the next product choice becomes clearer.",
          ],
        },
      ]}
      note="A retrospective based on my account of the work and career records. Figures are historical team outcomes. The observation notes above summarize my reasoning; they are not a reproduction of the original analytics or experiment results."
      nextHref="/work/direct-carrier-billing"
      nextTitle="Direct Carrier Billing at Cafe Bazaar"
    />
  );
}
