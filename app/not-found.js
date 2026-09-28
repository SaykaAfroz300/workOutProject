import Link from "next/link";

export default function NotFound() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-32 text-center">
            <h1 className="text-6xl font-bold text-[#ccff00] mb-4">404</h1>
            <p className="text-gray-400 mb-7">
                Hmm, this page doesn&apos;t exist. Maybe it got skipped leg day.
            </p>
            <Link
                href="/"
                className="inline-block bg-[#ccff00] text-black font-bold px-6 py-3 rounded-lg"
            >
                Go back home
            </Link>
        </div>
    );
}
