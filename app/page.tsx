'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EmployeeWithStats } from '@/types';
import Navigation from '@/components/Navigation';

export default function HomePage() {
  const router = useRouter();
  const [employees, setEmployees] = useState<EmployeeWithStats[]>([]);
  const [loading, setLoading] = useState(true);

  // Delete employee states
  const [deleteDialog, setDeleteDialog] = useState<{ id: number; name: string } | null>(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState('');
  const [deletingEmployee, setDeletingEmployee] = useState(false);

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

  function openDeleteDialog(id: number, name: string) {
    setDeleteDialog({ id, name });
    setDeleteConfirmName('');
  }

  async function deleteEmployee() {
    if (!deleteDialog || deleteConfirmName !== deleteDialog.name) return;

    setDeletingEmployee(true);
    try {
      const response = await fetch(`/api/employees/${deleteDialog.id}`, { method: 'DELETE' });
      if (response.ok) {
        setEmployees(employees.filter(e => e.id !== deleteDialog.id));
        setDeleteDialog(null);
      } else {
        alert('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee');
    } finally {
      setDeletingEmployee(false);
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
                  <button
                    onClick={() => openDeleteDialog(employee.id, employee.name)}
                    className="px-3 py-2 text-sm font-bold text-red-600 bg-white border border-red-200 hover:bg-red-50 hover:border-red-300 rounded-lg transition-colors flex items-center gap-1"
                    title="Delete Employee"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
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

      {/* Delete Confirmation Dialog */}
      {deleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-red-600 text-2xl">warning</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Delete Employee</h3>
                <p className="text-sm text-slate-500">This action cannot be undone</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800 font-semibold mb-1">Warning: All records will be lost</p>
                <p className="text-xs text-red-700">
                  Deleting this employee will permanently remove all associated accomplishments and observations. This action cannot be undone.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Type <span className="font-bold text-slate-900">{deleteDialog.name}</span> to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirmName}
                  onChange={(e) => setDeleteConfirmName(e.target.value)}
                  placeholder={deleteDialog.name}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteDialog(null)}
                disabled={deletingEmployee}
                className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteEmployee}
                disabled={deleteConfirmName !== deleteDialog.name || deletingEmployee}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deletingEmployee ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">refresh</span>
                    Deleting...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">delete</span>
                    Delete Employee
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
