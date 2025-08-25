"use client";

import { useEffect, useRef } from "react";

type PropsVideoModal = {
    open: boolean;
    onClose: () => void;
    srcVideo: string;
    srcWeb: string;
    poster?: string;
    title?: string;
    level: 1|2|3|4|5;
}
const colors = ["red", "orange", "yellow", "green", "blue"];

export default function VideoModal({
    open, onClose, srcVideo, srcWeb, poster,level, title = "BSL-Result"
}: PropsVideoModal) {

    const videoRef = useRef<HTMLVideoElement | null>(null);


    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        if (open) {
            v.muted = true;
            v.currentTime = 0;
            v.play();

        } else {
            v.pause;
            v.currentTime = 0;

        }
    }, [open])

    if (!open) return null;

    return (
                
            <div
                
                style={{
                    padding: "10px",
                    width: "min(200px, 100%)",
                    background: colors[level],
                    borderRadius: 8,
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <button
                    onClick={onClose}
                    aria-label="Cerrar"
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "rgba(0,0,0,0.6)",
                        color: "white",
                        border: "none",
                        borderRadius: 6,
                        padding: "6px 10px",
                        cursor: "pointer",
                        zIndex: 1,
                    }}
                >
                    ✕
                </button>
                <video
                    ref={videoRef}
                    poster={poster}
                    // Para que autoplay funcione en móvil:
                    muted
                    playsInline
                    preload="metadata"
                    style={{ width: "200px", height: "auto", display: "block" }}
                >
                    {srcWeb && <source src={srcWeb} type="video/webm" />}
                    <source src={srcVideo} type="video/mp4" />
                    Tu navegador no soporta el elemento video.
                </video>
            </div>



    )

}