'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Employee, Accomplishment, Observation } from '@/types';
import Navigation from '@/components/Navigation';

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [accomplishments, setAccomplishments] = useState<Accomplishment[]>([]);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'accomplishments' | 'observations'>('accomplishments');

  // Form states
  const [accomplishmentDesc, setAccomplishmentDesc] = useState('');
  const [accomplishmentPeriod, setAccomplishmentPeriod] = useState('');
  const [observationDesc, setObservationDesc] = useState('');
  const [observationCategory, setObservationCategory] = useState<Observation['category']>('other');
  const [submitting, setSubmitting] = useState(false);

  // Edit states
  const [editingAccomplishment, setEditingAccomplishment] = useState<number | null>(null);
  const [editingObservation, setEditingObservation] = useState<number | null>(null);
  const [editAccomplishmentDesc, setEditAccomplishmentDesc] = useState('');
  const [editAccomplishmentPeriod, setEditAccomplishmentPeriod] = useState('');
  const [editObservationDesc, setEditObservationDesc] = useState('');
  const [editObservationCategory, setEditObservationCategory] = useState<Observation['category']>('other');
  const [updating, setUpdating] = useState(false);

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

  async function addAccomplishment(e: React.FormEvent) {
    e.preventDefault();
    if (!accomplishmentDesc.trim() || !accomplishmentPeriod.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/accomplishments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee_id: id, description: accomplishmentDesc, period: accomplishmentPeriod }),
      });
      if (response.ok) {
        setAccomplishmentDesc('');
        setAccomplishmentPeriod('');
        fetchData();
      }
    } catch (error) {
      console.error('Error adding accomplishment:', error);
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteAccomplishment(accomplishmentId: number) {
    if (!confirm('Delete this accomplishment?')) return;
    try {
      const response = await fetch(`/api/accomplishments/${accomplishmentId}`, { method: 'DELETE' });
      if (response.ok) fetchData();
    } catch (error) {
      console.error('Error deleting accomplishment:', error);
    }
  }

  async function updateAccomplishment(accomplishmentId: number) {
    if (!editAccomplishmentDesc.trim() || !editAccomplishmentPeriod.trim()) return;
    setUpdating(true);
    try {
      const response = await fetch(`/api/accomplishments/${accomplishmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: editAccomplishmentDesc, period: editAccomplishmentPeriod }),
      });
      if (response.ok) {
        setEditingAccomplishment(null);
        fetchData();
      }
    } catch (error) {
      console.error('Error updating accomplishment:', error);
    } finally {
      setUpdating(false);
    }
  }

  function startEditAccomplishment(acc: Accomplishment) {
    setEditingAccomplishment(acc.id);
    setEditAccomplishmentDesc(acc.description);
    setEditAccomplishmentPeriod(acc.period);
  }

  function cancelEditAccomplishment() {
    setEditingAccomplishment(null);
    setEditAccomplishmentDesc('');
    setEditAccomplishmentPeriod('');
  }

  async function addObservation(e: React.FormEvent) {
    e.preventDefault();
    if (!observationDesc.trim()) return;
    setSubmitting(true);
    try {
      const response = await fetch('/api/observations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee_id: id, description: observationDesc, category: observationCategory }),
      });
      if (response.ok) {
        setObservationDesc('');
        setObservationCategory('other');
        fetchData();
      }
    } catch (error) {
      console.error('Error adding observation:', error);
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteObservation(observationId: number) {
    if (!confirm('Delete this observation?')) return;
    try {
      const response = await fetch(`/api/observations/${observationId}`, { method: 'DELETE' });
      if (response.ok) fetchData();
    } catch (error) {
      console.error('Error deleting observation:', error);
    }
  }

  async function updateObservation(observationId: number) {
    if (!editObservationDesc.trim()) return;
    setUpdating(true);
    try {
      const response = await fetch(`/api/observations/${observationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: editObservationDesc, category: editObservationCategory }),
      });
      if (response.ok) {
        setEditingObservation(null);
        fetchData();
      }
    } catch (error) {
      console.error('Error updating observation:', error);
    } finally {
      setUpdating(false);
    }
  }

  function startEditObservation(obs: Observation) {
    setEditingObservation(obs.id);
    setEditObservationDesc(obs.description);
    setEditObservationCategory(obs.category);
  }

  function cancelEditObservation() {
    setEditingObservation(null);
    setEditObservationDesc('');
    setEditObservationCategory('other');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f6f8]">
        <Navigation />
        <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
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
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6 text-sm text-slate-500 font-medium">
          <Link href="/" className="hover:text-[#2463eb]">Employees</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900">{employee.name}</span>
        </nav>

        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-slate-50 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{employee.name}</h2>
                  <p className="text-lg text-[#2463eb] font-medium">{employee.role}</p>
                </div>
                <div className="flex gap-2 justify-center">
                  <Link href={`/employee/${id}/report`}>
                    <button className="px-4 py-2 bg-[#2463eb] text-white rounded-lg text-sm font-semibold hover:bg-[#1d4ed8] shadow-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">bolt</span> Generate Report
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 justify-center sm:justify-start">
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <span className="material-symbols-outlined text-lg">badge</span>
                  Employee ID: #{id}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <span className="material-symbols-outlined text-lg">calendar_today</span>
                  Joined {new Date(employee.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-24">
          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('accomplishments')}
              className={`px-8 py-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'accomplishments'
                  ? 'border-[#2463eb] text-[#2463eb]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-lg">stars</span> Accomplishments
            </button>
            <button
              onClick={() => setActiveTab('observations')}
              className={`px-8 py-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'observations'
                  ? 'border-[#2463eb] text-[#2463eb]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-lg">visibility</span> Observations
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'accomplishments' ? (
              <>
                {/* Form Section */}
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2463eb]">add_circle</span> Add Accomplishment
                  </h3>
                  <form onSubmit={addAccomplishment} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Description</label>
                      <textarea
                        value={accomplishmentDesc}
                        onChange={(e) => setAccomplishmentDesc(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#2463eb] focus:border-transparent"
                        placeholder="Describe what the employee achieved..."
                        rows={3}
                        required
                      />
                    </div>
                    <div className="md:col-span-1 flex flex-col justify-between">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Period</label>
                        <input
                          type="text"
                          value={accomplishmentPeriod}
                          onChange={(e) => setAccomplishmentPeriod(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#2463eb] focus:border-transparent"
                          placeholder="e.g. Q3 2023"
                          required
                        />
                      </div>
                      <button type="submit" disabled={submitting} className="mt-4 md:mt-0 w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                        {submitting ? 'Adding...' : 'Add Item'}
                      </button>
                    </div>
                  </form>
                </div>

                <hr className="border-slate-100 mb-8" />

                {/* List Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Recent Accomplishments</h3>
                    <span className="text-xs font-medium text-slate-400">Total: {accomplishments.length} entries</span>
                  </div>

                  {accomplishments.length === 0 ? (
                    <div className="text-center py-12">
                      <span className="material-symbols-outlined text-4xl text-slate-300">inbox</span>
                      <p className="text-slate-500 mt-2">No accomplishments yet</p>
                    </div>
                  ) : (
                    accomplishments.map((acc) => (
                      <div key={acc.id} className="group flex items-start justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-[#2463eb]/30 transition-all">
                        {editingAccomplishment === acc.id ? (
                          <div className="flex-1 space-y-3">
                            <textarea
                              value={editAccomplishmentDesc}
                              onChange={(e) => setEditAccomplishmentDesc(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#2463eb]"
                              rows={3}
                            />
                            <input
                              type="text"
                              value={editAccomplishmentPeriod}
                              onChange={(e) => setEditAccomplishmentPeriod(e.target.value)}
                              className="bg-white border border-slate-200 rounded-lg p-2 text-sm w-40 focus:ring-2 focus:ring-[#2463eb]"
                              placeholder="Period"
                            />
                            <div className="flex gap-2">
                              <button onClick={() => updateAccomplishment(acc.id)} disabled={updating} className="px-3 py-1.5 bg-[#2463eb] text-white rounded-lg text-sm font-semibold hover:bg-[#1d4ed8]">
                                {updating ? 'Saving...' : 'Save'}
                              </button>
                              <button onClick={cancelEditAccomplishment} disabled={updating} className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex gap-4">
                              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#2463eb]">
                                <span className="material-symbols-outlined text-xl">check_circle</span>
                              </div>
                              <div>
                                <p className="text-slate-900 font-medium leading-relaxed">{acc.description}</p>
                                <div className="mt-2 flex items-center gap-3">
                                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold uppercase tracking-tighter text-slate-500">{acc.period}</span>
                                  <span className="text-xs text-slate-400">Added on {new Date(acc.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => startEditAccomplishment(acc)} className="p-2 text-slate-400 hover:text-[#2463eb] hover:bg-white rounded-lg">
                                <span className="material-symbols-outlined text-lg">edit</span>
                              </button>
                              <button onClick={() => deleteAccomplishment(acc.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg">
                                <span className="material-symbols-outlined text-lg">delete</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Observations Form */}
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2463eb]">add_circle</span> Add Observation
                  </h3>
                  <form onSubmit={addObservation} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Description</label>
                      <textarea
                        value={observationDesc}
                        onChange={(e) => setObservationDesc(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#2463eb] focus:border-transparent"
                        placeholder="Describe the observation..."
                        rows={3}
                        required
                      />
                    </div>
                    <div className="md:col-span-1 flex flex-col justify-between">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Category</label>
                        <select
                          value={observationCategory}
                          onChange={(e) => setObservationCategory(e.target.value as Observation['category'])}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#2463eb] focus:border-transparent"
                        >
                          <option value="attitude">Attitude</option>
                          <option value="performance">Performance</option>
                          <option value="teamwork">Teamwork</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <button type="submit" disabled={submitting} className="mt-4 md:mt-0 w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                        {submitting ? 'Adding...' : 'Add Item'}
                      </button>
                    </div>
                  </form>
                </div>

                <hr className="border-slate-100 mb-8" />

                {/* Observations List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Recent Observations</h3>
                    <span className="text-xs font-medium text-slate-400">Total: {observations.length} entries</span>
                  </div>

                  {observations.length === 0 ? (
                    <div className="text-center py-12">
                      <span className="material-symbols-outlined text-4xl text-slate-300">visibility_off</span>
                      <p className="text-slate-500 mt-2">No observations yet</p>
                    </div>
                  ) : (
                    observations.map((obs) => (
                      <div key={obs.id} className="group flex items-start justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-[#2463eb]/30 transition-all">
                        {editingObservation === obs.id ? (
                          <div className="flex-1 space-y-3">
                            <textarea
                              value={editObservationDesc}
                              onChange={(e) => setEditObservationDesc(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#2463eb]"
                              rows={3}
                            />
                            <select
                              value={editObservationCategory}
                              onChange={(e) => setEditObservationCategory(e.target.value as Observation['category'])}
                              className="bg-white border border-slate-200 rounded-lg p-2 text-sm w-40 focus:ring-2 focus:ring-[#2463eb]"
                            >
                              <option value="attitude">Attitude</option>
                              <option value="performance">Performance</option>
                              <option value="teamwork">Teamwork</option>
                              <option value="other">Other</option>
                            </select>
                            <div className="flex gap-2">
                              <button onClick={() => updateObservation(obs.id)} disabled={updating} className="px-3 py-1.5 bg-[#2463eb] text-white rounded-lg text-sm font-semibold hover:bg-[#1d4ed8]">
                                {updating ? 'Saving...' : 'Save'}
                              </button>
                              <button onClick={cancelEditObservation} disabled={updating} className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex gap-4">
                              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                <span className="material-symbols-outlined text-xl">visibility</span>
                              </div>
                              <div>
                                <p className="text-slate-900 font-medium leading-relaxed">{obs.description}</p>
                                <div className="mt-2 flex items-center gap-3">
                                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold uppercase tracking-tighter text-slate-500">{obs.category}</span>
                                  <span className="text-xs text-slate-400">Added on {new Date(obs.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => startEditObservation(obs)} className="p-2 text-slate-400 hover:text-[#2463eb] hover:bg-white rounded-lg">
                                <span className="material-symbols-outlined text-lg">edit</span>
                              </button>
                              <button onClick={() => deleteObservation(obs.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg">
                                <span className="material-symbols-outlined text-lg">delete</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Fixed Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-600">Performance data synced with AI Review engine.</p>
          </div>
          <Link href={`/employee/${id}/report`} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-10 py-4 bg-[#2463eb] text-white rounded-xl font-bold text-base hover:bg-[#1d4ed8] shadow-lg shadow-[#2463eb]/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]">
              <span className="material-symbols-outlined">bolt</span>
              Generate Performance Report
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
