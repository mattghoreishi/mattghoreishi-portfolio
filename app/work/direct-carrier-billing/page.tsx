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
      label="Cafe Bazaar / Project note / During 2016–2020"
      title="Direct Carrier Billing"
      introduction="Launching and expanding mobile-operator billing in Cafe Bazaar’s app marketplace. This part of my work connected product delivery with operator partnerships and commercial results."
      ownership="Product Development Manager. Led the launch and expansion of Direct Carrier Billing, working across product delivery and operator partnerships."
      facts={[
        { value: "2", label: "Mobile operators in the launch and expansion" },
        { value: "5M+", label: "New paying users reached" },
        { value: "~20%", label: "Associated revenue growth" },
      ]}
      sections={[
        {
          label: "The product",
          title: "Another way to pay in the marketplace.",
          paragraphs: [
            "Direct Carrier Billing lets a customer charge a digital purchase to their mobile account. At Cafe Bazaar, this created another way for people to pay within the app marketplace.",
            "I led the launch and expansion to two operators, working across product delivery and operator partnerships. The payment experience depended on both the marketplace and the companies providing the billing channel.",
          ],
        },
        {
          label: "The result",
          title: "Five million new paying users.",
          paragraphs: [
            "The initiative reached more than five million new paying users and was associated with approximately twenty percent revenue growth.",
            "The revenue figure describes the period of the initiative; it does not isolate the payment method’s effect from other changes in the business.",
          ],
        },
        {
          label: "My perspective today",
          title: "The customer journey extends beyond the interface.",
          paragraphs: [
            "This work is one reason I look beyond the screen when thinking about a customer journey. The available payment methods and partner relationships shape whether someone can complete a purchase, as well as what happens after it.",
            "For a similar launch today, I would examine payment completion, repeat paying behavior, failed charges, and support issues alongside revenue. Those are the questions I would bring to the work now, rather than measurements I am claiming for the historical launch.",
          ],
        },
      ]}
      note="This is a short project record, rather than a detailed reconstruction of the launch. It uses historical results from my career materials and does not reproduce operator agreements, internal financial data, or integration details."
      nextHref="/work/contact-center-ai"
      nextTitle="Contact Center AI at Sotoon"
    />
  );
}
