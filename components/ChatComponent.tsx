import TypingEffect from "./TypingEffect";

export interface Message {
    id: string;
    sender: "user" | "ai"; // 用 sender 区分消息来源
    content: string;
    isTyping?: boolean;
  }

interface ChatComponentProps {
  messages: Message[];
  onTypingEnd?: (messageId: string) => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ messages, onTypingEnd }) => {
    return (
      <div className="w-full flex flex-col gap-2 items-start gap-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="w-full">
            {msg.sender === "ai" ? (
              <TypingEffect 
                text={msg.content} 
                onComplete={() => {
                  console.log("Typing ended");
                  if (onTypingEnd) {
                    onTypingEnd(msg.id);
                  }
                }} 
              />
            ) : (
              <div className="flex items-center justify-end">
                {/* rgb: 38 38 38 */}
                <p className="bg-[#262626] text-white py-2 px-4 rounded-2xl max-w-[80%]">{msg.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  export default ChatComponent;

  