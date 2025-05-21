import FollowUpQuestionList from "./FollowUpQuestionList";
import ReferenceList, { Reference } from "./ReferenceList";
import TypingEffect from "./TypingEffect";
import InlineImageList from "./InlineImageList";

/*
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
*/

export interface InlineImage {
    source: string;
    thumbnail: string;
    original: string;
    title: string;
    source_name: string;

}

/*
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
*/

export interface OriginalResult {
    title: string;
    link: string;
    favicon: string;
    snippet: string;
    source: string;
}

export interface AiResult {
    title: string;
    answer: string;
    followUpQuestions: string[];
    inline_images: InlineImage[];
    original_results: OriginalResult[];
}

export interface Message {
    id: string;
    sender: "user" | "ai"; // 用 sender 区分消息来源
    content: string;
    aiContent: AiResult;
    isTyping?: boolean;
}

interface ChatComponentProps {
    messages: Message[];
    onTypingEnd?: (messageId: string) => void;
    onQuestionClick?: (question: string) => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ messages, onTypingEnd, onQuestionClick }) => {
    return (
        <div className="w-full flex flex-col gap-2 items-start gap-y-4">
            {messages.map((msg) => {
                const references: Reference[] = msg.sender === "ai" ? msg.aiContent.original_results.slice(0, 4).map((result) => ({
                    icon: result.favicon,
                    title: result.title,
                    snippet: result.snippet,
                    link: result.link
                })) : [];
                return (
                    <div key={msg.id} className="w-full">
                        {msg.sender === "ai" ? (
                            <div className="w-full flex flex-col items-start gap-y-8 pb-4 border-b border-white/10">
                                <div className="w-full flex flex-col items-start gap-y-4">
                                    <ReferenceList references={references} />
                                    {msg.aiContent?.inline_images?.length > 0 && (
                                        <InlineImageList
                                            images={msg.aiContent.inline_images}
                                            onImageClick={(image) => window.open(image.source, '_blank')}
                                        />
                                    )}
                                </div>
                                <TypingEffect
                                    text={msg.aiContent.answer}
                                    onComplete={() => {
                                        console.log("Typing ended");
                                        if (onTypingEnd) {
                                            onTypingEnd(msg.id);
                                        }
                                    }}
                                />
                                {!msg.isTyping && <FollowUpQuestionList questions={msg.aiContent.followUpQuestions} onQuestionClick={onQuestionClick} />}
                            </div>
                        ) : (
                            <div className="flex items-center justify-start pt-8 pb-4">
                                <p className=" text-3xl text-white py-2 rounded-2xl max-w-[80%]">{msg.content}</p>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    );
};

export default ChatComponent;

