"use client";

import { useState } from "react";
import ReactDropzone from "react-dropzone";
import {
    UploadCloud,
    X,
    ArrowRight,
    CheckCircle2,
    Loader2,
    Image as ImageIcon,
    Video as VideoIcon,
    Music as MusicIcon,
    FileText as FileIcon,
    Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/utils";

// Tipe Kategori
type CategoryType = "image" | "video" | "audio" | "document";

type FileState = {
    file: File;
    id: string;
    category: CategoryType;
    targetFormat: string;
    status: "idle" | "converting" | "done" | "error";
};

// Helper: Deteksi kategori berdasarkan MIME type
const getCategory = (file: File): CategoryType => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    return "document";
};

// Helper: Opsi format convert berdasarkan kategori
const getFormatOptions = (category: CategoryType) => {
    switch (category) {
        case "image": return ["png", "jpg", "webp", "svg"];
        case "video": return ["mp4", "mkv", "gif", "avi"];
        case "audio": return ["mp3", "wav", "aac"];
        case "document": return ["pdf", "docx", "txt"];
        default: return [];
    }
};

// Helper: Icon & Label untuk Header Kategori
const categoryConfig = {
    image: { label: "Images", icon: ImageIcon, color: "text-purple-400" },
    video: { label: "Videos", icon: VideoIcon, color: "text-blue-400" },
    audio: { label: "Audio", icon: MusicIcon, color: "text-pink-400" },
    document: { label: "Documents", icon: FileIcon, color: "text-emerald-400" },
};

export default function Dropzone() {
    const [files, setFiles] = useState<FileState[]>([]);
    const [isHover, setIsHover] = useState(false);

    const handleDrop = (acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) => {
            const category = getCategory(file);
            return {
                file,
                id: Math.random().toString(36).substring(7),
                category,
                targetFormat: getFormatOptions(category)[0], // Default format pertama
                status: "idle" as const,
            };
        });
        setFiles((prev) => [...prev, ...newFiles]);
        setIsHover(false);
    };

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const startConversion = async () => {
        const updatedFiles = files.map((f) => ({ ...f, status: "converting" as const }));
        setFiles(updatedFiles);

        // Simulasi convert per file
        for (let i = 0; i < files.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setFiles((prev) =>
                prev.map((f, index) =>
                    index === i ? { ...f, status: "done" as const } : f
                )
            );
        }
    };

    // Group files by category untuk rendering
    const groupedFiles = {
        image: files.filter((f) => f.category === "image"),
        video: files.filter((f) => f.category === "video"),
        audio: files.filter((f) => f.category === "audio"),
        document: files.filter((f) => f.category === "document"),
    };

    return (
        <div className="w-full max-w-4xl mx-auto pb-20">
            {/* 1. AREA UPLOAD */}
            <ReactDropzone
                onDrop={handleDrop}
                onDragEnter={() => setIsHover(true)}
                onDragLeave={() => setIsHover(false)}
            >
                {({ getRootProps, getInputProps }) => (
                    <div
                        {...getRootProps()}
                        className={cn(
                            "group relative overflow-hidden rounded-3xl transition-all duration-300 cursor-pointer h-48 flex flex-col items-center justify-center border-2 border-dashed",
                            isHover
                                ? "bg-neutral-800 border-neutral-500"
                                : "bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900"
                        )}
                    >
                        <input {...getInputProps()} />
                        <div className="bg-neutral-800 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                            <UploadCloud className="h-6 w-6 text-neutral-300" />
                        </div>
                        <p className="text-neutral-300 font-medium">Click to upload or drag files</p>
                        <p className="text-sm text-neutral-500 mt-1">Images, Videos, Audio, Docs</p>
                    </div>
                )}
            </ReactDropzone>

            {/* 2. DAFTAR FILE PER KATEGORI */}
            <div className="mt-10 space-y-8">
                {(Object.keys(groupedFiles) as CategoryType[]).map((category) => {
                    const categoryFiles = groupedFiles[category];
                    if (categoryFiles.length === 0) return null;

                    const Config = categoryConfig[category];
                    const Icon = Config.icon;

                    return (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-neutral-900/30 rounded-2xl border border-neutral-800/50 overflow-hidden"
                        >
                            {/* Header Kategori */}
                            <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
                                <div className="flex items-center gap-3">
                                    <Icon className={cn("h-5 w-5", Config.color)} />
                                    <h3 className="text-neutral-200 font-semibold text-sm tracking-wide uppercase">
                                        {Config.label}
                                    </h3>
                                    <span className="bg-neutral-800 text-neutral-400 text-xs px-2 py-0.5 rounded-full">
                                        {categoryFiles.length}
                                    </span>
                                </div>
                            </div>

                            {/* List File dalam Kategori */}
                            <div className="p-2 space-y-1">
                                <AnimatePresence>
                                    {categoryFiles.map((fileState) => (
                                        <motion.div
                                            key={fileState.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="group flex items-center justify-between p-3 rounded-xl hover:bg-neutral-800/50 transition-colors"
                                        >
                                            {/* Info File */}
                                            <div className="flex items-center gap-4 overflow-hidden w-1/3">
                                                <div className="bg-neutral-800 p-2 rounded-lg">
                                                    <Icon className="h-4 w-4 text-neutral-400" />
                                                </div>
                                                <div className="truncate">
                                                    <p className="text-sm text-neutral-300 font-medium truncate">
                                                        {fileState.file.name}
                                                    </p>
                                                    <p className="text-xs text-neutral-600">
                                                        {(fileState.file.size / 1024 / 1024).toFixed(2)} MB
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Controls */}
                                            <div className="flex items-center gap-4">
                                                {fileState.status === "idle" && (
                                                    <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-neutral-800">
                                                        <span className="text-xs text-neutral-500 uppercase font-bold">To</span>
                                                        <select
                                                            className="bg-transparent text-neutral-200 text-sm font-medium focus:outline-none cursor-pointer"
                                                            value={fileState.targetFormat}
                                                            onChange={(e) => {
                                                                setFiles((prev) =>
                                                                    prev.map((f) =>
                                                                        f.id === fileState.id
                                                                            ? { ...f, targetFormat: e.target.value }
                                                                            : f
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            {getFormatOptions(category).map((fmt) => (
                                                                <option key={fmt} value={fmt} className="bg-neutral-900 text-neutral-300">
                                                                    {fmt.toUpperCase()}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                )}

                                                {fileState.status === "converting" && (
                                                    <div className="flex items-center gap-2 text-neutral-400">
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        <span className="text-xs">Processing...</span>
                                                    </div>
                                                )}

                                                {fileState.status === "done" && (
                                                    <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                                                        <CheckCircle2 className="h-3.5 w-3.5" /> Converted
                                                    </span>
                                                )}

                                                {fileState.status === "idle" && (
                                                    <button
                                                        onClick={() => removeFile(fileState.id)}
                                                        className="p-2 text-neutral-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* 3. TOMBOL CONVERT GLOBAL */}
            {files.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-6 left-0 right-0 px-6 flex justify-center z-40 pointer-events-none"
                >
                    <button
                        onClick={startConversion}
                        disabled={files.some((f) => f.status === "converting")}
                        className="pointer-events-auto shadow-2xl shadow-neutral-950/50 flex items-center gap-3 bg-white text-black pl-6 pr-8 py-4 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {files.some((f) => f.status === "converting") ? (
                            <>
                                <Loader2 className="animate-spin h-5 w-5" />
                                <span>Converting {files.length} Files...</span>
                            </>
                        ) : (
                            <>
                                <div className="bg-black text-white p-1 rounded-full">
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                                <span>Convert All Files</span>
                            </>
                        )}
                    </button>
                </motion.div>
            )}
        </div>
    );
}