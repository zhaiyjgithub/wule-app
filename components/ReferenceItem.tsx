'use client'

import React from 'react';
import Image from 'next/image';

interface ReferenceItemProps {
    icon?: string;
    snippet: string;
    title: string;
    link?: string;
}

const ReferenceItem = ({ icon, snippet, title, link }: ReferenceItemProps) => {
    // get hostname from link
    const hostname = link ? new URL(link).hostname : '';
    const onClick = () => {
        if (link) {
            window.open(link, '_blank');
        }
    }
    return (
        <div onClick={onClick} className="flex flex-col gap-3 bg-[#101010] rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-[#1a1a1a] transition-colors">
            <div className="flex items-center gap-x-1 w-full">
                {icon && (
                    <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {icon.startsWith('http') ? (
                            <Image src={icon} alt={title} width={32} height={32} className="rounded-full" />
                        ) : (
                            <div className="text-center text-white text-xs">{icon}</div>
                        )}
                    </div>
                )}

                <p className="text-gray-400 text-xs line-clamp-1">{hostname}</p>
            </div>

            <div className="">
                <p className="text-gray-300 font-medium line-clamp-2">{snippet}</p>
            </div>
        </div>
    );
};

export default ReferenceItem;

