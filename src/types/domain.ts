export type BusinessUnit = "gym" | "box" | "equipment";

export interface Branch {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  locality: string;
  address: string;
  schedule: string;
  unit: BusinessUnit;
  description: string;
  services: string[];
  activitySlugs: string[];
  trainerIds: string[];
  mapUrl: string;
  image: string;
}

export interface Activity {
  id: string;
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  level: string;
  duration: string;
  benefits: string[];
  branchSlugs: string[];
  unit: "gym" | "box";
  icon: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialty: string;
}

export interface Plan {
  id: string;
  slug: string;
  name: string;
  description: string;
  price?: number;
  period?: string;
  features: string[];
  branchSlugs: string[];
  activitySlugs: string[];
  recommended?: boolean;
}

export interface Schedule {
  id: string;
  branchSlug: string;
  activitySlug: string;
  day: string;
  time: string;
  trainerId: string;
  capacity: number;
  available: number;
}

export interface EquipmentProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  muscleGroup: string;
  use: "Profesional" | "Doméstico";
  availability: "A pedido" | "Disponible";
  saleType: "Minorista" | "Mayorista" | "Ambas";
  description: string;
  features: string[];
  materials: string[];
  colors: string[];
  warranty?: string;
  image?: string;
  featured?: boolean;
}

export interface Metric {
  label: string;
  value: string;
  trend: string;
}

export interface Member {
  id: string;
  name: string;
  branch: string;
  plan: string;
  membershipStatus: "Activa" | "Pendiente" | "Vencida";
  nextDueDate: string;
}
