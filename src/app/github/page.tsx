import Navbar from "../components/navbar";
import { Github, Code2, Server, Globe } from "lucide-react";
import Link from "next/link";

export default function GithubPage() {
    return (
        <main className="min-h-screen bg-[#050505] selection:bg-white selection:text-black">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-white p-3 rounded-full">
                        <Github className="h-8 w-8 text-black" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Project Information</h1>
                        <p className="text-neutral-500">Open Source & Tech Stack Documentation</p>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-12">

                    {/* Section: About */}
                    <section>
                        <p className="text-neutral-300 leading-relaxed text-lg">
                            Universal File Converter is a modern web project designed to simplify the process of digital media manipulation. Built with a strong focus on performance, a clean user interface, and data privacy.
                        </p>
                    </section>

                    {/* Section: Tech Stack */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <Code2 className="h-5 w-5 text-blue-400" /> Technology Stack
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30">
                                <div className="text-white font-medium mb-1">Next.js 14</div>
                                <div className="text-neutral-500 text-sm">App Router & Server Actions</div>
                            </div>
                            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30">
                                <div className="text-white font-medium mb-1">TypeScript</div>
                                <div className="text-neutral-500 text-sm">Type-safe Codebase</div>
                            </div>
                            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30">
                                <div className="text-white font-medium mb-1">Tailwind CSS</div>
                                <div className="text-neutral-500 text-sm">Utility-first Styling</div>
                            </div>
                            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30">
                                <div className="text-white font-medium mb-1">Framer Motion</div>
                                <div className="text-neutral-500 text-sm">Smooth UI Animations</div>
                            </div>
                        </div>
                    </section>

                    {/* Section: Architecture */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <Server className="h-5 w-5 text-purple-400" /> Architecture
                        </h2>
                        <div className="prose prose-invert prose-neutral max-w-none">
                            <p className="text-neutral-400 text-sm leading-7">
                                This application utilizes a <strong>Hybrid Rendering</strong> approach.
                                The user interface is server-rendered for optimal initial load speed (SSR),
                                while heavy file conversion logic is handled client-side using WebAssembly (WASM)
                                or via serverless API routes to ensure user data security and scalability.
                            </p>
                        </div>
                    </section>

                    {/* Call to Action */}
                    <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 text-center">
                        <h3 className="text-white font-semibold text-lg mb-2">Interested in the code?</h3>
                        <p className="text-neutral-500 text-sm mb-6">
                            View the source code, contribute, or give a star to this repository.
                        </p>
                        <Link
                            href="https://github.com/your-username/your-repo"
                            target="_blank"
                            className="inline-flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-medium text-sm hover:bg-neutral-200 transition-colors"
                        >
                            <Github className="h-4 w-4" />
                            View on GitHub
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}