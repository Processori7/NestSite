import MainLayout from "@/app/main-layout";

export default function HumidityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}