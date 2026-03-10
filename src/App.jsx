import { useState, useMemo, useRef, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ReferenceLine, Legend, ComposedChart
} from "recharts";

/* ─── BRAND TOKENS ─────────────────────────────────────────────────────────── */
const R  = "#E30613";   // Stella Red
const R2 = "#B8000E";   // Dark red
const R3 = "#FF2030";   // Bright red
const BG = "#F2F3F7";   // Page background
const W  = "#FFFFFF";
const INK  = "#111216";
const MUTED = "#72737A";
const BORDER = "#E4E5EA";

/* ─── STELLA LOGO — real photo ─────────────────────────────────────────────── */
const LOGO_B64 = "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";

const StellaIcon = ({ size = 40, style = {} }) => (
  <img
    src={`data:image/jpeg;base64,${LOGO_B64}`}
    alt="Stella"
    style={{ width: size, height: "auto", display: "block", ...style }}
  />
);

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const MONTHLY = [
  { m:"Jan", tot:83,  ks:18, wacht:1.2, bereik:88, z:false },
  { m:"Feb", tot:86,  ks:21, wacht:1.4, bereik:86, z:false },
  { m:"Mrt", tot:78,  ks:19, wacht:1.3, bereik:87, z:false },
  { m:"Apr", tot:82,  ks:24, wacht:1.5, bereik:85, z:false },
  { m:"Mei", tot:83,  ks:26, wacht:1.7, bereik:83, z:false },
  { m:"Jun", tot:126, ks:54, wacht:3.8, bereik:58, z:true  },
  { m:"Jul", tot:149, ks:67, wacht:5.1, bereik:41, z:true  },
  { m:"Aug", tot:141, ks:61, wacht:4.6, bereik:47, z:true  },
  { m:"Sep", tot:93,  ks:29, wacht:1.8, bereik:81, z:false },
  { m:"Okt", tot:80,  ks:22, wacht:1.4, bereik:86, z:false },
  { m:"Nov", tot:134, ks:48, wacht:3.1, bereik:62, z:false },
  { m:"Dec", tot:124, ks:43, wacht:2.8, bereik:66, z:false },
];

const CATS = [
  { n:"Accu / Batterij",       v:671, c:R        },
  { n:"Klantenservice",        v:412, c:"#1B52D4" },
  { n:"Motor / Ondersteuning", v:289, c:"#F59E0B" },
  { n:"Garantie",              v:198, c:"#7C3AED" },
  { n:"Remmen",                v:112, c:"#DC2626" },
  { n:"Levertijd",             v: 78, c:"#0891B2" },
  { n:"Overig",                v: 50, c:"#9CA3AF" },
];

const SENTIMENT = [
  { n:"Zeer boos (1)", v:523, c:R },
  { n:"Boos (2)",      v:487, c:"#FF6B35" },
  { n:"Neutraal (3)",  v:412, c:"#FBBF24" },
  { n:"Tevreden (4)",  v:278, c:"#34D399" },
  { n:"Blij (5)",      v:110, c:"#38BDF8" },
];

const URGENCY = [
  { n:"Hoog",   v:734, c:R },
  { n:"Medium", v:698, c:"#F59E0B" },
  { n:"Laag",   v:378, c:"#34D399" },
];

const SVCFAIL = [
  { t:"geen reactie",     v:412 },
  { t:"niet teruggebeld", v:287 },
  { t:"onbereikbaar",     v:234 },
  { t:"wachttijd",        v:198 },
  { t:"slechte service",  v:176 },
  { t:"niet geholpen",    v:143 },
];

const SAFETY = [
  { t:"Rem defect tijdens rijden", v:134, r:"KRITIEK" },
  { t:"Motor uitval op weg",       v:203, r:"HOOG"    },
  { t:"Zadel afgebroken",          v: 89, r:"KRITIEK" },
  { t:"Accu lekkage / brand",      v: 47, r:"KRITIEK" },
  { t:"Bagagedrager breuk",        v: 78, r:"MEDIUM"  },
  { t:"Stuur / vork defect",       v: 31, r:"KRITIEK" },
];

const EMAILS = [
  { nr:3,   d:"08-02-2026", s:"Klacht – zadel afgebroken",                   f:"Peter Berben",    c:"Garantie",       u:"Hoog",   txt:"Ik ben in het bezit van een Stella fiets en ben gevallen doordat mijn zadel plotseling afbrak. Ik weeg 75 kg dus de breuk kan niet door overgewicht zijn ontstaan. Is er sprake van een fabricagefout?",                                                                         sum:"Zadel brak plotseling af tijdens gebruik; klant gevallen maar niet gewond." },
  { nr:6,   d:"06-02-2026", s:"Formele ingebrekestelling Stella Vicenza",     f:"Jan van Hout",    c:"Motor",          u:"Hoog",   txt:"De motor valt herhaaldelijk uit waardoor de trapondersteuning wegvalt. De fiets is inmiddels circa tien keer ter reparatie aangeboden. Bij uitblijven van een reactie geef ik de zaak aan mijn rechtsbijstandsverzekeraar.",                                             sum:"Motor valt herhaaldelijk uit na 10+ reparaties; dreigt met rechtsbijstand." },
  { nr:11,  d:"02-02-2026", s:"Stopzetten verzekering en klacht",             f:"Suat Yigitsoy",   c:"Accu",           u:"Hoog",   txt:"Mijn accu heeft accuzuur gelekt. Hierna is het volledig stil en ben er klaar mee. De fiets roest nu letterlijk weg. Ik wil mijn verzekering per direct opzeggen en de accu retour ontvangen.",                                                                          sum:"Accu lekte accuzuur; fiets roest; klant wil per direct opzeggen." },
  { nr:13,  d:"01-02-2026", s:"Zadel én rem afgebroken – gevaarlijk",         f:"Jeroen de Bruin", c:"Garantie",       u:"Hoog",   txt:"De bout onderaan mijn zadel brak volledig af. Eerder brak ook al een remhendel af tijdens het fietsen. Voor een fiets van meer dan €3000 vind ik twee gevaarlijke incidenten in 2,5 jaar volstrekt onacceptabel.",                                                   sum:"Zadel én rem afgebroken op €3000 fiets; klant eist gratis hulp." },
  { nr:18,  d:"29-01-2026", s:"Voortdurende problemen – overweeg Kassa",      f:"Hayke Hendrix",   c:"Klantenservice", u:"Hoog",   txt:"Gisteren een bericht gestuurd en wederom geen reactie van Stella ontvangen. Ik denk er serieus over na om met mijn verhaal richting consumentenprogramma's als Kassa te gaan om mensen te waarschuwen.",                                                               sum:"Jarenlange slechte service; klant overweegt Kassa; eist compensatie." },
  { nr:24,  d:"02-02-2026", s:"Grove medewerker filiaal Schiedam",            f:"Mariska Maas",    c:"Klantenservice", u:"Hoog",   txt:"De verkoper in Schiedam zei letterlijk: ga je toch lekker naar een ander bedrijf. Wij hebben er al vier Stella-fietsen gekocht maar door dit gedrag nooit meer.",                                                                                                  sum:"Medewerker Schiedam stuurde klant brutaal weg na vier eerdere aankopen." },
  { nr:38,  d:"13-01-2026", s:"Klacht Stella Vicenza Black – €2200",          f:"Wendy Olverink",  c:"Garantie",       u:"Hoog",   txt:"Binnen 1,5 jaar is de fiets meerdere malen defect geraakt. Hij hangt van ducktape en tiewraps aan elkaar vast. Ik verzoek formeel om kosteloze vervanging op grond van het conformiteitsbeginsel.",                                                                  sum:"Vicenza €2200 herhaaldelijk defect in 1,5 jaar; formele eis vervanging." },
  { nr:43,  d:"14-01-2026", s:"Drie weken geen reactie – bedrijfscultuur?",   f:"JM. Reijn",       c:"Klantenservice", u:"Hoog",   txt:"Is mijn mail over het hoofd gezien of is dit de bedrijfscultuur? Als ik als klant onbeschoft wordt behandeld dan zegt dat iets. Service: een heke dikke onvoldoende.",                                                                                              sum:"Drie weken geen reactie; klant noemt het een 'bedrijfscultuur'." },
  { nr:46,  d:"21-01-2026", s:"Vork afgebroken – dochter bijna gewond",       f:"Michel de Kort",  c:"Garantie",       u:"Hoog",   txt:"Het stuk tussen stuur en vork is gewoon afgebroken. Duidelijk een fabricagefout. Mijn dochter heeft veel geluk gehad dat ze niet ernstig gewond raakte. De herstelling kostte bijna €1000.",                                                                       sum:"Vork afgebroken; fabricagefout; dochter bijna gewond; €1000 schade." },
  { nr:55,  d:"15-01-2026", s:"4 weken zonder werkende remmen",               f:"O. Zakharchuk",   c:"Remmen",         u:"Hoog",   txt:"Ik wacht al 4 weken voor een terugbelafspraak. Remmen doen het niet. Ik fiets 4 weken lang zonder remmen. Hoe lang gaat dat nog duren? Dit is levensgevaarlijk.",                                                                                                   sum:"Vier weken zonder werkende remmen; wacht nog steeds op terugbelafspraak." },
  { nr:78,  d:"03-01-2026", s:"Accu vastzittend in frame – brandgevaar",      f:"Lindsey Pronk",   c:"Accu",           u:"Hoog",   txt:"De accu van mijn Dolce Black zit vast in het frame. Meerdere fietsenmakers weigeren mijn fiets in behandeling te nemen vanwege het brandgevaar van de accu.",                                                                                                     sum:"Accu vastzittend; fietsenmakers weigeren wegens brandgevaar." },
  { nr:102, d:"05-12-2025", s:"Motor uitval op rotonde – bijna-ongeluk",      f:"T. Janssen",      c:"Motor",          u:"Hoog",   txt:"Tijdens het rijden op een rotonde viel de motor plotseling uit. Dit is de derde keer dat dit gebeurt op dezelfde locatie. Ik eis een spoedafspraak want dit is een ernstig veiligheidsprobleem.",                                                                   sum:"Motor valt derde keer uit op rotonde; klant eist spoedafspraak." },
  { nr:145, d:"05-11-2025", s:"Fiets Ridderkerk – motor kapot na 6 mnd",      f:"M. de Vries",     c:"Motor",          u:"Medium", txt:"Ik heb mijn fiets in Ridderkerk gekocht. Al na 6 maanden heeft de motor het begeven. Bonnummer 456789. Ik word steeds doorverwezen. Onacceptabel voor deze prijs.",                                                                                                sum:"Motor Ridderkerk kapot na 6 mnd; bonnr. 456789; steeds doorverwezen." },
  { nr:312, d:"15-08-2025", s:"3 weken onbereikbaar – zomer – geen fiets",    f:"R. Hofman",       c:"Klantenservice", u:"Hoog",   txt:"Ik probeer jullie al weken te bereiken maar niemand neemt op. In de zomer lijkt er niemand te werken bij Stella. Drie weken al geen fiets en niemand reageert op mijn mails of telefoontjes.",                                                                      sum:"3 weken onbereikbaar in zomer; klant zit compleet zonder fiets." },
  { nr:445, d:"20-07-2025", s:"5 uur wachttijd – zomer onacceptabel",         f:"K. Bogaert",      c:"Klantenservice", u:"Hoog",   txt:"Ik wacht nu al meer dan 5 uur in de wachtrij voor ik iemand aan de lijn krijg. In de zomer is dit echt onacceptabel. Mijn fiets staat al 2 weken te wachten op een simpele reparatie.",                                                                           sum:"5+ uur wachttijd in zomer; simpele reparatie wacht al 2 weken." },
  { nr:512, d:"08-07-2025", s:"Accu kapot – 3× niet teruggebeld zomer",       f:"P. Willems",      c:"Accu",           u:"Hoog",   txt:"Accu kapot. Al drie keer gebeld en steeds beloven ze terug te bellen. Niemand belt terug. Het is zomer en ik gebruik mijn fiets dagelijks voor mijn werk. Ik kan geen week zonder.",                                                                               sum:"Accu kapot; drie terugbelbeloftes in zomer; niemand belt terug." },
  { nr:634, d:"22-06-2025", s:"3 weken reparatie zonder update zomer",        f:"A. van den Berg", c:"Klantenservice", u:"Medium", txt:"Ik heb mijn fiets 3 weken geleden ingeleverd voor reparatie en heb nog niets gehoord. Als ik bel word ik meer dan een uur in de wacht gezet. Is bereikbaarheid in de zomer geen prioriteit?",                                                                      sum:"3 weken geen update reparatie; uur in de wacht in zomer." },
  { nr:756, d:"14-05-2025", s:"Levering 5 maanden te laat",                   f:"T. Smit",         c:"Levertijd",      u:"Medium", txt:"Besteld in december met levertijd 4 weken. Nu zijn we 5 maanden later en ik heb nog steeds geen fiets. Er wordt steeds een nieuwe datum beloofd maar die wordt niet nagekomen.",                                                                                    sum:"Bestelling van december nog niet geleverd in mei; herhaalde beloftes." },
  { nr:867, d:"03-03-2025", s:"Motor ondersteuning valt weg – controller?",   f:"G. van Asperen",  c:"Motor",          u:"Medium", txt:"Zodra ik de powerknop loslaat valt het display direct uit. Dit wijst op een defect in de controller of aanstuurcircuit. Gezien de leeftijd wil ik dit graag onder garantie laten beoordelen.",                                                                      sum:"Controller/display defect; fiets start niet zonder knop ingedrukt houden." },
  { nr:923, d:"18-02-2025", s:"Accu laadt niet op – Dolce Black",             f:"J. Hulleman",     c:"Accu",           u:"Medium", txt:"Dolce Black gekocht in juni 2024. Al meerdere reparaties voor uitvallende ondersteuning. Na elke reparatie werkt het even en daarna valt het weer uit. De accu laadt niet goed op. We hebben de fiets hard nodig.",                                               sum:"Dolce Black: meerdere reparaties uitvallende ondersteuning; accu laadt niet." },
];

/* ─── AI CHAT RESPONSES ────────────────────────────────────────────────────── */
const REPLIES = {
  def:    "Ik ben de Stella data-assistent. Vraag me over de 1.810 klachten: zomerpiek, accu, bereikbaarheid, veiligheid of aanbevelingen.",
  zomer:  "☀️ Zomeranalyse:\n• Wachttijd piekt op 5,1 uur in juli (norm: 2u)\n• Bereikbaarheid daalt naar 41% in juli (norm: 80%)\n• 2,3× meer klantenservice-klachten dan rest van jaar\n• 38% van klanten wordt niet teruggebeld\n\nDe klantenservice heeft structureel +40% extra capaciteit nodig in juni–augustus.",
  accu:   "🔋 Accu/Batterij (671 klachten — 37,1%):\n• Grootste enkelvoudige klachtcategorie\n• Problemen: vastzittende accu's, lekkage, uitval, laadproblemen\n• 47 meldingen brandgevaar of accuzuurlekkage\n\nAanbeveling: leveranciersaudit + gratis accucheck voor fietsen ouder dan 2 jaar.",
  bereik: "📵 Bereikbaarheid:\n• Juli: slechts 41% van klanten bereikt de klantenservice\n• 'Niet teruggebeld' 287× vermeld in klachten\n• 'Onbereikbaar' 234× vermeld\n• Wachttijd in juli: gemiddeld 5,1 uur\n\nEen AI-chatbot lost dit structureel op door 24/7 beschikbaar te zijn.",
  ai:     "🤖 AI als klantenservice:\n• Chatbot beantwoordt 60–70% van vragen direct\n• Wachttijd: van 5 uur naar 0 seconden\n• Beschikbaar 24/7, ook zaterdag en 's avonds\n• Klanten met complexe vragen worden slim doorgestuurd\n• Implementatie: 2–4 weken, €8.000–15.000 investering\n• Jaarlijkse besparing: ca. €70.000–120.000",
  veilig: "⚠️ Veiligheidsincidenten (584 klachten):\n• 134 rem-defecten (KRITIEK)\n• 89 afgebroken zadels (KRITIEK)\n• 203 motor-uitvallen tijdens rijden (HOOG)\n• 47 acculekkages met brandgevaar (KRITIEK)\n\nDirecte actie vereist: productanalyse + dedicated veiligheidsteam.",
  tips:   "💡 Top 3 aanbevelingen:\n1. AI-chatbot — lost zomerpiek structureel op, laagste kosten\n2. Seizoensuitbreiding +40% capaciteit jun–aug (flex-pool)\n3. Proactieve mei-campagne — voorkomt tot 30% van zomerse klachten",
};

const reply = (msg) => {
  const m = msg.toLowerCase();
  if (m.match(/zomer|piek|jun|jul|aug|seizoen/))      return REPLIES.zomer;
  if (m.match(/accu|batter|lad/))                     return REPLIES.accu;
  if (m.match(/bereik|wacht|telefon|bel|reactie/))    return REPLIES.bereik;
  if (m.match(/ai|chatbot|robot|automatisch/))        return REPLIES.ai;
  if (m.match(/veilig|rem|zadel|gevaar|brand/))       return REPLIES.veilig;
  if (m.match(/tip|aanbevel|oploss|advies|wat doen/)) return REPLIES.tips;
  return REPLIES.def;
};

/* ─── SMALL COMPONENTS ─────────────────────────────────────────────────────── */
const Badge = ({ label, color }) => (
  <span style={{
    background: `${color}18`, color, border: `1px solid ${color}30`,
    borderRadius: 5, padding: "2px 8px", fontSize: 10.5, fontWeight: 700,
    letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap",
  }}>{label}</span>
);

const Card = ({ children, sx = {} }) => (
  <div style={{
    background: W, borderRadius: 14, padding: "20px 22px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
    border: `1px solid ${BORDER}`, ...sx,
  }}>{children}</div>
);

const RedCard = ({ children, sx = {} }) => (
  <div style={{
    background: `linear-gradient(135deg, ${R2} 0%, ${R} 55%, ${R3} 100%)`,
    borderRadius: 16, padding: "22px 26px",
    boxShadow: `0 8px 32px ${R}40`, ...sx,
  }}>{children}</div>
);

const STitle = ({ children, sub }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 3, height: 18, background: R, borderRadius: 2, flexShrink: 0 }} />
      <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: INK, letterSpacing: "-0.1px" }}>{children}</h3>
    </div>
    {sub && <p style={{ margin: "3px 0 0 11px", fontSize: 11, color: MUTED }}>{sub}</p>}
  </div>
);

const KPI = ({ icon, label, value, sub, color = R, dark = false }) => (
  <div style={{
    background: dark ? `linear-gradient(135deg, ${R2}, ${R3})` : W,
    borderRadius: 13, padding: "17px 18px",
    borderTop: dark ? "none" : `3px solid ${color}`,
    boxShadow: dark ? `0 6px 24px ${R}45` : "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
    border: dark ? "none" : `1px solid ${BORDER}`,
  }}>
    <div style={{ fontSize: 20, marginBottom: 5 }}>{icon}</div>
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase",
      color: dark ? "rgba(255,255,255,0.6)" : MUTED, marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 900, lineHeight: 1, letterSpacing: "-1px",
      color: dark ? W : color }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: dark ? "rgba(255,255,255,0.55)" : MUTED, marginTop: 3 }}>{sub}</div>}
  </div>
);

const TTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: W, border: `1px solid ${BORDER}`, borderRadius: 10,
      padding: "10px 14px", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", fontSize: 12 }}>
      <div style={{ fontWeight: 800, marginBottom: 5, color: INK }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 7, alignItems: "center", color: "#444", marginBottom: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color, flexShrink: 0 }} />
          <span>{p.name}: <strong>{p.value}{p.unit || ""}</strong></span>
        </div>
      ))}
    </div>
  );
};

/* ─── CATEGORY COLOR HELPER ────────────────────────────────────────────────── */
const cc = (c) => ({ "Garantie": "#7C3AED", "Accu": R, "Motor": "#F59E0B",
  "Klantenservice": "#1B52D4", "Remmen": "#DC2626", "Levertijd": "#0891B2" }[c] || "#9CA3AF");
const uc = (u) => u === "Hoog" ? R : u === "Medium" ? "#F59E0B" : "#34D399";

/* ─── TABS CONFIG ──────────────────────────────────────────────────────────── */
const TABS = [
  { id: "overview", label: "Overzicht" },
  { id: "zomer",    label: "☀ Zomerpiek" },
  { id: "safety",   label: "⚠ Veiligheid" },
  { id: "explorer", label: "✉ Explorer" },
  { id: "advice",   label: "💡 Aanbevelingen" },
];

/* ═══════════════════════════════ MAIN APP ═══════════════════════════════════ */
export default function App() {
  const [authed,  setAuthed]  = useState(false);
  const [pw,      setPw]      = useState("");
  const [pwErr,   setPwErr]   = useState(false);
  const [shake,   setShake]   = useState(false);
  const [tab,     setTab]     = useState("overview");
  const [search,  setSearch]  = useState("");
  const [chatOpen,setChatOpen]= useState(false);
  const [msgs,    setMsgs]    = useState([{ role: "bot", text: REPLIES.def }]);
  const [chatIn,  setChatIn]  = useState("");
  const [loading, setLoading] = useState(false);
  const msgRef = useRef(null);

  useEffect(() => { msgRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const doLogin = () => {
    if (pw === "StellaNext2026") setAuthed(true);
    else { setPwErr(true); setShake(true); setTimeout(() => setShake(false), 480); }
  };

  const sendChat = () => {
    if (!chatIn.trim() || loading) return;
    const q = chatIn.trim();
    setMsgs(m => [...m, { role: "user", text: q }]);
    setChatIn(""); setLoading(true);
    setTimeout(() => { setMsgs(m => [...m, { role: "bot", text: reply(q) }]); setLoading(false); }, 820);
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return EMAILS;
    const q = search.toLowerCase();
    return EMAILS.filter(e =>
      e.txt.toLowerCase().includes(q) || e.s.toLowerCase().includes(q) ||
      e.f.toLowerCase().includes(q)   || e.c.toLowerCase().includes(q) ||
      e.sum.toLowerCase().includes(q)
    );
  }, [search]);

  const hl = (text, q) => {
    if (!q.trim()) return text;
    try {
      const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
      return text.split(re).map((p, i) =>
        re.test(p) ? <mark key={i} style={{ background: "#FEF08A", borderRadius: 2, padding: "0 1px" }}>{p}</mark> : p
      );
    } catch { return text; }
  };

  /* ─── LOGIN SCREEN ─────────────────────────────────────────────────────── */
  if (!authed) return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(150deg, ${R2} 0%, ${R} 50%, ${R3} 100%)`,
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", padding: 20,
      position: "relative", overflow: "hidden",
    }}>
      {/* Background cycling track lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }}
        preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 600">
        {/* Abstract wheel rings */}
        {[0.35, 0.5, 0.65, 0.8].map((r, i) => (
          <circle key={i} cx="650" cy="350" r={r * 480} stroke="white" strokeWidth="1.5" fill="none" />
        ))}
        {/* Spokes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1="650" y1="350"
            x2={650 + Math.cos(a) * 380} y2={350 + Math.sin(a) * 380}
            stroke="white" strokeWidth="0.8" />;
        })}
        <circle cx="-60" cy="200" r="280" stroke="white" strokeWidth="1.5" fill="none" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1="-60" y1="200"
            x2={-60 + Math.cos(a) * 280} y2={200 + Math.sin(a) * 280}
            stroke="white" strokeWidth="0.8" />;
        })}
      </svg>

      <div style={{
        background: W, borderRadius: 22, padding: "44px 40px",
        maxWidth: 408, width: "100%",
        boxShadow: "0 40px 100px rgba(0,0,0,0.35)",
        position: "relative", zIndex: 1, textAlign: "center",
      }}>
        {/* Logo centered */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <StellaIcon size={62} />
        </div>

        <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.22em", color: "#C8C9CE",
          textTransform: "uppercase", marginBottom: 5 }}>Business Intelligence Platform</div>
        <h1 style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 900, color: INK, letterSpacing: "-0.5px" }}>
          Stella Secure Access
        </h1>
        <p style={{ margin: "0 0 30px", color: MUTED, fontSize: 13, lineHeight: 1.75 }}>
          Klachtenintelligentie 2024–2026<br />
          <span style={{ color: R, fontWeight: 700 }}>1.810 klachten · vertrouwelijk intern</span>
        </p>

        <style>{`
          @keyframes shk { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-10px)} 40%{transform:translateX(10px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
          .stella-btn:hover { opacity: .88 !important; }
          .tab-btn:hover { background: #f5f6fa !important; color: #333 !important; }
          .tab-active { background: ${R} !important; color: white !important; box-shadow: 0 3px 12px ${R}35 !important; }
        `}</style>

        <div style={{ animation: shake ? "shk 0.48s ease" : "none" }}>
          <input
            type="password" value={pw}
            onChange={e => { setPw(e.target.value); setPwErr(false); }}
            onKeyDown={e => e.key === "Enter" && doLogin()}
            placeholder="Toegangscode..."
            style={{
              width: "100%", padding: "13px 16px", borderRadius: 10,
              border: `2px solid ${pwErr ? R : BORDER}`,
              background: pwErr ? "#FFF5F5" : W,
              fontSize: 14, outline: "none", boxSizing: "border-box",
              fontFamily: "inherit", marginBottom: pwErr ? 6 : 12,
              transition: "border-color 0.18s",
            }}
          />
          {pwErr && (
            <div style={{ color: R, fontSize: 12, fontWeight: 700, marginBottom: 10 }}>
              ✕&nbsp; Onjuiste toegangscode
            </div>
          )}
          <button onClick={doLogin} className="stella-btn" style={{
            width: "100%", padding: "13px", background: R, color: W,
            border: "none", borderRadius: 10, fontSize: 14, fontWeight: 800,
            cursor: "pointer", letterSpacing: "0.03em",
            boxShadow: `0 6px 22px ${R}45`, fontFamily: "inherit",
            transition: "opacity 0.18s",
          }}>
            Toegang verkrijgen →
          </button>
        </div>
        <div style={{ marginTop: 18, fontSize: 11, color: "#C8C9CE" }}>
          🔒 Uitsluitend voor intern gebruik Stella Next B.V.
        </div>
      </div>
    </div>
  );

  /* ─── DASHBOARD ────────────────────────────────────────────────────────── */
  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: INK }}>

      {/* ── TOP BAR ── */}
      <div style={{
        background: W, height: 58,
        borderBottom: `1px solid ${BORDER}`,
        display: "flex", alignItems: "center", padding: "0 20px", gap: 16,
        boxShadow: "0 2px 10px rgba(0,0,0,0.055)",
        position: "sticky", top: 0, zIndex: 400,
      }}>
        {/* Logo + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 11, flexShrink: 0 }}>
          <StellaIcon size={32} />
          <div style={{ borderLeft: `1px solid ${BORDER}`, paddingLeft: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: INK, lineHeight: 1, letterSpacing: "0.05em" }}>
              KLACHTEN DASHBOARD
            </div>
            <div style={{ fontSize: 9.5, color: MUTED, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Stella Next B.V.
            </div>
          </div>
        </div>

        {/* Tabs */}
        <nav style={{ display: "flex", gap: 2, flex: 1, overflowX: "auto" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={tab === t.id ? "tab-active" : "tab-btn"}
              style={{
                padding: "7px 14px", borderRadius: 8, border: "none",
                fontWeight: tab === t.id ? 800 : 500, fontSize: 13,
                cursor: "pointer", whiteSpace: "nowrap",
                fontFamily: "inherit", transition: "all 0.14s",
                color: tab === t.id ? W : "#666",
                background: tab === t.id ? R : "transparent",
              }}>{t.label}</button>
          ))}
        </nav>

        {/* Status + logout */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5,
            background: `${R}12`, borderRadius: 7, padding: "4px 10px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: R }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: R }}>LIVE · Feb 2026</span>
          </div>
          <button onClick={() => { setAuthed(false); setPw(""); }} style={{
            padding: "5px 10px", borderRadius: 7, border: `1px solid ${BORDER}`,
            background: "transparent", color: MUTED, fontSize: 11, cursor: "pointer", fontFamily: "inherit",
          }}>Uitloggen</button>
        </div>
      </div>

      {/* ── PAGE CONTENT ── */}
      <div style={{ padding: "22px 22px 80px", maxWidth: 1360, margin: "0 auto" }}>

        {/* ════════════════════ OVERVIEW ════════════════════ */}
        {tab === "overview" && (
          <div>
            {/* Hero banner — full red */}
            <RedCard sx={{ marginBottom: 22, position: "relative", overflow: "hidden" }}>
              {/* Wheel watermark */}
              <svg style={{ position: "absolute", right: -20, top: -60, opacity: 0.07 }} width="340" height="340" viewBox="0 0 340 340">
                {[0.3, 0.5, 0.7, 0.9].map((r, i) => (
                  <circle key={i} cx="170" cy="170" r={r * 160} stroke="white" strokeWidth="2" fill="none" />
                ))}
                {Array.from({ length: 16 }).map((_, i) => {
                  const a = (i / 16) * Math.PI * 2;
                  return <line key={i} x1="170" y1="170" x2={170 + Math.cos(a) * 144} y2={170 + Math.sin(a) * 144} stroke="white" strokeWidth="1" />;
                })}
              </svg>
              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.55)", fontWeight: 800,
                  letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 7 }}>
                  STELLA NEXT · EXECUTIVE DASHBOARD · 2024–2026
                </div>
                <h1 style={{ margin: "0 0 9px", fontSize: 27, fontWeight: 900, color: W, letterSpacing: "-0.5px" }}>
                  1.810 Klachten Geanalyseerd
                </h1>
                <p style={{ margin: "0 0 22px", color: "rgba(255,255,255,0.8)", fontSize: 13.5,
                  lineHeight: 1.75, maxWidth: 620 }}>
                  Volledige klachtenintelligentie voor Stella Next B.V. De data wijst op drie urgente thema's:
                  accudefecten (37%), structurele serviceproblemen in de zomer, en veiligheidskritieke hardwarefouten.
                </p>
                {/* Stat pills */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {[
                    { v: "671",  l: "Accu klachten", i: "🔋" },
                    { v: "41%",  l: "Bereikbaarheid jul", i: "📵" },
                    { v: "5.1u", l: "Wachttijd juli", i: "⏱" },
                    { v: "40%",  l: "Hoge urgentie", i: "⚠️" },
                    { v: "2.1",  l: "Sentiment / 5", i: "😤" },
                  ].map(s => (
                    <div key={s.l} style={{ background: "rgba(255,255,255,0.16)", borderRadius: 10,
                      padding: "11px 15px", backdropFilter: "blur(6px)", textAlign: "center", minWidth: 84 }}>
                      <div style={{ fontSize: 17, marginBottom: 2 }}>{s.i}</div>
                      <div style={{ fontSize: 19, fontWeight: 900, color: W, lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.62)", fontWeight: 600, marginTop: 2 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </RedCard>

            {/* KPIs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 18 }}>
              <KPI dark icon="📧" label="Totaal Klachten" value="1.810" sub="Unieke meldingen" />
              <KPI icon="🔋" label="Accu / Batterij"      value="671"   sub="37.1% van totaal" color={R} />
              <KPI icon="🏢" label="Klantenservice"       value="412"   sub="22.8% van totaal" color="#1B52D4" />
              <KPI icon="⚡" label="Motor"                 value="289"   sub="16.0% van totaal" color="#F59E0B" />
              <KPI icon="🛡️" label="Garantie"             value="198"   sub="10.9% van totaal" color="#7C3AED" />
            </div>

            {/* Charts */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, marginBottom: 16 }}>
              <Card>
                <STitle sub="Alle 1.810 klachten per categorie">Klachten per Categorie</STitle>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={CATS} layout="vertical" margin={{ left: 8, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0F1F5" />
                    <XAxis type="number" tick={{ fontSize: 11, fill: MUTED }} />
                    <YAxis type="category" dataKey="n" tick={{ fontSize: 12, fill: "#555" }} width={150} />
                    <Tooltip content={<TTip />} />
                    <Bar dataKey="v" name="Klachten" radius={[0, 7, 7, 0]}>
                      {CATS.map((e, i) => <Cell key={i} fill={e.c} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <STitle sub="1 = zeer boos, 5 = blij">Sentiment van Klanten</STitle>
                <ResponsiveContainer width="100%" height={170}>
                  <PieChart>
                    <Pie data={SENTIMENT} dataKey="v" cx="50%" cy="50%"
                      innerRadius={46} outerRadius={72} paddingAngle={2}>
                      {SENTIMENT.map((e, i) => <Cell key={i} fill={e.c} />)}
                    </Pie>
                    <Tooltip formatter={(v, n, p) => [`${v} klachten`, p.payload.n]} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginTop: 6 }}>
                  {SENTIMENT.map(s => (
                    <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: s.c }} />
                      <span style={{ color: MUTED }}>{s.n}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Bottom row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Card>
                <STitle sub="Prioritering van alle klachten">Urgentieverdeling</STitle>
                {URGENCY.map(u => (
                  <div key={u.n} style={{ marginBottom: 15 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{u.n}</span>
                      <span style={{ fontWeight: 800, fontSize: 13, color: u.c }}>
                        {u.v.toLocaleString()}
                        <span style={{ fontSize: 11, color: MUTED }}>&nbsp;({(u.v / 1810 * 100).toFixed(1)}%)</span>
                      </span>
                    </div>
                    <div style={{ background: "#F0F1F5", borderRadius: 5, height: 8, overflow: "hidden" }}>
                      <div style={{ width: `${u.v / 1810 * 100}%`, background: u.c, height: "100%", borderRadius: 5 }} />
                    </div>
                  </div>
                ))}
              </Card>

              <Card>
                <STitle sub="Hoe vaak komen servicetermen voor in klachtteksten">Service Failure Monitor</STitle>
                {SVCFAIL.map(sf => (
                  <div key={sf.t} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 11 }}>
                    <div style={{ width: 128, fontSize: 12, fontWeight: 600, color: "#444", flexShrink: 0 }}>
                      "{sf.t}"
                    </div>
                    <div style={{ flex: 1, background: "#F0F1F5", borderRadius: 4, height: 7 }}>
                      <div style={{ width: `${sf.v / 412 * 100}%`, height: "100%", borderRadius: 4,
                        background: `linear-gradient(90deg, ${R}, ${R3})` }} />
                    </div>
                    <div style={{ width: 32, textAlign: "right", fontSize: 13, fontWeight: 800, color: R }}>{sf.v}</div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        )}

        {/* ════════════════════ ZOMERPIEK ════════════════════ */}
        {tab === "zomer" && (
          <div>
            <RedCard sx={{ marginBottom: 22, position: "relative", overflow: "hidden" }}>
              <svg style={{ position: "absolute", right: -10, top: -40, opacity: 0.07 }} width="300" height="300" viewBox="0 0 300 300">
                {[0.3, 0.55, 0.8].map((r, i) => (
                  <circle key={i} cx="150" cy="150" r={r * 140} stroke="white" strokeWidth="2" fill="none" />
                ))}
                {Array.from({ length: 14 }).map((_, i) => {
                  const a = (i / 14) * Math.PI * 2;
                  return <line key={i} x1="150" y1="150" x2={150 + Math.cos(a) * 112} y2={150 + Math.sin(a) * 112} stroke="white" strokeWidth="1" />;
                })}
              </svg>
              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.55)", fontWeight: 800,
                  letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 7 }}>
                  ANALYSE · SEIZOENSDRUKTE · JUNI T/M AUGUSTUS
                </div>
                <h1 style={{ margin: "0 0 9px", fontSize: 25, fontWeight: 900, color: W, letterSpacing: "-0.4px" }}>
                  De Klantenservice Bezwijkt Elke Zomer
                </h1>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.82)", fontSize: 13.5, lineHeight: 1.78, maxWidth: 680 }}>
                  Juni t/m augustus tonen elk jaar dezelfde crisis: wachttijden tot 5+ uur, bereikbaarheid onder 50% en
                  2,3× meer klachten dan de rest van het jaar. De grafieken hieronder <strong style={{ color: W }}>bewijzen</strong> dat
                  de klantenservice structureel onderbezet is in het zomerseizoen.
                </p>
              </div>
            </RedCard>

            {/* Zomer KPIs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 18 }}>
              <KPI dark icon="📈" label="Zomer KS factor"       value="2.3×" sub="Meer klachten jun–aug vs rest" />
              <KPI icon="⏱"  label="Piek wachttijd (Jul)"  value="5.1u" sub="Norm: max 2 uur" color={R} />
              <KPI icon="📵" label="Bereikbaarheid (Jul)"  value="41%"  sub="Norm: minimaal 80%" color={R} />
              <KPI icon="🔁" label="Niet teruggebeld zomer" value="38%"  sub="vs 11% buiten zomer" color="#F59E0B" />
            </div>

            {/* Main stress chart */}
            <Card sx={{ marginBottom: 16 }}>
              <STitle sub="Rode punten = zomermaanden · stippellijn = faillissement nov 2024">
                Zomer-Stress Grafiek — Klachtenvolume per Maand
              </STitle>
              <div style={{ display: "flex", gap: 18, marginBottom: 14, flexWrap: "wrap" }}>
                {[
                  { c: R,          l: "Zomermaand (jun–aug)" },
                  { c: "#374151",  l: "Totaal klachten" },
                  { c: "#1B52D4",  l: "Klantenservice" },
                ].map(l => (
                  <div key={l.l} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12 }}>
                    <div style={{ width: 14, height: 4, borderRadius: 2, background: l.c }} />
                    <span style={{ color: "#555", fontWeight: 500 }}>{l.l}</span>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={MONTHLY} margin={{ top: 10, right: 8, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="gtot" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#374151" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#374151" stopOpacity={0.01} />
                    </linearGradient>
                    <linearGradient id="gks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#1B52D4" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#1B52D4" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F5" />
                  <XAxis dataKey="m" tick={{ fontSize: 12, fill: MUTED }} />
                  <YAxis tick={{ fontSize: 11, fill: MUTED }} />
                  <Tooltip content={<TTip />} />
                  <ReferenceLine x="Nov" stroke={INK} strokeDasharray="4 3"
                    label={{ value: "Faillissement", fontSize: 9.5, fill: INK, position: "insideTopRight" }} />
                  <Area type="monotone" dataKey="tot" stroke="#374151" fill="url(#gtot)"
                    strokeWidth={2.5} name="Totaal klachten"
                    dot={(props) => {
                      const d = MONTHLY[props.index];
                      if (!d) return null;
                      return <circle key={`t${props.index}`} cx={props.cx} cy={props.cy}
                        r={d.z ? 7 : 3} fill={d.z ? R : "#374151"}
                        stroke={d.z ? W : "none"} strokeWidth={d.z ? 2 : 0} />;
                    }} />
                  <Area type="monotone" dataKey="ks" stroke="#1B52D4" fill="url(#gks)"
                    strokeWidth={2.5} name="KS klachten" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Wachttijd + Bereikbaarheid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <Card>
                <STitle sub="Gemiddelde wachttijd per maand in uren">
                  ⏱ Wachttijd Explodeert in de Zomer
                </STitle>
                <ResponsiveContainer width="100%" height={210}>
                  <BarChart data={MONTHLY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F5" />
                    <XAxis dataKey="m" tick={{ fontSize: 11, fill: MUTED }} />
                    <YAxis tick={{ fontSize: 11, fill: MUTED }} unit="u" />
                    <Tooltip content={<TTip />} />
                    <ReferenceLine y={2} stroke="#F59E0B" strokeDasharray="4 3"
                      label={{ value: "Norm 2u", fontSize: 10, fill: "#F59E0B", position: "insideTopRight" }} />
                    <Bar dataKey="wacht" name="Wachttijd" unit="u" radius={[5, 5, 0, 0]}>
                      {MONTHLY.map((e, i) => <Cell key={i} fill={e.z ? R : "#CBD5E1"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ marginTop: 10, padding: "9px 12px", background: "#FEF2F2",
                  borderRadius: 8, fontSize: 12, color: "#7F1D1D" }}>
                  🔴 <strong>Juli: 5,1 uur</strong> wachttijd — <strong>3,6× boven de norm</strong> van 2 uur
                </div>
              </Card>

              <Card>
                <STitle sub="Percentage klanten dat de klantenservice bereikt">
                  📵 Bereikbaarheid Klantenservice
                </STitle>
                <ResponsiveContainer width="100%" height={210}>
                  <LineChart data={MONTHLY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F5" />
                    <XAxis dataKey="m" tick={{ fontSize: 11, fill: MUTED }} />
                    <YAxis tick={{ fontSize: 11, fill: MUTED }} unit="%" domain={[30, 100]} />
                    <Tooltip content={<TTip />} />
                    <ReferenceLine y={80} stroke="#34D399" strokeDasharray="4 3"
                      label={{ value: "Target 80%", fontSize: 10, fill: "#34D399", position: "insideTopRight" }} />
                    <Line type="monotone" dataKey="bereik" stroke={R} strokeWidth={3}
                      name="Bereikbaarheid" unit="%"
                      dot={(props) => {
                        const d = MONTHLY[props.index];
                        if (!d) return null;
                        return <circle key={`b${props.index}`} cx={props.cx} cy={props.cy}
                          r={d.z ? 7 : 3} fill={d.z ? R : "#374151"}
                          stroke={W} strokeWidth={d.z ? 2 : 0} />;
                      }} />
                  </LineChart>
                </ResponsiveContainer>
                <div style={{ marginTop: 10, padding: "9px 12px", background: "#FEF2F2",
                  borderRadius: 8, fontSize: 12, color: "#7F1D1D" }}>
                  🔴 <strong>Juli: 41% bereikbaar</strong> — <strong>59% van klanten</strong> krijgt niemand aan de lijn
                </div>
              </Card>
            </div>

            {/* Zomer vs rest grouped bar */}
            <Card>
              <STitle sub="Directe vergelijking: zomer (jun–aug) vs. rest van het jaar">
                Zomer vs. Rest v/h Jaar — Alle Service Metrics
              </STitle>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart layout="vertical" margin={{ left: 20 }} data={[
                  { m: "KS klachten / maand",    z: 61,  r: 27  },
                  { m: "Wachttijd (uren)",        z: 4.5, r: 1.4 },
                  { m: "Niet teruggebeld (%)",    z: 38,  r: 11  },
                  { m: "Bereikbaarheid (%)",      z: 49,  r: 85  },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0F1F5" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: MUTED }} />
                  <YAxis type="category" dataKey="m" tick={{ fontSize: 12, fill: "#555" }} width={185} />
                  <Tooltip content={<TTip />} />
                  <Legend />
                  <Bar dataKey="z" name="☀ Zomer (jun–aug)" fill={R}       radius={[0, 5, 5, 0]} />
                  <Bar dataKey="r" name="Rest van jaar"     fill="#94A3B8"  radius={[0, 5, 5, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {/* ════════════════════ VEILIGHEID ════════════════════ */}
        {tab === "safety" && (
          <div>
            <div style={{
              background: `linear-gradient(135deg, #1A0003, ${R2})`,
              borderRadius: 16, padding: "22px 26px", marginBottom: 22,
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            }}>
              <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.5)", fontWeight: 800,
                letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 7 }}>
                VEILIGHEIDSMONITOR · PRIORITEIT 1
              </div>
              <h1 style={{ margin: "0 0 6px", fontSize: 23, fontWeight: 900, color: W }}>
                ⚠ Kritieke Hardware-incidenten
              </h1>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.72)", fontSize: 13.5 }}>
                584 klachten betreffen directe veiligheidsrisico's voor gebruikers. Meerdere bijna-ongelukken en letsel gemeld.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 18 }}>
              <KPI dark icon="🛑" label="Rem defecten"   value="134" sub="Potentieel levensgevaarlijk" />
              <KPI dark icon="🪑" label="Zadel breuken"  value="89"  sub="Valincidenten bevestigd" />
              <KPI icon="⚡"      label="Accu lekkage"   value="47"  sub="Brandgevaar klasse A" color="#F59E0B" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }}>
              <Card>
                <STitle sub="Meldingen per type veiligheidsincident">Incidenten per Type</STitle>
                <ResponsiveContainer width="100%" height={270}>
                  <BarChart data={SAFETY} layout="vertical" margin={{ left: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0F1F5" />
                    <XAxis type="number" tick={{ fontSize: 11, fill: MUTED }} />
                    <YAxis type="category" dataKey="t" tick={{ fontSize: 12, fill: "#555" }} width={190} />
                    <Tooltip content={<TTip />} />
                    <Bar dataKey="v" name="Meldingen" radius={[0, 7, 7, 0]}>
                      {SAFETY.map((e, i) => <Cell key={i} fill={e.r === "KRITIEK" ? R : e.r === "HOOG" ? "#F59E0B" : "#34D399"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <STitle>Risicoclassificatie</STitle>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[...SAFETY].sort((a, b) => b.v - a.v).map(s => (
                    <div key={s.t} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "11px 13px", borderRadius: 10,
                      background: s.r === "KRITIEK" ? "#FEF2F2" : s.r === "HOOG" ? "#FFFBEB" : "#F0FDF4",
                      border: `1px solid ${s.r === "KRITIEK" ? "#FECACA" : s.r === "HOOG" ? "#FDE68A" : "#BBF7D0"}`,
                    }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{s.t}</div>
                        <div style={{ fontSize: 11, color: MUTED }}>{s.v} meldingen</div>
                      </div>
                      <Badge label={s.r} color={s.r === "KRITIEK" ? R : s.r === "HOOG" ? "#F59E0B" : "#34D399"} />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ════════════════════ EMAIL EXPLORER ════════════════════ */}
        {tab === "explorer" && (
          <div>
            <div style={{
              background: "linear-gradient(135deg, #1B3A8A, #1B52D4)",
              borderRadius: 16, padding: "22px 26px", marginBottom: 22,
              boxShadow: "0 8px 32px rgba(27,82,212,0.28)",
            }}>
              <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.55)", fontWeight: 800,
                letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 7 }}>
                EMAIL EXPLORER · REPRESENTATIEVE STEEKPROEF
              </div>
              <h1 style={{ margin: "0 0 6px", fontSize: 23, fontWeight: 900, color: W }}>
                ✉ Doorzoek Klachten
              </h1>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 13.5 }}>
                Zoek live door klachtteksten, onderwerp, afzender en categorie ·
                probeer: <strong style={{ color: W }}>remmen · gevaarlijk · ridderkerk · accu · wachttijd · zomer</strong>
              </p>
            </div>

            <Card sx={{ marginBottom: 14 }}>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                  color: MUTED, fontSize: 15 }}>🔍</span>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Zoek in e-mailinhoud, onderwerp, afzender of categorie..."
                  style={{
                    width: "100%", padding: "12px 40px", borderRadius: 9,
                    border: `2px solid ${search ? R : BORDER}`,
                    fontSize: 13.5, outline: "none", boxSizing: "border-box",
                    fontFamily: "inherit", transition: "border-color 0.18s",
                  }} />
                {search && (
                  <button onClick={() => setSearch("")} style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: MUTED, fontSize: 15,
                  }}>✕</button>
                )}
              </div>
              <div style={{ display: "flex", gap: 7, marginTop: 11, flexWrap: "wrap" }}>
                {["gevaarlijk", "remmen", "ridderkerk", "accu", "wachttijd", "zomer", "motor", "garantie", "onbereikbaar", "fabricagefout"].map(t => (
                  <button key={t} onClick={() => setSearch(search === t ? "" : t)} style={{
                    padding: "4px 12px", borderRadius: 20,
                    border: `1px solid ${R}35`,
                    background: search === t ? R : "transparent",
                    color: search === t ? W : R,
                    fontSize: 12, cursor: "pointer", fontWeight: 700,
                    transition: "all 0.14s", fontFamily: "inherit",
                  }}>{t}</button>
                ))}
              </div>
            </Card>

            <div style={{ fontSize: 12, color: MUTED, marginBottom: 11, fontWeight: 600 }}>
              {search
                ? <><strong style={{ color: R }}>{filtered.length}</strong> resultaten voor "{search}" · steekproef van {EMAILS.length} e-mails</>
                : <>{EMAILS.length} geselecteerde klachten — alle categorieën vertegenwoordigd</>}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {filtered.length === 0 ? (
                <Card sx={{ textAlign: "center", padding: "44px 24px" }}>
                  <div style={{ fontSize: 42, marginBottom: 12 }}>🔍</div>
                  <div style={{ fontWeight: 700, color: "#444" }}>Geen resultaten voor "{search}"</div>
                  <div style={{ fontSize: 13, color: MUTED, marginTop: 6 }}>Probeer een andere zoekterm</div>
                </Card>
              ) : filtered.map(e => (
                <div key={e.nr} style={{
                  background: W, borderRadius: 12, padding: "16px 19px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 14px rgba(0,0,0,0.06)",
                  border: `1px solid ${BORDER}`, borderLeft: `4px solid ${cc(e.c)}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    gap: 12, marginBottom: 9 }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 13.5, color: INK, marginBottom: 2 }}>
                        {hl(e.s, search)}
                      </div>
                      <div style={{ fontSize: 11, color: MUTED }}>
                        📅 {e.d} &nbsp;·&nbsp; 👤 {hl(e.f, search)}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <Badge label={e.c} color={cc(e.c)} />
                      <Badge label={e.u} color={uc(e.u)} />
                    </div>
                  </div>
                  <div style={{ fontSize: 12.5, color: "#555", lineHeight: 1.68,
                    padding: "9px 12px", background: "#F8F9FC", borderRadius: 7, marginBottom: 7 }}>
                    {hl(e.txt, search)}
                  </div>
                  <div style={{ fontSize: 11.5, color: "#666" }}>
                    💬 <strong>Samenvatting:</strong> {e.sum}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════ AANBEVELINGEN ════════════════════ */}
        {tab === "advice" && (
          <div>
            <div style={{
              background: "linear-gradient(135deg, #0D0D0D, #1E2432)",
              borderRadius: 16, padding: "22px 26px", marginBottom: 22,
              boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
            }}>
              <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.45)", fontWeight: 800,
                letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 7 }}>
                MANAGEMENT AANBEVELINGEN · STELLA NEXT 2026
              </div>
              <h1 style={{ margin: "0 0 8px", fontSize: 23, fontWeight: 900, color: W }}>
                💡 Hoe Lossen We de Zomerpiek Op?
              </h1>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.65)", fontSize: 13.5, lineHeight: 1.78, maxWidth: 700 }}>
                De data toont één structureel probleem dat elk jaar terugkeert: de klantenservice loopt vast in de zomer.
                Hieronder drie concrete oplossingsrichtingen — elk gebaseerd op de klachtendata van 1.810 e-mails.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Opt 1 — AI chatbot */}
              <Card sx={{ borderLeft: `5px solid ${R}` }}>
                <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 54, height: 54, background: "#FEF2F2", borderRadius: 13,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 26, flexShrink: 0 }}>🤖</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 10, color: R, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        Optie 1 · Hoogste impact
                      </span>
                      <Badge label="AI INNOVATIE" color={R} />
                    </div>
                    <h2 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 900 }}>
                      AI-chatbot als 24/7 Klantenservice
                    </h2>
                    <p style={{ color: "#555", fontSize: 13.5, lineHeight: 1.82, margin: "0 0 16px" }}>
                      Een AI-chatbot op stella.nl beantwoordt <strong>60–70% van alle standaardvragen</strong> direct —
                      zonder wachttijd, 24/7 bereikbaar. Vragen als "Hoe reset ik mijn accu?",
                      "Welk servicepunt is dichtbij?" of "Hoe werkt de garantie?" worden automatisch
                      en consistent beantwoord. Klanten met een complexe klacht worden slim doorgestuurd naar een medewerker.
                      Precies wat nodig is in de zomer, wanneer 59% van de klanten nu niemand aan de lijn krijgt.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 11, marginBottom: 14 }}>
                      {[
                        { i: "⏱", l: "Wachttijd",    v: "0 sec",  n: "was 5,1 uur",  g: true },
                        { i: "📵", l: "Bereikbaar",   v: "100%",   n: "was 41% (jul)", g: true },
                        { i: "💬", l: "% opgelost",   v: "95%",    n: "was 60%",       g: true },
                        { i: "💰", l: "Kosten/contact", v: "€0.40", n: "was ~€15",     g: true },
                      ].map(s => (
                        <div key={s.l} style={{ background: "#F8F9FC", borderRadius: 10, padding: "11px 12px" }}>
                          <div style={{ fontSize: 17, marginBottom: 4 }}>{s.i}</div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase", marginBottom: 4 }}>{s.l}</div>
                          <div style={{ fontSize: 13, fontWeight: 800, color: "#22C55E" }}>{s.v}</div>
                          <div style={{ fontSize: 10, color: MUTED }}>{s.n}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Opt 2 — Seizoensplanning */}
              <Card sx={{ borderLeft: "5px solid #F59E0B" }}>
                <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 54, height: 54, background: "#FFFBEB", borderRadius: 13,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 26, flexShrink: 0 }}>📅</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: "#B45309", fontWeight: 800, letterSpacing: "0.1em",
                      textTransform: "uppercase", marginBottom: 8 }}>Optie 2 · Structurele capaciteitsoplossing</div>
                    <h2 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 900 }}>
                      Seizoensgebonden Personeelsplanning
                    </h2>
                    <p style={{ color: "#555", fontSize: 13.5, lineHeight: 1.82, margin: "0 0 14px" }}>
                      Op basis van twee jaar klachtendata weten we precies wanneer de piek optreedt.
                      Juni t/m augustus vereist structureel <strong>+40–50% extra capaciteit</strong>.
                      Een flex-pool van 8–10 medewerkers (studenten, seizoenskrachten) die elk jaar
                      van mei t/m september wordt ingezet, lost de jaarlijkse service-crisis op.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Opt 3 — Proactief */}
              <Card sx={{ borderLeft: "5px solid #1B52D4" }}>
                <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 54, height: 54, background: "#EFF6FF", borderRadius: 13,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 26, flexShrink: 0 }}>📢</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: "#1B52D4", fontWeight: 800, letterSpacing: "0.1em",
                      textTransform: "uppercase", marginBottom: 8 }}>Optie 3 · Drukte voorkómen</div>
                    <h2 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 900 }}>
                      Proactieve Communicatie & Zelfservice
                    </h2>
                    <p style={{ color: "#555", fontSize: 13.5, lineHeight: 1.82, margin: "0 0 14px" }}>
                      Veel zomerse klachten zijn <strong>voorspelbaar</strong>: accu's reageren slecht op warmte,
                      gebruik stijgt in vakanties. Door klanten in mei proactief te informeren
                      ("Bereid je fiets voor op de zomer") en een zelfservice-statusportaal te bieden,
                      kan <strong>tot 30% van de zomerse klachten worden voorkómen</strong>.
                    </p>
                  </div>
                </div>
              </Card>

            </div>
          </div>
        )}
      </div>

      {/* ─── FLOATING AI CHAT ─────────────────────────────────────────────────── */}
      <div style={{ position: "fixed", bottom: 22, right: 22, zIndex: 600 }}>
        {chatOpen && (
          <div style={{
            position: "absolute", bottom: 66, right: 0,
            width: 358, background: W, borderRadius: 17,
            boxShadow: "0 20px 60px rgba(0,0,0,0.17)",
            border: `1px solid ${BORDER}`, overflow: "hidden",
          }}>
            {/* Header */}
            <div style={{
              background: `linear-gradient(120deg, ${R2}, ${R})`,
              padding: "13px 16px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 33, height: 33, background: "rgba(255,255,255,0.18)",
                  borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
                <div>
                  <div style={{ color: W, fontWeight: 800, fontSize: 13 }}>Stella Data-Assistent</div>
                  <div style={{ color: "rgba(255,255,255,0.62)", fontSize: 10.5 }}>Gebaseerd op 1.810 klachten</div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} style={{
                background: "none", border: "none", color: "rgba(255,255,255,0.7)",
                fontSize: 18, cursor: "pointer", padding: 4,
              }}>✕</button>
            </div>

            {/* Messages */}
            <div style={{ height: 265, overflowY: "auto", padding: "12px 13px",
              display: "flex", flexDirection: "column", gap: 9 }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "85%", padding: "9px 12px", fontSize: 12.5, lineHeight: 1.65,
                    whiteSpace: "pre-line",
                    borderRadius: m.role === "user" ? "13px 13px 3px 13px" : "13px 13px 13px 3px",
                    background: m.role === "user" ? R : "#F2F3F7",
                    color: m.role === "user" ? W : INK,
                  }}>{m.text}</div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{ background: "#F2F3F7", borderRadius: "12px 12px 12px 3px",
                    padding: "9px 15px", color: MUTED, fontSize: 16 }}>···</div>
                </div>
              )}
              <div ref={msgRef} />
            </div>

            {/* Quick topics */}
            <div style={{ padding: "6px 11px 7px", display: "flex", gap: 6,
              flexWrap: "wrap", borderTop: `1px solid ${BORDER}` }}>
              {["Zomerpiek", "Accu probleem", "AI chatbot", "Bereikbaarheid", "Tips"].map(q => (
                <button key={q} onClick={() => setChatIn(q)} style={{
                  padding: "3px 10px", borderRadius: 12, border: `1px solid ${R}28`,
                  background: "transparent", color: R, fontSize: 11, cursor: "pointer",
                  fontWeight: 700, fontFamily: "inherit",
                }}>{q}</button>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: "8px 10px", display: "flex", gap: 7, borderTop: `1px solid ${BORDER}` }}>
              <input value={chatIn} onChange={e => setChatIn(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendChat()}
                placeholder="Stel een vraag over de data..."
                style={{
                  flex: 1, padding: "8px 11px", borderRadius: 8,
                  border: `1px solid ${BORDER}`, fontSize: 13,
                  outline: "none", fontFamily: "inherit",
                }} />
              <button onClick={sendChat} style={{
                background: R, color: W, border: "none", borderRadius: 8,
                padding: "8px 13px", cursor: "pointer", fontSize: 15, fontWeight: 800,
                fontFamily: "inherit",
              }}>→</button>
            </div>
          </div>
        )}

        {/* FAB */}
        <button onClick={() => setChatOpen(o => !o)} style={{
          width: 52, height: 52,
          background: `linear-gradient(135deg, ${R2}, ${R3})`,
          border: "none", borderRadius: 14, cursor: "pointer",
          boxShadow: `0 8px 26px ${R}50`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, transition: "transform 0.18s, box-shadow 0.18s",
        }}
          onMouseOver={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = `0 12px 32px ${R}65`; }}
          onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 8px 26px ${R}50`; }}
        >{chatOpen ? "✕" : "🤖"}</button>
      </div>

      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  );
}