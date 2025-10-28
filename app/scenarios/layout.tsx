import MainLayout from "@/app/main-layout";

export default function ScenariosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}