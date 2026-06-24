'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FileText, Activity, Trash2 } from 'lucide-react';
import NoteCard from '@/components/NoteCard';
import AddNoteForm from '@/components/AddNoteForm';
import HealthStatus from '@/components/HealthStatus';

interface Note {
  id: string;
  text: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/notes`);
      if (!response.ok) throw new Error('Failed to fetch notes');
      const data = await response.json();
      setNotes(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (text: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error('Failed to create note');
      await fetchNotes();
      setIsFormOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add note');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b border-amber-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notes API</h1>
              <p className="text-sm text-gray-600">FastAPI + Pydantic</p>
            </div>
          </motion.div>
          <HealthStatus apiBase={API_BASE} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple Note Management
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A lightweight REST API built with FastAPI. Create and retrieve notes
            with automatic validation and OpenAPI documentation.
          </p>
        </motion.div>

        {/* Add Note Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Add New Note
          </button>
        </motion.div>

        {/* Add Note Form Modal */}
        <AnimatePresence>
          {isFormOpen && (
            <AddNoteForm
              onSubmit={addNote}
              onClose={() => setIsFormOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Notes Grid */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {notes.map((note, index) => (
                <NoteCard key={note.id} note={note} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && notes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
              <FileText className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No notes yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first note to get started
            </p>
          </motion.div>
        )}

        {/* API Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-6 bg-white rounded-2xl shadow-sm border border-amber-100"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">API Endpoints</h3>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-semibold text-xs">
                GET
              </span>
              <code className="text-gray-700">/api/notes</code>
              <span className="text-gray-500 text-xs">Retrieve all notes</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-semibold text-xs">
                POST
              </span>
              <code className="text-gray-700">/api/notes</code>
              <span className="text-gray-500 text-xs">Create a new note</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded font-semibold text-xs">
                GET
              </span>
              <code className="text-gray-700">/health</code>
              <span className="text-gray-500 text-xs">Health check</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              📚 Interactive API documentation available at:
            </p>
            <a
              href={`${API_BASE}/docs`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:text-amber-700 font-medium text-sm underline"
            >
              {API_BASE}/docs
            </a>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-amber-200 bg-white/50">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-gray-600">
          Built with FastAPI, Pydantic, Next.js & Tailwind CSS
        </div>
      </footer>
    </div>
  );
}
