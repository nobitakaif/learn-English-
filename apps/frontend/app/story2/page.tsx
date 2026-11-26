"use client";

import { useEffect, useState } from "react";

export default function Page() {
    const [story, setStory] = useState("");

    useEffect(() => {
        const eventSource = new EventSource(
            "http://localhost:8080/api/stream"
        );

        eventSource.onmessage = (e) => {
            console.log("Received:", e);
            setStory(prev => prev + e.data + "\n");
        };

        eventSource.onerror = () => {
            eventSource.close();
        };

        return () => eventSource.close();
    }, []);

    return <div>Story: {story}</div>;
}