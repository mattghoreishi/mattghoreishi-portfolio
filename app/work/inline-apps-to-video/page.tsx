import { ProductStory } from "@/components/work/ProductStory";
import { pageMetadata } from "@/components/site/Portfolio";
export const metadata = pageMetadata(
  "From Inline Apps to video",
  "Why Matt Ghoreishi narrowed a platform with millions of users to focus on video at Cafe Bazaar: reach, retention, and a difficult product choice.",
  "/work/inline-apps-to-video",
);
export default function VideoCase() {
  return (
    <ProductStory
      label="Cafe Bazaar / Product strategy / During 2016–2020"
      title="Five million users. Still a reason to change course."
      introduction="Inline Apps looked promising at the aggregate level. Looking more closely at how people used different categories changed what I thought we should build next."
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
          title: "Reach was real. So was the retention problem.",
          paragraphs: [
            "At Cafe Bazaar, I worked on Inline Apps, a way to offer app experiences within the wider marketplace. The initiative reached more than five million monthly active users and included more than 200 apps.",
            "Those totals were encouraging, but they didn’t tell us which experiences people wanted to keep using. Breaking usage down by category revealed substantial churn in parts of the platform.",
          ],
        },
        {
          label: "What changed my thinking",
          title: "Video showed promise, but the experience had a gap.",
          paragraphs: [
            "Video stood out in the early engagement. We also saw users leave for native apps. That combination mattered: there was interest in the use case, but the existing experience wasn’t a strong enough reason to stay.",
            "I had to separate the demand for a category from the performance of the platform as a whole. More users across more categories would not, by itself, resolve that problem.",
          ],
        },
        {
          label: "The call to make",
          title: "I chose to narrow the bet.",
          paragraphs: [
            "We could stop the initiative, keep investing in its broad scope, or stop pursuing the other categories and focus on video. I chose the third path.",
            "That meant giving up breadth in a product I had helped build. It also gave us a clearer use case to work on and a more focused direction for product development.",
          ],
        },
        {
          label: "What followed",
          title: "The VOD product reached 11M+ monthly active users.",
          paragraphs: [
            "The video business grew to more than eleven million monthly active users. It is a result I am proud to have contributed to with the team.",
            "The two user totals describe different products at different points in their development. I don’t treat their difference as a controlled measure of the pivot’s impact.",
          ],
        },
        {
          label: "What stayed with me",
          title: "A big number can make a difficult decision easier to avoid.",
          paragraphs: [
            "This experience changed how I look at traction. I want to understand which users are coming back, what they are coming back for, and whether our product is the right way to serve that need.",
            "It also taught me that being accountable for a product includes changing its direction when the evidence no longer supports its original scope.",
          ],
        },
      ]}
      note="A retrospective based on my product work and career records. Figures are historical team outcomes for the products and periods described above."
      nextHref="/work/direct-carrier-billing"
      nextTitle="Making payment possible for more customers"
    />
  );
}
