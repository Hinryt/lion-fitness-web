import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MemberSection } from "@/components/dashboard/member-sections";

const sections = ["rutina", "clases", "pagos", "progreso", "beneficios", "credencial"];
type Props = { params: Promise<{ section: string }> };
export function generateStaticParams() { return sections.map((section) => ({ section })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { section } = await params; return { title: `${section.charAt(0).toUpperCase() + section.slice(1)} · Mi cuenta`, robots: { index: false, follow: false } }; }
export default async function MemberSectionPage({ params }: Props) { const { section } = await params; if (!sections.includes(section)) notFound(); return <MemberSection section={section} />; }

