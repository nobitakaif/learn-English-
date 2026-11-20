"use client";

import axios from "axios";
import { Button } from "../ui/button";
import { Volume2, Square } from "lucide-react";
import { useRef, useState } from "react";

export type WordSummary = {
  word: string;
  meaning: string;
  explanation: string;
  verb_form: string[];
  use_cases: string[];
  synonyms: string[];
};

type WordItem = { text: string; meaning: string, setSummaryData : (word : WordSummary) => void };

const TTS_URL = "http://localhost:8080/api/tts";

export default function WordRender({ word }: { word: WordItem[] }) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function play(text: string, id: string) {
    // stop current
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (playingId === id) {
      setPlayingId(null);
      return;
    }

    const audio = new Audio(
      `${TTS_URL}?text=${encodeURIComponent(text)}&voice=hi-IN-SwaraNeural`
    );
    audio.play();
    audio.onended = () => setPlayingId(null);
    audio.onerror = () => setPlayingId(null);

    audioRef.current = audio;
    setPlayingId(id);
  }

  return (
    <div className="flex flex-col gap-2">
      {word.map((item) => (
        <div
          key={item.text}
          className="flex w-full items-center justify-between border p-1 rounded-lg"
        >
          <span className="px-2 py-1 font-medium">{item.text} <span> : </span> </span>
          <span className="flex-1 px-2 text-sm text-muted-foreground">
            {item.meaning}
          </span>
          <div className="flex gap-5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => play(item.meaning, item.text)}
              aria-label="Play meaning"
            >
              {playingId === item.text ? (
                <Square className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Button onClick={async () =>{
              const res = await axios.post("http://localhost:8080/api/summary",{
                word : item.text
              })
              if(res.data){
                item.setSummaryData(res.data)
              }
            }}>
              get more info
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}