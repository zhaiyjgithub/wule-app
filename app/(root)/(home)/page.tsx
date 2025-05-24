'use client'

import Searchbar from "../../../components/Searchbar";
import { AiResult, Message } from "../../../components/ChatComponent";
import ChatComponent from "../../../components/ChatComponent";
import { useState, useRef } from "react";
import { api } from "../../../lib/api";

const Home = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    // fetch data from api
    const fetchData = async (question: string) => {
        console.log("fetchData...");
        setIsLoading(true);
        try {
            const data = await api.ask(question);
            console.log(data);
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    // 示例：获取用户信息的函数
    const fetchUser = async (userId: string) => {
        try {
            const userData = await api.getUser(userId);
            console.log('用户数据:', userData);
            return userData;
        } catch (error) {
            console.error("获取用户信息失败:", error);
            return null;
        }
    };

    // 示例：更新用户信息的函数
    const updateUserInfo = async (userData: any) => {
        try {
            const result = await api.updateUser(userData);
            console.log('用户更新成功:', result);
            return result;
        } catch (error) {
            console.error("更新用户信息失败:", error);
            return null;
        }
    };

    const handleSearch = async (query: string) => {
        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            sender: "user",
            content: query,
            aiContent: null as unknown as AiResult // Fix any type
        };
        setMessages(prev => [...prev, userMessage]);

        const apiResult = await fetchData(query);
        if (!apiResult) {
            return;
        }
        
        const aiContent: AiResult = {
            title: "",
            answer: apiResult.answer,
            followUpQuestions: apiResult.follow_up_questions,
            inline_images: apiResult.inline_images,
            original_results: apiResult.organic_results,
        };
        const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            content: "",
            aiContent: aiContent,
            isTyping: true
        };
        setMessages(prev => [...prev, aiMessage]);
    };

    const handleTypingEnd = (messageId: string) => {
        setMessages(prev =>
            prev.map(msg =>
                msg.id === messageId ? { ...msg, isTyping: false } : msg
            )
        );

        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    const handleQuestionClick = async (question: string) => {
        console.log(question);
        await handleSearch(question);
    };

    const $solo = <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-white text-3xl font-bold">Wule</h1>
        <p className="text-white text-sm italic">
            Welcome to the AI Chatbot.
            This is a chatbot that can answer your questions.
        </p>
    </div>

    return (
        <section className="flex flex-col items-center justify-center h-full px-4 lg:px-0 gap-y-4">
            {messages.length === 0 ? $solo :
                <div
                    ref={messagesContainerRef}
                    className="w-full max-w-4xl mx-auto flex-1 overflow-y-auto scrollarea"
                >
                    <ChatComponent
                        messages={messages}
                        onTypingEnd={handleTypingEnd}
                        onQuestionClick={handleQuestionClick}
                    />
                </div>
            }
            <Searchbar onSearch={handleSearch} isLoading={isLoading} />
        </section>
    )
}

export default Home;

