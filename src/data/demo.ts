import type {
  Activity,
  Branch,
  EquipmentProduct,
  Member,
  Metric,
  Plan,
  Schedule,
  Trainer,
} from "@/types/domain";

export const siteConfig = {
  name: "Lion Fitness",
  tagline: "La fuerza de la manada",
  description:
    "Gimnasios, entrenamiento funcional y equipamiento profesional unidos por una misma comunidad.",
  phoneDisplay: "11 2394-9114",
  phoneE164: "5491123949114",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  socials: {
    gym: "https://www.instagram.com/lionfitnessgimnasio/",
    box: "https://www.instagram.com/lionfitnessbox/",
    equipment: "https://www.instagram.com/lionfitnessequipamiento/",
    founder: "https://www.instagram.com/joniiabate/",
  },
} as const;

export const trainers: Trainer[] = [
  { id: "t1", name: "Valentina", role: "Coach", specialty: "Fuerza y movilidad" },
  { id: "t2", name: "Nicolás", role: "Profesor", specialty: "Musculación" },
  { id: "t3", name: "Camila", role: "Coach", specialty: "Funcional y GAP" },
];

export const branches: Branch[] = [
  {
    id: "b1",
    slug: "wilde-onsari",
    name: "Lion Fitness Wilde",
    shortName: "Wilde",
    locality: "Wilde",
    address: "Fabián Onsari 1177",
    schedule: "Lun a vie · 06:00 a 23:00 · Sáb · 08:00 a 18:00",
    unit: "gym",
    description: "Nuestra sede de musculación en Wilde, preparada para acompañar cada etapa de tu entrenamiento.",
    services: ["Musculación", "Profesores", "Vestuarios", "Lockers", "Ambiente climatizado"],
    activitySlugs: ["musculacion", "gap", "stretching", "spinning"],
    trainerIds: ["t1", "t2"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Fabi%C3%A1n+Onsari+1177+Wilde",
    image: "/images/instagram/gym-wilde.jpg",
  },
  {
    id: "b2",
    slug: "lion-fitness-box",
    name: "Lion Fitness Box",
    shortName: "Box Wilde",
    locality: "Wilde",
    address: "Fabián Onsari 1177, Wilde",
    schedule: "Lun a vie · clases desde 07:00 · Sáb · turnos especiales",
    unit: "box",
    description: "Donde entrenan los que no se rinden: comunidad, técnica y desafío en cada clase.",
    services: ["Box", "Zona de halterofilia", "Coaches", "Vestuarios", "Clases por turnos"],
    activitySlugs: ["cross", "funcional", "oly", "boxeo"],
    trainerIds: ["t1", "t3"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Fabi%C3%A1n+Onsari+1177+Wilde",
    image: "/images/instagram/box-gap.jpg",
  },
  {
    id: "b3",
    slug: "sarandi",
    name: "Lion Fitness Sarandí",
    shortName: "Sarandí",
    locality: "Sarandí",
    address: "H. Cortés 299",
    schedule: "Lun a vie · 06:00 a 23:00 · Sáb · 08:00 a 18:00",
    unit: "gym",
    description: "Entrenamiento completo y acompañamiento cercano en el corazón de Sarandí.",
    services: ["Musculación", "Cardio", "Profesores", "Duchas", "Rutinas personalizadas"],
    activitySlugs: ["musculacion", "funcional", "gap"],
    trainerIds: ["t2", "t3"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=H+Cort%C3%A9s+299+Sarand%C3%AD",
    image: "/images/instagram/gym-sarandi.jpg",
  },
  {
    id: "b4",
    slug: "lanus-este",
    name: "Lion Fitness Lanús Este",
    shortName: "Lanús Este",
    locality: "Lanús Este",
    address: "Camino General Belgrano 4469",
    schedule: "Lun a vie · 06:00 a 23:00 · Sáb · 08:00 a 18:00",
    unit: "gym",
    description: "Una sede amplia para entrenar con comodidad, equipamiento robusto y atención personalizada.",
    services: ["Musculación", "Spinning", "Profesores", "Vestuarios", "Lockers"],
    activitySlugs: ["musculacion", "spinning", "stretching"],
    trainerIds: ["t1", "t2"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Camino+General+Belgrano+4469+Lan%C3%BAs+Este",
    image: "/images/instagram/gym-camino.jpg",
  },
];

export const activities: Activity[] = [
  ["musculacion", "Musculación", "Fuerza a tu medida", "Entrená con máquinas, pesos libres y una rutina adaptada a tus objetivos.", "Todos los niveles", "Sesión libre", ["Más fuerza", "Mejor composición corporal", "Progreso medible"], ["wilde-onsari", "sarandi", "lanus-este"], "gym", "Dumbbell"],
  ["cross", "Cross", "Potencia en equipo", "Clases dinámicas que combinan fuerza, técnica y acondicionamiento.", "Intermedio adaptable", "60 min", ["Resistencia", "Potencia", "Comunidad"], ["lion-fitness-box"], "box", "Zap"],
  ["funcional", "Funcional", "Moverte mejor", "Circuitos variados para mejorar tu fuerza útil, movilidad y coordinación.", "Todos los niveles", "50 min", ["Movilidad", "Coordinación", "Acondicionamiento"], ["lion-fitness-box", "sarandi"], "box", "Activity"],
  ["gap", "GAP", "Foco y control", "Trabajo localizado de glúteos, abdomen y piernas con progresiones seguras.", "Todos los niveles", "45 min", ["Fuerza localizada", "Estabilidad", "Postura"], ["wilde-onsari", "sarandi"], "gym", "CircleDot"],
  ["stretching", "Stretching", "Recuperá tu movilidad", "Sesiones guiadas para elongar, respirar y recuperar mejor.", "Todos los niveles", "45 min", ["Flexibilidad", "Recuperación", "Bienestar"], ["wilde-onsari", "lanus-este"], "gym", "Move"],
  ["boxeo", "Boxeo", "Técnica y carácter", "Aprendé fundamentos de boxeo y mejorá tu estado físico.", "Inicial e intermedio", "60 min", ["Coordinación", "Cardio", "Confianza"], ["lion-fitness-box"], "box", "Swords"],
  ["oly", "Oly", "Precisión bajo la barra", "Técnica de levantamientos olímpicos con progresiones y supervisión.", "Intermedio", "60 min", ["Potencia", "Técnica", "Movilidad"], ["lion-fitness-box"], "box", "Trophy"],
  ["spinning", "Spinning", "Subí el ritmo", "Entrenamiento cardiovascular en bicicleta con música y guía del profesor.", "Todos los niveles", "45 min", ["Resistencia", "Cardio", "Energía"], ["wilde-onsari", "lanus-este"], "gym", "Bike"],
].map(([slug, name, eyebrow, description, level, duration, benefits, branchSlugs, unit, icon], index) => ({
  id: `a${index + 1}`,
  slug: slug as string,
  name: name as string,
  eyebrow: eyebrow as string,
  description: description as string,
  level: level as string,
  duration: duration as string,
  benefits: benefits as string[],
  branchSlugs: branchSlugs as string[],
  unit: unit as "gym" | "box",
  icon: icon as string,
}));

export const plans: Plan[] = [
  { id: "p1", slug: "musculacion", name: "Musculación", description: "Tu base para entrenar con libertad y acompañamiento.", features: ["Sala de musculación", "Rutina inicial", "Seguimiento de profesores"], branchSlugs: ["wilde-onsari", "sarandi", "lanus-este"], activitySlugs: ["musculacion"] },
  { id: "p2", slug: "box", name: "Box", description: "Clases grupales con programación y coaches.", features: ["Clases de Box", "Seguimiento técnico", "Comunidad Box"], branchSlugs: ["lion-fitness-box"], activitySlugs: ["cross", "funcional", "oly", "boxeo"] },
  { id: "p3", slug: "full", name: "Plan Full", description: "La experiencia más completa del ecosistema Lion.", features: ["Musculación", "Actividades seleccionadas", "Acceso multi-sede sujeto a disponibilidad"], branchSlugs: branches.map((branch) => branch.slug), activitySlugs: activities.map((activity) => activity.slug), recommended: true },
  { id: "p4", slug: "diario", name: "Pase diario", description: "Una visita para conocer la experiencia o entrenar por el día.", features: ["Acceso por el día", "Uso de vestuarios", "Orientación inicial"], branchSlugs: ["wilde-onsari", "sarandi", "lanus-este"], activitySlugs: ["musculacion"] },
  { id: "p5", slug: "prueba", name: "Clase de prueba", description: "Probá una actividad antes de elegir tu plan.", features: ["Clase coordinada", "Presentación con el coach", "Sin compromiso"], branchSlugs: branches.map((branch) => branch.slug), activitySlugs: activities.map((activity) => activity.slug) },
];

export const schedules: Schedule[] = [
  ["wilde-onsari", "spinning", "Lunes", "08:00", "t1", 18, 4],
  ["lion-fitness-box", "cross", "Lunes", "19:00", "t1", 16, 0],
  ["sarandi", "funcional", "Martes", "18:00", "t3", 20, 12],
  ["wilde-onsari", "gap", "Miércoles", "19:30", "t3", 18, 2],
  ["lion-fitness-box", "oly", "Jueves", "20:00", "t1", 12, 7],
  ["lanus-este", "spinning", "Viernes", "18:30", "t2", 18, 9],
  ["lion-fitness-box", "boxeo", "Sábado", "10:00", "t3", 16, 5],
  ["wilde-onsari", "stretching", "Sábado", "11:00", "t1", 20, 15],
].map(([branchSlug, activitySlug, day, time, trainerId, capacity, available], index) => ({
  id: `s${index + 1}`,
  branchSlug: branchSlug as string,
  activitySlug: activitySlug as string,
  day: day as string,
  time: time as string,
  trainerId: trainerId as string,
  capacity: capacity as number,
  available: available as number,
}));

export const equipmentProducts: EquipmentProduct[] = [
  ["banco-plano-convergente", "Banco plano convergente", "Pecho", "Tren superior", "Profesional", "A pedido", "Ambas", "Movimiento convergente para trabajo de empuje en un equipo robusto y estable.", ["Biomecánica cuidada", "Tapizado de alta densidad", "Estructura reforzada"], true],
  ["rack-profesional", "Rack profesional", "Racks", "Cuerpo completo", "Profesional", "Disponible", "Ambas", "Estación versátil para entrenamiento de fuerza, sentadillas y press.", ["Regulaciones múltiples", "Anclajes configurables", "Uso intensivo"], true],
  ["prensa", "Prensa", "Piernas", "Tren inferior", "Profesional", "A pedido", "Ambas", "Equipo para entrenamiento de tren inferior con plataforma amplia y estructura estable.", ["Recorrido guiado", "Plataforma amplia", "Soportes de carga"], true],
  ["hack-squat", "Hack squat", "Piernas", "Tren inferior", "Profesional", "A pedido", "Mayorista", "Máquina orientada al trabajo de piernas con respaldo y recorrido controlado.", ["Apoyo ergonómico", "Estructura de acero", "Carga con discos"], false],
  ["crossover", "Crossover", "Poleas", "Cuerpo completo", "Profesional", "A pedido", "Ambas", "Estación de poleas dobles para una gran variedad de ejercicios.", ["Poleas independientes", "Múltiples alturas", "Uso versátil"], true],
].map(([slug, name, category, muscleGroup, use, availability, saleType, description, features, featured], index) => ({
  id: `e${index + 1}`,
  slug: slug as string,
  name: name as string,
  category: category as string,
  muscleGroup: muscleGroup as string,
  use: use as "Profesional" | "Doméstico",
  availability: availability as "A pedido" | "Disponible",
  saleType: saleType as "Minorista" | "Mayorista" | "Ambas",
  description: description as string,
  features: features as string[],
  materials: ["Acero estructural", "Terminación de pintura configurable", "Tapizado técnico cuando aplica"],
  colors: ["Negro", "Grafito", "Color a coordinar"],
  warranty: "A confirmar según producto y configuración",
  image: [
    "/images/instagram/equipment-machine.jpg",
    "/images/instagram/equipment-delivery.jpg",
    "/images/instagram/equipment-transform.jpg",
  ][index % 3] ?? "/images/instagram/equipment-machine.jpg",
  featured: featured as boolean,
}));

export const demoMetrics: Metric[] = [
  { label: "Nuevas consultas", value: "48", trend: "+12% esta semana" },
  { label: "Clases de prueba", value: "21", trend: "7 por confirmar" },
  { label: "Conversión estimada", value: "34%", trend: "+4 pts vs. período anterior" },
  { label: "Ocupación promedio", value: "72%", trend: "Pico 19:00" },
  { label: "Cotizaciones", value: "13", trend: "5 mayoristas" },
  { label: "Renovaciones próximas", value: "29", trend: "En los próximos 7 días" },
];

export const demoMember: Member = {
  id: "LF-0248",
  name: "Alex Fernández",
  branch: "Wilde",
  plan: "Plan Full",
  membershipStatus: "Activa",
  nextDueDate: "28 sep 2026",
};

export function getBranch(slug: string) {
  return branches.find((branch) => branch.slug === slug);
}

export function getActivity(slug: string) {
  return activities.find((activity) => activity.slug === slug);
}

export function getProduct(slug: string) {
  return equipmentProducts.find((product) => product.slug === slug);
}
