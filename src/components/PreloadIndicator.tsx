import { motion } from 'framer-motion';
import type { LoadingState } from '../types/assets';

interface PreloadIndicatorProps {
  state: LoadingState;
}

export default function PreloadIndicator({ state }: PreloadIndicatorProps) {
  if (!state.isLoading) return null;

  const progress = Math.round((state.progress / state.total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4"
    >
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6">
          <svg className="animate-spin" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-700">
            Loading Assets...
          </div>
          <div className="text-xs text-gray-500">
            {state.progress} of {state.total} ({progress}%)
          </div>
        </div>
      </div>
    </motion.div>
  );
}