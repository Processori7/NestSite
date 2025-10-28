import MainLayout from "@/app/main-layout";

export default function EnvironmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}