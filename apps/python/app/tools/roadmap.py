from typing import List

from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from pydantic import BaseModel, Field

load_dotenv()

ROADMAP = """
Phase 1: Foundation (Weeks 1-3)

Week 1 (Days 1-7): Words and simple stories
- 50 new words a day, starting with easy 3-letter words and moving to 4 letters by the end of the week.
- Each day you read an easy story built from that day's words.
- No grammar yet. Day 7 is revision.

Week 2 (Days 8-14): Basic grammar begins
- 50 new words a day (3-4 letters).
- Grammar: parts of speech, nouns, singular and plural, pronouns, verbs, and basic sentence order.
- Every grammar lesson has real-life examples, plus a story. Day 14 is revision.

Week 3 (Days 15-21): Tenses 1
- 60 new words a day (5-6 letters).
- Grammar: simple present, simple past and simple future.
- Interest Corner begins: you get a short, easy summary of a research paper in [FIELD].
- Day 21 is Checkpoint 1.

Phase 2: Building Fluency (Weeks 4-6)

Week 4 (Days 22-28): Actions in progress
- 60 new words a day (5-6 letters).
- Grammar: continuous tenses, a/an/the, and countable and uncountable nouns.

Week 5 (Days 29-35): Past meets present
- 70 new words a day (5-6 letters).
- Grammar: perfect tenses, adjectives and adverbs.

Week 6 (Days 36-42): Comparing and placing things
- 70 new words a day (7-8 letters).
- Grammar: comparatives, superlatives, prepositions of time and place, and the modals can, could, should and must.
- Day 42 is Checkpoint 2.

Phase 3: Expanding Expression (Weeks 7-10)

Week 7 (Days 43-49): Asking, refusing and linking
- 80 new words a day (7-8 letters).
- Grammar: more modals, questions, negatives, question tags and linking words.

Week 8 (Days 50-56): If... then
- 80 new words a day (7-8 letters).
- Grammar: connectors and all four conditionals.

Week 9 (Days 57-63): Passive and reported speech
- 90 new words a day (7-8 letters).
- Grammar: passive voice, reported speech and relative clauses.
- Day 63 is Checkpoint 3.

Week 10 (Days 64-70): Natural English
- 90 new words a day (8+ letters).
- Grammar: relative clauses, phrasal verbs and idioms.

Phase 4: Mastery (Weeks 11-13)

Week 11 (Days 71-77): Longer sentences
- 100 new words a day (8+ letters).
- Grammar: gerunds, infinitives and complex sentences.

Week 12 (Days 78-84): Advanced English and tone
- 100 new words a day (8+ letters).
- Grammar: mixed conditionals, inversion, subjunctive, and formal vs informal English.

Week 13 (Days 85-90): Fluency and final project
- 100 new words a day (8+ letters).
- Grammar: nuance, formal style and a mixed review.
- Final project: read a real paper abstract in [FIELD] and write your own 5-sentence summary.
- Day 90 is the Final Checkpoint.
"""


# ---------------------------------------------------------------- structured output
class Week(BaseModel):
    week_number: int
    days: str = Field(description="e.g. 'Days 1-7'")
    title: str = Field(description="e.g. 'Words and simple stories'")
    points: List[str] = Field(description="The bullet lines of this week, one string per line, in order")


class Phase(BaseModel):
    name: str = Field(description="e.g. 'Phase 1: Foundation (Weeks 1-3)'")
    weeks: List[Week]


class RoadMap(BaseModel):
    phases: List[Phase]


SYSTEM = (
    "You are an English learning coach. A complete beginner asks for a 90-day roadmap.\n"
    "Fill the structure with the roadmap below, exactly as written: same 4 phases, 13 weeks, days, "
    "word counts and grammar. One string per bullet line. Do not add, remove or reorder anything.\n"
    "Only change this: replace [FIELD] with the learner's field, worked out from their occupation or hobby "
    "(for example 'computer science', 'electronics', 'mechanical engineering', 'biology').\n"
    "{feedback}"
    "ROADMAP:\n" + ROADMAP
)

prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM),
    ("human", "My occupation or hobby: {about_me}\nGenerate my roadmap."),
])


def _default_chain(method: str = "json_schema"):
    llm = ChatGroq(model="openai/gpt-oss-120b", temperature=0.2, max_tokens=16000)
    
    return prompt | llm.with_structured_output(RoadMap, method=method)


def _check(rm: RoadMap) -> List[str]:
    weeks = [w for p in rm.phases for w in p.weeks]
    errors = []
    if len(rm.phases) != 4:
        errors.append("need exactly 4 phases")
    if [w.week_number for w in weeks] != list(range(1, 14)):
        return errors + ["need weeks 1 to 13 in order"]
    for w in weeks:
        first, last = (w.week_number - 1) * 7 + 1, min(w.week_number * 7, 90)
        if w.days.replace(" ", "") != f"Days{first}-{last}":
            errors.append(f"week {w.week_number} must be 'Days {first}-{last}'")
        if not w.points:
            errors.append(f"week {w.week_number} has no points")
    if "[FIELD]" in rm.model_dump_json():
        errors.append("replace [FIELD] with the learner's field")
    return errors


def generate_roadmap(about_me: str, chain=None, max_retries: int = 2) -> RoadMap:
    """Returns a RoadMap object. Use .model_dump() for a dict / JSON."""
    load_dotenv()
    chain = chain or _default_chain()
    errors: List[str] = []
    for _ in range(max_retries + 1):
        feedback = ("Your last answer had these problems, fix them: " + "; ".join(errors) + "\n") if errors else ""
        try:
            rm = chain.invoke({"about_me": about_me, "feedback": feedback})
        except Exception as exc:                      
            errors = [f"the API call failed ({type(exc).__name__}); answer again"]
            continue
        errors = _check(rm)
        if not errors:
            return rm
    raise ValueError("Roadmap failed: " + "; ".join(errors))


def render_text(rm: RoadMap) -> str:
    """The same roadmap as readable text."""
    lines = []
    for phase in rm.phases:
        lines += [phase.name, ""]
        for w in phase.weeks:
            lines += [f"Week {w.week_number} ({w.days}): {w.title}", ""] + [f"- {p}" for p in w.points] + [""]
    return "\n".join(lines)


def generate_roadmap_text(about_me: str) -> str:
    return render_text(generate_roadmap(about_me))


if __name__ == "__main__":
    roadmap = generate_roadmap("backend developer")
    print(roadmap.model_dump_json(indent=2))     
    print(render_text(roadmap))                  