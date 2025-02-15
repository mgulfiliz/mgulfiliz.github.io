"use client";
import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
  html?: boolean;
}

const Typewriter = ({
  text,
  delay = 50,
  onComplete,
  html = false,
}: TypewriterProps) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  if (html) {
    return (
      <span
        className="inline-block"
        dangerouslySetInnerHTML={{
          __html:
            currentText +
            (currentIndex < text.length ? '<span class="cursor">▋</span>' : ""),
        }}
      />
    );
  }

  return (
    <span className="inline-block">
      {currentText}
      {currentIndex < text.length && <span className="cursor">▋</span>}
    </span>
  );
};

export default Typewriter;
