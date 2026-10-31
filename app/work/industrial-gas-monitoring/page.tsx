import { ProductStory } from "@/components/work/ProductStory";
import { pageMetadata } from "@/components/site/Portfolio";

export const metadata = pageMetadata(
  "Industrial gas monitoring",
  "Matt Ghoreishi’s product work at Albatec, 2024–2025: a cloud-based gas-monitoring platform, sensor dashboards, alerts, and customer pilots.",
  "/work/industrial-gas-monitoring",
);

export default function IndustrialGasMonitoringPage() {
  return (
    <ProductStory
      label="Albatec / Project note / January 2024–June 2025"
      title="Industrial gas monitoring"
      introduction="At Albatec, I worked on cloud software for industrial gas monitoring. The scope brought together sensor data, dashboards, alerts, reporting, and customer pilots."
      ownership="Product Development Manager. Platform planning and roadmap, dashboard and alert definition, predictive-maintenance work, and pilot coordination with sales and customers."
      facts={[
        { value: "16", label: "Sensor channels in the dashboard and alert definition" },
        { value: "SaaS", label: "Cloud-based industrial gas-monitoring platform" },
        { value: "Pilots", label: "Collaboration with sales and customers on pilots and rollouts" },
      ]}
      sections={[
        {
          label: "The setting",
          title: "Software around a physical monitoring system.",
          paragraphs: [
            "Albatec works in industrial gas solutions, with a focus on distribution and sampling. My product work concerned the software around that equipment: how sensor information would be presented, monitored, and reported.",
            "The platform scope included dashboards, alarm functions, reporting, and CCTV integration. This connected product planning to both the physical monitoring system and the software people would use to understand its data.",
          ],
        },
        {
          label: "My work",
          title: "Define the platform and its monitoring views.",
          paragraphs: [
            "I was responsible for planning and developing the SaaS platform and its roadmap. I defined dashboards and alerts covering 16 sensor channels, and worked on a predictive-maintenance approach.",
          ],
        },
        {
          label: "Customer work",
          title: "Work with sales and customers on pilots.",
          paragraphs: [
            "I worked with sales and customers to prepare and carry out pilot projects and rollouts.",
            "This project added industrial software to my experience in consumer products and enterprise AI: product work involving sensor data, physical equipment, and the people responsible for monitoring it.",
          ],
        },
      ]}
      note="A short account of my responsibilities, based on my employment reference and career records. The 16-channel figure describes the dashboard and alert scope. This note does not present a production deployment count or a measured customer outcome."
      nextHref="/work/contact-center-ai"
      nextTitle="Contact Center AI at Sotoon"
    />
  );
}
