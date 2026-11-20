"use client"
import { client } from "@/config/elysia-client"
import { Params } from "next/dist/server/request/params"
import { useState } from "react"
import { Button } from "../ui/button"
import WordRender, { WordSummary } from "./word_render"
import axios from "axios"

export default function DayContent(){
    
    const [data, setData] = useState<[]|any>([])
    const [word, setWord] = useState<{ text: string; meaning: string }[]>([]);
    const [summary, setSummary] = useState<WordSummary | null>(null);
    const getWord = async () => {
    const res = await client.api.v1.word.get({
        query: { countPerLetter: 5, firstChar: "a" },
    });

    if (!res.data) return;

    // @ts-ignore
    const words = res.data.word;                                  
    setData(res.data);

    const wordTexts = words.map((w:any) => w.text);                   

        const meaningRes = await axios.post(
            "http://localhost:8080/api/word2",
            { word: wordTexts },
            { headers: { "Content-Type": "application/json" } }
        );
        
        const meaningMap = new Map<string, string>(
            meaningRes.data.items.map((it: { word: string; meaning: string }) => [
            it.word,
            it.meaning,
            ])
        );

        const merged = words.map((w :any) => ({
            text: w.text,
            meaning: meaningMap.get(w.text) ?? "",
        }));

        setWord(merged);
    };

    const wordWithSetter = word.map((w) => ({
    ...w,
    setSummaryData: setSummary,       // 👈 hand the parent's setter to each item
  }));
    
    return <div className="h-full w-full ">
        <div className="flex h-[80vh] w-full justify-center items-center p-2 gap-3">
            <div className="h-full w-full bg-[#8FD3C9] rounded-2xl p-4">
                <WordRender word={wordWithSetter} />

            </div>

            {/* for the summary of words */}
            <div className="h-full w-full bg-chart-1 rounded-2xl p-4">
                {summary && (
                <div className="border rounded-lg p-4 text-secondary">
                    <h3 className="font-bold text-lg ">{summary.word.toUpperCase()}</h3>
                    <p><strong className="text-black">Meaning:</strong> {summary.meaning}</p>
                    <p><strong className="text-black">Explanation:</strong> {summary.explanation}</p>
                    {summary.verb_form.length > 0 && (
                    <p><strong className="text-black">Verb forms:</strong> {summary.verb_form.join(" → ")}</p>
                    )}
                    <p><strong className="text-black">Examples:</strong></p>
                    <ul className="list-disc ml-4">
                    {summary.use_cases.map((u) => <li key={u}>{u}</li>)}
                        </ul>
                        <p><strong className="text-black">Synonyms:</strong> {summary.synonyms.join(", ")}</p>
                    </div>
                    )}
            </div>
        </div>
        <Button onClick={getWord} className={"w-full h-12 text-lg text-chart-2"}>Get data</Button>
    </div>
}