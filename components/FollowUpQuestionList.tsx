'use client'

import React from 'react';
import { PlusIcon } from 'lucide-react';

interface FollowUpQuestionListProps {
  questions: string[];
  onQuestionClick?: (question: string) => void;
}

const FollowUpQuestionList = ({ questions, onQuestionClick }: FollowUpQuestionListProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
          <line x1="3" y1="12" x2="5" y2="12"></line>
          <line x1="19" y1="12" x2="21" y2="12"></line>
          <line x1="12" y1="3" x2="12" y2="5"></line>
          <line x1="12" y1="19" x2="12" y2="21"></line>
          <line x1="5.6" y1="5.6" x2="7" y2="7"></line>
          <line x1="17" y1="17" x2="18.4" y2="18.4"></line>
          <line x1="5.6" y1="18.4" x2="7" y2="17"></line>
          <line x1="17" y1="7" x2="18.4" y2="5.6"></line>
        </svg>
        <h2 className="text-lg font-medium text-white">Related</h2>
      </div>
      <ul className="space-y-2">
        {questions.map((question, index) => (
          <li 
            key={index} 
            className="group flex items-center justify-between py-4 px-2 rounded-md text-white hover:bg-[#1a1a1a] cursor-pointer transition-colors"
            onClick={() => onQuestionClick?.(question)}
          >
            <span className="text-sm">{question}</span>
            <span className="flex items-center justify-center w-6 h-6 text-[#13C2C2]">
              <PlusIcon size={16} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowUpQuestionList;
