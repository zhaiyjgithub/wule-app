import FollowUpQuestionList from "./FollowUpQuestionList";
import ReferenceList, { Reference } from "./ReferenceList";
import TypingEffect from "./TypingEffect";
import InlineImageList from "./InlineImageList";
import Sticky from "react-sticky-el";

export interface InlineImage {
    source: string;
    thumbnail: string;
    original: string;
    title: string;
    source_name: string;
}

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
    sender: "user" | "ai";
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
                    <div key={msg.id} className="w-full min-h-full">
                        {msg.sender === "ai" ? (
                            <div className="w-full flex flex-col items-start gap-y-8 border-b border-white/10 z-10 pb-4 content-layer">
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
                            <div className="sticky-wrapper">
                                <Sticky scrollElement=".scrollarea">
                                    <div className="flex items-center justify-start py-4 border-b border-white/10 z-50 bg-[#202020] sticky-header">
                                        <p className=" text-3xl text-white py-2 rounded-2xl max-w-[80%]">{msg.content}</p>
                                    </div>
                                </Sticky>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    );
};

export default ChatComponent;

