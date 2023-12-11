"use client";


import ReactComfetti from "react-confetti";

import { useConfettiStore } from "@/hooks/use-confetti-store";



export const ConfettiProvider = () => {
    const confetti = useConfettiStore();



    if (!confetti.isOpen) return null;


    return (
        <ReactComfetti
            className="pointer-events-none z-[100]"
            numberOfPieces={500}
            recycle={false}
            onConfettiComplete={() => {
                confetti.onClose()
            }}
        />
    )
}