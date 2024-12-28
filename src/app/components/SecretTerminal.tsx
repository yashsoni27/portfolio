"use client";
import { useState, useEffect } from "react";
import { siteSettings, techContent } from "@/data/content";
import { useEasterEggs } from '../context/EasterEggContext';

// Enhanced types
type CommandHistory = {
  command: string;
  timestamp: Date;
};

type Command = {
  description: string;
  action: (args?: string[]) => string | void;
};

type Commands = {
  [key: string]: Command;
};

export default function SecretTerminal() {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const { markDiscovered } = useEasterEggs();

  // Enhanced commands
  const commands: Commands = {
    help: {
      description: "Shows available commands",
      action: () => "Available commands: \n" + Object.keys(commands).join("\n"),
    },
    about: {
      description: "About this terminal",
      action: () =>
        "Hi! I'm a secret terminal in this portfolio... currently under construction!!!",
    },
    skills: {
      description: "Lists technical skills",
      // action: () => `JavaScript, TypeScript, React, Next.js, Node.js, etc.`
      action: () =>
        `These are some of the techincal skills that I use:${techContent.tech.map(
          (item, index) => {
            return `\n${item.name}`;
          }
        )}`,
    },
    contact: {
      description: "Shows contact information",
      action: () => `Email: ${siteSettings.socialLinks.email}`,
    },
    clear: {
      description: "Clears the terminal",
      action: () => {
        setOutput([]);
        // return "Terminal cleared";
      },
    },
    echo: {
      description: "Repeats the given text",
      action: (args) => args ? args.join(' ') : "Nothing to echo!"
    },
    time: {
      description: "Shows current time",
      action: () => new Date().toLocaleString()
    },
    banner: {
      description: "Displays welcome message",
      action: () => `
      ╔════════════════════════════════════════╗
      ║        Welcome to Secret Terminal      ║
      ║     Type 'help' to see all commands    ║
      ╚════════════════════════════════════════╝`
    },
    history: {
      description: "Shows command history",
      action: () => {
        if (commandHistory.length === 0) return "No commands in history";
        return commandHistory
          .map(h => `${h.timestamp.toLocaleTimeString()}: ${h.command}`)
          .join('\n');
      }
    }
  };

  // Add initial banner
  useEffect(() => {
    if (visible) {
      handleCommand('banner');
    }
  }, [visible]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const [command, ...args] = trimmedCmd.toLowerCase().split(' ');
    const commandOutput = [`> ${cmd}`];

    // Add to history
    setCommandHistory(prev => [...prev, { command: trimmedCmd, timestamp: new Date() }]);
    setHistoryIndex(-1);

    if (command in commands) {
      const result = commands[command].action(args);
      if (result) commandOutput.push(result);
    } else {
      commandOutput.push('Command not found. Type "help" for available commands.');
    }

    setOutput(prev => [...prev, ...commandOutput]);
  };

  // Handle command history navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex].command);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex].command);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      // Changed to backtick key for easier testing
      if (e.ctrlKey && e.key === "`") {
        console.log("Secret Terminal visible now");
        setVisible((v) => !v);
        markDiscovered('terminal');
        setOutput([]);
      }
    };

    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 right-0 w-full h-full bg-black/95 text-green-500 p-4 font-mono text-lg overflow-auto z-50">
      <div className="mb-2 ml-5">
        Secret Terminal (Press Ctrl + ` to toggle)
      </div>
      <div className="overflow-y-auto mb-2 ml-7">
        {output.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center ml-7">
        <span>{">"}</span>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none ml-2 text-green-500"
          autoFocus
        />
      </div>
    </div>
  );
}
