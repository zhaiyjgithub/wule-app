'use client'

import Searchbar from "../../../components/Searchbar";
import { AiResult, Message } from "../../../components/ChatComponent";
import ChatComponent from "../../../components/ChatComponent";
import { useState, useRef, useEffect } from "react";

const Home = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const handleSearch = (query: string) => {
        console.log(query);
        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            sender: "user",
            content: query,
            aiContent: null as any // Add this to fix the type error
        };
        setMessages(prev => [...prev, userMessage]);

        // Add AI message with typing effect
        setTimeout(() => {
            // 这里添加fake 的ai 回复
            const aiContent: AiResult = {
                title: "AI Result",
                answer: "This is a fake AI result",
                followUpQuestions: ["Question 1", "Question 2", "Question 3"],
                inline_images: [
                    {
                        "source":
                            "https://you.ctrip.com/travels/100021/3978335.html",
                        "thumbnail":
                            "https://serpapi.com/searches/682c56d797f1cc641cde68cd/images/73a8d98e72b88d88a3e0c8169812fda7ce0126615e90cd2880caa71fcc9bf0a0.jpeg",
                        "original":
                            "https://dimg04.c-ctrip.com/images/01065120008762oht6A82_W_640_0_Q90.jpg?proc=autoorient",
                        "title":
                            "评价泰国的10个品牌的咖啡，哪个品牌最好喝，让我们打开一起看 ...",
                        "source_name":
                            "you.ctrip.com - 携程"
                    },
                    {
                        "source":
                            "https://you.ctrip.com/travels/100021/3978335.html",
                        "thumbnail":
                            "https://serpapi.com/searches/682c56d797f1cc641cde68cd/images/73a8d98e72b88d8871c2626b2ef22cb6bde4db2110a1f5fa4b7a6eb7e0edf462.jpeg",
                        "original":
                            "https://dimg04.c-ctrip.com/images/0105i120008762dwx7B6D_W_640_0_Q90.jpg?proc=autoorient",
                        "title":
                            "评价泰国的10个品牌的咖啡，哪个品牌最好喝，让我们打开一起看 ...",
                        "source_name":
                            "you.ctrip.com - 携程"
                    },
                    {
                        "source":
                            "https://www.sayweee.com/zh/grocery-near-me/chinese-lang/explore/%E6%B3%B0%E5%9B%BD%E5%92%96%E5%95%A1",
                        "thumbnail":
                            "https://serpapi.com/searches/682c56d797f1cc641cde68cd/images/73a8d98e72b88d8879a24c1cdf4ad20f6c9b5c202930ea78c553de1deacb70f0.jpeg",
                        "original":
                            "https://img06.weeecdn.com/item/image/993/682/521C6C4AAA475C8C.jpeg!c750x0.jpeg",
                        "title":
                            "购买我附近的泰国咖啡免费送货",
                        "source_name":
                            "Weee!"
                    },
                    {
                        "source":
                            "https://zhuanlan.zhihu.com/p/496539673",
                        "thumbnail":
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNmds9t1PP2NN5REhNKL2kcbcs6Kcm_CgEmzRt0ACLWnZT9f3gDzOHgck&s",
                        "original":
                            "https://pic1.zhimg.com/v2-6a86e9540e1953e64f76f82563f0f09c_1440w.jpg",
                        "title":
                            "品尝10个泰国咖啡，到底哪个品牌好喝，哪个品牌不好喝呢？我们来 ...",
                        "source_name":
                            "知乎专栏"
                    },
                    {
                        "source":
                            "https://www.taobao.com/list/product/top-rated/%E6%B3%B0%E5%9B%BD%E5%92%96%E5%95%A1.htm",
                        "thumbnail":
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS34PGGj1SayLBeq2PxjokTqY3jTueVqR9AF_YSiln-V5ZR837WCZw2ClY&s",
                        "original":
                            "https://gw.alicdn.com/imgextra/i2/2601103972/O1CN01UjcCIX1fDEBzswqa4_!!2601103972.jpg_300x300Q75.jpg_.webp",
                        "title":
                            "泰国咖啡2025年5月-月销口碑最新推荐-Taobao",
                        "source_name":
                            "Taobao.com"
                    },
                    {
                        "source":
                            "https://search.suning.com/236s2.html",
                        "thumbnail":
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXY4K2ddeX2P985Z8pq2yUVPz853bKpuyZ0o55CmRY-QYlOSPUTZ55eno&s",
                        "original":
                            "https://imgservice1.suning.cn/uimg1/b2c/image/9wDL9mN3AvnpqdKh8GBHQA.jpg_300w_300h_4e",
                        "title":
                            "泰国咖啡价格_报价_促销_图片_多少钱-苏宁易购手机版",
                        "source_name":
                            "苏宁易购(Suning)"
                    },
                    {
                        "source":
                            "http://www.jd.com/chanpin/418208.html",
                        "thumbnail":
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIwn_Lbniipv4QRzQ1OvoPx-sKFqG7qzcYSH4WGp6m0hhJJhJtoGZ2ahw&s",
                        "original":
                            "http://img14.360buyimg.com/n7/jfs/t1/223875/11/29281/233514/66050221F8e7f847c/c554e32f93d0335f.jpg",
                        "title":
                            "泰国咖啡】价格_泰国咖啡图片- 京东",
                        "source_name":
                            "JD.com"
                    },
                    {
                        "source":
                            "https://www.sayweee.com/zh/grocery-near-me/chinese-lang/explore/%E6%B3%B0%E5%9B%BD%E5%92%96%E5%95%A1",
                        "thumbnail":
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYDCoClLWNfHzXhFYyHyZ90HH-zE6_Hz63wUX7utNN0qMiYj3NwkVnoSI&s",
                        "original":
                            "https://img06.weeecdn.com/item/image/802/963/54DC0AD1E883FE8A.png!c750x0.jpeg",
                        "title":
                            "购买我附近的泰国咖啡免费送货",
                        "source_name":
                            "Weee!"
                    },
                    {
                        "source":
                            "https://mobile-phone.taobao.com/chanpin/3160efaf5277fa4b5d0b52ef30f307f4.html",
                        "thumbnail":
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTUkN90CdIxKLM94mtQAKUXyCbq5JSZK7q2Cg1ew8tXk-l4xIogRJKdJM&s",
                        "original":
                            "https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/2217280099980/O1CN011IHydr2NatmWjiXuI_!!4611686018427385484-0-item_pic.jpg_360x360q90.jpg_.webp",
                        "title":
                            "泰国咖啡粉-泰国咖啡粉促销价格、泰国咖啡粉品牌- 淘宝",
                        "source_name":
                            "Taobao"
                    }
                ],
                original_results: [
                    {
                        "position":
                            1,
                        "title":
                            "东南亚咖啡之旅-泰国咖啡文化",
                        "link":
                            "https://zhuanlan.zhihu.com/p/654428994",
                        "redirect_link":
                            "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://zhuanlan.zhihu.com/p/654428994&ved=2ahUKEwituYuB6bGNAxUAvokEHQSWEfAQFnoECB4QAQ&usg=AOvVaw0l2Gp-LIJe2UjJhxjBOb7y",
                        "displayed_link":
                            "https://zhuanlan.zhihu.com › ...",
                        "thumbnail":
                            "https://serpapi.com/searches/682c56d797f1cc641cde68cd/images/b2f903e73642bb0740718557c2a00c7e3274153cbf05ddd165dd4a87ee74f6f8.jpeg",
                        "favicon":
                            "https://serpapi.com/searches/682c56d797f1cc641cde68cd/images/b2f903e73642bb0740718557c2a00c7e32d6270916634dd5fe17577d5e3f9409.png",
                        "snippet":
                            "泰国的大部分农业用地都用于咖啡种植，清迈被称为泰国的咖啡之都。 1. 泰国拥有丰富而充满活力的咖啡文化，历史跨越了几个世纪。 2. 该国提供多种咖啡 ...",
                        "snippet_highlighted_words":
                            [
                                "泰国",
                                "咖啡",
                                "泰国",
                                "咖啡",
                                "泰国",
                                "咖啡",
                                "咖啡"
                            ],
                        "source":
                            "知乎专栏"
                    },
                    {
                        "position":
                            3,
                        "title":
                            "购买我附近的泰国咖啡免费送货",
                        "link":
                            "https://www.sayweee.com/zh/grocery-near-me/chinese-lang/explore/%E6%B3%B0%E5%9B%BD%E5%92%96%E5%95%A1",
                        "redirect_link":
                            "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.sayweee.com/zh/grocery-near-me/chinese-lang/explore/%25E6%25B3%25B0%25E5%259B%25BD%25E5%2592%2596%25E5%2595%25A1&ved=2ahUKEwituYuB6bGNAxUAvokEHQSWEfAQFnoECCMQAQ&usg=AOvVaw3TSBI6ZnetnT8ekaeoaT51",
                        "displayed_link":
                            "https://www.sayweee.com › explore",
                        "thumbnail":
                            "https://serpapi.com/searches/682c56d797f1cc641cde68cd/images/b2f903e73642bb0740718557c2a00c7e26e15e0729fc5901c7a9a70f010ed3c9.jpeg",
                        "favicon":
                            "https://serpapi.com/searches/682c56d797f1cc641cde68cd/images/b2f903e73642bb0740718557c2a00c7e9f89f5043233f6c472435050fdfdbbe8.png",
                        "snippet":
                            "Weee!提供全美范围内的低门槛免运费服务。在线订购泰国咖啡，享受最快次日达的免接触送货上门服务。我们的平台不加价，通常会比普通零售店的价格更优惠。千万家庭信赖的Weee!",
                        "snippet_highlighted_words":
                            [
                                "泰国咖啡"
                            ],

                        "source":
                            "Weee!"
                    },
                ]
            };
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                sender: "ai",
                content: "",
                aiContent: aiContent,
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

        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    const handleQuestionClick = (question: string) => {
        console.log(question);
        handleSearch(question);
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
                    onQuestionClick={handleQuestionClick}
                />
            </div>

            <Searchbar onSearch={handleSearch} isLoading={false}  />

        </section>
    )
}

export default Home;

