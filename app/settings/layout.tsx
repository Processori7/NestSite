import MainLayout from "@/app/main-layout";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}