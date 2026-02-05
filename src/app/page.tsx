import Navbar from "./components/navbar";
import Dropzone from "./components/dropzone";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-white selection:text-black">
      <Navbar />

      <div className="pt-40 px-6 pb-32">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
            File Conversion. Simplified.
          </h1>
          <p className="text-neutral-500 text-lg font-light">
            Convert images, audio, video, and documents securely in your browser.
            No limits. No watermarks.
          </p>
        </div>

        {/* Main Dropzone Area */}
        <Dropzone />
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full py-6 text-center text-neutral-600 text-xs border-t border-neutral-900 bg-[#050505]/80 backdrop-blur-sm">
        &copy; {new Date().getFullYear()} ./Takhiyuddin.com
      </footer>
    </main>
  );
}