"use client";

import { useState, useEffect } from "react";
import { 
  Image as ImageIcon, RefreshCw, Search, Download, AlertTriangle, 
  CheckCircle2, Copy, ExternalLink, Eye, Check, X, FileText, HelpCircle, EyeOff
} from "lucide-react";
import Link from "next/link";

interface AuditIssue {
  id: string;
  collection: string;
  category: string;
  productName: string;
  productId: string;
  imageType: string;
  imagePath: string;
  status: "Missing" | "Placeholder" | "Duplicate" | "Broken Path" | "Healthy";
  pageUrl: string;
  priority: "High" | "Medium" | "Low" | "Healthy";
  details?: string;
}

interface AuditSummary {
  totalWatches: number;
  totalImagesExpected: number;
  totalImagesFound: number;
  totalMissingImages: number;
  completionPercentage: number;
  lastScanTimestamp: string;
}

interface AuditReport {
  summary: AuditSummary;
  issues: AuditIssue[];
}

export default function ImageAuditPage() {
  const [report, setReport] = useState<AuditReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all-missing"); // Default to show issues
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());
  
  // Preview Modal State
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("");

  // Fetch report on load
  useEffect(() => {
    fetchAuditData();
  }, []);

  const fetchAuditData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/image-audit");
      const data = await res.json();
      if (data && data.summary) {
        setReport(data);
      }
    } catch (error) {
      console.error("Failed to load image audit:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRunAudit = async () => {
    try {
      setScanning(true);
      const res = await fetch("/api/admin/image-audit", { method: "POST" });
      const data = await res.json();
      if (data && data.summary) {
        setReport(data);
        // Clear resolved ids on clean fresh scan
        setResolvedIds(new Set());
      }
    } catch (error) {
      console.error("Audit scan failed:", error);
    } finally {
      setScanning(false);
    }
  };

  // Copy Path to Clipboard
  const handleCopyPath = (path: string, id: string) => {
    navigator.clipboard.writeText(path);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Toggle Resolved State
  const toggleResolved = (id: string) => {
    setResolvedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Extract unique filter lists
  const collectionsList = report ? Array.from(new Set(report.issues.map(i => i.collection))).filter(Boolean) : [];
  const categoriesList = report ? Array.from(new Set(report.issues.map(i => i.category))).filter(Boolean) : [];

  // Exporters
  const exportToCSV = () => {
    if (!report) return;
    const headers = ["Collection", "Product Name", "SKU / ID", "Image Type", "Image Path", "Status", "Priority", "Page URL"];
    const rows = filteredIssues.map(issue => [
      `"${issue.collection}"`,
      `"${issue.productName}"`,
      `"${issue.productId}"`,
      `"${issue.imageType}"`,
      `"${issue.imagePath}"`,
      `"${issue.status}"`,
      `"${issue.priority}"`,
      `"${issue.pageUrl}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `image_audit_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    if (!report) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({ summary: report.summary, issues: filteredIssues }, null, 2)
    )}`;
    const link = document.createElement("a");
    link.setAttribute("href", jsonString);
    link.setAttribute("download", `image_audit_report_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintReport = () => {
    window.print();
  };

  // Filter Issues
  const filteredIssues = report ? report.issues.filter(issue => {
    // Search filter
    const matchesSearch = 
      issue.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.collection.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.imagePath.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    let matchesStatus = true;
    if (statusFilter === "all-missing") {
      matchesStatus = issue.status === "Missing" || issue.status === "Broken Path" || issue.status === "Placeholder";
    } else if (statusFilter === "missing-only") {
      matchesStatus = issue.status === "Missing";
    } else if (statusFilter === "placeholder-only") {
      matchesStatus = issue.status === "Placeholder";
    } else if (statusFilter === "broken-only") {
      matchesStatus = issue.status === "Broken Path";
    } else if (statusFilter === "duplicate-only") {
      matchesStatus = issue.status === "Duplicate";
    } else if (statusFilter === "healthy") {
      matchesStatus = issue.status === "Healthy";
    }

    // Priority filter
    const matchesPriority = priorityFilter === "all" || issue.priority.toLowerCase() === priorityFilter.toLowerCase();

    // Collection filter
    const matchesCollection = collectionFilter === "all" || issue.collection === collectionFilter;

    // Category filter
    const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCollection && matchesCategory;
  }) : [];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <RefreshCw className="w-8 h-8 text-[#003926] animate-spin" />
        <p className="text-sm font-medium text-gray-500">Retrieving system image diagnostics...</p>
      </div>
    );
  }

  const summary = report?.summary;

  return (
    <div className="space-y-8 print:bg-white print:text-black">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-light text-gray-900 dark:text-white tracking-wide uppercase flex items-center gap-3">
            <ImageIcon className="w-6 h-6 text-[#003926] dark:text-[#B8935A]" />
            <span>Missing Watch Images Auditing System</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1.5">
            Local filesystem scan diagnostics checking for missing product shots, broken cover paths, and shared reference anomalies.
          </p>
        </div>

        <div className="flex items-center gap-3 print:hidden">
          <button 
            onClick={handleRunAudit}
            disabled={scanning}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#003926] hover:bg-[#002619] disabled:bg-[#003926]/40 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${scanning ? "animate-spin" : ""}`} />
            {scanning ? "Auditing Website..." : "Run Fresh Audit"}
          </button>
        </div>
      </div>

      {summary && (
        <>
          {/* Summary Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 print:grid-cols-5">
            {/* Cards */}
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Total Checked</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">{summary.totalWatches}</span>
                <span className="text-xs font-medium text-gray-500">Timepieces</span>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Assets Expected</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">{summary.totalImagesExpected}</span>
                <span className="text-xs font-medium text-gray-500">Image Paths</span>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Assets Found</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-semibold text-green-600 dark:text-green-400">{summary.totalImagesFound}</span>
                <span className="text-xs font-medium text-green-600">On Disk</span>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Missing Assets</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className={`text-2xl font-semibold ${summary.totalMissingImages > 0 ? "text-red-600" : "text-green-600"}`}>{summary.totalMissingImages}</span>
                <span className="text-xs font-medium text-red-500">{summary.totalMissingImages > 0 ? "Issues" : "None"}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Audit Completion</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-semibold text-[#B8935A]">{summary.completionPercentage}%</span>
                <div className="w-12 bg-gray-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#B8935A] h-full" style={{ width: `${summary.completionPercentage}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-400 dark:text-gray-500 bg-white/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-gray-200 dark:border-zinc-800">
            <span><strong>System Diagnostics:</strong> fs.existsSync mapping across public resources.</span>
            <span className="mt-1 sm:mt-0"><strong>Last System Audit:</strong> {summary.lastScanTimestamp}</span>
          </div>

          {/* Filtering and Actions Bar */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6 space-y-5 print:hidden">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by name, SKU, path or collection..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 focus:outline-none focus:border-[#003926]"
                />
              </div>

              {/* Exporters */}
              <div className="flex items-center gap-3.5 w-full md:w-auto justify-end">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Export As:</span>
                <button onClick={exportToCSV} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 text-xs font-semibold">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>CSV</span>
                </button>
                <button onClick={exportToJSON} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 text-xs font-semibold">
                  <FileText className="w-3.5 h-3.5 text-yellow-600" />
                  <span>JSON</span>
                </button>
                <button onClick={handlePrintReport} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 text-xs font-semibold">
                  <Download className="w-3.5 h-3.5 text-red-600" />
                  <span>Print Report</span>
                </button>
              </div>
            </div>

            {/* Filter Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 pt-3 border-t border-gray-100 dark:border-zinc-800">
              {/* Category Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Collection</label>
                <select 
                  value={collectionFilter}
                  onChange={(e) => setCollectionFilter(e.target.value)}
                  className="px-2.5 py-2 text-xs rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 focus:outline-none"
                >
                  <option value="all">All Collections</option>
                  {collectionsList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Diagnosis Type</label>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-2 text-xs rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 focus:outline-none"
                >
                  <option value="all-missing">All Issues</option>
                  <option value="all">Show All Rows</option>
                  <option value="missing-only">Missing Only (404)</option>
                  <option value="placeholder-only">Placeholders Used</option>
                  <option value="broken-only">Broken / Empty Fields</option>
                  <option value="duplicate-only">Duplicate References</option>
                </select>
              </div>

              {/* Priority Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Priority</label>
                <select 
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-2.5 py-2 text-xs rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 focus:outline-none"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>

              {/* Category tag filter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Category</label>
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-2.5 py-2 text-xs rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              {/* Clear button */}
              <div className="flex items-end">
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all-missing");
                    setPriorityFilter("all");
                    setCollectionFilter("all");
                    setCategoryFilter("all");
                  }}
                  className="w-full text-center px-3 py-2 border border-gray-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"
                >
                  Reset Diagnostics
                </button>
              </div>
            </div>
          </div>

          {/* Diagnostics Table */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between bg-gray-50/50 dark:bg-zinc-800/30">
              <span className="text-xs font-bold text-[#003926] uppercase tracking-wider">
                Audited Resources ({filteredIssues.length} matches)
              </span>
              <span className="text-[10px] text-gray-400 font-medium print:hidden">
                Marking items resolved performs local visual hide.
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/20 text-gray-400 font-semibold uppercase text-[9px] tracking-wider">
                    <th className="px-6 py-3.5">Priority</th>
                    <th className="px-6 py-3.5">Collection</th>
                    <th className="px-6 py-3.5">Product Name</th>
                    <th className="px-6 py-3.5">Asset SKU / ID</th>
                    <th className="px-6 py-3.5">Image Type</th>
                    <th className="px-6 py-3.5">Diagnosis</th>
                    <th className="px-6 py-3.5 print:hidden">File System Path</th>
                    <th className="px-6 py-3.5 text-right print:hidden">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 font-medium text-gray-600 dark:text-gray-300">
                  {filteredIssues.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-10 text-gray-400 text-xs">
                        <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        No image diagnostic errors matching active search configuration filters.
                      </td>
                    </tr>
                  ) : (
                    filteredIssues.map((issue) => {
                      const isResolved = resolvedIds.has(issue.id);
                      
                      // Priority Badge styling
                      const prioClass = 
                        issue.priority === "High" ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-200/50" :
                        issue.priority === "Medium" ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-200/50" :
                        issue.priority === "Low" ? "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border border-yellow-200/50" :
                        "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border border-green-200/50";

                      // Status Badge styling
                      const statusClass = 
                        issue.status === "Missing" ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300" :
                        issue.status === "Placeholder" ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" :
                        issue.status === "Duplicate" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300" :
                        issue.status === "Broken Path" ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300" :
                        "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300";

                      return (
                        <tr 
                          key={issue.id} 
                          className={`hover:bg-gray-50/50 dark:hover:bg-zinc-800/10 transition-colors ${isResolved ? "opacity-30 line-through" : ""}`}
                        >
                          {/* Priority */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${prioClass}`}>
                              {issue.priority}
                            </span>
                          </td>

                          {/* Collection */}
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-semibold">
                            {issue.collection}
                          </td>

                          {/* Product Name */}
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {issue.productName}
                          </td>

                          {/* Product ID */}
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-mono text-[10px]">
                            {issue.productId}
                          </td>

                          {/* Image Type */}
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {issue.imageType}
                          </td>

                          {/* Diagnosis */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${statusClass}`}>
                              {issue.status}
                            </span>
                          </td>

                          {/* File Path */}
                          <td className="px-6 py-4 text-gray-400 font-mono text-[9px] max-w-xs truncate print:hidden" title={issue.imagePath}>
                            {issue.imagePath || <span className="text-red-400">Empty Field</span>}
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-right whitespace-nowrap print:hidden">
                            <div className="inline-flex items-center gap-1.5">
                              {/* Preview */}
                              <button 
                                onClick={() => {
                                  setPreviewImage(issue.imagePath);
                                  setPreviewTitle(issue.productName);
                                }}
                                className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 text-gray-500 hover:text-black transition-colors"
                                title="Preview Image File"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {/* Open Product */}
                              <Link 
                                href={issue.pageUrl} 
                                target="_blank"
                                className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 text-gray-500 hover:text-black transition-colors"
                                title="Open Live Page"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>

                              {/* Copy Path */}
                              <button 
                                onClick={() => handleCopyPath(issue.imagePath, issue.id)}
                                className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 text-gray-500 hover:text-[#003926] relative transition-colors"
                                title="Copy Resource Path"
                              >
                                {copiedId === issue.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>

                              {/* Mark Resolved Toggle */}
                              <button 
                                onClick={() => toggleResolved(issue.id)}
                                className={`p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 transition-colors ${
                                  isResolved 
                                    ? "bg-green-50 text-green-600 dark:bg-green-900/10" 
                                    : "hover:bg-gray-50 text-gray-400 hover:text-green-600"
                                }`}
                                title={isResolved ? "Mark Unresolved" : "Mark Resolved"}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Asset Preview Modal */}
      {previewImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-md w-full border border-gray-200 dark:border-zinc-800 shadow-2xl p-6 relative overflow-hidden">
            <button 
              onClick={() => {
                setPreviewImage(null);
                setPreviewTitle("");
              }}
              className="absolute right-4 top-4 p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4 pr-10 truncate">
              {previewTitle}
            </h3>

            <div className="w-full h-64 bg-gray-50 dark:bg-zinc-950 rounded-xl border border-gray-100 dark:border-zinc-850 flex items-center justify-center overflow-hidden mb-4">
              {previewImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={previewImage} 
                  alt="Asset Preview"
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    // Show broken placeholder inside the modal if the file doesn't load!
                    (e.target as HTMLImageElement).src = "/images/doublewatch-nobg.png";
                    (e.target as HTMLImageElement).style.filter = "grayscale(1) opacity(0.35)";
                  }}
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400 gap-2">
                  <EyeOff className="w-10 h-10 stroke-[1.5] text-red-400" />
                  <span className="text-xs">No image path specified</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Image Resource Path</span>
                <span className="text-[10px] font-mono bg-gray-50 dark:bg-zinc-950 px-2 py-1 border border-gray-100 dark:border-zinc-800 rounded font-semibold text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-none block">
                  {previewImage || "Null / Empty"}
                </span>
              </div>

              <div className="text-[10px] text-gray-400 leading-normal flex items-start gap-1.5 pt-1">
                <HelpCircle className="w-3.5 h-3.5 shrink-0 text-[#B8935A]" />
                <span>If the render above is a gray template watch, the local asset is physically missing or has a duplicate reference.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
