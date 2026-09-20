"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { equipmentProducts } from "@/data/demo";
import { quoteSchema, type QuoteInput } from "@/lib/schemas";

export function QuoteForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { kind: "quote", name: "", company: "", phone: "", email: "", province: "", customerType: "Particular", product: defaultProduct, quantity: 1, message: "", website: "" },
  });
  const submit = async (data: QuoteInput) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch { setStatus("error"); }
  };

  const field = (label: string, error: string | undefined, child: React.ReactNode) => <label className="grid gap-2 text-sm font-bold text-white">{label}{child}{error && <span className="text-xs text-error">{error}</span>}</label>;

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-4" noValidate>
      <input type="hidden" {...register("kind")} />
      <div className="hidden" aria-hidden="true"><input tabIndex={-1} {...register("website")} /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        {field("Nombre", errors.name?.message, <input className="input" {...register("name")} />)}
        {field("Empresa (opcional)", errors.company?.message, <input className="input" {...register("company")} />)}
        {field("Teléfono", errors.phone?.message, <input className="input" inputMode="tel" {...register("phone")} />)}
        {field("Email", errors.email?.message, <input className="input" type="email" {...register("email")} />)}
        {field("Provincia", errors.province?.message, <input className="input" {...register("province")} />)}
        {field("Tipo de cliente", errors.customerType?.message, <select className="input" {...register("customerType")}><option>Particular</option><option>Gimnasio</option><option>Distribuidor</option></select>)}
        {field("Producto", errors.product?.message, <select className="input" {...register("product")}><option value="">Elegí un producto</option>{equipmentProducts.map((product) => <option key={product.id} value={product.slug}>{product.name}</option>)}</select>)}
        {field("Cantidad", errors.quantity?.message, <input className="input" type="number" min="1" {...register("quantity", { valueAsNumber: true })} />)}
      </div>
      {field("Comentario", errors.message?.message, <textarea className="input min-h-24" {...register("message")} />)}
      {status === "success" && <p className="flex gap-2 border border-success/40 bg-success/10 p-3 text-sm text-success"><CheckCircle2 size={18} /> Cotización demo recibida correctamente.</p>}
      {status === "error" && <p className="flex gap-2 border border-error/40 bg-error/10 p-3 text-sm text-error"><TriangleAlert size={18} /> No pudimos enviar. Probá de nuevo.</p>}
      <button className="button-base button-primary" disabled={isSubmitting}>{isSubmitting ? <><LoaderCircle className="animate-spin" size={18} /> Enviando…</> : "Solicitar cotización"}</button>
    </form>
  );
}
