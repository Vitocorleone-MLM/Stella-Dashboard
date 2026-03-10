import { useState, useMemo, useRef, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ReferenceLine, Legend
} from "recharts";

const R="#E30613",R2="#B8000E",R3="#FF2030",BG="#F2F3F7",W="#FFFFFF",INK="#111216",MUTED="#72737A",BORDER="#E4E5EA";

const LOGO_SRC="data:image/png;base64,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";

const StellaIcon=({size=40,style={}})=>(
  <img src={LOGO_SRC} alt="Stella" style={{width:size,height:size,objectFit:"contain",...style}}/>
);

const MONTHLY=[
  {m:"Jan",tot:83, ks:18,gemist:837, bereik:85.6,z:false},
  {m:"Feb",tot:86, ks:21,gemist:837, bereik:85.6,z:false},
  {m:"Mrt",tot:78, ks:19,gemist:837, bereik:85.6,z:false},
  {m:"Apr",tot:82, ks:24,gemist:837, bereik:85.6,z:false},
  {m:"Mei",tot:83, ks:26,gemist:1315,bereik:82.6,z:false},
  {m:"Jun",tot:126,ks:54,gemist:1973,bereik:76.4,z:true},
  {m:"Jul",tot:149,ks:67,gemist:2448,bereik:77.1,z:true},
  {m:"Aug",tot:141,ks:61,gemist:2930,bereik:74.0,z:true},
  {m:"Sep",tot:93, ks:29,gemist:837, bereik:85.6,z:false},
  {m:"Okt",tot:80, ks:22,gemist:837, bereik:85.6,z:false},
  {m:"Nov",tot:134,ks:48,gemist:837, bereik:85.6,z:false},
  {m:"Dec",tot:124,ks:43,gemist:837, bereik:85.6,z:false},
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
  {nr:3,  d:"08-02-2026",s:"Klacht - zadel afgebroken",                f:"Peter Berben",   c:"Garantie",      u:"Hoog",  txt:"Ik ben in het bezit van een Stella fiets en ben gevallen doordat mijn zadel plotseling afbrak. Ik weeg 75 kg dus de breuk kan niet door overgewicht zijn ontstaan.",sum:"Zadel brak plotseling af tijdens gebruik; klant gevallen maar niet gewond."},
  {nr:6,  d:"06-02-2026",s:"Formele ingebrekestelling Stella Vicenza", f:"Jan van Hout",   c:"Motor",         u:"Hoog",  txt:"De motor valt herhaaldelijk uit waardoor de trapondersteuning wegvalt. De fiets is inmiddels circa tien keer ter reparatie aangeboden.",sum:"Motor valt herhaaldelijk uit na 10+ reparaties; dreigt met rechtsbijstand."},
  {nr:11, d:"02-02-2026",s:"Stopzetten verzekering en klacht",         f:"Suat Yigitsoy",  c:"Accu",          u:"Hoog",  txt:"Mijn accu heeft accuzuur gelekt. De fiets roest nu letterlijk weg. Ik wil mijn verzekering per direct opzeggen.",sum:"Accu lekte accuzuur; fiets roest; klant wil per direct opzeggen."},
  {nr:13, d:"01-02-2026",s:"Zadel en rem afgebroken - gevaarlijk",     f:"Jeroen de Bruin",c:"Garantie",      u:"Hoog",  txt:"De bout onderaan mijn zadel brak volledig af. Eerder brak ook al een remhendel af tijdens het fietsen. Voor een fiets van meer dan 3000 euro vind ik twee gevaarlijke incidenten in 2,5 jaar volstrekt onacceptabel.",sum:"Zadel en rem afgebroken op 3000 euro fiets; klant eist gratis hulp."},
  {nr:18, d:"29-01-2026",s:"Voortdurende problemen - overweeg Kassa",  f:"Hayke Hendrix",  c:"Klantenservice",u:"Hoog",  txt:"Gisteren een bericht gestuurd en wederom geen reactie van Stella ontvangen. Ik denk er serieus over na om met mijn verhaal richting consumentenprogrammas als Kassa te gaan.",sum:"Jarenlange slechte service; klant overweegt Kassa; eist compensatie."},
  {nr:24, d:"02-02-2026",s:"Grove medewerker filiaal Schiedam",        f:"Mariska Maas",   c:"Klantenservice",u:"Hoog",  txt:"De verkoper in Schiedam zei letterlijk: ga je toch lekker naar een ander bedrijf. Wij hebben er al vier Stella-fietsen gekocht maar door dit gedrag nooit meer.",sum:"Medewerker Schiedam stuurde klant brutaal weg na vier eerdere aankopen."},
  {nr:55, d:"15-01-2026",s:"4 weken zonder werkende remmen",           f:"O. Zakharchuk",  c:"Remmen",        u:"Hoog",  txt:"Ik wacht al 4 weken voor een terugbelafspraak. Remmen doen het niet. Ik fiets 4 weken lang zonder remmen. Dit is levensgevaarlijk.",sum:"Vier weken zonder werkende remmen; wacht nog steeds op terugbelafspraak."},
  {nr:78, d:"03-01-2026",s:"Accu vastzittend in frame - brandgevaar",  f:"Lindsey Pronk",  c:"Accu",          u:"Hoog",  txt:"De accu van mijn Dolce Black zit vast in het frame. Meerdere fietsenmakers weigeren mijn fiets in behandeling te nemen vanwege het brandgevaar van de accu.",sum:"Accu vastzittend; fietsenmakers weigeren wegens brandgevaar."},
  {nr:312,d:"15-08-2025",s:"3 weken onbereikbaar - zomer",             f:"R. Hofman",      c:"Klantenservice",u:"Hoog",  txt:"Ik probeer jullie al weken te bereiken maar niemand neemt op. In de zomer lijkt er niemand te werken bij Stella. Drie weken al geen fiets.",sum:"3 weken onbereikbaar in zomer; klant zit compleet zonder fiets."},
  {nr:445,d:"20-07-2025",s:"5 uur wachttijd - zomer onacceptabel",     f:"K. Bogaert",     c:"Klantenservice",u:"Hoog",  txt:"Ik wacht nu al meer dan 5 uur in de wachtrij voor ik iemand aan de lijn krijg. Mijn fiets staat al 2 weken te wachten op een simpele reparatie.",sum:"5+ uur wachttijd in zomer; simpele reparatie wacht al 2 weken."},
  {nr:512,d:"08-07-2025",s:"Accu kapot - 3x niet teruggebeld zomer",   f:"P. Willems",     c:"Accu",          u:"Hoog",  txt:"Accu kapot. Al drie keer gebeld en steeds beloven ze terug te bellen. Niemand belt terug. Het is zomer en ik gebruik mijn fiets dagelijks voor mijn werk.",sum:"Accu kapot; drie terugbelbeloftes in zomer; niemand belt terug."},
  {nr:756,d:"14-05-2025",s:"Levering 5 maanden te laat",               f:"T. Smit",        c:"Levertijd",     u:"Medium",txt:"Besteld in december met levertijd 4 weken. Nu zijn we 5 maanden later en ik heb nog steeds geen fiets.",sum:"Bestelling van december nog niet geleverd in mei; herhaalde beloftes."},
];

const TP_STARS=[
  {s:"5 sterren",v:70,pct:47,thema:"Persoonlijke service, vriendelijk personeel",c:"#34D399"},
  {s:"4 sterren",v:18,pct:12,thema:"Goede ervaring, kleine kanttekening",        c:"#86EFAC"},
  {s:"3 sterren",v:3, pct:2, thema:"Wisselvallig",                               c:"#FBBF24"},
  {s:"2 sterren",v:8, pct:5, thema:"Teleurstelling zonder ernstige schade",      c:"#FB923C"},
  {s:"1 ster",   v:49,pct:33,thema:"Structurele problemen, woede",               c:R},
];

const TP_THEMES=[
  {t:"Garantieweigering na faillissement",v:40,c:"#7C3AED",icon:"🛡️",desc:"Na doorstart dec. 2024 worden alle garanties, zorgeloos-pakketten en serviceabonnementen eenzijdig stopgezet."},
  {t:"Accu- en motordefecten",            v:30,c:R,        icon:"🔋",desc:"Accu's gaan na 1,5-2,5 jaar kapot. Vervangingskosten 550-850 euro. Lokale fietsmakers weigeren reparatie."},
  {t:"Onbereikbaarheid klantenservice",   v:25,c:"#1B52D4",icon:"📵",desc:"Telefoonnummers leiden naar computerloop. E-mails weken onbeantwoord. Contactformulier werkt niet."},
  {t:"Veiligheidsproblemen",              v:15,c:"#DC2626",icon:"⚠️",desc:"Bagagedragers breken met kinderen in kinderzitje. Stella weigert garantie via faillissementsconstructie."},
  {t:"Oneerlijke kosten",                 v:12,c:"#F59E0B",icon:"💶",desc:"Verplichte aankoop onnodige modules, foutieve afschrijvingen, betalen voor erkende ontwerpfouten."},
  {t:"Vestigingssluiting",                v:10,c:"#0891B2",icon:"🏪",desc:"Meerdere filialen gesloten. Klanten reizen 1,5+ uur voor service. Lokale makers weigeren Stella-fietsen."},
];

const TP_MEDEWERKERS=[
  {naam:"Mehmet", filiaal:"Ridderkerk",        comp:"Vriendelijk, vakkundig, behulpzaam bij aankoop"},
  {naam:"Daniel", filiaal:"Heerhugowaard",     comp:"Snel en direct probleem opgelost"},
  {naam:"Ramon",  filiaal:"Ridderkerk/Nunspeet",comp:"Goede uitleg, denkt mee"},
  {naam:"Hasan",  filiaal:"Wijchen",           comp:"Vrijlaten in keuze, vriendelijk"},
  {naam:"Julien", filiaal:"Wijchen",           comp:"Geweldige service en uitleg"},
  {naam:"Remco",  filiaal:"Heerhugowaard",     comp:"Direct en gratis gerepareerd"},
  {naam:"Roy",    filiaal:"Schiedam",          comp:"Direct nieuw zadel gegeven"},
  {naam:"Nick",   filiaal:"Best",              comp:"Creatieve oplossing met reserve-accu"},
];

const REPLIES={
  def:   "Ik ben de Stella data-assistent. Vraag me over de 1.810 klachten: zomerpiek, accu, bereikbaarheid, veiligheid of aanbevelingen.",
  zomer: "Zomeranalyse:\n- Bereikbaarheid daalt naar 74% in augustus (norm: 80%)\n- 7.351 gemiste calls in juni-augustus\n- 2,3x meer KS-klachten dan rest van jaar\n- In augustus: 11.276 calls met slechts 4 medewerkers\n\nDe klantenservice heeft structureel +40% extra capaciteit nodig in juni-augustus.",
  accu:  "Accu/Batterij (671 klachten - 37,1%):\n- Grootste klachtcategorie\n- Accu's gaan na 1,5-2,5 jaar kapot\n- 47 meldingen brandgevaar of accuzuurlekkage\n- Vervangingskosten 550-850 euro\n\nAanbeveling: leveranciersaudit + gratis accucheck voor fietsen ouder dan 2 jaar.",
  bereik:"Bereikbaarheid:\n- Augustus 2025: slechts 74,0% bereikbaar (laagste punt)\n- 7.351 gemiste calls in de zomer\n- 14.881 gemiste calls heel jaar 2025\n- In augustus: 4 medewerkers voor 11.276 calls\n\nEen AI-chatbot lost dit structureel op door 24/7 beschikbaar te zijn.",
  ai:    "AI als klantenservice:\n- Chatbot beantwoordt 60-70% van vragen direct\n- Bereikbaarheid: van 74% naar 100%\n- Beschikbaar 24/7, ook zaterdag en s avonds\n- Kosten per contact: van 15 euro naar 0,40 euro\n- Implementatie: 2-4 weken, 8.000-15.000 euro investering\n- Jaarlijkse besparing: ca. 70.000-120.000 euro",
  veilig:"Veiligheidsincidenten (584 klachten):\n- 134 rem-defecten (KRITIEK)\n- 89 afgebroken zadels (KRITIEK)\n- 203 motor-uitvallen tijdens rijden (HOOG)\n- 47 acculekkages met brandgevaar (KRITIEK)\n- Bagagedragerbreuken met kinderen in kinderzitje\n\nDirecte actie vereist: productanalyse + dedicated veiligheidsteam.",
  tips:  "Top 3 aanbevelingen:\n1. AI-chatbot - lost zomerpiek structureel op\n2. Seizoensuitbreiding +40% capaciteit jun-aug\n3. Proactieve mei-campagne - voorkomt 30% zomerse klachten",
};

const reply=(msg)=>{
  const m=msg.toLowerCase();
  if(m.match(/zomer|piek|jun|jul|aug|seizoen/))     return REPLIES.zomer;
  if(m.match(/accu|batter|lad/))                    return REPLIES.accu;
  if(m.match(/bereik|wacht|telefon|bel|reactie/))   return REPLIES.bereik;
  if(m.match(/ai|chatbot|robot|automatisch/))       return REPLIES.ai;
  if(m.match(/veilig|rem|zadel|gevaar|brand/))      return REPLIES.veilig;
  if(m.match(/tip|aanbevel|oploss|advies/))         return REPLIES.tips;
  return REPLIES.def;
};

const TABS=[
  {id:"overview",   label:"Overzicht"},
  {id:"zomer",      label:"Zomerpiek"},
  {id:"safety",     label:"Veiligheid"},
  {id:"explorer",   label:"Explorer"},
  {id:"trustpilot", label:"TrustPilot"},
  {id:"advice",     label:"Aanbevelingen"},
];

const Badge=({label,color})=>(
  <span style={{background:`${color}18`,color,border:`1px solid ${color}30`,borderRadius:5,padding:"2px 8px",fontSize:10.5,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",whiteSpace:"nowrap"}}>{label}</span>
);

const Card=({children,sx={}})=>(
  <div style={{background:W,borderRadius:14,padding:"20px 22px",boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 16px rgba(0,0,0,0.06)",border:`1px solid ${BORDER}`,...sx}}>{children}</div>
);

const RedCard=({children,sx={}})=>(
  <div style={{background:`linear-gradient(135deg,${R2} 0%,${R} 55%,${R3} 100%)`,borderRadius:16,padding:"22px 26px",boxShadow:`0 8px 32px ${R}40`,...sx}}>{children}</div>
);

const STitle=({children,sub})=>(
  <div style={{marginBottom:16}}>
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{width:3,height:18,background:R,borderRadius:2,flexShrink:0}}/>
      <h3 style={{margin:0,fontSize:14,fontWeight:800,color:INK}}>{children}</h3>
    </div>
    {sub&&<p style={{margin:"3px 0 0 11px",fontSize:11,color:MUTED}}>{sub}</p>}
  </div>
);

const KPI=({icon,label,value,sub,color=R,dark=false})=>(
  <div style={{background:dark?`linear-gradient(135deg,${R2},${R3})`:W,borderRadius:13,padding:"17px 18px",borderTop:dark?"none":`3px solid ${color}`,boxShadow:dark?`0 6px 24px ${R}45`:"0 1px 3px rgba(0,0,0,0.06)",border:dark?"none":`1px solid ${BORDER}`}}>
    <div style={{fontSize:20,marginBottom:5}}>{icon}</div>
    <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.09em",textTransform:"uppercase",color:dark?"rgba(255,255,255,0.6)":MUTED,marginBottom:4}}>{label}</div>
    <div style={{fontSize:28,fontWeight:900,lineHeight:1,letterSpacing:"-1px",color:dark?W:color}}>{value}</div>
    {sub&&<div style={{fontSize:11,color:dark?"rgba(255,255,255,0.55)":MUTED,marginTop:3}}>{sub}</div>}
  </div>
);

const TTip=({active,payload,label})=>{
  if(!active||!payload?.length)return null;
  return(
    <div style={{background:W,border:`1px solid ${BORDER}`,borderRadius:10,padding:"10px 14px",boxShadow:"0 4px 20px rgba(0,0,0,0.12)",fontSize:12}}>
      <div style={{fontWeight:800,marginBottom:5,color:INK}}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{display:"flex",gap:7,alignItems:"center",color:"#444",marginBottom:2}}>
          <div style={{width:8,height:8,borderRadius:2,background:p.color,flexShrink:0}}/>
          <span>{p.name}: <strong>{p.value}{p.unit||""}</strong></span>
        </div>
      ))}
    </div>
  );
};

const cc=(c)=>({"Garantie":"#7C3AED","Accu":R,"Motor":"#F59E0B","Klantenservice":"#1B52D4","Remmen":"#DC2626","Levertijd":"#0891B2"}[c]||"#9CA3AF");
const uc=(u)=>u==="Hoog"?R:u==="Medium"?"#F59E0B":"#34D399";

export default function App(){
  const [authed,setAuthed]=useState(false);
  const [pw,setPw]=useState("");
  const [pwErr,setPwErr]=useState(false);
  const [shake,setShake]=useState(false);
  const [tab,setTab]=useState("overview");
  const [search,setSearch]=useState("");
  const [chatOpen,setChatOpen]=useState(false);
  const [msgs,setMsgs]=useState([{role:"bot",text:REPLIES.def}]);
  const [chatIn,setChatIn]=useState("");
  const [loading,setLoading]=useState(false);
  const msgRef=useRef(null);

  useEffect(()=>{msgRef.current?.scrollIntoView({behavior:"smooth"})},[msgs]);

  const doLogin=()=>{
    if(pw==="StellaNext2026")setAuthed(true);
    else{setPwErr(true);setShake(true);setTimeout(()=>setShake(false),480);}
  };

  const sendChat=()=>{
    if(!chatIn.trim()||loading)return;
    const q=chatIn.trim();
    setMsgs(m=>[...m,{role:"user",text:q}]);
    setChatIn("");setLoading(true);
    setTimeout(()=>{setMsgs(m=>[...m,{role:"bot",text:reply(q)}]);setLoading(false);},820);
  };

  const filtered=useMemo(()=>{
    if(!search.trim())return EMAILS;
    const q=search.toLowerCase();
    return EMAILS.filter(e=>e.txt.toLowerCase().includes(q)||e.s.toLowerCase().includes(q)||e.f.toLowerCase().includes(q)||e.c.toLowerCase().includes(q));
  },[search]);

  const hl=(text,q)=>{
    if(!q.trim())return text;
    try{
      const re=new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`, "gi");
      return text.split(re).map((p,i)=>re.test(p)?<mark key={i} style={{background:"#FEF08A",borderRadius:2,padding:"0 1px"}}>{p}</mark>:p);
    }catch{return text;}
  };

  if(!authed)return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(150deg,${R2} 0%,${R} 50%,${R3} 100%)`,fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",padding:20}}>
      <div style={{background:W,borderRadius:22,padding:"44px 40px",maxWidth:408,width:"100%",boxShadow:"0 40px 100px rgba(0,0,0,0.35)",textAlign:"center"}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
          <StellaIcon size={80}/>
        </div>
        <div style={{fontSize:9.5,fontWeight:800,letterSpacing:"0.22em",color:"#C8C9CE",textTransform:"uppercase",marginBottom:5}}>Business Intelligence Platform</div>
        <h1 style={{margin:"0 0 6px",fontSize:26,fontWeight:900,color:INK}}>Stella Secure Access</h1>
        <p style={{margin:"0 0 30px",color:MUTED,fontSize:13,lineHeight:1.75}}>
          Klachtenintelligentie 2024-2026<br/>
          <span style={{color:R,fontWeight:700}}>1.810 klachten - vertrouwelijk intern</span>
        </p>
        <style>{`@keyframes shk{0%,100%{transform:translateX(0)}20%{transform:translateX(-10px)}40%{transform:translateX(10px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}.stella-btn:hover{opacity:.88!important}.tab-btn:hover{background:#f5f6fa!important;color:#333!important}.tab-active{background:${R}!important;color:white!important}`}</style>
        <div style={{animation:shake?"shk 0.48s ease":"none"}}>
          <input type="password" value={pw} onChange={e=>{setPw(e.target.value);setPwErr(false);}} onKeyDown={e=>e.key==="Enter"&&doLogin()} placeholder="Toegangscode..."
            style={{width:"100%",padding:"13px 16px",borderRadius:10,border:`2px solid ${pwErr?R:BORDER}`,background:pwErr?"#FFF5F5":W,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:pwErr?6:12}}/>
          {pwErr&&<div style={{color:R,fontSize:12,fontWeight:700,marginBottom:10}}>Onjuiste toegangscode</div>}
          <button onClick={doLogin} className="stella-btn" style={{width:"100%",padding:"13px",background:R,color:W,border:"none",borderRadius:10,fontSize:14,fontWeight:800,cursor:"pointer",boxShadow:`0 6px 22px ${R}45`,fontFamily:"inherit"}}>
            Toegang verkrijgen
          </button>
        </div>
        <div style={{marginTop:18,fontSize:11,color:"#C8C9CE"}}>Uitsluitend voor intern gebruik Stella Next B.V.</div>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",color:INK}}>
      <div style={{background:W,height:58,borderBottom:`1px solid ${BORDER}`,display:"flex",alignItems:"center",padding:"0 20px",gap:16,boxShadow:"0 2px 10px rgba(0,0,0,0.055)",position:"sticky",top:0,zIndex:400}}>
        <div style={{display:"flex",alignItems:"center",gap:11,flexShrink:0}}>
          <StellaIcon size={38}/>
          <div style={{borderLeft:`1px solid ${BORDER}`,paddingLeft:12}}>
            <div style={{fontSize:11,fontWeight:900,color:INK,lineHeight:1}}>KLACHTEN DASHBOARD</div>
            <div style={{fontSize:9.5,color:MUTED,fontWeight:600,textTransform:"uppercase"}}>Stella Next B.V.</div>
          </div>
        </div>
        <nav style={{display:"flex",gap:2,flex:1,overflowX:"auto"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} className={tab===t.id?"tab-active":"tab-btn"}
              style={{padding:"7px 14px",borderRadius:8,border:"none",fontWeight:tab===t.id?800:500,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",color:tab===t.id?W:"#666",background:tab===t.id?R:"transparent"}}>
              {t.label}
            </button>
          ))}
        </nav>
        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:5,background:`${R}12`,borderRadius:7,padding:"4px 10px"}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:R}}/>
            <span style={{fontSize:11,fontWeight:700,color:R}}>LIVE - Feb 2026</span>
          </div>
          <button onClick={()=>{setAuthed(false);setPw("");}} style={{padding:"5px 10px",borderRadius:7,border:`1px solid ${BORDER}`,background:"transparent",color:MUTED,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>Uitloggen</button>
        </div>
      </div>

      <div style={{padding:"22px 22px 80px",maxWidth:1360,margin:"0 auto"}}>

        {tab==="overview"&&(
          <div>
            <RedCard sx={{marginBottom:22}}>
              <div style={{fontSize:9.5,color:"rgba(255,255,255,0.55)",fontWeight:800,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:7}}>STELLA NEXT - EXECUTIVE DASHBOARD - 2024-2026</div>
              <h1 style={{margin:"0 0 9px",fontSize:27,fontWeight:900,color:W}}>1.810 Klachten Geanalyseerd</h1>
              <p style={{margin:"0 0 22px",color:"rgba(255,255,255,0.8)",fontSize:13.5,lineHeight:1.75,maxWidth:620}}>
                Volledige klachtenintelligentie voor Stella Next B.V. De data wijst op drie urgente themas: accudefecten (37%), structurele serviceproblemen in de zomer, en veiligheidskritieke hardwarefouten.
              </p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                {[{v:"671",l:"Accu klachten",i:"🔋"},{v:"74%",l:"Bereikbaarheid aug",i:"📵"},{v:"7.351",l:"Gemiste calls zomer",i:"📞"},{v:"40%",l:"Hoge urgentie",i:"⚠️"},{v:"2.1",l:"Sentiment / 5",i:"😤"}].map(s=>(
                  <div key={s.l} style={{background:"rgba(255,255,255,0.16)",borderRadius:10,padding:"11px 15px",textAlign:"center",minWidth:84}}>
                    <div style={{fontSize:17,marginBottom:2}}>{s.i}</div>
                    <div style={{fontSize:19,fontWeight:900,color:W,lineHeight:1}}>{s.v}</div>
                    <div style={{fontSize:9.5,color:"rgba(255,255,255,0.62)",fontWeight:600,marginTop:2}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </RedCard>

            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:18}}>
              <KPI dark icon="📧" label="Totaal Klachten" value="1.810" sub="Unieke meldingen"/>
              <KPI icon="🔋" label="Accu / Batterij"    value="671"   sub="37.1% van totaal" color={R}/>
              <KPI icon="🏢" label="Klantenservice"     value="412"   sub="22.8% van totaal" color="#1B52D4"/>
              <KPI icon="⚡" label="Motor"               value="289"   sub="16.0% van totaal" color="#F59E0B"/>
              <KPI icon="🛡️" label="Garantie"           value="198"   sub="10.9% van totaal" color="#7C3AED"/>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:16,marginBottom:16}}>
              <Card>
                <STitle sub="Alle 1.810 klachten per categorie">Klachten per Categorie</STitle>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={CATS} layout="vertical" margin={{left:8,right:20}}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0F1F5"/>
                    <XAxis type="number" tick={{fontSize:11,fill:MUTED}}/>
                    <YAxis type="category" dataKey="n" tick={{fontSize:12,fill:"#555"}} width={150}/>
                    <Tooltip content={<TTip/>}/>
                    <Bar dataKey="v" name="Klachten" radius={[0,7,7,0]}>
                      {CATS.map((e,i)=><Cell key={i} fill={e.c}/>)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <STitle sub="1 = zeer boos, 5 = blij">Sentiment van Klanten</STitle>
                <ResponsiveContainer width="100%" height={170}>
                  <PieChart>
                    <Pie data={SENTIMENT} dataKey="v" cx="50%" cy="50%" innerRadius={46} outerRadius={72} paddingAngle={2}>
                      {SENTIMENT.map((e,i)=><Cell key={i} fill={e.c}/>)}
                    </Pie>
                    <Tooltip formatter={(v,n,p)=>[`${v} klachten`,p.payload.n]}/>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center",marginTop:6}}>
                  {SENTIMENT.map(s=>(
                    <div key={s.n} style={{display:"flex",alignItems:"center",gap:4,fontSize:11}}>
                      <div style={{width:8,height:8,borderRadius:2,background:s.c}}/>
                      <span style={{color:MUTED}}>{s.n}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <Card>
                <STitle sub="Prioritering van alle klachten">Urgentieverdeling</STitle>
                {URGENCY.map(u=>(
                  <div key={u.n} style={{marginBottom:15}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                      <span style={{fontWeight:700,fontSize:13}}>{u.n}</span>
                      <span style={{fontWeight:800,fontSize:13,color:u.c}}>{u.v.toLocaleString()} <span style={{fontSize:11,color:MUTED}}>({(u.v/1810*100).toFixed(1)}%)</span></span>
                    </div>
                    <div style={{background:"#F0F1F5",borderRadius:5,height:8,overflow:"hidden"}}>
                      <div style={{width:`${u.v/1810*100}%`,background:u.c,height:"100%",borderRadius:5}}/>
                    </div>
                  </div>
                ))}
              </Card>
              <Card>
                <STitle sub="Hoe vaak komen servicetermen voor in klachtteksten">Service Failure Monitor</STitle>
                {SVCFAIL.map(sf=>(
                  <div key={sf.t} style={{display:"flex",alignItems:"center",gap:10,marginBottom:11}}>
                    <div style={{width:128,fontSize:12,fontWeight:600,color:"#444",flexShrink:0}}>"{sf.t}"</div>
                    <div style={{flex:1,background:"#F0F1F5",borderRadius:4,height:7}}>
                      <div style={{width:`${sf.v/412*100}%`,height:"100%",borderRadius:4,background:`linear-gradient(90deg,${R},${R3})`}}/>
                    </div>
                    <div style={{width:32,textAlign:"right",fontSize:13,fontWeight:800,color:R}}>{sf.v}</div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        )}

        {tab==="zomer"&&(
          <div>
            <RedCard sx={{marginBottom:22}}>
              <div style={{fontSize:9.5,color:"rgba(255,255,255,0.55)",fontWeight:800,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:7}}>ANALYSE - SEIZOENSDRUKTE - JUNI T/M AUGUSTUS</div>
              <h1 style={{margin:"0 0 9px",fontSize:25,fontWeight:900,color:W}}>De Klantenservice Bezwijkt Elke Zomer</h1>
              <p style={{margin:0,color:"rgba(255,255,255,0.82)",fontSize:13.5,lineHeight:1.78,maxWidth:680}}>
                Juni t/m augustus tonen elk jaar dezelfde crisis: bereikbaarheid onder 80%, duizenden gemiste calls en 2,3x meer klachten. De telefoniedata bewijst dat de klantenservice structureel onderbezet is in het zomerseizoen.
              </p>
            </RedCard>

            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:18}}>
              <KPI dark icon="📈" label="Zomer KS factor"       value="2.3x"   sub="Meer klachten jun-aug vs rest"/>
              <KPI icon="📵" label="Bereikbaarheid aug"     value="74.0%"  sub="Laagste punt - norm: 80%" color={R}/>
              <KPI icon="📞" label="Gemiste calls zomer"    value="7.351"  sub="Jun-aug 2025 totaal" color={R}/>
              <KPI icon="👥" label="KS bezetting aug"       value="4 mw."  sub="Bij 11.276 inbound calls" color="#F59E0B"/>
            </div>

            <Card sx={{marginBottom:16}}>
              <STitle sub="Klachtenvolume per maand - rode punten zijn zomermaanden">Klachtenvolume per Maand</STitle>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={MONTHLY} margin={{top:10,right:8,bottom:0,left:0}}>
                  <defs>
                    <linearGradient id="gtot" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#374151" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#374151" stopOpacity={0.01}/>
                    </linearGradient>
                    <linearGradient id="gks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1B52D4" stopOpacity={0.18}/>
                      <stop offset="95%" stopColor="#1B52D4" stopOpacity={0.01}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F5"/>
                  <XAxis dataKey="m" tick={{fontSize:12,fill:MUTED}}/>
                  <YAxis tick={{fontSize:11,fill:MUTED}}/>
                  <Tooltip content={<TTip/>}/>
                  <ReferenceLine x="Nov" stroke={INK} strokeDasharray="4 3" label={{value:"Faillissement",fontSize:9.5,fill:INK,position:"insideTopRight"}}/>
                  <Area type="monotone" dataKey="tot" stroke="#374151" fill="url(#gtot)" strokeWidth={2.5} name="Totaal klachten"
                    dot={(props)=>{const d=MONTHLY[props.index];if(!d)return null;return<circle key={props.index} cx={props.cx} cy={props.cy} r={d.z?7:3} fill={d.z?R:"#374151"} stroke={d.z?W:"none"} strokeWidth={d.z?2:0}/>;}}/>
                  <Area type="monotone" dataKey="ks" stroke="#1B52D4" fill="url(#gks)" strokeWidth={2.5} name="KS klachten"/>
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              <Card>
                <STitle sub="Gemiste calls per maand - werkelijke telefoniedata">Gemiste Calls per Maand</STitle>
                <ResponsiveContainer width="100%" height={210}>
                  <BarChart data={MONTHLY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F5"/>
                    <XAxis dataKey="m" tick={{fontSize:11,fill:MUTED}}/>
                    <YAxis tick={{fontSize:11,fill:MUTED}}/>
                    <Tooltip content={<TTip/>}/>
                    <ReferenceLine y={837} stroke="#F59E0B" strokeDasharray="4 3" label={{value:"Gem. buiten zomer",fontSize:9,fill:"#F59E0B",position:"insideTopRight"}}/>
                    <Bar dataKey="gemist" name="Gemiste calls" radius={[5,5,0,0]}>
                      {MONTHLY.map((e,i)=><Cell key={i} fill={e.z?R:"#CBD5E1"}/>)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div style={{marginTop:10,padding:"9px 12px",background:"#FEF2F2",borderRadius:8,fontSize:12,color:"#7F1D1D"}}>
                  Augustus: 2.930 gemiste calls - totaal zomer: <strong>7.351 gemiste calls</strong>
                </div>
              </Card>
              <Card>
                <STitle sub="Bereikbaarheid klantenservice per maand">Bereikbaarheid Klantenservice</STitle>
                <ResponsiveContainer width="100%" height={210}>
                  <LineChart data={MONTHLY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F5"/>
                    <XAxis dataKey="m" tick={{fontSize:11,fill:MUTED}}/>
                    <YAxis tick={{fontSize:11,fill:MUTED}} unit="%" domain={[60,100]}/>
                    <Tooltip content={<TTip/>}/>
                    <ReferenceLine y={80} stroke="#34D399" strokeDasharray="4 3" label={{value:"Norm 80%",fontSize:10,fill:"#34D399",position:"insideTopRight"}}/>
                    <Line type="monotone" dataKey="bereik" stroke={R} strokeWidth={3} name="Bereikbaarheid" unit="%"
                      dot={(props)=>{const d=MONTHLY[props.index];if(!d)return null;return<circle key={props.index} cx={props.cx} cy={props.cy} r={d.z?7:3} fill={d.z?R:"#374151"} stroke={W} strokeWidth={d.z?2:0}/>;}}/>
                  </LineChart>
                </ResponsiveContainer>
                <div style={{marginTop:10,padding:"9px 12px",background:"#FEF2F2",borderRadius:8,fontSize:12,color:"#7F1D1D"}}>
                  Augustus: <strong>74,0% bereikbaar</strong> - laagste punt, onder norm van 80%
                </div>
              </Card>
            </div>

            <Card>
              <STitle sub="Zomer vs. rest van het jaar">Vergelijking Zomer vs. Rest</STitle>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart layout="vertical" margin={{left:20}} data={[
                  {m:"KS klachten/maand",z:61,r:27},
                  {m:"Gemiste calls/maand",z:2450,r:837},
                  {m:"Bereikbaarheid (%)",z:76,r:86},
                ]}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0F1F5"/>
                  <XAxis type="number" tick={{fontSize:11,fill:MUTED}}/>
                  <YAxis type="category" dataKey="m" tick={{fontSize:12,fill:"#555"}} width={160}/>
                  <Tooltip content={<TTip/>}/>
                  <Legend/>
                  <Bar dataKey="z" name="Zomer (jun-aug)" fill={R} radius={[0,5,5,0]}/>
                  <Bar dataKey="r" name="Rest van jaar"   fill="#94A3B8" radius={[0,5,5,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {tab==="safety"&&(
          <div>
            <div style={{background:`linear-gradient(135deg,#1A0003,${R2})`,borderRadius:16,padding:"22px 26px",marginBottom:22,boxShadow:"0 8px 32px rgba(0,0,0,0.25)"}}>
              <div style={{fontSize:9.5,color:"rgba(255,255,255,0.5)",fontWeight:800,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:7}}>VEILIGHEIDSMONITOR - PRIORITEIT 1</div>
              <h1 style={{margin:"0 0 6px",fontSize:23,fontWeight:900,color:W}}>Kritieke Hardware-incidenten</h1>
              <p style={{margin:0,color:"rgba(255,255,255,0.72)",fontSize:13.5}}>584 klachten betreffen directe veiligheidsrisicos voor gebruikers. Meerdere bijna-ongelukken en letsel gemeld.</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:18}}>
              <KPI dark icon="🛑" label="Rem defecten"  value="134" sub="Potentieel levensgevaarlijk"/>
              <KPI dark icon="🪑" label="Zadel breuken" value="89"  sub="Valincidenten bevestigd"/>
              <KPI icon="⚡"      label="Accu lekkage"  value="47"  sub="Brandgevaar klasse A" color="#F59E0B"/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1.3fr 1fr",gap:16}}>
              <Card>
                <STitle sub="Meldingen per type veiligheidsincident">Incidenten per Type</STitle>
                <ResponsiveContainer width="100%" height={270}>
                  <BarChart data={SAFETY} layout="vertical" margin={{left:8}}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0F1F5"/>
                    <XAxis type="number" tick={{fontSize:11,fill:MUTED}}/>
                    <YAxis type="category" dataKey="t" tick={{fontSize:12,fill:"#555"}} width={190}/>
                    <Tooltip content={<TTip/>}/>
                    <Bar dataKey="v" name="Meldingen" radius={[0,7,7,0]}>
                      {SAFETY.map((e,i)=><Cell key={i} fill={e.r==="KRITIEK"?R:e.r==="HOOG"?"#F59E0B":"#34D399"}/>)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <STitle>Risicoclassificatie</STitle>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {[...SAFETY].sort((a,b)=>b.v-a.v).map(s=>(
                    <div key={s.t} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 13px",borderRadius:10,
                      background:s.r==="KRITIEK"?"#FEF2F2":s.r==="HOOG"?"#FFFBEB":"#F0FDF4",
                      border:`1px solid ${s.r==="KRITIEK"?"#FECACA":s.r==="HOOG"?"#FDE68A":"#BBF7D0"}`}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:13}}>{s.t}</div>
                        <div style={{fontSize:11,color:MUTED}}>{s.v} meldingen</div>
                      </div>
                      <Badge label={s.r} color={s.r==="KRITIEK"?R:s.r==="HOOG"?"#F59E0B":"#34D399"}/>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {tab==="explorer"&&(
          <div>
            <div style={{background:"linear-gradient(135deg,#1B3A8A,#1B52D4)",borderRadius:16,padding:"22px 26px",marginBottom:22,boxShadow:"0 8px 32px rgba(27,82,212,0.28)"}}>
              <div style={{fontSize:9.5,color:"rgba(255,255,255,0.55)",fontWeight:800,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:7}}>EMAIL EXPLORER</div>
              <h1 style={{margin:"0 0 6px",fontSize:23,fontWeight:900,color:W}}>Doorzoek Klachten</h1>
              <p style={{margin:0,color:"rgba(255,255,255,0.75)",fontSize:13.5}}>
                Zoek live door klachtteksten - probeer: <strong style={{color:W}}>remmen - gevaarlijk - accu - wachttijd - zomer</strong>
              </p>
            </div>
            <Card sx={{marginBottom:14}}>
              <div style={{position:"relative"}}>
                <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="Zoek in e-mailinhoud, onderwerp, afzender of categorie..."
                  style={{width:"100%",padding:"12px 40px 12px 16px",borderRadius:9,border:`2px solid ${search?R:BORDER}`,fontSize:13.5,outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
                {search&&<button onClick={()=>setSearch("")} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:MUTED,fontSize:15}}>x</button>}
              </div>
              <div style={{display:"flex",gap:7,marginTop:11,flexWrap:"wrap"}}>
                {["gevaarlijk","remmen","accu","wachttijd","zomer","motor","garantie","onbereikbaar"].map(t=>(
                  <button key={t} onClick={()=>setSearch(search===t?"":t)}
                    style={{padding:"4px 12px",borderRadius:20,border:`1px solid ${R}35`,background:search===t?R:"transparent",color:search===t?W:R,fontSize:12,cursor:"pointer",fontWeight:700,fontFamily:"inherit"}}>
                    {t}
                  </button>
                ))}
              </div>
            </Card>
            <div style={{fontSize:12,color:MUTED,marginBottom:11,fontWeight:600}}>
              {search?<><strong style={{color:R}}>{filtered.length}</strong> resultaten voor "{search}"</>:<>{EMAILS.length} klachten</>}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:11}}>
              {filtered.length===0?(
                <Card sx={{textAlign:"center",padding:"44px 24px"}}>
                  <div style={{fontSize:42,marginBottom:12}}>🔍</div>
                  <div style={{fontWeight:700,color:"#444"}}>Geen resultaten voor "{search}"</div>
                </Card>
              ):filtered.map(e=>(
                <div key={e.nr} style={{background:W,borderRadius:12,padding:"16px 19px",boxShadow:"0 1px 3px rgba(0,0,0,0.06)",border:`1px solid ${BORDER}`,borderLeft:`4px solid ${cc(e.c)}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,marginBottom:9}}>
                    <div>
                      <div style={{fontWeight:800,fontSize:13.5,color:INK,marginBottom:2}}>{hl(e.s,search)}</div>
                      <div style={{fontSize:11,color:MUTED}}>{e.d} - {hl(e.f,search)}</div>
                    </div>
                    <div style={{display:"flex",gap:6,flexShrink:0}}>
                      <Badge label={e.c} color={cc(e.c)}/>
                      <Badge label={e.u} color={uc(e.u)}/>
                    </div>
                  </div>
                  <div style={{fontSize:12.5,color:"#555",lineHeight:1.68,padding:"9px 12px",background:"#F8F9FC",borderRadius:7,marginBottom:7}}>{hl(e.txt,search)}</div>
                  <div style={{fontSize:11.5,color:"#666"}}><strong>Samenvatting:</strong> {e.sum}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="trustpilot"&&(
          <div>
            <div style={{background:"linear-gradient(135deg,#1A1A2E,#16213E)",borderRadius:16,padding:"22px 26px",marginBottom:22,boxShadow:"0 8px 32px rgba(0,0,0,0.28)"}}>
              <div style={{fontSize:9.5,color:"rgba(255,255,255,0.45)",fontWeight:800,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:7}}>TRUSTPILOT ANALYSE - MEI 2025 - FEBRUARI 2026</div>
              <h1 style={{margin:"0 0 8px",fontSize:23,fontWeight:900,color:W}}>148 Reviews - Reputatie-breekpunt</h1>
              <p style={{margin:0,color:"rgba(255,255,255,0.65)",fontSize:13.5,lineHeight:1.78,maxWidth:700}}>
                Stella staat op een reputatie-breekpunt. Scherpe polarisatie: uitstekende medewerkers op de winkelvloer tegenover structureel falende bedrijfsprocessen na het faillissement van december 2024.
              </p>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:18}}>
              <KPI dark  icon="⭐" label="Gemiddeld cijfer"  value="3.2/5" sub="148 reviews"/>
              <KPI icon="😊" label="Positief (4-5 ster)" value="53%"   sub="Vrijwel allemaal over medewerkers" color="#34D399"/>
              <KPI icon="😠" label="Negatief (1-2 ster)" value="47%"   sub="Structurele problemen" color={R}/>
              <KPI icon="💀" label="1-ster reviews"      value="49"    sub="33% van totaal" color={R}/>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:16,marginBottom:16}}>
              <Card>
                <STitle sub="Klassiek J-curve patroon">Verdeling Beoordelingen</STitle>
                {TP_STARS.map(s=>(
                  <div key={s.s} style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontSize:13,fontWeight:700}}>{s.s}</span>
                      <span style={{fontSize:12,color:MUTED}}>{s.v} ({s.pct}%)</span>
                    </div>
                    <div style={{background:"#F0F1F5",borderRadius:5,height:8}}>
                      <div style={{width:`${s.pct}%`,background:s.c,height:"100%",borderRadius:5}}/>
                    </div>
                    <div style={{fontSize:10.5,color:MUTED,marginTop:3}}>{s.thema}</div>
                  </div>
                ))}
              </Card>
              <Card>
                <STitle sub="% van negatieve reviews waarin thema voorkomt">Negatieve Themas</STitle>
                {TP_THEMES.map(t=>(
                  <div key={t.t} style={{display:"flex",gap:12,marginBottom:14,alignItems:"flex-start"}}>
                    <div style={{width:36,height:36,background:`${t.c}18`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{t.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                        <span style={{fontWeight:700,fontSize:12.5}}>{t.t}</span>
                        <span style={{fontSize:12,fontWeight:800,color:t.c}}>{t.v}%</span>
                      </div>
                      <div style={{background:"#F0F1F5",borderRadius:4,height:5,marginBottom:4}}>
                        <div style={{width:`${t.v}%`,background:t.c,height:"100%",borderRadius:4}}/>
                      </div>
                      <div style={{fontSize:11,color:MUTED,lineHeight:1.55}}>{t.desc}</div>
                    </div>
                  </div>
                ))}
              </Card>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:16}}>
              <Card>
                <STitle sub="Positieve reviews zijn vrijwel uitsluitend over individuele medewerkers">Medewerkers Redden de Reputatie</STitle>
                <div style={{padding:"10px 13px",background:"#F0FDF4",borderRadius:9,border:"1px solid #BBF7D0",marginBottom:14,fontSize:12.5,color:"#14532D",lineHeight:1.65}}>
                  Kerninzicht: Klanten zijn blij met de mensen van Stella, niet met de organisatie. De winkels zijn het enige contactpunt dat vertrouwen wekt.
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {TP_MEDEWERKERS.map(m=>(
                    <div key={m.naam} style={{display:"flex",gap:10,alignItems:"center",padding:"8px 11px",background:"#F8F9FC",borderRadius:8}}>
                      <div style={{width:32,height:32,background:"#FEF2F2",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:R,flexShrink:0}}>{m.naam[0]}</div>
                      <div>
                        <div style={{fontWeight:700,fontSize:12.5}}>{m.naam} <span style={{color:MUTED,fontWeight:500}}>- {m.filiaal}</span></div>
                        <div style={{fontSize:11,color:MUTED}}>{m.comp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <STitle sub="Het faillissement dec. 2024 als keerpunt">Diagnose: Wat Werkt vs. Wat Faalt</STitle>
                {[
                  {label:"Wat werkt",color:"#34D399",bg:"#F0FDF4",border:"#BBF7D0",items:["Individuele medewerkers op de winkelvloer","Snelle service ter plaatse","Loyale klanten (tot 42.000 km)","Lokale creativiteit en maatwerkoplossingen"]},
                  {label:"Wat faalt",color:R,bg:"#FEF2F2",border:"#FECACA",items:["Klantenservice systeem - structureel onbereikbaar","Garantiebeleid na faillissement","Accukwaliteit - defect na 1,5-2,5 jaar","Propriëtaire onderdelen - lokale makers weigeren"]},
                ].map(k=>(
                  <div key={k.label} style={{background:k.bg,border:`1px solid ${k.border}`,borderRadius:11,padding:"12px 14px",marginBottom:10}}>
                    <div style={{fontWeight:800,fontSize:12.5,color:k.color,marginBottom:8}}>{k.label}</div>
                    {k.items.map(i=>(
                      <div key={i} style={{fontSize:12,color:"#444",marginBottom:5,display:"flex",gap:7}}>
                        <span style={{color:k.color,flexShrink:0}}>{k.label.includes("werkt")?"✓":"✗"}</span>{i}
                      </div>
                    ))}
                  </div>
                ))}
                <div style={{padding:"10px 13px",background:"#FEF2F2",borderRadius:9,border:"1px solid #FECACA",fontSize:12,color:"#7F1D1D",lineHeight:1.65}}>
                  URGENT: Bagagedragerbreuken met kinderen in kinderzitje - potentiele aansprakelijkheid.
                </div>
              </Card>
            </div>
          </div>
        )}

        {tab==="advice"&&(
          <div>
            <div style={{background:"linear-gradient(135deg,#0D0D0D,#1E2432)",borderRadius:16,padding:"22px 26px",marginBottom:22,boxShadow:"0 8px 32px rgba(0,0,0,0.28)"}}>
              <div style={{fontSize:9.5,color:"rgba(255,255,255,0.45)",fontWeight:800,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:7}}>MANAGEMENT AANBEVELINGEN - STELLA NEXT 2026</div>
              <h1 style={{margin:"0 0 8px",fontSize:23,fontWeight:900,color:W}}>Hoe Lossen We de Zomerpiek Op?</h1>
              <p style={{margin:0,color:"rgba(255,255,255,0.65)",fontSize:13.5,lineHeight:1.78,maxWidth:700}}>
                De data toont een structureel probleem dat elk jaar terugkeert: de klantenservice loopt vast in de zomer. Hieronder drie concrete oplossingsrichtingen gebaseerd op 1.810 klachten en werkelijke telefoniedata.
              </p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <Card sx={{borderLeft:`5px solid ${R}`}}>
                <div style={{display:"flex",gap:18,alignItems:"flex-start"}}>
                  <div style={{width:54,height:54,background:"#FEF2F2",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>🤖</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                      <span style={{fontSize:10,color:R,fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase"}}>Optie 1 - Hoogste impact</span>
                      <Badge label="AI INNOVATIE" color={R}/>
                    </div>
                    <h2 style={{margin:"0 0 10px",fontSize:18,fontWeight:900}}>AI-chatbot als 24/7 Klantenservice</h2>
                    <p style={{color:"#555",fontSize:13.5,lineHeight:1.82,margin:"0 0 16px"}}>
                      Een AI-chatbot op stella.nl beantwoordt 60-70% van alle standaardvragen direct. Geen wachttijd, 24/7 bereikbaar. De 7.351 gemiste calls in de zomer dalen drastisch. Complexe klachten worden slim doorgestuurd.
                    </p>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11}}>
                      {[{i:"📵",l:"Bereikbaar",v:"100%",n:"was 74% aug"},{i:"📞",l:"Gemiste calls",v:"~0",n:"was 7.351 zomer"},{i:"💬",l:"% opgelost",v:"95%",n:"was 60%"},{i:"💰",l:"Kosten/contact",v:"0.40",n:"was ~15 euro"}].map(s=>(
                        <div key={s.l} style={{background:"#F8F9FC",borderRadius:10,padding:"11px 12px"}}>
                          <div style={{fontSize:17,marginBottom:4}}>{s.i}</div>
                          <div style={{fontSize:10,fontWeight:700,color:MUTED,textTransform:"uppercase",marginBottom:4}}>{s.l}</div>
                          <div style={{fontSize:13,fontWeight:800,color:"#22C55E"}}>{s.v}</div>
                          <div style={{fontSize:10,color:MUTED}}>{s.n}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
              <Card sx={{borderLeft:"5px solid #F59E0B"}}>
                <div style={{display:"flex",gap:18,alignItems:"flex-start"}}>
                  <div style={{width:54,height:54,background:"#FFFBEB",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>📅</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:10,color:"#B45309",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Optie 2 - Structurele capaciteitsoplossing</div>
                    <h2 style={{margin:"0 0 10px",fontSize:18,fontWeight:900}}>Seizoensgebonden Personeelsplanning</h2>
                    <p style={{color:"#555",fontSize:13.5,lineHeight:1.82,margin:0}}>
                      De telefoniedata toont exact wanneer de piek optreedt. In augustus werkten slechts 4 medewerkers bij 11.276 inbound calls. Juni t/m augustus vereist structureel +40-50% extra capaciteit. Een flex-pool van 8-10 medewerkers mei t/m september lost de jaarlijkse crisis op.
                    </p>
                  </div>
                </div>
              </Card>
              <Card sx={{borderLeft:"5px solid #1B52D4"}}>
                <div style={{display:"flex",gap:18,alignItems:"flex-start"}}>
                  <div style={{width:54,height:54,background:"#EFF6FF",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>📢</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:10,color:"#1B52D4",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Optie 3 - Drukte voorkomen</div>
                    <h2 style={{margin:"0 0 10px",fontSize:18,fontWeight:900}}>Proactieve Communicatie & Zelfservice</h2>
                    <p style={{color:"#555",fontSize:13.5,lineHeight:1.82,margin:0}}>
                      Veel zomerse klachten zijn voorspelbaar. Door klanten in mei proactief te informeren en een zelfservice-statusportaal te bieden, kan tot 30% van de zomerse klachten worden voorkomen. De TrustPilot-data bevestigt dat communicatie een kernprobleem is.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      <div style={{position:"fixed",bottom:22,right:22,zIndex:600}}>
        {chatOpen&&(
          <div style={{position:"absolute",bottom:66,right:0,width:358,background:W,borderRadius:17,boxShadow:"0 20px 60px rgba(0,0,0,0.17)",border:`1px solid ${BORDER}`,overflow:"hidden"}}>
            <div style={{background:`linear-gradient(120deg,${R2},${R})`,padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <div style={{width:33,height:33,background:"rgba(255,255,255,0.18)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🤖</div>
                <div>
                  <div style={{color:W,fontWeight:800,fontSize:13}}>Stella Data-Assistent</div>
                  <div style={{color:"rgba(255,255,255,0.62)",fontSize:10.5}}>Gebaseerd op 1.810 klachten</div>
                </div>
              </div>
              <button onClick={()=>setChatOpen(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.7)",fontSize:18,cursor:"pointer",padding:4}}>x</button>
            </div>
            <div style={{height:265,overflowY:"auto",padding:"12px 13px",display:"flex",flexDirection:"column",gap:9}}>
              {msgs.map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                  <div style={{maxWidth:"85%",padding:"9px 12px",fontSize:12.5,lineHeight:1.65,whiteSpace:"pre-line",borderRadius:m.role==="user"?"13px 13px 3px 13px":"13px 13px 13px 3px",background:m.role==="user"?R:"#F2F3F7",color:m.role==="user"?W:INK}}>{m.text}</div>
                </div>
              ))}
              {loading&&<div style={{display:"flex",justifyContent:"flex-start"}}><div style={{background:"#F2F3F7",borderRadius:"12px 12px 12px 3px",padding:"9px 15px",color:MUTED,fontSize:16}}>...</div></div>}
              <div ref={msgRef}/>
            </div>
            <div style={{padding:"6px 11px 7px",display:"flex",gap:6,flexWrap:"wrap",borderTop:`1px solid ${BORDER}`}}>
              {["Zomerpiek","Accu probleem","AI chatbot","Bereikbaarheid","Tips"].map(q=>(
                <button key={q} onClick={()=>setChatIn(q)} style={{padding:"3px 10px",borderRadius:12,border:`1px solid ${R}28`,background:"transparent",color:R,fontSize:11,cursor:"pointer",fontWeight:700,fontFamily:"inherit"}}>{q}</button>
              ))}
            </div>
            <div style={{padding:"8px 10px",display:"flex",gap:7,borderTop:`1px solid ${BORDER}`}}>
              <input value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Stel een vraag..."
                style={{flex:1,padding:"8px 11px",borderRadius:8,border:`1px solid ${BORDER}`,fontSize:13,outline:"none",fontFamily:"inherit"}}/>
              <button onClick={sendChat} style={{background:R,color:W,border:"none",borderRadius:8,padding:"8px 13px",cursor:"pointer",fontSize:15,fontWeight:800,fontFamily:"inherit"}}>→</button>
            </div>
          </div>
        )}
        <button onClick={()=>setChatOpen(o=>!o)} style={{width:52,height:52,background:`linear-gradient(135deg,${R2},${R3})`,border:"none",borderRadius:14,cursor:"pointer",boxShadow:`0 8px 26px ${R}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}
          onMouseOver={e=>{e.currentTarget.style.transform="scale(1.1)"}} onMouseOut={e=>{e.currentTarget.style.transform="scale(1)"}}>
          {chatOpen?"x":"🤖"}
        </button>
      </div>
      <style>{`*{box-sizing:border-box}`}</style>
    </div>
  );
}