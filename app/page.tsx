'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { EmployeeWithStats } from '@/types';
import Navigation from '@/components/Navigation';

export default function HomePage() {
  const [employees, setEmployees] = useState<EmployeeWithStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const response = await fetch('/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f6f8]">
        <Navigation />
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-slate-500">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f8]">
      <Navigation />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Employee Performance</h2>
            <p className="text-slate-500 text-lg">
              Monitor team productivity and generate AI-driven review insights.
            </p>
          </div>
          <Link href="/employee/new">
            <button className="bg-[#2463eb] hover:bg-[#1d4ed8] text-white font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 transition-all shadow-sm">
              <span className="material-symbols-outlined">person_add</span>
              Add Employee
            </button>
          </Link>
        </div>

        {employees.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-4">
              <span className="material-symbols-outlined text-4xl text-slate-400">groups</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No employees yet</h3>
            <p className="text-slate-500 mb-6">Get started by adding your first employee</p>
            <Link href="/employee/new">
              <button className="bg-[#2463eb] hover:bg-[#1d4ed8] text-white font-bold py-2.5 px-6 rounded-lg inline-flex items-center gap-2 transition-all shadow-sm">
                <span className="material-symbols-outlined">person_add</span>
                Add Employee
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shrink-0 border border-slate-100">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 truncate">{employee.name}</h3>
                      <p className="text-sm text-slate-500 truncate">{employee.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                      <span className="material-symbols-outlined text-sm">verified_user</span>
                      {employee.accomplishment_count} Accomplishments
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      {employee.observation_count} Observations
                    </div>
                  </div>
                </div>

                <div className="mt-auto border-t border-slate-100 p-4 bg-slate-50/50 flex gap-3">
                  <Link href={`/employee/${employee.id}`} className="flex-1">
                    <button className="w-full text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 py-2 rounded-lg transition-colors">
                      View Details
                    </button>
                  </Link>
                  <Link href={`/employee/${employee.id}/report`} className="flex-1">
                    <button className="w-full text-sm font-bold text-white bg-[#2463eb] hover:bg-[#1d4ed8] py-2 rounded-lg transition-colors shadow-sm">
                      Generate Report
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Meta */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
          <p>© 2024 AutoTalentEvaluation. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
}
