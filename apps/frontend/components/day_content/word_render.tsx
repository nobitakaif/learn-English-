export default function WordRender({ word }: { word: { text: string; length: number }[] }) {
  return (
    <div className="flex flex-wrap gap-2 flex-col">
      {word && word.map((item) => (
        <span key={item.text} className="border px-2 py-1 rounded">
          {item.text}
        </span>
      ))}
    </div>
  );
}