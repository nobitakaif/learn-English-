
import { word } from './word';
import { prisma } from "./client"



async function main() {
  // 1. Clean + dedupe
  const cleaned = Array.from(
    new Set(
      word
        .map((w) => w.trim().toLowerCase())
        .filter((w) => /^[a-z]{3,}$/.test(w)) // only a–z, min 3 letters
    )
  );

  // 2. Map to rows — length is computed, not trusted from your arrays
  const rows = Array.from(
  new Set(
    word.map((w ) => w.trim().toLowerCase())
  )
)
  .filter((w) => /^[a-z]{3,}$/.test(w))
  .map((text) => {
    const firstChar = text[0];
    if (!firstChar) throw new Error(`Bad word: ${text}`);
    return { text, length: text.length, firstChar };
  });

  // 3. Bulk insert — atomic, idempotent, never replaces existing data
  const result = await prisma.word.createMany({
    data: rows,
    skipDuplicates: true,
  });

  console.log(
    `✅ Total unique words: ${rows.length}\n` +
    `   Inserted:  ${result.count}\n` +
    `   Skipped (already existed): ${rows.length - result.count}`
  );

  // 4. Show distribution — confirms data is correct
  const dist = await prisma.word.groupBy({
    by: ['length'],
    _count: { _all: true },
    orderBy: { length: 'asc' },
  });
  console.table(dist.map((d) => ({ length: d.length, words: d._count._all })));
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

const words = await prisma.word.findMany({
  where: {
    length:  10,
    firstChar : 'a'
  },
  orderBy: [{ length: 'asc' }, { text: 'asc' }],
  take : 97,
  select: { text: true, length: true },
});

// console.log(words.length); // total count

// console.log(words.map((w) => w.text));