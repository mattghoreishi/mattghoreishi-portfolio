import { ProductStory } from "@/components/work/ProductStory";
import { pageMetadata } from "@/components/site/Portfolio";
export const metadata = pageMetadata(
  "Direct Carrier Billing",
  "Matt Ghoreishi’s Direct Carrier Billing work at Cafe Bazaar: two mobile operators, 5M+ new paying users, and the connection between product and commercial delivery.",
  "/work/direct-carrier-billing",
);
export default function PaymentsCase() {
  return (
    <ProductStory
      label="Cafe Bazaar / Payments / During 2016–2020"
      title="A payment method that opened up the market."
      introduction="A marketplace needs more than products people want. Customers also need a way to pay. Direct Carrier Billing brought mobile operators into that journey."
      ownership="Product Development Manager. Led the launch and expansion of Direct Carrier Billing, working across product delivery and operator partnerships."
      facts={[
        { value: "2", label: "Mobile operators in the launch and expansion" },
        { value: "5M+", label: "New paying users reached" },
        { value: "~20%", label: "Associated revenue growth" },
      ]}
      sections={[
        {
          label: "The product",
          title: "Let people pay through their mobile operator.",
          paragraphs: [
            "Direct Carrier Billing lets a customer charge a digital purchase to their mobile account. At Cafe Bazaar, this created another way for people to pay within the app marketplace.",
            "My work covered the launch and expansion to two operators. It brought product development and commercial partnerships together around the same customer journey.",
          ],
        },
        {
          label: "The result",
          title: "More customers became paying customers.",
          paragraphs: [
            "The initiative reached more than five million new paying users, with approximately twenty percent associated revenue growth recorded in my career results.",
            "That connected the payment work to a business outcome: more people could transact in the marketplace. The result depended on the product team and the operator partnerships working together.",
          ],
        },
        {
          label: "My perspective today",
          title:
            "Payment access is a product decision as well as a commercial one.",
          paragraphs: [
            "This work is one reason I look beyond the screen when thinking about a customer journey. The available payment rails and partner relationships can change who is able to use a product at all.",
            "For a similar launch today, I would want to understand payment completion, repeat paying behavior, failed charges, and support issues alongside revenue. That is my current measurement lens, rather than a claim about a historical experiment.",
          ],
        },
      ]}
      note="A concise project overview based on my career records. User and revenue figures are historical reported outcomes of the initiative. Operator agreements, integration details, and internal financial data are kept out of this public account."
      nextHref="/work/contact-center-ai"
      nextTitle="Turning speech technology into a review workflow"
    />
  );
}
