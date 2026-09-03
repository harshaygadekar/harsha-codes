"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: 0.4 });
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.22,
          delay: stagger(0.045),
          ease: "easeInOut",
        },
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <span key={`word-${idx}`} className="inline-block whitespace-pre">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    // Inherit from parent so theme (light/dark) + heading color win
                    "hidden text-inherit opacity-0",
                    word.className,
                  )}
                >
                  {char}
                </motion.span>
              ))}
              {idx < wordsArray.length - 1 ? (
                <span className="inline-block">&nbsp;</span>
              ) : null}
            </span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        // Neutral defaults — size/weight/alignment come from the call site
        "inline-flex items-baseline text-left font-medium",
        className,
      )}
    >
      {renderWords()}
      {/* Space between final character and caret so the cursor doesn't sit flush on the last letter */}
      <span className="inline-block whitespace-pre" aria-hidden>
        {"  "}
      </span>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block h-[0.95em] w-[2px] shrink-0 translate-y-[0.08em] rounded-[1px] bg-foreground/55",
          cursorClassName,
        )}
        aria-hidden
      />
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <span key={`word-${idx}`} className="inline-block whitespace-pre">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn("text-inherit", word.className)}
                >
                  {char}
                </span>
              ))}
              {idx < wordsArray.length - 1 ? (
                <span className="inline-block">&nbsp;</span>
              ) : null}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("inline-flex items-baseline space-x-1", className)}>
      <motion.div
        className="overflow-hidden pb-0.5"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1.4,
          ease: "linear",
          delay: 0.15,
        }}
      >
        <div
          className="font-medium"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}
        </div>
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block h-[0.95em] w-[2px] shrink-0 translate-y-[0.08em] rounded-[1px] bg-foreground/55",
          cursorClassName,
        )}
        aria-hidden
      />
    </div>
  );
};
