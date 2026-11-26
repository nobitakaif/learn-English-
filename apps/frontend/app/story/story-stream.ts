
export type StoryEvent =
  | { type: "start"; words: string[] }
  | { type: "token"; text: string }
  | { type: "done"; words: string[] }
  | { type: "error"; message: string };

export async function* streamStory(
  words: string[],
  signal?: AbortSignal
): AsyncGenerator<StoryEvent> {
  const params = new URLSearchParams({ words: words.join(",") });
  const res = await fetch(
    `http://localhost:8080/api/story/stream?${params}`,
    { signal }
  );

  if (!res.ok || !res.body) {
    throw new Error(`stream failed: ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n\n")) !== -1) {
      const raw = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);

      const lines = raw.split("\n");
      const event = lines.find((l) => l.startsWith("event: "))?.slice(7) ?? "message";
      const data = lines.find((l) => l.startsWith("data: "))?.slice(6) ?? "{}";

      const parsed = JSON.parse(data);

      if (event === "start") yield { type: "start", words: parsed.words };
      else if (event === "token") yield { type: "token", text: parsed.t };
      else if (event === "done") yield { type: "done", words: parsed.words };
      else if (event === "error") yield { type: "error", message: parsed.message };
    }
  }
}



export async function* simplifyStory(
  story: string,
  signal?: AbortSignal
): AsyncGenerator<string> {

  const params = new URLSearchParams({ story });

  const res = await fetch(
    `http://localhost:8080/api/summarize?${params}`,
    { signal }
  );


  
  if (!res.ok || !res.body) {
    throw new Error(`Summarization failed: ${res.status}`);
  }
  
  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    const text = decoder.decode(value, { stream: true });

    if (text) yield text;
  }

  // Flush remaining characters
  const remaining = decoder.decode();

  if (remaining) yield remaining;
}
