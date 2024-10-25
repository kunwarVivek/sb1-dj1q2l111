import React from 'react';
import { DealPhase } from '../../types/deal';
import { CheckCircle, Circle } from 'lucide-react';

interface DealPhaseIndicatorProps {
  currentPhase: keyof typeof DealPhase;
}

const phases = [
  { key: DealPhase.PROSPECTING, label: 'Prospecting' },
  { key: DealPhase.NEGOTIATION, label: 'Negotiation' },
  { key: DealPhase.DUE_DILIGENCE, label: 'Due Diligence' },
  { key: DealPhase.CLOSING, label: 'Closing' },
  { key: DealPhase.POST_MERGER, label: 'Post-Merger' },
];

export const DealPhaseIndicator: React.FC<DealPhaseIndicatorProps> = ({ currentPhase }) => {
  const currentPhaseIndex = phases.findIndex(phase => phase.key === currentPhase);

  return (
    <div className="flex items-center w-full">
      {phases.map((phase, index) => (
        <React.Fragment key={phase.key}>
          <div className="flex flex-col items-center">
            {index <= currentPhaseIndex ? (
              <CheckCircle className="w-8 h-8 text-green-500" />
            ) : (
              <Circle className="w-8 h-8 text-gray-300" />
            )}
            <span className="text-sm mt-2">{phase.label}</span>
          </div>
          {index < phases.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 ${
                index < currentPhaseIndex ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};