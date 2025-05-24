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

        // 
        // return {
        //     "answer": "近期，日本首相石破茂与美国总统特朗普进行了电话会谈，并同意在即将到来的关税谈判中进行富有成效的讨论。石破茂重申了日本政府希望美国取消所有针对日本商品的最新关税措施，并强调通过增加对美投资创造更多就业机会的方式推动双边关系发展。尽管此前几轮谈判中，美方并未接受日方提议，但此次会谈显示双方仍存在合作空间。值得注意的是，尽管特朗普政府已部分放松汽车进口关税，但钢铁和铝制品的高税率依然存在。此外，两位领导人还就安全合作及中东访问等议题交换意见，并计划在下月的G7峰会上进一步会面。总体来看，尽管两国在贸易政策上存在一定分歧，但在加强经济联系和维护地区稳定方面展现出积极态度。",
        //     "follow_up_questions": [
        //         "日本希望通过何种方式缓解与美国之间的贸易紧张局势？",
        //         "特朗普政府目前是否完全取消了对日本汽车进口的高额关税？",
        //         "石破茂与特朗普在电话会谈中还讨论了哪些非经济领域的议题？",
        //         "未来两国将在哪个国际场合继续深化对话？",
        //         "日本坚持要求美国撤销的具体关税措施有哪些？"
        //     ],
        //     "error": null,
        //     "inline_images": [],
        //     "organic_results": [
        //         {
        //             "position": 1,
        //             "title": "Ishiba says he and Trump agreed in a phone call to a ' ...",
        //             "link": "https://apnews.com/article/japan-tariffs-ishiba-trump-trade-deal-dc8fa85fcb2461b1929a362fe0061b6b",
        //             "snippet": "Ishiba said he reminded Trump that Japan's position was for the U.S. administration to scrap all recent tariffs on imports from Japan, to which ...",
        //             "displayLink": "https://apnews.com › article › japan-tariffs-ishiba-trump...",
        //             "date": "15 hours ago",
        //             "source": "AP News",
        //             "favicon": "https://serpapi.com/searches/683178683f79f5109e0a6d89/images/2fe4a65f2de65bdce45ee6e2abd9dfd02bcbfe0961c4165bb3f6997e55140e33.png"
        //         },
        //         {
        //             "position": 2,
        //             "title": "Ishiba, Trump Discuss Economic Security Cooperation in ...",
        //             "link": "https://www.nippon.com/en/news/yjj2025052300570/ishiba-trump-discuss-economic-security-cooperation-in-phone-call.html",
        //             "snippet": "In the roughly 45-minute call, Ishiba expressed expectations for \"productive discussions\" in the upcoming third round of Japan-U.S. ministerial- ...",
        //             "displayLink": "https://www.nippon.com › news › yjj2025052300570",
        //             "date": "1 day ago",
        //             "source": "nippon.com",
        //             "favicon": "https://serpapi.com/searches/683178683f79f5109e0a6d89/images/2fe4a65f2de65bdce45ee6e2abd9dfd06c46dac7443cb1808ca456638d9091ee.png"
        //         },
        //         {
        //             "position": 3,
        //             "title": "Japan-U.S. Summit Telephone Talk",
        //             "link": "http://www.mofa.go.jp/na/na1/us/pageite_000001_01000.html",
        //             "snippet": "The two leaders broadly exchanged views on issues such as the Japan-U.S. Consultation on U.S. Tariff Measures and economic security cooperation.",
        //             "displayLink": "http://www.mofa.go.jp › pageite_000001_01000",
        //             "date": "20 hours ago",
        //             "source": "Ministry of Foreign Affairs of Japan",
        //             "favicon": "https://serpapi.com/searches/683178683f79f5109e0a6d89/images/2fe4a65f2de65bdce45ee6e2abd9dfd055022baca7718d3a23a657c421148461.png"
        //         },
        //         {
        //             "position": 4,
        //             "title": "Ishiba says he and Trump agreed in a phone call to a ' ...",
        //             "link": "https://www.washingtonpost.com/business/2025/05/23/japan-tariffs-ishiba-trump-trade-deal/dd2d209c-3796-11f0-9c9e-0db2d748bea7_story.html",
        //             "snippet": "Ishiba says he and Trump agreed in a phone call to a 'productive' round of trade talks. Japan's Prime Minister Shigeru Ishiba says that he spoke ...",
        //             "displayLink": "https://www.washingtonpost.com › business › 2025/05/23",
        //             "date": "8 hours ago",
        //             "source": "The Washington Post",
        //             "favicon": "https://serpapi.com/searches/683178683f79f5109e0a6d89/images/2fe4a65f2de65bdce45ee6e2abd9dfd00d355b749ea23583504ca52435d8877b.png"
        //         },
        //         {
        //             "position": 5,
        //             "title": "Japan PM hopes for productive tariff talks with the US ...",
        //             "link": "https://newsroom.ap.org/detail/JapanPMhopesforproductivetarifftalkswiththeUSfollowingphonecallwithTrump/4b67ced8d1aa4c4a9f64facb34727566/video",
        //             "snippet": "STORYLINE: Japan's Prime Minister Shigeru Ishiba said Friday that he held telephone talks with U.S. President Donald Trump and agreed to hold “ ...",
        //             "displayLink": "https://newsroom.ap.org › detail › video",
        //             "date": "7 hours ago",
        //             "source": "AP Newsroom",
        //             "favicon": "https://serpapi.com/searches/683178683f79f5109e0a6d89/images/2fe4a65f2de65bdce45ee6e2abd9dfd08ca74938797a1d28e948f54cebd397aa.png"
        //         },
        //         {
        //             "position": 6,
        //             "title": "Ishiba and Trump speak as Akazawa heads to Washington",
        //             "link": "https://www.japantimes.co.jp/business/2025/05/23/economy/trump-ishiba-akazawa/",
        //             "snippet": "During the 45-minute conversation, the leaders exchanged views on the tariff negotiations, cooperation on economic security and the U.S. ...",
        //             "displayLink": "https://www.japantimes.co.jp › 2025/05/23 › economy",
        //             "date": "1 day ago",
        //             "source": "The Japan Times",
        //             "favicon": "https://serpapi.com/searches/683178683f79f5109e0a6d89/images/2fe4a65f2de65bdce45ee6e2abd9dfd05271312e44397177af69cde6d6c72807.png"
        //         },
        //         {
        //             "position": 7,
        //             "title": "Ishiba, Trump Discuss Economic Security Cooperation in ...",
        //             "link": "https://jen.jiji.com/jc/i?g=eco&k=2025052300643",
        //             "snippet": "In the roughly 45-minute call, Ishiba expressed expectations for \"productive discussions\" in the upcoming third round of Japan-U.S. ministerial- ...",
        //             "displayLink": "https://jen.jiji.com › ...",
        //             "date": "23 hours ago",
        //             "source": "JIJI PRESS",
        //             "favicon": "https://serpapi.com/searches/683178683f79f5109e0a6d89/images/2fe4a65f2de65bdce45ee6e2abd9dfd0381bdc4719bc97454cbb9748c8397c83.png"
        //         },
        //         {
        //             "position": 8,
        //             "title": "Trump Initiated Call With Japan's Ishiba, Discussed Tariffs",
        //             "link": "https://www.bloomberg.com/news/articles/2025-05-23/trump-initiated-call-with-japan-s-ishiba-discussed-tariffs",
        //             "snippet": "Ishiba and Trump discussed a wide range of topics including tariff negotiations, economic security cooperation, diplomacy and national security ...",
        //             "displayLink": "https://www.bloomberg.com › news › articles › trump-in...",
        //             "date": "1 day ago",
        //             "source": "Bloomberg",
        //             "favicon": "https://serpapi.com/searches/683178683f79f5109e0a6d89/images/2fe4a65f2de65bdce45ee6e2abd9dfd0f653b0f8d386658716d4c3f6015b6d8b.png"
        //         },
        //         {
        //             "position": 9,
        //             "title": "Japan Embassy DC on X",
        //             "link": "https://x.com/JapanEmbDC/status/1925979942166085675",
        //             "snippet": "Prime Minister Ishiba held a summit telephone talk with President Trump. They exchanged views on: ▶️ - Consultation on US Tariff Measures ...",
        //             "displayLink": "1 like · 13 hours ago",
        //             "date": "",
        //             "source": "X · JapanEmbDC",
        //             "favicon": "https://serpapi.com/searches/683178683f79f5109e0a6d89/images/2fe4a65f2de65bdce45ee6e2abd9dfd082a52638417719e362b8b0b02ca88912.png"
        //         },
        //         {
        //             "position": 10,
        //             "title": "Ishiba says he and Trump agreed to a 'productive' round of ...",
        //             "link": "https://www.bostonherald.com/2025/05/23/japan-us-tariffs/",
        //             "snippet": "Ishiba says he and Trump agreed in a phone call to a 'productive' round of trade talks. The U.S. is charging a 25% tariff on imports of autos ...",
        //             "displayLink": "https://www.bostonherald.com › japan-us-tariffs",
        //             "date": "15 hours ago",
        //             "source": "Boston Herald",
        //             "favicon": "https://serpapi.com/searches/683178683f79f5109e0a6d89/images/2fe4a65f2de65bdce45ee6e2abd9dfd0ea6f8d64eb9d635e89b47eafcbd37eb3.png"
        //         }
        //     ]
        // }
    }

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

