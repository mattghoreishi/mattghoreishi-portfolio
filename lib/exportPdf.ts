export function printBriefAsPdf() {
  if (typeof window !== "undefined") {
    window.print();
  }
}
