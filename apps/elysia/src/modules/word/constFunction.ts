import { prisma } from "@repo/db";

const INITIAL_DAY = 3;
const DAYS_PER_LEVEL = 2;
const MAX_LEVEL = 12;

export function currentLevel(createdAt : Date, now : Date = new Date()):number{
    const days = Math.floor(
        (now.getTime() - createdAt.getTime()) / 86_400_00
    )
    const level = INITIAL_DAY +  Math.floor(days/ DAYS_PER_LEVEL)
    return Math.min(level, MAX_LEVEL)
}

export function daysUnitNextLevel(createdAt : Date, now : Date = new Date()):number{
    const days = Math.floor(
        (now.getTime() - createdAt.getTime() ) / 86_400_00
    )
    const reminder = days % DAYS_PER_LEVEL
    
    return DAYS_PER_LEVEL - reminder
}

export function nextInterval(timesSent: number, easeFactor: number): number {
  if (timesSent <= 1) return 1;
  if (timesSent === 2) return 8;
  if (timesSent === 3) return 10;
  return Math.round(10 * Math.pow(easeFactor, timesSent - 2));
}

export async function recordSent(userId: string, wordIds: number[]) {
  if (!wordIds.length) return;

  const now = new Date();

  const existing = await prisma.userWord.findMany({
    where: { userId, wordId: { in: wordIds } },
    select: { wordId: true, timesSent: true, easeFactor: true },
  });
  const existingMap = new Map(existing.map((e) => [e.wordId, e]));

  const toCreate: {
    userId: string;
    wordId: number;
    lastSentAt: Date;
    nextReviewAt: Date;
    timesSent: number;
    intervalDays: number;
    easeFactor: number;
  }[] = [];

  const toUpdate: { wordId: number; data: any }[] = [];

  for (const wordId of wordIds) {
    const prev = existingMap.get(wordId);

    if (!prev) {
      toCreate.push({
        userId,
        wordId,
        lastSentAt: now,
        nextReviewAt: new Date(now.getTime() + 1 * 86_400_000),
        timesSent: 1,
        intervalDays: 1,
        easeFactor: 2.5,
      });
    } else {
      const nextTimes = prev.timesSent + 1;
      const days = nextInterval(nextTimes, prev.easeFactor);

      toUpdate.push({
        wordId,
        data: {
          lastSentAt: now,
          nextReviewAt: new Date(now.getTime() + days * 86_400_000),
          timesSent: nextTimes,
          intervalDays: days,
        },
      });
    }
  }

  await prisma.$transaction([
    ...toCreate.map((data) => prisma.userWord.create({ data })),
    ...toUpdate.map(({ wordId, data }) =>
      prisma.userWord.update({
        where: { userId_wordId: { userId, wordId } },
        data,
      })
    ),
  ]);
}

export async function pickWordsForLetter(
  userId: string,
  letter: string,
  length: number | undefined,
  count: number
) {
  const unseenCandidates = await prisma.word.findMany({
    where: {
      firstChar: letter,
      ...(length ? { length } : {}),
    },
    select: { id: true },
  });

  for (let i = unseenCandidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [unseenCandidates[i], unseenCandidates[j]] = [
      unseenCandidates[j],
      unseenCandidates[i],
    ];
  }

  const unseenIds = unseenCandidates.slice(0, count).map((c) => c.id);

  const unseenWords = unseenIds.length
    ? await prisma.word.findMany({
        where: { id: { in: unseenIds } },
        select: { id: true, text: true, length: true },
      })
    : [];

  if (unseenWords.length >= count) {
    return unseenWords;
  }

  const remaining = count - unseenWords.length;

  const dueWords = await prisma.word.findMany({
    where: {
      firstChar: letter,
      ...(length ? { length } : {}),
      id: { notIn: unseenWords.map((w) => w.id) },
      userWord: {
        some: {
          userId,
        },
      },
    },
    take: remaining,
    orderBy: { id: 'asc' },
    select: { id: true, text: true, length: true },
  });

  return [...unseenWords, ...dueWords];
}
