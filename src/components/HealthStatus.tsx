'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface HealthStatusProps {
  apiBase: string;
}

export default function HealthStatus({ apiBase }: HealthStatusProps) {
  const [status, setStatus] = useState<'checking' | 'healthy' | 'error'>('checking');

  const checkHealth = async () => {
    try {
      const response = await fetch(`${apiBase}/health`);
      if (response.ok) {
        setStatus('healthy');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [apiBase]);

  const statusConfig = {
    checking: {
      color: 'bg-gray-400',
      text: 'Checking',
      textColor: 'text-gray-600',
    },
    healthy: {
      color: 'bg-green-500',
      text: 'Healthy',
      textColor: 'text-green-700',
    },
    error: {
      color: 'bg-red-500',
      text: 'Error',
      textColor: 'text-red-700',
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200"
    >
      <Activity className="w-4 h-4 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">API Status:</span>
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: status === 'healthy' ? Infinity : 0, duration: 2 }}
          className={`w-2 h-2 rounded-full ${config.color}`}
        />
        <span className={`text-sm font-semibold ${config.textColor}`}>
          {config.text}
        </span>
      </div>
    </motion.div>
  );
}
