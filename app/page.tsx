"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { StoryCard } from "@/components/StoryCard";
import { motion, useScroll, useTransform } from "framer-motion";

// Exact data from requirements, but mapped to .jpeg if needed (I will replace extensions in logic or here)
const storyData = [
  {
    id: 1,
    image: "/images/playa-pie.jpeg",  // Changed to .jpeg per file verification
    title: "Gracias por este año...",
    text: "...y por ser mi calma en medio de todo el caos.",
    position: "bottom-left",
    textColor: "text-white"
  },
  {
    id: 2,
    image: "/images/mario-disfraz.jpeg",
    title: "Por las risas...",
    text: "Porque el mejor equipo es el que sabe reírse de todo. ¡Hasta de nosotros mismos!",
    position: "bottom-center",
    textColor: "text-white"
  },
  {
    id: 3,
    image: "/images/halloween-makeup.jpeg",
    title: "Por nuestra locura...",
    text: "Por ser mi cómplice absoluta. Incluso cuando sacamos nuestro lado más oscuro (y divertido).",
    position: "bottom-center",
    textColor: "text-white" 
  },
  {
    id: 4,
    image: "/images/fiesta-beso.jpeg",
    title: "Por esa chispa...",
    text: "Que convierte cualquier noche ordinaria en un recuerdo inolvidable.",
    position: "middle-center",
    style: "neon-glow"
  },
  {
    id: 5,
    image: "/images/playa-corazon.jpeg",
    title: "Por la complicidad...",
    text: "Y la sencillez de los días al sol. No hace falta nada más.",
    position: "bottom-center",
    textColor: "text-white"
  },
  {
    id: 6,
    image: "/images/selfie-final.jpeg",
    title: "Eres mi mejor proyecto.",
    text: "Te quiero muchísimo. ¿Vamos a por el siguiente capítulo?",
    position: "middle-center",
    isFinal: true
  }
];

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Slower duration for more "weight" logic
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="w-full relative bg-black">
      {/* Intro Section - High Impact Typography */}
      <section className="h-[100dvh] w-full flex flex-col justify-center items-center px-6 relative z-10 bg-black">
        <div className="max-w-2xl text-center">
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-gray-400 text-lg md:text-xl font-medium tracking-wide mb-6 uppercase"
            >
                Balance 2025
            </motion.p>
            <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-tight"
            >
                Este 2025 ha terminado, <br className="hidden md:block"/> pero quería decirte <br/> algunas cosas...
            </motion.h1>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent opacity-50" />
            </motion.div>
        </div>
      </section>

      {/* Story Cards */}
      <div className="relative z-0">
          {storyData.map((card, index) => (
            <StoryCard
              key={card.id}
              {...card}
              priority={index === 0}
            />
          ))}
      </div>
    </main>
  );
}
