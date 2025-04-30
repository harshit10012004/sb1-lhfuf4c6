import { motion } from 'framer-motion';
import type { LoadingState } from '../../types/assets';

interface AssetLoadingIndicatorProps {
  state: LoadingState;
}

export default function AssetLoadingIndicator({ state }: AssetLoadingIndicatorProps) {
  const progress = Math.round((state.progress / state.total) * 100);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 mb-4 mx-auto"
        >
          <svg
            className="w-full h-full text-primary-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </motion.div>
        <div className="text-xl font-semibold text-gray-800 mb-2">
          Loading Assets...
        </div>
        <div className="text-gray-600">
          {state.progress} of {state.total} categories loaded ({progress}%)
        </div>
      </div>
    </div>
  );
}