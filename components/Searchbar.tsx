'use client'

import { cn } from "../lib/utils";
import { ArrowUp, Loader, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface SearchbarProps {
    isLoading?: boolean;
    onSearch: (query: string) => void;
}

const Searchbar = ({ onSearch, isLoading }: SearchbarProps) => {
    const [isMultiline, setIsMultiline] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (!isLoading && searchQuery.trim()) {
            onSearch(searchQuery);
            setSearchQuery("");
        }
    };

    return (
        <div className={`w-full max-w-4xl mx-auto p-3.5 rounded-xl border border-[#ffffff1a] bg-[#111111] ${isMultiline ? 'flex-col-reverse' : 'flex items-center'} flex gap-x-2`}>
            <div className={cn(' ', {
                'w-full justify-between flex items-center': isMultiline
            })}>
                <div
                    className={`flex items-center justify-center w-10 h-8 border border-[#0d5c5c] rounded-lg bg-[#0d5c5c]/30 cursor-pointer`}
                    onClick={handleSearch}
                >
                    <SearchIcon className="w-4 h-4 text-[#13C2C2]" />
                </div>

                <div
                    className={cn(`flex items-center justify-center w-10 h-8 border border-[#0d5c5c] rounded-lg bg-[#0d5c5c]/30 cursor-pointer`, {
                        'hidden': !isMultiline
                    })}
                    onClick={handleSearch}
                >
                    {isLoading ? (
                        <Loader className="w-4 h-4 text-[#13C2C2] animate-spin" />
                    ) : (
                        <ArrowUp className="w-4 h-4 text-[#13C2C2]" />
                    )}
                </div>
            </div>
            <textarea
                placeholder="Ask anything..."
                className="outline-none bg-transparent w-full resize-none overflow-y-auto text-white"
                rows={1}
                style={{ maxHeight: '200px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, 200) + 'px';

                    // Check if content height exceeds one line
                    setIsMultiline(target.scrollHeight > 24);
                }}
                onKeyDown={(e) => {
                    if (!isLoading && e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSearch();
                    }
                }}
            />

            <Button
                variant="outline"
                disabled={isLoading || searchQuery.trim() === ""}
                className={cn(`flex items-center justify-center w-10 h-8 rounded-lg cursor-pointer hover:bg-[#0d5c5c]/80`, {
                    'hidden': isMultiline,
                    'bg-[#0d5c5c] ': !isLoading,
                    'bg-white': isLoading,
                })}
                onClick={handleSearch}
            >
                {isLoading ? (
                        <Loader className="w-4 h-4 text-black animate-spin" />
                    ) : (
                        <ArrowUp className="w-4 h-4 text-[#13C2C2]" />
                    )}
            </Button>
        </div>
    )
}

export default Searchbar;