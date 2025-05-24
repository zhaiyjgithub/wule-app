'use client'

import Searchbar from "../../../components/Searchbar";
import { AiResult, Message } from "../../../components/ChatComponent";
import ChatComponent from "../../../components/ChatComponent";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    // fetch data from api
    const fetchData = async (question: string) => {
        console.log("fetchData...");
        setIsLoading(true);
        try {
            const response = await axios.post('/api/ask',
                { question: question },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: 300000 // 5分钟超时
                }
            );
            const data = response.data;
            console.log(data);
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    const handleSearch = async (query: string) => {
        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            sender: "user",
            content: query,
            aiContent: null as any // Add this to fix the type error
        };
        setMessages(prev => [...prev, userMessage]);

        const apiResult = await fetchData(query);
        if (!apiResult) {
            return;
        }
        // const apiResult = {
        //     "answer": "英国第一季度经济环比增长0.7%，超出市场预期，主要得益于服务业和制造业的强劲表现。服务业增长范围广泛，包括批发、零售、交通、计算机编程等领域，而制造业则受到汽车和机械制造的推动。然而，这种增长势头可能难以持续，因为建筑业未见增长，且美国加征关税的影响将在第二季度显现。此外，英国国内的国民保险税率上调、最低工资上涨和社会服务价格上涨等因素也可能抑制未来的经济增长。多家经济研究机构已下调英国全年经济增长预期至1%左右。尽管如此，英国政府正试图通过产业战略和基础设施规划来刺激经济，同时加强与欧盟的贸易关系被视为重要方向。未来几个月，英国需应对内外部压力，包括关税战、就业成本上升及全球经济的不确定性。",
        //     "follow_up_questions": [
        //         "英国第一季度经济增长的主要驱动力是什么?",
        //         "美国加征关税对英国经济的具体影响何时显现?",
        //         "英国政府采取了哪些措施来推动经济增长?",
        //         "为什么多家研究机构认为英国经济增速不可持续?",
        //         "英国与欧盟加强贸易关系的背景和意义是什么?"
        //     ],
        //     "error": null,
        //     "inline_images": [
        //         {
        //             "source": "https://finance.sina.com.cn/stock/hkstock/ggscyd/2025-04-11/doc-inesusvu1575766.shtml",
        //             "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4C5XUfX-liSE1F_L_X-JeG1SyYsUvHoa1bei_MqUkfzSmaEFDo33iYNU&s",
        //             "original": "https://n.sinaimg.cn/sinakd20250411s/561/w786h575/20250411/fd9a-1b618d1adaa24bee90f73b66e3b0bf58.png",
        //             "title": "英国经济意外反弹2月GDP增长0.5%超预期",
        //             "source_name": "新浪财经"
        //         },
        //         {
        //             "source": "https://news.qq.com/rain/a/20250515A066XJ00",
        //             "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR43VYROENzXb1s4wLdEvdepHwnIlGxLdGmPJOjpg1nmTOJwotvfCZmhVQ&s",
        //             "original": "https://inews.gtimg.com/om_bt/ObTdlhphazoXdjVEU0Fqe2AUGbpaoqg8ypiEQ82gLyLp0AA/641",
        //             "title": "英国经济实现一年最强季度增长未来前景仍不乐观-腾讯新闻",
        //             "source_name": "腾讯新闻"
        //         },
        //         {
        //             "source": "https://www.hawkinsight.com/article/BBu4e",
        //             "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIw7W1jNibxRQikVw34GwJvzbifp6uZro5ra_PFbEJcD1Vce9vNz9JfYM&s",
        //             "original": "https://www.tradingpedia.com/wp-content/uploads/2025/05/Screenshot-from-2025-05-15-09-24-10.webp",
        //             "title": "英国GDP第一季度增长0.7%，英镑/美元上涨0.3%英国GDP第一季度 ...",
        //             "source_name": "Hawk Insight"
        //         },
        //         {
        //             "source": "http://www.shangbaoindonesia.com/read/2025/05/15/berita-luar-negeri-1747323388",
        //             "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ91S7Gz3R8xzxiLkiF4n2SoMoFxS4q70hewZ25NFQ94JOWmbpcjb53DtY&s",
        //             "original": "https://sb-a16y6q7k5z00x2.s3.ap-southeast-1.amazonaws.com/news_images/47/82005/1.jpg",
        //             "title": "英国一季度GDP环比增长0.7% - Shangbao Indonesia",
        //             "source_name": "Shangbao Indonesia"
        //         },
        //         {
        //             "source": "https://www.moomoo.com/hans/news/post/53076288/the-united-kingdom-s-economy-achieved-its-strongest-quarterly-growth",
        //             "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2bHh4TI5XEBG8Pspi77kVmtwJO8Y69-by9ZWPrx0HqPZdKm7h6h0rDbA&s",
        //             "original": "https://usnewsfile.moomoo.com/public/MM-PersistNewsContentImage/7781/20250515/0-f48fb4fad8fd021ba8892a3a9620e3b1-1-f255b37f101c03a504fe99141f9b90d2.png/big",
        //             "title": "英国经济实现一年最强季度增长未来前景仍不乐观",
        //             "source_name": "Moomoo"
        //         },
        //         {
        //             "source": "https://www.zaobao.com.sg/realtime/world/story20250430-6271529",
        //             "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2reAgREYsjS7rgiXF4Y87-MfNpvSeTcNx5tRHYS1TAzfg1a-8l6XRK4c&s",
        //             "original": "https://cassette.sphdigital.com.sg/image/zaobao/dbbc9877c982d279c3a3f614982a9b94db837a999f89ad858e6c060af09fd083",
        //             "title": "美国第一季度经济环比萎缩0.3% | 联合早报",
        //             "source_name": "联合早报"
        //         },
        //         {
        //             "source": "https://zh.tradingeconomics.com/united-kingdom/gdp-growth-annual",
        //             "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToi16YUxLzgv5wONfn6lvYslTEKB-oZq0HFwuU92kvIvX2UwNIl1vCcvM&s",
        //             "original": "https://d3fy651gv2fhd3.cloudfront.net/charts/united-kingdom-gdp-growth-annual.png?s=ukgrybzy&v=202505150714V20230410&lang=all&h=400&w=640&lbl=0&ismobile=1",
        //             "title": "英国- 国内生产总值年增长率| 1956-2025 数据| 2026-2027 预测",
        //             "source_name": "经济指标"
        //         },
        //         {
        //             "source": "https://www.yicai.com/news/102472878.html",
        //             "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbYFLvYPnRMAzG3ZRwKwBkGfgdK5NYvQUsiHIE3Qf_1c4Ffkt-3pQRMyo&s",
        //             "original": "https://imgcdn.yicai.com/vms-new/2025/02/999e8e3a-b294-45d2-8100-04e8a12a16a8_fPHk.jpg",
        //             "title": "英智库：预计今年英国经济增长1.5%，特朗普关税将带来负面影响",
        //             "source_name": "第一财经"
        //         },
        //         {
        //             "source": "https://www.etnet.com.hk/mobile/tc/news/topic_news_detail.php?newsid=153541&category=special",
        //             "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFTuGAszwb0Zr-xqOqubHUgBEb4w7ncTHBjhFDHFBaOdWEVKQ-VzCIrL0&s",
        //             "original": "https://img.etnet.com.hk/column/images/stories/368/2025/04/tht20250430.jpg",
        //             "title": "經濟數據| 英國2025年首季GDP增長0.7%，優於預期- 新聞- etnet ...",
        //             "source_name": "etnet 經濟通"
        //         }
        //     ],
        //     "organic_results": [
        //         {
        //             "position": 1,
        //             "title": "英国一季度经济环比增长0.7%",
        //             "link": "https://finance.sina.com.cn/jjxw/2025-05-15/doc-inewrzcv9339109.shtml?froms=ggmp",
        //             "snippet": "5月15日英国家统计局公布，今年第一季度英国内生产总值环比增长0.7%超预期。其中服务业环比增长0.7%，制造业环比增长1.1%，建筑业环比持平。3月经济环比 ...",
        //             "displayLink": "https://finance.sina.com.cn › jjxw",
        //             "date": "4 days ago",
        //             "source": "新浪财经",
        //             "favicon": "https://serpapi.com/searches/682b2badfda6074a8e9f5808/images/4dac903a18300d91bb0706214ee8f1a76af078e169cc79d5e536273163fca236.jpeg"
        //         },
        //         {
        //             "position": 2,
        //             "title": "英国一季度经济增速超预期，但不可持续成共识",
        //             "link": "https://www.custeel.com/reform/view.mv?group=&articleID=7962456",
        //             "snippet": "英国国家统计局15日公布的数据显示，今年第一季度英国经济环比实现0.7%的增长。 此前已经公布的数据显示，1月份，英国经济零增长，2月份经济增长0.5%。 此前 ...",
        //             "displayLink": "https://www.custeel.com › view",
        //             "date": "3 days ago",
        //             "source": "中国联合钢铁网",
        //             "favicon": "https://serpapi.com/searches/682b2badfda6074a8e9f5808/images/4dac903a18300d91bb0706214ee8f1a7b7f2e8b259eeb39ad6d292759f906657.png"
        //         },
        //         {
        //             "position": 3,
        //             "title": "英国第一季度经济增长超预期；GDP增长0.7%",
        //             "link": "https://cn.investing.com/news/economic-indicators/article-2807730",
        //             "snippet": "英国国家统计局周四早些时候发布的数据显示，2025年1月至3月期间，英国国内生产总值增长0.7%，相比2024年10月至12月期间仅0.1%的微弱增长有显著提升，且高于 ...",
        //             "displayLink": "https://cn.investing.com › news",
        //             "date": "4 days ago",
        //             "source": "英为财情 Investing.com",
        //             "favicon": "https://serpapi.com/searches/682b2badfda6074a8e9f5808/images/4dac903a18300d91bb0706214ee8f1a7747215428f8da3ab85855a14952ce24a.jpeg"
        //         },
        //         {
        //             "position": 4,
        //             "title": "英国2025年第一季度国内生产总值环比增长0.7%",
        //             "link": "https://hqtime.huanqiu.com/article/4MghT4ow9Nx",
        //             "snippet": "当地时间5月15日，英国国家统计局公布的最新数据显示，英国2025年第一季度国内生产总值环比增长0.7%。（总台记者陈林聪）.",
        //             "displayLink": "https://hqtime.huanqiu.com › article",
        //             "date": "4 days ago",
        //             "source": "环球网",
        //             "favicon": "https://serpapi.com/searches/682b2badfda6074a8e9f5808/images/4dac903a18300d91bb0706214ee8f1a7c8a4f030c1c465ecf4ade41f363f2568.png"
        //         }
        //     ]
        // }
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

