'use client'

import React from 'react';
import ReferenceItem from './ReferenceItem';

export interface Reference {
  icon?: string;
  title: string;
  snippet: string;
  link: string;
}

interface ReferenceListProps {
  references: Array<Reference>;
}

const ReferenceList = ({ references }: ReferenceListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
      {references.map((reference, index) => (
        <ReferenceItem
          key={index}
          icon={reference.icon}
          title={reference.title}
          snippet={reference.snippet}
          link={reference.link}
        />
      ))}
    </div>
  );
};

export default ReferenceList; 