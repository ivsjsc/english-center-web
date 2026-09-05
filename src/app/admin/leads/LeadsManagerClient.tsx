"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  UserCheck,
  Phone,
  MessageSquare,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface LeadActivity {
  id: string;
  action: string;
  previousStatus: string | null;
  newStatus: string | null;
  note: string | null;
  createdAt: string;
  user: { fullName: string } | null;
}

interface LeadItem {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  studentAge: number | null;
  message: string | null;
  source: string;
  UTMSource: string | null;
  status: string;
  assignedUserId: string | null;
  createdAt: string;
  course: { id: string; name: string } | null;
  center: { id: string; name: string; district: string; province: string } | null;
  assignedUser: { id: string; fullName: string; email: string } | null;
  activities: LeadActivity[];
}

interface ConsultantOption {
  id: string;
  fullName: string;
  role: string;
}

interface FilterOption {
  id: string;
  name: string;
}

export function LeadsManagerClient({
  currentUserId,
  userRole,
}: {
  currentUserId: string;
  userRole: string;
}) {
  const canAssign = userRole !== "CONSULTANT";
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [consultants, setConsultants] = useState<ConsultantOption[]>([]);
  const [centers, setCenters] = useState<FilterOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter & Search states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [centerFilter, setCenterFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);

  // Modals state
  const [activeLeadForStatus, setActiveLeadForStatus] = useState<LeadItem | null>(null);
  const [activeLeadForAssign, setActiveLeadForAssign] = useState<LeadItem | null>(null);
  const [activeLeadForTimeline, setActiveLeadForTimeline] = useState<LeadItem | null>(null);

  const [newStatus, setNewStatus] = useState("");
  const [statusNote, setStatusNote] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "15",
        status: statusFilter,
        centerId: centerFilter,
        search,
      });

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setConsultants(data.consultants || []);
        setCenters(data.centers || []);
        setTotalPages(data.pagination.totalPages || 1);
        setTotalLeads(data.pagination.total || 0);
      }
    } catch (e) {
      console.error("Error fetching leads:", e);
    } finally {
      setIsLoading(false);
    }
  }, [page, statusFilter, centerFilter, search]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Handle status change
  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLeadForStatus) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: activeLeadForStatus.id,
          status: newStatus,
          note: statusNote,
        }),
      });

      if (res.ok) {
        setActiveLeadForStatus(null);
        setStatusNote("");
        fetchLeads();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle consultant assignment
  const handleAssignConsultant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLeadForAssign) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: activeLeadForAssign.id,
          status: activeLeadForAssign.status,
          assignedUserId: assignedTo,
          note: `Phân công chăm sóc cho chuyên viên tư vấn.`,
        }),
      });

      if (res.ok) {
        setActiveLeadForAssign(null);
        fetchLeads();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusColors: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-800 border-blue-200",
    CONTACTED: "bg-indigo-100 text-indigo-800 border-indigo-200",
    APPOINTMENT: "bg-amber-100 text-amber-800 border-amber-200",
    PLACEMENT_TEST: "bg-sky-100 text-sky-800 border-sky-200",
    ENROLLED: "bg-emerald-100 text-emerald-800 border-emerald-200",
    LOST: "bg-slate-200 text-slate-700 border-slate-300",
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Controls */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Tìm kiếm theo tên / số điện thoại
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Nhập tên hoặc số điện thoại..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none min-h-[40px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Lọc trạng thái
          </label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none min-h-[40px]"
          >
            <option value="ALL">Tất cả trạng thái ({totalLeads})</option>
            <option value="NEW">Mới nhận (NEW)</option>
            <option value="CONTACTED">Đã liên hệ (CONTACTED)</option>
            <option value="APPOINTMENT">Đã hẹn lịch (APPOINTMENT)</option>
            <option value="PLACEMENT_TEST">Thi xếp lớp (PLACEMENT_TEST)</option>
            <option value="ENROLLED">Đã nhập học (ENROLLED)</option>
            <option value="LOST">Đã mất / Hủy (LOST)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Lọc theo cơ sở
          </label>
          <select
            value={centerFilter}
            onChange={(e) => {
              setCenterFilter(e.target.value);
              setPage(1);
            }}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none min-h-[40px]"
          >
            <option value="ALL">Tất cả cơ sở</option>
            {centers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-4">Họ tên & Tuổi</th>
                <th className="py-3.5 px-4">Số điện thoại</th>
                <th className="py-3.5 px-4">Khóa học quan tâm</th>
                <th className="py-3.5 px-4">Cơ sở đăng ký</th>
                <th className="py-3.5 px-4">Nguồn</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4">Tư vấn viên</th>
                <th className="py-3.5 px-4">Ngày tạo</th>
                <th className="py-3.5 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    Đang tải dữ liệu lead từ máy chủ...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    Không tìm thấy lead nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{lead.fullName}</div>
                      <div className="text-[11px] text-slate-400">
                        {lead.studentAge ? `${lead.studentAge} tuổi` : "Chưa rõ tuổi"}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <a
                        href={`tel:${lead.phone}`}
                        className="font-mono font-bold text-brand-600 hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{lead.phone}</span>
                      </a>
                      {lead.email && (
                        <div className="text-[11px] text-slate-400 truncate max-w-[140px]">
                          {lead.email}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-medium max-w-[150px] truncate">
                      {lead.course?.name || "Tư vấn tổng quát"}
                    </td>

                    <td className="py-3.5 px-4 max-w-[140px] truncate">
                      {lead.center ? `${lead.center.district}` : "Chưa chỉ định"}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {lead.UTMSource || lead.source}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveLeadForStatus(lead);
                          setNewStatus(lead.status);
                        }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-transform hover:scale-105 ${
                          statusColors[lead.status] || "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {lead.status}
                      </button>
                    </td>

                    <td className="py-3.5 px-4">
                      {lead.assignedUser ? (
                        <span className="font-medium text-slate-800">
                          {lead.assignedUser.fullName.split("(")[0]}
                        </span>
                      ) : canAssign ? (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveLeadForAssign(lead);
                            setAssignedTo(currentUserId);
                          }}
                          className="text-[11px] font-bold text-amber-600 hover:underline"
                        >
                          + Phân công
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Chưa phân công</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setActiveLeadForTimeline(lead)}
                          title="Lịch sử tương tác"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                        >
                          <History className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveLeadForStatus(lead);
                            setNewStatus(lead.status);
                          }}
                          title="Đổi trạng thái"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveLeadForAssign(lead);
                            setAssignedTo(lead.assignedUserId || currentUserId);
                          }}
                          title="Chuyển chuyên viên"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            Hiển thị trang <strong>{page}</strong> / <strong>{totalPages}</strong> ({totalLeads} lead)
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              &larr; Trang trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Trang sau &rarr;
            </Button>
          </div>
        </div>
      </div>

      {/* MODAL 1: Change Status */}
      <Modal
        isOpen={!!activeLeadForStatus}
        onClose={() => setActiveLeadForStatus(null)}
        title={`Cập Nhật Trạng Thái: ${activeLeadForStatus?.fullName}`}
        description="Mọi thay đổi trạng thái sẽ được lưu vào lịch sử LeadActivity."
      >
        <form onSubmit={handleUpdateStatus} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Trạng thái mới
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="NEW">NEW (Mới tiếp nhận)</option>
              <option value="CONTACTED">CONTACTED (Đã liên hệ tư vấn)</option>
              <option value="APPOINTMENT">APPOINTMENT (Đã hẹn lịch đến trung tâm)</option>
              <option value="PLACEMENT_TEST">PLACEMENT_TEST (Đang thi xếp lớp)</option>
              <option value="ENROLLED">ENROLLED (Đã hoàn tất đóng học phí)</option>
              <option value="LOST">LOST (Hủy / Không có nhu cầu)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Ghi chú cuộc gọi / Nội dung tư vấn
            </label>
            <textarea
              rows={3}
              placeholder="Ví dụ: Phụ huynh muốn tìm hiểu lớp Cambridge thứ 7, hẹn chủ nhật đưa bé đến test..."
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveLeadForStatus(null)}
            >
              Hủy bỏ
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Lưu Trạng Thái
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL 2: Assign Consultant */}
      <Modal
        isOpen={!!activeLeadForAssign}
        onClose={() => setActiveLeadForAssign(null)}
        title={`Phân Công Chăm Sóc: ${activeLeadForAssign?.fullName}`}
      >
        <form onSubmit={handleAssignConsultant} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Chọn chuyên viên tư vấn phụ trách
            </label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              {consultants.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.fullName} ({c.role})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveLeadForAssign(null)}
            >
              Hủy
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Xác Nhận Phân Công
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL 3: Timeline History */}
      <Modal
        isOpen={!!activeLeadForTimeline}
        onClose={() => setActiveLeadForTimeline(null)}
        title={`Dòng Thời Gian Tương Tác: ${activeLeadForTimeline?.fullName}`}
        description={`Số điện thoại: ${activeLeadForTimeline?.phone}`}
      >
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {activeLeadForTimeline?.activities.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs">
              Chưa có lịch sử tương tác nào được ghi nhận.
            </div>
          ) : (
            activeLeadForTimeline?.activities.map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl bg-surface-50 border border-slate-200/80 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-bold text-brand-navy">
                    {act.user?.fullName || "Hệ thống tự động"}
                  </span>
                  <span>
                    {new Date(act.createdAt).toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="font-semibold text-slate-800">
                  Hành động: {act.action}
                  {act.newStatus && ` → Trạng thái: ${act.newStatus}`}
                </div>
                {act.note && (
                  <p className="text-slate-600 bg-white p-2 rounded-xl border border-slate-100 italic">
                    &ldquo;{act.note}&rdquo;
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
}
