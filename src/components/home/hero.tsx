import Image from "next/image"
import { ChevronRight } from "lucide-react"

/* Components */
import { Button } from "~/components/ui/button"

export default function Hero() {
    return (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/banner_template.png"
                    alt="Hero background"
                    fill
                    className="object-cover opacity-40 object-bottom"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
            </div>
            <div className="container relative z-10 px-4 mx-auto text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl p-4 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    PlotPond
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-gray-300 mb-8">
                    Join a community where stories come to life and imagination knows no bounds.
                </p>
                <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:cursor-pointer hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full group"
                >
                    Get Started <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </section>
    )
} 