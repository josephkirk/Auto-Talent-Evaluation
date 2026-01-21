'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function NewEmployeePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !role.trim()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, role }),
      });

      if (response.ok) {
        const employee = await response.json();
        router.push(`/employee/${employee.id}`);
      }
    } catch (error) {
      console.error('Error creating employee:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f6f8]">
      <Navigation />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6 text-sm text-slate-500 font-medium">
          <Link href="/" className="hover:text-[#2463eb]">Dashboard</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900">Add Employee</span>
        </nav>

        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Add New Employee</h2>
            <p className="text-slate-500 text-lg">Enter the employee's details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#2463eb] focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Role / Job Title</label>
              <input
                type="text"
                placeholder="Software Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#2463eb] focus:border-transparent"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push('/')}
                disabled={loading}
                className="flex-1 px-6 py-3 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-[#2463eb] text-white rounded-lg text-sm font-bold hover:bg-[#1d4ed8] shadow-sm transition-colors"
              >
                {loading ? 'Creating...' : 'Create Employee'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
