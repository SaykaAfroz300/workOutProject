export default function Footer() {
    return (
        <footer className="bg-[#0a0a0c] border-t border-white/10 mt-20">
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
                <div className="flex items-center gap-2 font-bold text-white">
                    <span className="text-[#ccff00] text-lg">⚡</span>
                    FITLOG
                </div>
                <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
            </div>
        </footer>
    );
}
