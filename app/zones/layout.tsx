import MainLayout from "@/app/main-layout";

export default function ZonesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}