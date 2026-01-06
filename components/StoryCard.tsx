"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface StoryCardProps {
    id: number;
    image: string;
    title: string;
    text: string;
    position: string;
    textColor?: string;
    style?: string;
    isFinal?: boolean;
    priority?: boolean;
}

export function StoryCard({
    image,
    title,
    text,
    position,
    textColor = "text-white",
    style,
    isFinal,
    priority = false, // Default to false
}: StoryCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Apple-style effects:
    // 1. Image scale: Subtle zoom out as it comes into view (1.2 -> 1)
    // 2. Parallax: Image moves slightly slower than scroll
    const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]); // Parallax effect

    // Position logic
    const positionClasses = {
        "bottom-left": "justify-end items-start text-left",
        "bottom-center": "justify-end items-center text-center",
        "bottom-right": "justify-end items-end text-right",
        "top-left": "justify-start items-start text-left",
        "top-center": "justify-start items-center text-center",
        "top-right": "justify-start items-end text-right",
        "middle-center": "justify-center items-center text-center",
    };

    const currentPosition = positionClasses[position as keyof typeof positionClasses] || "justify-center items-center";

    return (
        <div ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden snap-center">
            {/* Background Image with Parallax & Scale */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <motion.div style={{ scale, y }} className="relative w-full h-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        priority={priority}
                        className="object-cover"
                        sizes="100vw"
                    />
                </motion.div>
                {/* Apple-style gradient: heavy at bottom, subtle everywhere else */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className={cn("relative z-10 flex flex-col h-full w-full p-8", currentPosition)}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Apple-like easing
                    viewport={{ once: true, margin: "-15%" }}
                    className={cn("max-w-md skew-y-0", isFinal && "flex flex-col items-center")}
                >
                    <h2 className={cn("text-5xl font-bold mb-6 tracking-tight leading-none", textColor, style === "neon-glow" && "drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]")}>
                        {title}
                    </h2>
                    <p className={cn("text-xl font-medium text-white/90 leading-relaxed font-geist-sans", textColor)}>
                        {text}
                    </p>

                    {isFinal && (
                        <motion.div
                            className="mt-12"
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4, type: "spring", bounce: 0.4 }}
                        >
                            <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-2xl shadow-white/20">
                                ❤️ Te quiero
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
