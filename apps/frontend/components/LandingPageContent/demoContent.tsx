import { useState } from "react";

const STORY =
  "A shy scholar, ebullient with joy, read an esoteric lexicon by candlelight every night. Each word felt ephemeral, yet he was meticulous in his study. Slowly, he ameliorated his inept phrasing through daily practice. The intractable labyrinth of grammar became palpable to him. At last, his words carried a sublime eloquence that moved everyone around him.";
 
//  word (lowercase) -> meaning 
 const MEANINGS : any = {
   a: "एक (ek)",
   an: "एक (ek)",
   the: "वह / यह (vah / yah)",
   shy: "शर्मीला (sharmila)",
   scholar: "विद्वान (vidwan)",
   ebullient: "उल्लसित (ullasit)",
   with: "के साथ (ke saath)",
   joy: "खुशी (khushi)",
   read: "पढ़ा (padha)",
   esoteric: "गूढ़ (goodh)",
   lexicon: "शब्दकोश (shabdkosh)",
   by: "के पास (ke paas)",
   candlelight: "मोमबत्ती की रोशनी (mombatti ki roshni)",
   every: "हर (har)",
   night: "रात (raat)",
   each: "हर एक (har ek)",
   word: "शब्द (shabd)",
   words: "शब्द (shabd)",
   felt: "महसूस हुआ (mehsoos hua)",
   ephemeral: "क्षणिक (kshanik)",
   yet: "फिर भी (phir bhi)",
   he: "वह (vah)",
   was: "था (tha)",
   meticulous: "बारीकी से सावधान (baareeki se saavdhan)",
   in: "में (mein)",
   his: "उसका (uska)",
   study: "अध्ययन (adhyayan)",
   slowly: "धीरे-धीरे (dheere-dheere)",
   ameliorated: "सुधारा (sudhaara)",
   inept: "अकुशल (akushal)",
   phrasing: "बोलने का ढंग (bolne ka dhang)",
   through: "के ज़रिए (ke zariye)",
   daily: "रोज़ाना (rozaana)",
   practice: "अभ्यास (abhyaas)",
   intractable: "बहुत कठिन (bahut kathin)",
   labyrinth: "भूलभुलैया (bhoolbhulaiya)",
   of: "का / की (ka / ki)",
   grammar: "व्याकरण (vyaakaran)",
   became: "बन गया (ban gaya)",
   palpable: "साफ़ महसूस होने वाला (saaf mehsoos hone wala)",
   to: "को (ko)",
   him: "उसे (use)",
   at: "पर (par)",
   last: "आख़िरी (aakhiri)",
   carried: "लिए हुए था (liye hue tha)",
   sublime: "उत्कृष्ट (utkrisht)",
   eloquence: "वाक्पटुता (vaakpatuta)",
   that: "जो (jo)",
   moved: "भावुक कर दिया (bhaavuk kar diya)",
   everyone: "सब लोग (sab log)",
   around: "आस-पास (aas-paas)",
 };



export function DemoContent(){
    const [open, setOpen] = useState(false)
    
    return <div className="h-[70vh] w-[90vh] flex flex-col rounded-xl p-3 gap-2   ">

        {/* Demo Content */}
            <div className="flex-9  rounded-2xl  flex justify-center items-center ">
                     
             <article className=" rounded-3xl bg-white p-6 text-xl leading-[2.2] shadow-sm sm:p-10 sm:text-2xl">
                 {STORY.split(/(\s+)/).map((token : any, i : any) => {
                 if (/^\s+$/.test(token)) return token;
        
                 const m = token.match(/^([^A-Za-z]*)([A-Za-z'-]+)(.*)$/);
                 if (!m) return token;
        
                 const [, before, word, after] = m;
                 const meaning = MEANINGS[word.toLowerCase()];
                 const isOpen = open === i;
        
                 return (
                     <span key={i}>
                     {before}
                     <span className="relative inline-block">
                         <button
                         type="button"
                         onMouseEnter={() => setOpen(i)}
                         onMouseLeave={() => setOpen(false)}
                         onClick={() => setOpen(isOpen ? null : i)}
                         className={`cursor-pointer rounded px-0.5 transition-colors hover:bg-emerald-100 ${
                             isOpen ? "bg-emerald-100" : ""
                         }`}
                         >
                         {word}
                         </button>
        
                         {isOpen && meaning && (
                         <span
                             role="tooltip"
                             className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-card-foreground px-3 py-2 text-left text-base leading-snug text-white"
                         >
                             <span className="block text-sm text-stone-400">{word}</span>
                             {meaning}
                         </span>
                         )}
                     </span>
                     {after}
                     </span>
                 );
                 })}
             </article>
         </div>

 
        {/* Footer */}
        <div className="flex-1 bg-card-foreground   rounded-xl flex justify-center items-center">
            <span className="text-xl font-semibold h-12 flex justify-center items-center text-secondary ">Hover the word which you don't understand and see magic</span>
        </div>
    </div>
}