import { DashboardNav } from "@/components/dashboard/dashboard-nav";

export default function MemberLayout({ children }: { children: React.ReactNode }) { return <div className="dashboard-root relative z-[55] min-h-screen bg-ink lg:pl-64"><DashboardNav mode="member" /><main className="min-h-screen px-4 pb-28 pt-8 sm:px-7 lg:px-10 lg:pb-12"><div className="mx-auto max-w-6xl">{children}</div></main></div>; }
