"use client";
import { useState, useEffect, useRef } from "react";
import Typewriter from "@/components/Typewriter";

interface CommandHistory {
  command: string;
  output: string | React.ReactNode;
}

const WELCOME_BANNER = `

░██╗░░░░░░░██╗███████╗██╗░░░░░░█████╗░░█████╗░███╗░░░███╗███████╗
░██║░░██╗░░██║██╔════╝██║░░░░░██╔══██╗██╔══██╗████╗░████║██╔════╝
░╚██╗████╗██╔╝█████╗░░██║░░░░░██║░░╚═╝██║░░██║██╔████╔██║█████╗░░
░░████╔═████║░██╔══╝░░██║░░░░░██║░░██╗██║░░██║██║╚██╔╝██║██╔══╝░░
░░╚██╔╝░╚██╔╝░███████╗███████╗╚█████╔╝╚█████╔╝██║░╚═╝░██║███████╗
░░░╚═╝░░░╚═╝░░╚══════╝╚══════╝░╚════╝░░╚════╝░╚═╝░░░░░╚═╝╚══════╝
                                                              
Terminal Portfolio v1.0.0 - Type '<span class="text glow-text">help</span>' for available commands
==========================================================`;

export default function Home() {
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [sessionStarting, setSessionStarting] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: (
      <div className="ml-4 py-2 whitespace-pre">
        <Typewriter
          html
          text={[
            '<span class="glow-text">help</span>           You obviously already know what this does',
            '<span class="glow-text">whois</span>          Who is Merich?',
            '<span class="glow-text">whoami</span>         Who are you?',
            '<span class="glow-text">social</span>         Display social networks',
            '<span class="glow-text">projects</span>       View coding projects',
            '<span class="glow-text">history</span>        View command history',
            '<span class="glow-text">email</span>          Do not email me',
            '<span class="glow-text">clear</span>          Clear terminal',
          ].join("\n")}
          delay={20}
        />
      </div>
    ),

    whois: (
      <div className="ml-4 py-2 whitespace-pre">
        <Typewriter
          text={[
            "Hey there! I'm Merich 👋",
            "",
            "I'm a Physicist turned Software Engineer passionate about learning and creating innovative solutions.",
            "Currently working on projects and exploring new technologies.",
            "I like to call myself a 'Jack of all trades, master of some'.",
            "",
            "Type 'projects' to see what I've been working on!",
          ].join("\n")}
          delay={30}
        />
      </div>
    ),

    whoami: (
      <div className="ml-4 py-2 whitespace-pre">
        <Typewriter
          text={[
            "The paradox of Who am I is: we never know, but, we constantly find out.",
            "But to me you are a guest user browsing my portfolio.",
            "Feel free to explore using the available commands!",
          ].join("\n")}
          delay={30}
        />
      </div>
    ),

    social: (
      <div className="ml-4 py-2 whitespace-pre">
        <Typewriter
          html
          text={[
            '→ <a href="https://github.com/mgulfiliz" target="_blank" class="glow-text">GitHub</a>',
            '→ <a href="https://linkedin.com/in/mgulfiliz" target="_blank" class="glow-text">LinkedIn</a>',
            '→ <a href="https://twitter.com/mgulfiliz" target="_blank" class="glow-text">Twitter</a>',
          ].join("\n")}
          delay={25}
        />
      </div>
    ),

    projects: (
      <div className="ml-4 py-2 whitespace-pre">
        <Typewriter
          html
          text={[
            '→ <span class="glow-text">Terminal Portfolio</span> - This website you\'re currently viewing',
            "   A terminal-styled portfolio built with Next.js and TypeScript",
            "",
            '→ <span class="glow-text">Project Two</span> - Still curating... most projects are offline, on GitHub, or confidential.',
            "",
          ].join("\n")}
          delay={25}
        />
      </div>
    ),

    history: (
      <div className="ml-4 py-2 whitespace-pre">
        <Typewriter
          text={commandHistory.map((item) => item.command).join("\n")}
          delay={20}
        />
      </div>
    ),

    email: (
      <div className="ml-4 py-2 whitespace-pre">
        <Typewriter
          text={[
            "I specifically said not to email me! 😄",
            "But since you insist: your@email.com",
          ].join("\n")}
          delay={30}
        />
      </div>
    ),
  };

  const handleCommand = (cmd: string) => {
    const normalizedCmd = cmd.toLowerCase().trim();

    if (normalizedCmd === "clear") {
      setCommandHistory([]);
      return;
    }

    let output: string | React.ReactNode = (
      <Typewriter
        text="Command not found. Type 'help' for available commands."
        delay={30}
      />
    );

    if (normalizedCmd in commands) {
      output = commands[normalizedCmd as keyof typeof commands];
    }

    setCommandHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [commandHistory]);

  return (
    <div className="min-h-screen terminal-theme p-2 sm:p-4 font-mono">
      <div ref={containerRef} className="h-[90vh] sm:h-[95vh] overflow-y-auto">
        <div className="mb-4">
          <pre
            className="text-terminal-text mb-4 hidden sm:block"
            dangerouslySetInnerHTML={{ __html: WELCOME_BANNER }}
          />
          <div className="text-terminal-text mb-4 sm:hidden">
            <h1 className="text-xl font-bold mb-2">
              Welcome to Terminal Portfolio
            </h1>
            <p>Type 'help' for available commands</p>
          </div>
          <div className="mb-2">
            <Typewriter
              text={`Last login: ${new Date().toLocaleString()}`}
              delay={50}
              onComplete={() => {
                setShowPrompt(true);
              }}
            />
          </div>
          {showPrompt && sessionStarting && (
            <div className="mb-2">
              <Typewriter
                text="Starting terminal session..."
                delay={30}
                onComplete={() => {
                  setTimeout(() => {
                    setSessionStarting(false);
                  }, 1000);
                }}
              />
            </div>
          )}
          {showPrompt && !sessionStarting && (
            <div className="mb-2">
              <Typewriter
                text="Terminal ready. Type 'help' to see available commands."
                delay={30}
              />
            </div>
          )}
        </div>

        {commandHistory.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="terminal-prompt flex flex-wrap">
              <span className="terminal-prompt-user">guest</span>
              <span className="terminal-prompt-at">@</span>
              <span className="terminal-prompt-host">portfolio</span>
              <span className="terminal-prompt-colon">:</span>
              <span className="terminal-prompt-path">~</span>
              <span className="terminal-prompt-symbol">$ {item.command}</span>
            </div>
            <div className="mt-1 break-words">{item.output}</div>
          </div>
        ))}

        {showPrompt && !sessionStarting && (
          <form
            onSubmit={handleSubmit}
            className="terminal-prompt flex flex-wrap"
          >
            <span className="terminal-prompt-user">guest</span>
            <span className="terminal-prompt-at">@</span>
            <span className="terminal-prompt-host">portfolio</span>
            <span className="terminal-prompt-colon">:</span>
            <span className="terminal-prompt-path">~</span>
            <span className="terminal-prompt-symbol">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none ml-2 text-terminal-text w-full sm:w-auto"
              autoFocus
            />
          </form>
        )}
      </div>
    </div>
  );
}
