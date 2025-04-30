import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import type { AssetError } from '../types/assets';

interface ErrorDisplayProps {
  error: AssetError;
  onRetry?: () => void;
}

export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-red-50 rounded-lg flex items-start"
    >
      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
      <div className="ml-3 flex-1">
        <h3 className="text-sm font-medium text-red-800">
          Error loading asset
        </h3>
        <p className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 flex items-center text-sm text-red-700 hover:text-red-800"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Retry
          </button>
        )}
      </div>
    </motion.div>
  );
}