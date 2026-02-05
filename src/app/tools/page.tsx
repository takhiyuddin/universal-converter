import Navbar from "../components/navbar";
import { Image as ImageIcon, Video, Music, FileText, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ToolsPage() {
    const tools = [
        {
            category: "Image Tools",
            icon: ImageIcon,
            description: "Convert, resize, and optimize images for web and print applications.",
            formats: "JPG, PNG, WEBP, SVG, GIF, TIFF",
            color: "text-purple-400",
        },
        {
            category: "Video Tools",
            icon: Video,
            description: "Transcode video files, extract audio tracks, and compress file sizes without quality loss.",
            formats: "MP4, MOV, MKV, AVI, WEBM",
            color: "text-blue-400",
        },
        {
            category: "Audio Tools",
            icon: Music,
            description: "Convert music formats and adjust bitrates/sample rates effortlessly.",
            formats: "MP3, WAV, AAC, FLAC, OGG",
            color: "text-pink-400",
        },
        {
            category: "Document Tools",
            icon: FileText,
            description: "Transform documents between portable (PDF) and editable formats.",
            formats: "PDF, DOCX, TXT, MD, RTF",
            color: "text-emerald-400",
        },
    ];

    return (
        <main className="min-h-screen bg-[#050505] selection:bg-white selection:text-black">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Available Tools
                    </h1>
                    <p className="text-neutral-500 max-w-2xl leading-relaxed">
                        Explore the capabilities of Universal File Converter. We support a wide range of popular formats tailored for both professional workflows and personal needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tools.map((tool, idx) => (
                        <div
                            key={idx}
                            className="group bg-neutral-900/30 border border-neutral-800 p-8 rounded-2xl hover:bg-neutral-900/50 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="bg-neutral-800 p-3 rounded-xl">
                                    <tool.icon className={`h-6 w-6 ${tool.color}`} />
                                </div>
                                <Link href="/" className="text-neutral-600 group-hover:text-white transition-colors">
                                    <ArrowUpRight className="h-5 w-5" />
                                </Link>
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-2">{tool.category}</h3>
                            <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                                {tool.description}
                            </p>

                            <div className="border-t border-neutral-800 pt-4">
                                <p className="text-xs text-neutral-500 font-mono uppercase tracking-wider mb-2">Supported Formats</p>
                                <p className="text-neutral-300 text-sm font-medium">{tool.formats}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}