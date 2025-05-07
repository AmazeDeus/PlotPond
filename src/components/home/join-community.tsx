import Link from "next/link"

export default function JoinCommunity() {
    return (
        <section className="py-20 container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Creative Community</h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-300 mb-10">
                Connect with storytellers and scenario creators from around the world. Share your imagination and explore
                endless possibilities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <Link
                    href="/login"
                    className="py-2 px-8 rounded-lg content-center bg-gradient-to-r from-purple-600 to-pink-600 hover:cursor-pointer hover:from-purple-700 hover:to-pink-700 text-white"
                >
                    Create Account
                </Link>
                <Link href="/explore" className="py-2 px-8 outline-1 rounded-lg content-center border-purple-600 text-purple-400 hover:cursor-pointer hover:bg-purple-600/10">
                    Explore Content
                </Link>
            </div>
        </section>
    )
} 