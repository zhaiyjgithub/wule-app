'use client'

import React from 'react';
import { ChartNoAxesColumn, ChartNoAxesGantt, DecimalsArrowRight, PlusIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface FollowUpQuestionListProps {
  questions: string[];
  onQuestionClick?: (question: string) => void;
}

const FollowUpQuestionList = ({ questions, onQuestionClick }: FollowUpQuestionListProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
       <ChartNoAxesGantt size={24} className="text-white" />
        <h1 className="text-3xl font-medium text-white">Related</h1>
      </div>
      <ul className="">
        {questions.map((question, index) => (
          <li 
            key={index} 
            className={cn("border-b border-white/10 group flex items-center justify-between p-2 text-white hover:bg-[#1a1a1a] cursor-pointer transition-colors", {
                "border-b-0": index === questions.length - 1
            })}
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
