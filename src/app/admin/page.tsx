"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  Mail,
  Phone,
  Calendar,
  Users,
  DollarSign,
  Search,
  Download,
  RefreshCw,
  Trash2,
  CheckCircle,
  Clock,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  LogOut,
  MessageSquare,
  Tag,
  Check,
} from "lucide-react";
import { FormSubmission } from "@/lib/submissions";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Login form state
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/auth-check");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        fetchSubmissions();
      } else {
        setIsLoading(false);
      }
    } catch {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  const fetchSubmissions = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/admin/submissions");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Failed to load submissions:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: loginUser, password: loginPass }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        fetchSubmissions();
      } else {
        setLoginError(data.error || "Invalid administrator credentials");
      }
    } catch {
      setLoginError("Connection failed while trying to authenticate");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAuthenticated(false);
      setSubmissions([]);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleStatusChange = async (id: string, newStatus: FormSubmission["status"]) => {
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        const data = await res.json();
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? data.submission : s))
        );
        triggerToast(`Status updated to "${newStatus}"`);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes: notesDraft }),
      });

      if (res.ok) {
        const data = await res.json();
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? data.submission : s))
        );
        setEditingNotesId(null);
        triggerToast("Internal notes saved");
      }
    } catch (err) {
      console.error("Failed to update notes:", err);
    }
  };

  const handleDelete = async (id: string, clientName: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete the inquiry from "${clientName}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/submissions?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(null);
        }
        triggerToast("Inquiry deleted from database");
      }
    } catch (err) {
      console.error("Failed to delete submission:", err);
    }
  };

  const triggerToast = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 3000);
  };

  const exportToCSV = () => {
    if (submissions.length === 0) return;

    const headers = [
      "ID",
      "Date Submitted",
      "Client Name",
      "Email",
      "Phone",
      "Event Type",
      "Event Date",
      "Guest Count",
      "Budget Range",
      "Status",
      "Message",
      "Notes",
    ];

    const rows = submissions.map((s) => [
      `"${s.id}"`,
      `"${new Date(s.createdAt).toLocaleString()}"`,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email}"`,
      `"${s.phone}"`,
      `"${s.eventType.replace(/"/g, '""')}"`,
      `"${s.eventDate}"`,
      `"${s.guestCount}"`,
      `"${s.budgetRange}"`,
      `"${s.status}"`,
      `"${s.message.replace(/"/g, '""')}"`,
      `"${(s.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `noir-inquiries-export-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered submissions
  const filteredSubmissions = submissions.filter((s) => {
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.phone.toLowerCase().includes(q) ||
      s.eventType.toLowerCase().includes(q) ||
      s.message.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: submissions.length,
    new: submissions.filter((s) => s.status === "new").length,
    inReview: submissions.filter((s) => s.status === "in-review").length,
    contacted: submissions.filter((s) => s.status === "contacted").length,
    booked: submissions.filter((s) => s.status === "booked").length,
  };

  if (isLoading && isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)]">
        <ParticleBackground />
        <div className="flex flex-col items-center gap-3 relative z-10">
          <RefreshCw className="w-8 h-8 text-[var(--accent)] animate-spin" />
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
            Authenticating Atelier Portal...
          </span>
        </div>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden">
        <ParticleBackground />

        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--accent)] opacity-10 blur-[150px] pointer-events-none" />

        {/* Back Link */}
        <div className="absolute top-8 left-8 z-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/80 backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Site</span>
          </Link>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl border border-[var(--border-accent)] bg-[var(--bg-secondary)]/80 backdrop-blur-md flex items-center justify-center mx-auto mb-4 text-[var(--accent)] shadow-xl shadow-[var(--accent-glow)]">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-3xl font-serif font-light text-[var(--text-primary)] tracking-tight">
              Noir Studio Portal
            </h1>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent)] mt-1.5 font-medium">
              Administrator Authentication
            </p>
          </div>

          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[var(--border-accent)] shadow-2xl relative">
            <form onSubmit={handleLogin} className="space-y-5">
              {loginError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2 font-medium">
                  Administrator User
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    placeholder="admin@noirevents.studio"
                    className="w-full px-4 py-3 pl-11 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
                  />
                  <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2 font-medium">
                  Secret Key / Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 pl-11 pr-11 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
                  />
                  <Lock className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full mt-2 py-3.5 px-6 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-light)] text-black font-semibold text-xs uppercase tracking-widest transition-all shadow-lg shadow-[var(--accent-glow)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Access Inquiry Records</span>
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-[var(--border-subtle)] text-center">
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  Default Credentials: <br />
                  <span className="font-mono text-[var(--text-primary)]">admin</span> / <span className="font-mono text-[var(--text-primary)]">admin</span>
                  <br />
                  <span className="font-mono text-[var(--accent)]">admin@noirevents.studio</span> / <span className="font-mono text-[var(--accent)]">admin2026</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative pb-24">
      <ParticleBackground />

      {/* Floating Action Success Toast */}
      {actionSuccessMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 bg-[var(--header-glass)] backdrop-blur-xl border-b border-[var(--border-subtle)] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full border border-[var(--accent)] flex items-center justify-center bg-[var(--bg-secondary)] text-[var(--accent)]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-serif tracking-[0.2em] text-lg font-medium text-[var(--text-primary)]">
                  NOIR
                </span>
                <span className="text-[9px] font-mono tracking-widest uppercase text-[var(--accent)] ml-2 px-2 py-0.5 rounded bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                  Admin Console
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors px-3 py-1.5 rounded-full border border-[var(--border-subtle)] hover:border-[var(--accent)]"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={exportToCSV}
              title="Download CSV database dump"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[var(--accent)] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={fetchSubmissions}
              disabled={isRefreshing}
              title="Refresh inquiries"
              className="w-8 h-8 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[var(--accent)] flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[var(--accent)]" : ""}`} />
            </button>

            <button
              onClick={handleLogout}
              title="End admin session"
              className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded-full border border-red-500/20 hover:border-red-500/40 bg-red-500/5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 relative z-10">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="glass-panel p-5 rounded-2xl border border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">
              Total Inquiries
            </span>
            <div className="text-2xl sm:text-3xl font-serif text-[var(--text-primary)] font-light">
              {stats.total}
            </div>
            <span className="text-[11px] text-[var(--text-muted)] mt-1 block">
              Stored in JSON database
            </span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-[var(--border-accent)] bg-[var(--accent)]/5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-semibold block mb-1">
              New / Unhandled
            </span>
            <div className="text-2xl sm:text-3xl font-serif text-gold-gradient font-light">
              {stats.new}
            </div>
            <span className="text-[11px] text-[var(--accent)]/80 mt-1 block font-mono">
              Action required
            </span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 block mb-1">
              In Review
            </span>
            <div className="text-2xl sm:text-3xl font-serif text-[var(--text-primary)] font-light">
              {stats.inReview}
            </div>
            <span className="text-[11px] text-[var(--text-muted)] mt-1 block">
              Proposals in draft
            </span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-1">
              Contacted
            </span>
            <div className="text-2xl sm:text-3xl font-serif text-[var(--text-primary)] font-light">
              {stats.contacted}
            </div>
            <span className="text-[11px] text-[var(--text-muted)] mt-1 block">
              Concierge assigned
            </span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-[var(--border-subtle)] col-span-2 lg:col-span-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 block mb-1">
              Confirmed / Booked
            </span>
            <div className="text-2xl sm:text-3xl font-serif text-[var(--text-primary)] font-light">
              {stats.booked}
            </div>
            <span className="text-[11px] text-[var(--text-muted)] mt-1 block">
              Contract signed
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-[var(--border-subtle)] mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, email, phone, or event..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {[
              { id: "all", label: "All" },
              { id: "new", label: "New" },
              { id: "in-review", label: "In Review" },
              { id: "contacted", label: "Contacted" },
              { id: "booked", label: "Booked" },
              { id: "archived", label: "Archived" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === tab.id
                    ? "bg-[var(--accent)] text-black font-semibold shadow-md shadow-[var(--accent-glow)]"
                    : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries Content Table / Cards */}
        {filteredSubmissions.length === 0 ? (
          <div className="glass-panel rounded-3xl p-16 border border-[var(--border-subtle)] text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto mb-4 text-[var(--text-muted)]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-[var(--text-primary)] mb-1">
              No Client Inquiries Found
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
              {searchQuery || statusFilter !== "all"
                ? "Try clearing your search query or switching status filters."
                : "When prospective clients submit the booking form on the website, their full contact details and vision will appear here automatically."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => {
              const formattedDate = new Date(submission.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              const isEditingNotes = editingNotesId === submission.id;

              return (
                <div
                  key={submission.id}
                  className="glass-panel p-6 sm:p-7 rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all duration-300 shadow-xl relative overflow-hidden"
                >
                  {/* Card Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center font-serif text-[var(--accent)] font-semibold text-lg shrink-0">
                        {submission.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-serif font-light text-[var(--text-primary)]">
                            {submission.name}
                          </h3>
                          <span className="text-[10px] font-mono text-[var(--text-muted)]">
                            ID: {submission.id}
                          </span>
                        </div>
                        <div className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1.5 mt-0.5">
                          <Clock className="w-3 h-3 text-[var(--accent)]" />
                          <span>Submitted on {formattedDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Selector Dropdown */}
                    <div className="flex items-center gap-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                        Status:
                      </label>
                      <select
                        value={submission.status}
                        onChange={(e) =>
                          handleStatusChange(
                            submission.id,
                            e.target.value as FormSubmission["status"]
                          )
                        }
                        className={`text-xs font-mono uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full border cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--accent)] ${
                          submission.status === "new"
                            ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                            : submission.status === "in-review"
                            ? "bg-sky-500/15 border-sky-500/40 text-sky-300"
                            : submission.status === "contacted"
                            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                            : submission.status === "booked"
                            ? "bg-purple-500/15 border-purple-500/40 text-purple-300"
                            : "bg-zinc-500/15 border-zinc-500/40 text-zinc-400"
                        }`}
                      >
                        <option value="new" className="bg-[#09090b] text-amber-300">
                          ● NEW INQUIRY
                        </option>
                        <option value="in-review" className="bg-[#09090b] text-sky-300">
                          ● IN REVIEW
                        </option>
                        <option value="contacted" className="bg-[#09090b] text-emerald-300">
                          ● CONTACTED
                        </option>
                        <option value="booked" className="bg-[#09090b] text-purple-300">
                          ● BOOKED
                        </option>
                        <option value="archived" className="bg-[#09090b] text-zinc-400">
                          ● ARCHIVED
                        </option>
                      </select>

                      <button
                        onClick={() => handleDelete(submission.id, submission.name)}
                        title="Delete inquiry"
                        className="p-1.5 rounded-lg border border-red-500/20 hover:border-red-500/50 text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/15 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Grid Information: Contacts & Event Specifications */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-5">
                    {/* Left: Contact Details (4 cols) */}
                    <div className="md:col-span-4 space-y-3 border-b md:border-b-0 md:border-r border-[var(--border-subtle)] pb-4 md:pb-0 pr-0 md:pr-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-semibold block mb-2">
                        Contact Info
                      </span>
                      <div className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
                        <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
                        <a
                          href={`mailto:${submission.email}`}
                          className="hover:text-[var(--accent)] underline-offset-2 hover:underline font-mono truncate"
                        >
                          {submission.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
                        <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" />
                        <a
                          href={`tel:${submission.phone}`}
                          className="hover:text-[var(--accent)] underline-offset-2 hover:underline font-mono"
                        >
                          {submission.phone}
                        </a>
                      </div>
                    </div>

                    {/* Middle: Event Parameters (4 cols) */}
                    <div className="md:col-span-4 space-y-2 border-b md:border-b-0 md:border-r border-[var(--border-subtle)] pb-4 md:pb-0 pr-0 md:pr-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-semibold block mb-2">
                        Event Specifications
                      </span>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
                        <Tag className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                        <span className="font-medium">{submission.eventType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <Calendar className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                        <span>Date: {submission.eventDate || "Flexible"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <Users className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                        <span>Guests: {submission.guestCount}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <DollarSign className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                        <span>Budget: {submission.budgetRange}</span>
                      </div>
                    </div>

                    {/* Right: Client Message (4 cols) */}
                    <div className="md:col-span-4 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-semibold block mb-2">
                          Client Vision & Notes
                        </span>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic bg-[var(--bg-secondary)]/50 p-3 rounded-xl border border-[var(--border-subtle)]">
                          &ldquo;{submission.message}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Internal Admin Notes Strip */}
                  <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      {isEditingNotes ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={notesDraft}
                            onChange={(e) => setNotesDraft(e.target.value)}
                            placeholder="Add private follow-up notes for the studio team..."
                            className="w-full px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-accent)] text-xs text-[var(--text-primary)] focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveNotes(submission.id)}
                            className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-black text-xs font-semibold uppercase tracking-wider shrink-0 cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-muted)] text-xs uppercase tracking-wider shrink-0 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                            Studio Notes:
                          </span>
                          <span className="text-xs text-[var(--text-secondary)]">
                            {submission.notes ? (
                              submission.notes
                            ) : (
                              <span className="italic text-[var(--text-muted)]">No notes recorded yet</span>
                            )}
                          </span>
                          <button
                            onClick={() => {
                              setEditingNotesId(submission.id);
                              setNotesDraft(submission.notes || "");
                            }}
                            className="text-[11px] text-[var(--accent)] hover:underline ml-2 cursor-pointer font-mono"
                          >
                            [Edit Notes]
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Quick Response Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`mailto:${submission.email}?subject=Noir%20Events%20Studio%20-%20Inquiry%20Consultation`}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)] hover:text-white px-3 py-1.5 rounded-full border border-[var(--border-accent)] bg-[var(--accent)]/10 hover:bg-[var(--accent)] transition-all"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Reply Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
