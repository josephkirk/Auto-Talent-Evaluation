'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Employee, Accomplishment, Observation, Framework, ReportPeriod } from '@/types';
import Navigation from '@/components/Navigation';

export default function ReportPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [accomplishments, setAccomplishments] = useState<Accomplishment[]>([]);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [period, setPeriod] = useState<ReportPeriod>('yearly');
  const [framework, setFramework] = useState<Framework>('OKR');
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    try {
      const response = await fetch(`/api/employees/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEmployee(data.employee);
        setAccomplishments(data.accomplishments);
        setObservations(data.observations);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
    } finally {
      setLoading(false);
    }
  }

  async function generateReport() {
    if (!employee) return;
    setGenerating(true);
    setError('');
    setReport('');

    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeName: employee.name,
          employeeRole: employee.role,
          period,
          framework,
          year,
          accomplishments,
          observations,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setReport(data.report);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to generate report');
      }
    } catch (err) {
      setError('Failed to connect to the server. Make sure Ollama is running on localhost:11434 with the gemma3:12b-it-qat model.');
    } finally {
      setGenerating(false);
    }
  }

  function formatMarkdown(markdown: string) {
    return markdown
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-8 mb-4 flex items-center gap-2"><span class="material-symbols-outlined text-[#2463eb]">stars</span>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-8 mb-4 flex items-center gap-2"><span class="material-symbols-outlined text-[#2463eb]">emoji_events</span>$1</h2>')
      .replace(/^\- (.*$)/gm, '<li class="flex gap-3"><span class="material-symbols-outlined text-green-500 mt-1">check_circle</span><span>$1</span></li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p class="leading-relaxed mb-6">')
      .replace(/^(?!<[h|l])/gm, '<p class="leading-relaxed mb-6">')
      .replace(/<p><\/p>/g, '');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f6f8]">
        <Navigation />
        <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-slate-500">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!employee) return null;

  return (
    <div className="min-h-screen bg-[#f6f6f8]">
      <Navigation />
      <main className="flex flex-col items-center py-8 px-4 md:px-10 lg:px-40">
        <div className="w-full max-w-[1200px]">
          {/* Breadcrumbs & Heading */}
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-slate-500 text-sm font-medium hover:underline">Dashboard</Link>
              <span className="text-slate-400 text-sm">/</span>
              <span className="text-slate-900 text-sm font-medium">Reports</span>
            </div>
            <div className="flex flex-wrap justify-between items-end gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black leading-tight tracking-tight">Performance Report Generator</h1>
                <p className="text-slate-500 text-base">Synthesize employee data into professional AI-generated reviews.</p>
              </div>
            </div>
          </div>

          {/* Configuration Bar */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-end gap-6 mb-6">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-slate-700">Period</span>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as ReportPeriod)}
                  className="rounded-lg border border-slate-200 bg-slate-50 h-12 px-4 focus:ring-2 focus:ring-[#2463eb] focus:border-[#2463eb] transition-all"
                >
                  <option value="yearly">Yearly</option>
                  <option value="Q1">Q1 (Jan-Mar)</option>
                  <option value="Q2">Q2 (Apr-Jun)</option>
                  <option value="Q3">Q3 (Jul-Sep)</option>
                  <option value="Q4">Q4 (Oct-Dec)</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-slate-700">Framework</span>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value as Framework)}
                  className="rounded-lg border border-slate-200 bg-slate-50 h-12 px-4 focus:ring-2 focus:ring-[#2463eb] focus:border-[#2463eb] transition-all"
                >
                  <option value="OKR">OKR (Objectives & Key Results)</option>
                  <option value="BARS">BARS</option>
                  <option value="MBO">MBO</option>
                  <option value="Competency">Competency-Based</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-slate-700">Year</span>
                <select
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="rounded-lg border border-slate-200 bg-slate-50 h-12 px-4 focus:ring-2 focus:ring-[#2463eb] focus:border-[#2463eb] transition-all"
                >
                  <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                  <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                  <option value={new Date().getFullYear() - 2}>{new Date().getFullYear() - 2}</option>
                </select>
              </label>
            </div>
            <button
              onClick={generateReport}
              disabled={generating}
              className="bg-[#2463eb] text-white font-bold h-12 px-8 rounded-lg hover:bg-[#1d4ed8] transition-all flex items-center gap-2 shadow-md shadow-[#2463eb]/20"
            >
              {generating ? (
                <>
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                  Generating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                  Generate Report
                </>
              )}
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Report Display (2/3 width) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="border-b border-slate-200 px-8 py-4 flex justify-between items-center bg-slate-50/50">
                  <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Preview: AI-Generated Content</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(report)}
                      className="p-2 hover:bg-slate-200 rounded transition-colors"
                      title="Copy to Clipboard"
                    >
                      <span className="material-symbols-outlined text-slate-600">content_copy</span>
                    </button>
                  </div>
                </div>
                <div className="p-10">
                  {error ? (
                    <div className="flex items-start gap-3 bg-red-50 p-4 rounded-lg">
                      <span className="material-symbols-outlined text-red-500">error</span>
                      <div>
                        <h3 className="font-semibold text-red-700 mb-1">Error Generating Report</h3>
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    </div>
                  ) : report ? (
                    <article className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: formatMarkdown(report) }} />
                  ) : (
                    <div className="text-center py-12">
                      <span className="material-symbols-outlined text-6xl text-slate-300">description</span>
                      <p className="text-slate-500 mt-4">Select options and click "Generate Report" to create an AI-powered performance review.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Sidebars/Data Summary (1/3 width) */}
            <div className="flex flex-col gap-6">
              {/* Data Summary Card */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2463eb]">query_stats</span>
                  Data Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-600">Key Accomplishments</span>
                    <span className="text-lg font-bold text-[#2463eb]">{accomplishments.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-600">Peer Observations</span>
                    <span className="text-lg font-bold text-[#2463eb]">{observations.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-600">Data Sources</span>
                    <span className="text-lg font-bold text-[#2463eb]">2</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-xs text-slate-400 mb-2 font-bold uppercase">Framework:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-mono">{framework}</span>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 items-center shadow-sm">
                  <div className="text-[#2463eb]">
                    <span className="material-symbols-outlined">calendar_today</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs text-slate-500 uppercase font-bold">Period</p>
                    <h2 className="text-sm font-bold leading-tight">{period === 'yearly' ? 'Yearly' : period}</h2>
                  </div>
                </div>
                <div className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 items-center shadow-sm">
                  <div className="text-[#2463eb]">
                    <span className="material-symbols-outlined">work</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs text-slate-500 uppercase font-bold">Framework</p>
                    <h2 className="text-sm font-bold leading-tight">{framework}</h2>
                  </div>
                </div>
                <div className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 items-center shadow-sm">
                  <div className="text-[#2463eb]">
                    <span className="material-symbols-outlined">event_available</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs text-slate-500 uppercase font-bold">Review Year</p>
                    <h2 className="text-sm font-bold leading-tight">{year}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
