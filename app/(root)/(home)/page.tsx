'use client'

import Searchbar from "../../../components/Searchbar";
import { Message } from "../../../components/ChatComponent";
import ChatComponent from "../../../components/ChatComponent";
import { useState, useRef, useEffect } from "react";

const Home = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSearch = (query: string) => {
        console.log(query);
        // Add user message
        const userMessage: Message = { 
            id: Date.now().toString(), 
            sender: "user", 
            content: query 
        };
        setMessages(prev => [...prev, userMessage]);

        // Add AI message with typing effect
        setTimeout(() => {
            const aiMessage: Message = { 
                id: (Date.now() + 1).toString(), 
                sender: "ai", 
                content: "Hello, how can I help you today?",
                isTyping: true 
            };
            setMessages(prev => [...prev, aiMessage]);
        }, 500);
    };
    
    const handleTypingEnd = (messageId: string) => {
        setMessages(prev => 
            prev.map(msg => 
                msg.id === messageId ? { ...msg, isTyping: false } : msg
            )
        );
    };

    return (
        <section className="flex flex-col items-center justify-center h-full py-4 px-4 lg:px-0 gap-y-4">
            <div 
                ref={messagesContainerRef}
                className="w-full max-w-4xl mx-auto flex-1 overflow-y-auto"
            >
                <ChatComponent 
                    messages={messages} 
                    onTypingEnd={handleTypingEnd}
                />
            </div>

            <Searchbar onSearch={handleSearch} />
        
        </section>
    )
}

export default Home;

