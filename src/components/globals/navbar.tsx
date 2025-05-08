import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Search, Terminal as TerminalIcon, Zap, User, BookOpen, Sparkles, BrainCircuit, Server, Github, PlusCircle, Map } from "lucide-react"

/* Components */
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import Terminal from "~/components/modals/terminal"

/* Utils */
import { debounce } from "~/lib/utils"

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [terminalOpen, setTerminalOpen] = useState(false)

    // Debounced scroll
    useEffect(() => {
        const handleScroll = debounce(() => {
            setScrolled(window.scrollY > 30)
        }, 100)

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Explore", href: "/explore", icon: <Map className="w-4 h-4 mr-2" /> },
        { name: "Stories", href: "/explore/stories", icon: <BookOpen className="w-4 h-4 mr-2" /> },
        { name: "Scenarios", href: "/explore/scenarios", icon: <BrainCircuit className="w-4 h-4 mr-2" /> },
        { name: "Community", href: "/community", icon: <User className="w-4 h-4 mr-2" /> },
        { name: "Resources", href: "/resources", icon: <Server className="w-4 h-4 mr-2" /> },
    ]

    return (
        <div className="relative z-50">
            {/* Main Navigation */}
            <nav
                className={`fixed z-60 top-0 left-0 right-0 transition-all duration-300 ${scrolled
                    ? "bg-black/80 backdrop-blur-lg border-b border-purple-900/30 shadow-lg shadow-purple-500/5"
                    : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="relative w-8 h-8 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg animate-pulse" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 group-hover:from-purple-300 group-hover:to-pink-400 transition-all duration-300">
                                PlotPond
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative px-3 py-2 mx-1 text-gray-300 hover:text-white group flex items-center text-sm font-medium"
                                >
                                    {link.icon}
                                    {link.name}
                                    <div
                                        className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"
                                    />
                                </Link>
                            ))}
                        </div>

                        {/* Right side buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Terminal Toggle */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTerminalOpen(true)}
                                className="text-gray-300 hover:cursor-pointer hover:text-white hover:bg-gray-800/50"
                            >
                                <TerminalIcon className="w-5 h-5" />
                            </Button>

                            {/* Search Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="text-gray-300 hover:cursor-pointer hover:text-white hover:bg-gray-800/50"
                            >
                                <Search className="w-5 h-5" />
                            </Button>

                            {/* Create Button */}
                            <Button
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:cursor-pointer hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg flex items-center space-x-1 transition-all duration-300 transform hover:scale-105"
                            >
                                <PlusCircle className="w-4 h-4 mr-1" />
                                Create
                            </Button>

                            {/* User Avatar */}
                            <Avatar className="h-8 w-8 border-2 border-purple-500/30 hover:border-purple-400 transition-all duration-200 cursor-pointer">
                                <AvatarImage src="/placeholder_avatar.png" alt="User" />
                                <AvatarFallback className="bg-gray-800 text-purple-400">U</AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center space-x-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTerminalOpen(true)}
                                className="text-gray-300 hover:cursor-pointer hover:text-white"
                            >
                                <TerminalIcon className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-300 hover:cursor-pointer hover:text-white"
                            >
                                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-50 pt-16 bg-black/95 backdrop-blur-md">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                            <div className="border-t border-gray-800 my-2 pt-2">
                                <Button
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    <span>Create New Story</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Overlay */}
            {searchOpen && (
                <div
                    className="fixed inset-0 z-50 pt-16 bg-black/90 backdrop-blur-lg"
                >
                    <div className="container mx-auto px-4 py-8">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for stories, scenarios, or users..."
                                className="w-full py-3 pl-10 pr-4 text-white bg-gray-900/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                onClick={() => setSearchOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Search Results Placeholder */}
                        <div className="mt-8 text-center text-gray-400">
                            {searchQuery ? (
                                <p>Start typing to search for "{searchQuery}"</p>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <Zap className="h-10 w-10 text-purple-500 mb-3" />
                                    <p>Type to start searching</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Terminal Overlay */}
            {terminalOpen && <Terminal setOpen={setTerminalOpen} setSearchQuery={setSearchQuery} setSearchOpen={setSearchOpen} />}
        </div>
    )
}