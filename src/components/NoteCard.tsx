'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface Note {
  id: string;
  text: string;
}

interface NoteCardProps {
  note: Note;
  index: number;
}

export default function NoteCard({ note, index }: NoteCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      className="group relative p-6 bg-white rounded-2xl shadow-sm border border-amber-100 hover:shadow-md hover:border-amber-300 transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-amber-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-800 leading-relaxed break-words">
            {note.text}
          </p>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 font-mono truncate">
              ID: {note.id}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
