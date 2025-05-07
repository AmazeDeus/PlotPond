import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-gray-950 py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">PlotPond</h3>
                        <p className="text-gray-400">Where imagination becomes reality.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Explore</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-purple-400">
                                    Stories
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-purple-400">
                                    Scenarios
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-purple-400">
                                    Creators
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-purple-400">
                                    Categories
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-purple-400">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-purple-400">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-purple-400">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-purple-400">
                                    Press
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-purple-400">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-purple-400">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-purple-400">
                                    Content Guidelines
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-purple-400">
                                    Copyright
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
                    <p>© {new Date().getFullYear()} PlotPond. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
} 