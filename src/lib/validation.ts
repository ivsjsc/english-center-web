import { z } from "zod";

// Vietnamese mobile phone regex: exactly 10 digits starting with 03, 05, 07, 08, 09
export const VN_PHONE_REGEX = /^0[35789][0-9]{8}$/;


export const leadRegistrationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Họ và tên phải có ít nhất 2 ký tự")
    .max(100, "Họ và tên không được vượt quá 100 ký tự"),
  phone: z
    .string()
    .regex(VN_PHONE_REGEX, "Số điện thoại không hợp lệ (Ví dụ: 0912345678)"),
  email: z
    .string()
    .email("Địa chỉ email không hợp lệ")
    .optional()
    .or(z.literal("")),
  studentAge: z
    .coerce
    .number()
    .min(3, "Độ tuổi học viên từ 3 tuổi trở lên")
    .max(90, "Độ tuổi không hợp lệ")
    .optional()
    .nullable(),
  courseId: z.string().optional().nullable(),
  centerId: z.string().optional().nullable(),
  message: z.string().max(500, "Lời nhắn tối đa 500 ký tự").optional().nullable(),
  source: z.string().default("WEBSITE"),
  UTMSource: z.string().optional().nullable(),
  UTMMedium: z.string().optional().nullable(),
  UTMCampaign: z.string().optional().nullable(),
  UTMContent: z.string().optional().nullable(),
  UTMTerm: z.string().optional().nullable(),
  honeypot: z.string().max(0, "Spam detected").optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Quý khách cần đồng ý với chính sách bảo vệ dữ liệu cá nhân" }),
  }),
});

export type LeadRegistrationInput = z.infer<typeof leadRegistrationSchema>;

export const placementTestBookingSchema = z.object({
  fullName: z.string().min(2, "Họ và tên ít nhất 2 ký tự"),
  phone: z.string().regex(VN_PHONE_REGEX, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  studentAge: z.coerce.number().min(4).max(80),
  centerId: z.string().min(1, "Vui lòng chọn cơ sở kiểm tra"),
  preferredDate: z.string().min(1, "Vui lòng chọn ngày kiểm tra"),
  preferredTimeSlot: z.string().min(1, "Vui lòng chọn ca kiểm tra"),
  note: z.string().max(300).optional().nullable(),
  honeypot: z.string().max(0, "Spam detected").optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Quý khách cần đồng ý với chính sách xử lý dữ liệu" }),
  }),
});

export type PlacementTestBookingInput = z.infer<typeof placementTestBookingSchema>;

export const contactSubmissionSchema = z.object({
  fullName: z.string().min(2, "Họ và tên ít nhất 2 ký tự"),
  phone: z.string().regex(VN_PHONE_REGEX, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  subject: z.string().min(2, "Tiêu đề ít nhất 2 ký tự"),
  message: z.string().min(5, "Nội dung ít nhất 5 ký tự").max(1000),
  honeypot: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;

export const leadStatusUpdateSchema = z.object({
  leadId: z.string().min(1),
  status: z.enum([
    "NEW",
    "CONTACTED",
    "APPOINTMENT",
    "PLACEMENT_TEST",
    "ENROLLED",
    "LOST",
  ]),
  note: z.string().optional().nullable(),
  assignedUserId: z.string().optional().nullable(),
});

export const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
});
