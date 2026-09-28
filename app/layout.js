import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";

export const metadata = {
    title: "FitLog - Workout Library",
    description:
        "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen flex flex-col font-[Inter,sans-serif]">
                <PlanProvider>
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <Toast />
                </PlanProvider>
            </body>
        </html>
    );
}
