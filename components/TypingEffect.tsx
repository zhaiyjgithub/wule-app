import React, { useState, useEffect } from "react";

interface TypingEffectProps {
  text: string;
  onComplete?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  // 重置文本内容当输入变化时
  useEffect(() => {
    setDisplayedText(""); // 重置显示文本
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1)); // 使用substring而不是追加
        i++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, 50); // 控制打字速度

    return () => clearInterval(interval);
  }, [text]);

  return <p className="text-white pr-2">{displayedText}</p>;
};

export default TypingEffect;
