import { PublicLayoutShell } from "@/components/layout/PublicLayoutShell";

export default function PublicRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayoutShell>{children}</PublicLayoutShell>;
}
