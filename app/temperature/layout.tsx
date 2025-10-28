import MainLayout from "@/app/main-layout";

export default function TemperatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}