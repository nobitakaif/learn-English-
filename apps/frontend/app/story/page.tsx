"use client";
import { useRef, useState } from "react";
import { streamStory, simplifyStory } from "./story-stream";

const words = [
    "ocean", "whisper", "glimmer", "wander", "breeze",
    "shadow", "velvet", "crystal", "thunder", "meadow",
    "drift", "spark", "echo", "frost", "ember",
    "lunar", "coast", "dusk", "bloom", "gust",
    "ridge", "hollow", "flicker", "moss", "dawn",
    "swell", "parchment", "thorn", "silk", "grove",
    "tide", "raven", "cinder", "vein", "cliff",
    "mist", "hazel", "plume", "wren", "sable",
    "gale", "lagoon", "thicket", "quill", "onyx",
    "fable", "drift", "sable", "wren", "gale"
] 

export default function Page(){
    return <div>
        <StoryStreamer words={words}/>
    </div>
}


export function StoryStreamer({ words }: { words: string[] }) {
  const [story, setStory] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);


async function makeStoryEasier() {
  if (!story || isStreaming) return;

  const currentStory = story;

  abortRef.current?.abort();

  const controller = new AbortController();
  abortRef.current = controller;

  setIsStreaming(true);
  setError(null);

  let firstChunk = true;

  try {
    for await (const chunk of simplifyStory(
      currentStory,
      controller.signal
    )) {

      if (firstChunk) {
        setStory(chunk);
        firstChunk = false;
      } else {
        setStory(prev => prev + chunk);
      }
    }

  } catch (e: any) {
    if (e.name !== "AbortError") {
      setError(e.message);
    }
  } finally {
    setIsStreaming(false);
  }
}

  
  async function startStream() {
    
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsStreaming(true);
    setStory("");
    setError(null);

    try {
      for await (const evt of streamStory(words, controller.signal)) {
        if (evt.type === "start") {
        } else if (evt.type === "token") {
          setStory((s) => s + evt.text);
        } else if (evt.type === "error") {
          setError(evt.message);
        } else if (evt.type === "done") {
          break;
        }
      }
    } catch (e: any) {
      if (e.name !== "AbortError") {
        setError(e.message);
      }
    } finally {
      setIsStreaming(false);
    }
  }

  function stopStream() {
    abortRef.current?.abort();
    setIsStreaming(false);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-2">
        <button
          onClick={startStream}
          disabled={isStreaming}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {isStreaming ? "Streaming…" : "Generate story"}
        </button>
        {isStreaming && (
          <button
            onClick={stopStream}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Stop
          </button>
        )}
      </div>

      <button
        onClick={makeStoryEasier}
        disabled={!story || isStreaming}
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
      >
        {isStreaming ? "Processing..." : "Make it easier"}
      </button>

      {error && <p className="text-red-600">{error}</p>}

      <article className="whitespace-pre-wrap border rounded p-4 min-h-[200px]">
        {story}
        {isStreaming && (
          <span className="inline-block w-2 h-4 bg-blue-600 animate-pulse ml-1" />
        )}
      </article>
    </div>
  );
}