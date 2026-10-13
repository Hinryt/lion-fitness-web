"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { equipmentProducts } from "@/data/demo";
import { quoteSchema, type QuoteInput } from "@/lib/schemas";
import { whatsappUrl } from "@/lib/utils";
import { FormField } from "@/components/forms/form-field";

export function QuoteForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [preparedMessage, setPreparedMessage] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { kind: "quote", name: "", company: "", phone: "", email: "", province: "", customerType: "Particular", product: defaultProduct, quantity: 1, message: "", website: "" },
  });
  const submit = (data: QuoteInput) => {
    const product = equipmentProducts.find((item) => item.slug === data.product)?.name ?? data.product;
    setPreparedMessage([`Hola Lion Fitness Equipamiento, soy ${data.name}.`, `Quiero cotizar ${data.quantity} unidad(es) de ${product}.`, `Tipo de cliente: ${data.customerType}.`, data.company ? `Empresa: ${data.company}.` : "", `Provincia: ${data.province}.`, `Teléfono: ${data.phone}.`, `Email: ${data.email}.`, data.message].filter(Boolean).join("\n"));
  };

  return (
    <form onSubmit={handleSubmit(submit)} onChange={() => setPreparedMessage("")} className="grid gap-4" noValidate>
      <input type="hidden" {...register("kind")} />
      <div className="hidden" aria-hidden="true"><input tabIndex={-1} autoComplete="off" {...register("website")} /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Nombre" error={errors.name?.message}><input className="input" autoComplete="name" {...register("name")} /></FormField>
        <FormField label="Empresa (opcional)" error={errors.company?.message}><input className="input" autoComplete="organization" {...register("company")} /></FormField>
        <FormField label="Teléfono" error={errors.phone?.message}><input className="input" type="tel" inputMode="tel" autoComplete="tel" {...register("phone")} /></FormField>
        <FormField label="Email" error={errors.email?.message}><input className="input" type="email" autoComplete="email" spellCheck={false} {...register("email")} /></FormField>
        <FormField label="Provincia" error={errors.province?.message}><input className="input" autoComplete="address-level1" {...register("province")} /></FormField>
        <FormField label="Tipo de cliente" error={errors.customerType?.message}><select className="input" {...register("customerType")}><option>Particular</option><option>Gimnasio</option><option>Distribuidor</option></select></FormField>
        <FormField label="Producto" error={errors.product?.message}><select className="input" {...register("product")}><option value="">Elegí un producto</option>{equipmentProducts.map((product) => <option key={product.id} value={product.slug}>{product.name}</option>)}</select></FormField>
        <FormField label="Cantidad" error={errors.quantity?.message}><input className="input" type="number" inputMode="numeric" min="1" max="1000" {...register("quantity", { valueAsNumber: true })} /></FormField>
      </div>
      <FormField label="Comentario" error={errors.message?.message}><textarea className="input min-h-24" {...register("message")} /></FormField>
      <button type="submit" className="button-base button-primary" disabled={isSubmitting}>Preparar cotización</button>
      <div role="status" aria-live="polite">{preparedMessage && <div className="border border-lion/30 bg-lion/5 p-4"><p className="text-sm">Tu pedido está listo. Enviá el mensaje desde WhatsApp para solicitar la cotización.</p><p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted">{preparedMessage}</p><a href={whatsappUrl(preparedMessage)} target="_blank" rel="noopener noreferrer" className="mt-4 button-base button-primary"><MessageCircle size={18} aria-hidden="true" /> Abrir WhatsApp</a></div>}</div>
      <p className="text-xs leading-5 text-muted">No guardamos tus datos ni enviamos mensajes automáticamente. Compartirás los datos con Lion Fitness al abrir WhatsApp y enviar el mensaje.</p>
    </form>
  );
}
