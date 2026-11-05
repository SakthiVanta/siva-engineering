import { z } from "zod";

const empty = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);
const optStr = (max: number) => z.preprocess(empty, z.string().trim().max(max).optional());
const optInt = z.preprocess((v) => (v === "" || v == null ? undefined : Number(v)), z.number().int().min(1).max(100000).optional());

const phone = z
  .string()
  .trim()
  .max(24)
  .refine((v) => /^[+()\d\s-]+$/.test(v) && v.replace(/\D/g, "").length >= 8 && v.replace(/\D/g, "").length <= 15, "Enter a valid phone number");

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone,
  email: z.preprocess(empty, z.email("Enter a valid email").max(160).optional()),
  company: optStr(120),
  service: optStr(80),
  machine: optStr(80),
  component: optStr(160),
  material: optStr(80),
  odMm: optInt,
  faceWidthMm: optInt,
  moduleValue: optStr(20),
  quantity: optStr(60),
  message: optStr(1200),
  sourcePage: optStr(200),
  utmSource: optStr(80),
  utmMedium: optStr(80),
  utmCampaign: optStr(120),
  referrer: optStr(300),
  /** honeypot — real users never see or fill this */
  website: z.string().max(200).optional(),
  /** ms between form render and submit — bots submit instantly */
  elapsed: z.number().optional(),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;

export const eventSchema = z.object({
  type: z.enum(["whatsapp_click", "call_click", "email_click", "map_click"]),
  page: z.string().trim().max(200),
  label: optStr(100),
});

export const reviewSchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: optStr(120),
  role: optStr(80),
  rating: z.preprocess((v) => (v === "" || v == null ? undefined : Number(v)), z.number().int().min(1).max(5).optional()),
  body: z.string().trim().min(15, "Please write at least a sentence").max(900),
  website: z.string().max(200).optional(),
  elapsed: z.number().optional(),
});
