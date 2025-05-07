import { useState } from "react"
import { Terminal as TerminalIcon, X } from "lucide-react"

/* Components */
import { Button } from "~/components/ui/button"

interface TerminalProps {
    setOpen: (open: boolean) => void
    setSearchQuery: (query: string) => void
    setSearchOpen: (open: boolean) => void
}

export default function Terminal({ setOpen, setSearchQuery, setSearchOpen }: TerminalProps) {
    const [terminalInput, setTerminalInput] = useState("")
    const [terminalOutput, setTerminalOutput] = useState([
        "PlotPond v1.0.2 Terminal (Current Infrastructure: Amadeus v0.1.0-alpha)",
        "Amadeus: Welcome to the PlotPond terminal. I am Amadeus, the Preview version of the Amadeus model.",
        "Amadeus: Type '/deus help' for available commands"
    ])

    // Handle terminal commands
    const handleTerminalSubmit = () => {
        type CommandResponse = string[] | null;
        type CommandFunction = (arg: string) => void;
        type Commands = {
            "/deus help": string[];
            clear: CommandFunction;
            exit: CommandFunction;
            navigate: CommandFunction;
            search: CommandFunction;
            [key: string]: string[] | CommandFunction;
        };

        const commands: Commands = {
            "/deus help": ["Amadeus: Available commands:", "- navigate [page] - Go to page", "- search [term] - Search for content", "- clear - Clear terminal", "- exit - Close terminal"],
            clear: () => setTerminalOutput([]),
            exit: () => setOpen(false),
            navigate: (arg: string) => {
                setTerminalOutput([...terminalOutput, `> navigate ${arg}`, `Amadeus: Redirecting to /${arg}...`])
                setTimeout(() => setOpen(false), 2000)
            },
            search: (arg: string) => {
                setTerminalOutput([...terminalOutput, `> search ${arg}`, `Amadeus: Searching for "${arg}"...`, "Amadeus: Results will be displayed on the main interface"])
                setSearchQuery(arg)
                setTimeout(() => {
                    setOpen(false)
                    setSearchOpen(true)
                }, 4000)
            }
        }

        // Process input
        const input = terminalInput.trim()
        const parts = input.split(" ")
        const cmd = parts?.[0] ?? "{ Error: input command failure... }".toLowerCase()
        const arg = parts.slice(1).join(" ")

        // Add the user command to the output first to avoid race conditions
        setTerminalOutput([...terminalOutput, `> ${terminalInput}`])

        // Handle the command
        if (input === "/deus help") {
            setTerminalOutput(prev => [...prev, ...commands["/deus help"]])
        } else if (commands[cmd]) {
            if (typeof commands[cmd] === 'function') {
                commands[cmd](arg)
            } else {
                setTerminalOutput(prev => [...prev, ...(commands[cmd] as string[])])
            }
        } else {
            setTerminalOutput(prev => [...prev,
            `Amadeus: Command not found: ${cmd}`,
                "Amadeus: Type '/deus help' for available commands"
            ])
        }

        setTerminalInput("")
    }

    // Handle key press for terminal input
    const handleTerminalKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleTerminalSubmit()
        }
    }

    return <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg"
    >
        <div
            className="bg-gray-900 border border-purple-900/50 rounded-lg w-full max-w-2xl mx-4 overflow-hidden shadow-xl shadow-purple-500/20"
        >
            <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
                <div className="flex items-center">
                    <TerminalIcon className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="text-sm font-mono text-gray-300">PlotPond Terminal</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-gray-400 hover:text-white"
                    onClick={() => setOpen(false)}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
            <div className="h-80 overflow-y-auto p-4 font-mono text-sm">
                <div>
                    {terminalOutput.map((line, index) => (
                        <div key={index} className={
                            line.startsWith(">")
                                ? "text-purple-300 mt-1"
                                : line.startsWith("Amadeus:")
                                    ? "text-cyan-400 mt-1"
                                    : "text-green-400"
                        }>
                            {line.startsWith("Amadeus:") ? line : line}
                        </div>
                    ))}
                </div>
                <div className="mt-2 flex items-center">
                    <span className="text-purple-400 mr-2">{">"}</span>
                    <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        onKeyPress={handleTerminalKeyPress}
                        className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                        autoFocus
                    />
                </div>
            </div>
            <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 border-t border-gray-700">
                Try commands: /deus help, navigate stories, search sci-fi, clear, exit
            </div>
        </div>
    </div>
}