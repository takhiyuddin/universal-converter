import Link from "next/link";
import { Home, Wrench, Github } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-neutral-800 bg-[#050505]/80 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo Wordmark */}
                <div className="flex items-center">
                    <Link href="/" className="text-lg font-bold tracking-tight text-white hover:text-neutral-300 transition-colors">
                        Universal File Converter
                    </Link>
                </div>

                {/* Icons Navigation - Jarak dirapatkan (gap-2) */}
                <div className="hidden md:flex items-center gap-2">
                    <Link
                        href="/"
                        className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-full transition-all"
                        aria-label="Home"
                    >
                        <Home className="h-5 w-5" />
                    </Link>

                    <Link
                        href="/tools"
                        className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-full transition-all"
                        aria-label="Tools"
                    >
                        <Wrench className="h-5 w-5" />
                    </Link>

                    <Link
                        href="/github"
                        className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-full transition-all"
                        aria-label="GitHub & Tech"
                    >
                        <Github className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}