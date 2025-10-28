import MainLayout from "@/app/main-layout";

export default function TestAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}