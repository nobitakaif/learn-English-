
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
