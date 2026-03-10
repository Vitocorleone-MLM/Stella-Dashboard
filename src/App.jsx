import { useState, useMemo, useRef, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ReferenceLine, Legend, RadarChart,
  Radar, PolarGrid, PolarAngleAxis
} from "recharts";

const R="#E30613",R2="#B8000E",R3="#FF2030",BG="#F2F3F7",W="#FFFFFF",INK="#111216",MUTED="#72737A",BORDER="#E4E5EA";

const LOGO_B64="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";

const StellaIcon=({size=40,style={}})=>(
  <img src={`data:image/jpeg;base64,${LOGO_B64}`} alt="Stella" style={{width:size,height:"auto",display:"block",...style}}/>
);

/* ─── DATA ── */
const MONTHLY=[
  {m:"Jan",tot:83, ks:18,gemist:null,bereik:82,z:false},
  {m:"Feb",tot:86, ks:21,gemist:null,bereik:82,z:false},
  {m:"Mrt",tot:78, ks:19,gemist:null,bereik:82,z:false},
  {m:"Apr",tot:82, ks:24,gemist:null,bereik:82,z:false},
  {m:"Mei",tot:83, ks:26,gemist:1315,bereik:82.6,z:false},
  {m:"Jun",tot:126,ks:54,gemist:1973,bereik:76.4,z:true},
  {m:"Jul",tot:149,ks:67,gemist:2448,bereik:77.1,z:true},
  {m:"Aug",tot:141,ks:61,gemist:2930,bereik:74.0,z:true},
  {m:"Sep",tot:93, ks:29,gemist:null,bereik:82,z:false},
  {m:"Okt",tot:80, ks:22,gemist:null,bereik:82,z:false},
  {m:"Nov",tot:134,ks:48,gemist:null,bereik:82,z:false},
  {m:"Dec",tot:124,ks:43,gemist:null,bereik:82,z:false},
];

const CATS=[
  {n:"Accu / Batterij",       v:671,c:R},
  {n:"Klantenservice",        v:412,c:"#1B52D4"},
  {n:"Motor / Ondersteuning", v:289,c:"#F59E0B"},
  {n:"Garantie",              v:198,c:"#7C3AED"},
  {n:"Remmen",                v:112,c:"#DC2626"},
  {n:"Levertijd",             v:78, c:"#0891B2"},
  {n:"Overig",                v:50, c:"#9CA3AF"},
];

const SENTIMENT=[
  {n:"Zeer boos (1)",v:523,c:R},
  {n:"Boos (2)",     v:487,c:"#FF6B35"},
  {n:"Neutraal (3)", v:412,c:"#FBBF24"},
  {n:"Tevreden (4)", v:278,c:"#34D399"},
  {n:"Blij (5)",     v:110,c:"#38BDF8"},
];

const URGENCY=[
  {n:"Hoog",  v:734,c:R},
  {n:"Medium",v:698,c:"#F59E0B"},
  {n:"Laag",  v:378,c:"#34D399"},
];

const SVCFAIL=[
  {t:"geen reactie",     v:412},
  {t:"niet teruggebeld", v:287},
  {t:"onbereikbaar",     v:234},
  {t:"wachttijd",        v:198},
  {t:"slechte service",  v:176},
  {t:"niet geholpen",    v:143},
];

const SAFETY=[
  {t:"Rem defect tijdens rijden",v:134,r:"KRITIEK"},
  {t:"Motor uitval op weg",      v:203,r:"HOOG"},
  {t:"Zadel afgebroken",         v:89, r:"KRITIEK"},
  {t:"Accu lekkage / brand",     v:47, r:"KRITIEK"},
  {t:"Bagagedrager breuk",       v:78, r:"MEDIUM"},
  {t:"Stuur / vork defect",      v:31, r:"KRITIEK"},
];

const EMAILS=[
  {nr:3,  d:"08-02-2026",s:"Klacht – zadel afgebroken",                 f:"Peter Berben",   c:"Garantie",      u:"Hoog",  txt:"Ik ben in het bezit van een Stella fiets en ben gevallen doordat mijn zadel plotseling afbrak. Ik weeg 75 kg dus de breuk kan niet door overgewicht zijn ontstaan. Is er sprake van een fabricagefout?",sum:"Zadel brak plotseling af tijdens gebruik; klant gevallen maar niet gewond."},
  {nr:6,  d:"06-02-2026",s:"Formele ingebrekestelling Stella Vicenza",   f:"Jan van Hout",   c:"Motor",         u:"Hoog",  txt:"De motor valt herhaaldelijk uit waardoor de trapondersteuning wegvalt. De fiets is inmiddels circa tien keer ter reparatie aangeboden. Bij uitblijven van een reactie geef ik de zaak aan mijn rechtsbijstandsverzekeraar.",sum:"Motor valt herhaaldelijk uit na 10+ reparaties; dreigt met rechtsbijstand."},
  {nr:11, d:"02-02-2026",s:"Stopzetten verzekering en klacht",           f:"Suat Yigitsoy",  c:"Accu",          u:"Hoog",  txt:"Mijn accu heeft accuz