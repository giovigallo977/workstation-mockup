# HoloTalk — Documento Master: Fattibilità Legale, Costi, Prototipo, Target e Business Plan

*Proiettore interattivo AI — nome provvisorio "HoloTalk"*
*Documento di lavoro — versione 1.0 — settembre 2026*

> **Nota metodologica**: i valori economici (costi hardware, ricavi, proiezioni) sono **stime indicative** basate su prezzi di mercato correnti per componenti comparabili e su ipotesi ragionevoli di business. Vanno validati con preventivi reali dei fornitori e con test di mercato prima di qualunque decisione di investimento vincolante. I riferimenti normativi sono un inquadramento operativo, non un parere legale: prima di procedere è **necessaria** una consulenza con un avvocato specializzato in diritto d'autore/immagine e privacy (vedi §1.7).

---

## Indice

0. [Executive summary](#0-executive-summary)
1. [Validazione fattibilità legale](#1-validazione-fattibilità-legale)
2. [Stima costi hardware — 3 pacchetti](#2-stima-costi-hardware--3-pacchetti)
3. [Prototipo minimo (MVP)](#3-prototipo-minimo-mvp)
4. [Target di mercato](#4-target-di-mercato)
5. [Business plan — costi/ricavi](#5-business-plan--costiricavi)
6. [Roadmap e prossimi passi operativi](#6-roadmap-e-prossimi-passi-operativi)
7. [Fonti](#7-fonti)

---

## 0. Executive Summary

HoloTalk è un sistema hardware+software che proietta in una stanza un "soggetto" (persona vivente con consenso, personaggio storico/scientifico deceduto, celebrità su licenza, o persona scansionata su richiesta del cliente) con cui l'utente conversa vocalmente tramite un motore di AI conversazionale in tempo reale.

**Conclusione principale di questa analisi**: il concept è tecnicamente realizzabile con componenti oggi disponibili sul mercato, ma il **principale collo di bottiglia non è tecnologico, è legale**. Il trattamento di voce e scansioni 3D come dati biometrici (GDPR art. 9), il diritto all'immagine di persone decedute (art. 10 c.c. + artt. 96-97 L. 633/1941) e i nuovi obblighi di trasparenza sui contenuti generati da AI (AI Act, art. 50, applicabile da agosto 2026) impongono una struttura contrattuale e di compliance rigorosa **prima** di qualunque lancio commerciale, specialmente per i casi d'uso "commemorativi" (persone decedute) e per le celebrità.

**Raccomandazione strategica**: partire dal segmento **B2B eventi/musei con personaggi storici di pubblico dominio** (rischio legale minimo, ciclo di vendita prevedibile) per validare tecnologia e AI, rimandando i casi d'uso più delicati (persone decedute di recente, celebrità viventi, "compagnia" domestica) a una fase successiva con struttura legale già consolidata.

---

## 1. Validazione fattibilità legale

### 1.1 Quadro normativo per soggetto

| Categoria soggetto | Norma di riferimento | Cosa serve prima di usarlo |
|---|---|---|
| **Persona vivente che acconsente** | Art. 10 c.c.; GDPR art. 6 e art. 9 (dati biometrici) | Consenso scritto, esplicito, specifico e **revocabile** in ogni momento; contratto di licenza d'immagine/voce con compenso; informativa privacy dedicata |
| **Persona vivente famosa (attore, cantante, sportivo)** | Art. 10 c.c.; diritto al nome/marchio (molti nomi di celebrità sono marchi registrati); contratti di management | Licenza formale da agenzia/management/label; verifica di eventuali marchi registrati; royalty contrattuali |
| **Persona deceduta** | Art. 10 c.c. + artt. 96-97 L. 633/1941 (legge sul diritto d'autore) | Consenso degli **aventi diritto**, in ordine di legge: coniuge e figli → (in mancanza) genitori → (in mancanza) fratelli/sorelle → (in mancanza) ascendenti/discendenti diretti. La giurisprudenza italiana (es. caso Maradona) riconosce una **componente patrimoniale del diritto d'immagine trasmissibile agli eredi**, distinta dalla componente personale che si estingue con la morte |
| **Personaggio storico/scientifico di lunga data (es. Leonardo, Galileo)** | Nessun titolare vivente del diritto d'immagine personale | Rischio legale minimo lato immagine; attenzione residua a marchi/loghi museali e a eventuali diritti su ritratti/opere d'arte usate come fonte (diritto d'autore sull'opera fonte, se non di pubblico dominio) |
| **Personaggio recente o con eredi/fondazione attiva (es. Einstein, gestito da Hebrew University tramite licenziatari)** | Diritti gestiti da fondazioni/aventi causa | Verifica caso per caso: molte figure del XX secolo hanno diritti d'immagine ancora gestiti commercialmente |
| **Scansione 3D + voce del cliente stesso (es. familiare)** | GDPR art. 9 (dati biometrici, categoria particolare) | Consenso esplicito e specifico ex art. 9; informativa dettagliata; base giuridica autonoma per ogni nuovo uso (es. training di un modello vocale è un trattamento distinto dalla semplice registrazione) |

### 1.2 GDPR e dati biometrici

- **Voce e scansione 3D sono dati biometrici** quando trattati con mezzi tecnici per l'identificazione univoca di una persona (art. 4(14) e art. 9 GDPR): rientrano tra le "categorie particolari di dati", trattamento vietato salvo eccezioni — la più rilevante qui è il **consenso esplicito** (art. 9(2)(a)).
- Ogni nuova finalità (es. clonazione vocale per generare un "assistente AI parlante") richiede una **base giuridica autonoma**: il consenso raccolto per una foto/registrazione non copre automaticamente l'addestramento di un modello TTS.
- Data la combinazione "tecnologia nuova + dati biometrici trattati su ampia scala potenziale", è **quasi certamente necessaria una DPIA** (valutazione d'impatto sulla protezione dei dati, art. 35 GDPR) prima del lancio.
- Se il trattamento avviene su scala significativa (es. libreria di soggetti con centinaia di persone), valutare la nomina di un **DPO**.
- Requisiti operativi: informativa chiara e separata dal contratto commerciale, possibilità di revoca del consenso in qualsiasi momento con conseguente cancellazione dei dati vocali/3D, minimizzazione (conservare solo ciò che serve a generare l'esperienza, non i dati grezzi oltre il necessario), misure di sicurezza rafforzate (cifratura a riposo e in transito, accesso limitato).

### 1.3 AI Act (Regolamento UE 2024/1689) — obblighi rilevanti da agosto 2026

- **Art. 50 — trasparenza deepfake**: qualunque contenuto audio/video generato o manipolato da AI che assomigli a una persona reale (vivente o deceduta) deve essere **dichiarato come generato da AI**, anche per finalità di intrattenimento — quindi ogni sessione HoloTalk dovrà aprirsi con un disclaimer chiaro tipo *"Stai parlando con una ricostruzione basata su intelligenza artificiale di [nome], non con la persona reale"*.
- **Riconoscimento emozioni**: fuori da luoghi di lavoro/istruzione è permesso, ma se il sistema rileva lo stato emotivo dell'utente (es. per adattare le risposte) va **dichiarato** (art. 50(3)).
- **Categorizzazione biometrica per inferire caratteristiche sensibili** (etnia, orientamento, opinioni politiche) resta **vietata** in ogni caso (art. 5): il prodotto non deve mai avvicinarsi a questa funzionalità, nemmeno indirettamente.

### 1.4 Confronto internazionale (utile se si guarda a mercati extra-UE)

- **USA**: il *right of publicity* post-mortem varia stato per stato. California (AB 1836, 2025) ha esteso i diritti post-mortem delle celebrità ai "digital replica" generati da AI, con protezione di **70 anni** dalla morte; l'Indiana arriva a **100 anni**. È in discussione al Congresso il **NO FAKES Act** federale, che vieterebbe la creazione non autorizzata di repliche digitali di persone vive o decedute. Implicazione pratica: qualunque soggetto "americano" (anche storico) va verificato contro la legge dello stato di riferimento.
- Questo conferma che il rischio "diritti sulla persona replicata" è un tema regolatorio in rapida evoluzione ovunque, non solo in Italia/UE: la struttura contrattuale va pensata per essere aggiornabile.

### 1.5 Struttura contrattuale raccomandata

1. **Accordo di Consenso e Licenza Digital Replica** (soggetti viventi): consenso esplicito e specifico, revocabile in ogni momento, durata definita, ambito d'uso puntuale (es. "solo installazione museale X", non "qualsiasi uso commerciale futuro"), compenso, diritto di veto del soggetto sui contenuti/testi generati, clausola anti-diffamazione e di controllo qualità.
2. **Contratto di licenza con eredi/aventi diritto** (soggetti deceduti): identificazione formale della linea successoria secondo l'ordine di legge (art. 96-97 L. 633/1941), accordo scritto con **tutti** gli aventi diritto o loro rappresentante legale designato; se il soggetto è anche autore/interprete (cantante, musicista), verificare separatamente i diritti connessi (SIAE, etichetta discografica) sul repertorio associato.
3. **Informativa privacy dedicata + modulo di consenso ex art. 9 GDPR** per ogni trattamento di dati biometrici, redatti con supporto di un DPO/legale privacy.
4. **Disclaimer AI Act** integrato nell'esperienza utente (audio + eventuale testo a schermo) a ogni sessione.
5. **Assicurazione RC prodotto/professionale**, per coprire rischi di diffamazione, violazione IP, malfunzionamento tecnico durante eventi.
6. **Comitato etico/di revisione contenuti** (anche informale, 2-3 persone) per i casi più sensibili — in particolare la "commemorazione" di persone scomparse di recente, dove il rischio reputazionale ed emotivo è alto anche a fronte di consenso legale formalmente valido.

### 1.6 Rischi principali e mitigazioni

| Rischio | Impatto | Mitigazione |
|---|---|---|
| Uso non autorizzato di immagine/voce di celebrità | Cause legali, danni, sequestro | Solo soggetti su licenza verificata o di pubblico dominio in fase iniziale |
| Violazione GDPR su dati biometrici | Sanzioni fino al 4% del fatturato globale | DPIA, consenso esplicito, DPO, audit periodici |
| Contenuti generati offensivi/diffamatori dall'AI conversazionale | Danno reputazionale, responsabilità legale | Guardrail sui prompt, filtri di contenuto, revisione umana periodica dei log (in forma anonimizzata) |
| Impatto emotivo su utenti (casi commemorazione defunti) | Danno psicologico, critiche mediatiche | Warning esplicito, opt-in rafforzato, possibile supporto di uno psicologo consulente nella progettazione dell'esperienza |
| Obsolescenza normativa (AI Act, leggi USA sui digital replica) | Necessità di rifare contratti/informative | Clausole di aggiornamento nei contratti, revisione legale annuale |

### 1.7 Consulenza legale necessaria — checklist

- [ ] Avvocato IP/diritto d'autore (diritto d'immagine, artt. 96-97 L. 633/1941)
- [ ] Avvocato/consulente privacy o DPO esterno (GDPR, DPIA, dati biometrici)
- [ ] Consulente compliance AI Act (obblighi di trasparenza, classificazione del sistema come "a rischio limitato" o superiore)
- [ ] Commercialista/fiscalista per la struttura di royalty verso aventi diritto/agenzie
- [ ] Broker assicurativo per polizza RC prodotto/professionale

---

## 2. Stima costi hardware — 3 pacchetti

Stime basate su fascia media di mercato per componenti equivalenti (proiettori laser da business 4K, sistemi Pepper's Ghost su misura, workstation GPU per inferenza AI locale). Le installazioni Pepper's Ghost commerciali di fascia alta arrivano a €50.000–€200.000+; le stime sotto riguardano configurazioni "prodotto" più contenute, coerenti con un packaging vendibile/noleggiabile.

### 2.1 Componenti comuni a ogni pacchetto

| Componente | Funzione | Costo indicativo unitario |
|---|---|---|
| Proiettore laser 4K alta luminosità (5.000-8.500 lumen) | Immagine del soggetto | €3.500 – €12.000 (per unità, a seconda di luminosità/risoluzione) |
| Superficie di proiezione / vetro-schermo tipo Pepper's Ghost | Effetto "ologramma" | €800 – €3.000 (piccola/media) |
| Altoparlanti + eventuale processore audio spaziale | Voce del soggetto | €300 – €1.500 |
| Microfono array con cancellazione rumore | Input vocale utente | €200 – €500 |
| Unità di calcolo locale (mini-PC + GPU classe RTX 4090) *oppure* abbonamento GPU cloud | Esecuzione AI in tempo reale (STT+LLM+TTS) | €3.000 – €4.500 (acquisto) *oppure* ~€250-300/mese (cloud) |
| Sensore di presenza/tracking (LiDAR o radar mmWave) | Interazione naturale | €150 – €400 |
| Cablaggio, staffe, installazione base | — | €500 – €1.000 |

### 2.2 Pacchetto 1 — Muro singolo

1 proiettore, superficie piana, configurazione entry-level.

| Voce | Costo |
|---|---|
| Proiettore 4K | €3.500 – €5.000 |
| Superficie proiezione | €800 – €2.000 |
| Audio (2 speaker) | €300 – €600 |
| Microfono | €200 – €500 |
| Compute (locale) | €3.000 – €4.500 |
| Sensore presenza | €150 – €400 |
| Installazione/struttura | €500 – €1.000 |
| **Totale hardware (CAPEX)** | **≈ €8.500 – €14.000** |
| *In alternativa con AI su cloud (compute locale ridotto a ~€800)* | **≈ €6.000 – €10.500** + ~€250-300/mese cloud |

### 2.3 Pacchetto 2 — Muro doppio ad angolo

2 proiettori sincronizzati, maggiore profondità/realismo.

| Voce | Costo |
|---|---|
| 2 proiettori 4K sincronizzati | €7.000 – €10.000 |
| 2 superfici + struttura angolare | €2.000 – €5.000 |
| Audio spaziale (4 speaker + processore) | €800 – €1.500 |
| Microfono array | €300 – €600 |
| Compute locale (rendering doppio) | €4.500 – €7.000 |
| Sensori tracking (x2) | €400 – €800 |
| Struttura/installazione/cablaggio | €1.500 – €3.000 |
| **Totale hardware (CAPEX)** | **≈ €16.500 – €28.000** |

### 2.4 Pacchetto 3 — 3/4 mura (immersivo, premium)

Setup per eventi, musei, showroom.

| Voce | Costo |
|---|---|
| 3-4 proiettori laser alta gamma con edge-blending | €15.000 – €30.000 |
| Superfici curve/multiple + struttura | €5.000 – €15.000 |
| Audio multicanale (6-8 speaker + DSP) | €2.500 – €5.000 |
| Microfoni array multipli | €600 – €1.200 |
| Workstation multi-GPU (rendering + AI) | €10.000 – €18.000 |
| Media server / software di sincronizzazione multi-proiettore (es. licenza tipo Watchout/Resolume) | €3.000 – €6.000 |
| Installazione professionale (tecnico AV, collaudo, elettricista) | €5.000 – €10.000 |
| **Totale hardware (CAPEX)** | **≈ €41.000 – €85.000** |

Coerente con il range di mercato per installazioni Pepper's Ghost custom di fascia medio-alta (€50k-200k+ per impianti permanenti di grande scala).

### 2.5 Costi software/AI ricorrenti (OPEX per unità attiva)

| Voce | Costo indicativo |
|---|---|
| API conversazionale (LLM + STT + TTS, bundle speech-to-speech) | €0,10 – €0,30 / minuto di conversazione attiva |
| Hosting/cloud (se non compute locale) | €50 – €300 / mese per unità |
| Manutenzione e aggiornamenti software | Incluso in abbonamento SaaS lato cliente (vedi §5) |
| Licenza voce clonata / royalty su soggetto (se sotto licenza) | 15-30% revenue share tipico con agenzia/eredi (da negoziare caso per caso) |

### 2.6 Sintesi prezzi di vendita/noleggio consigliati (indicativi, margine ~35-45% su CAPEX)

| Pacchetto | Costo hardware | Prezzo di vendita indicativo | Prezzo noleggio evento (1-3 giorni) |
|---|---|---|---|
| Muro singolo | €8.500 – €14.000 | €12.000 – €18.000 | €1.200 – €2.000 |
| Muro doppio | €16.500 – €28.000 | €24.000 – €38.000 | €2.500 – €4.000 |
| 3/4 mura | €41.000 – €85.000 | €65.000 – €120.000 | €6.000 – €12.000 |

---

## 3. Prototipo minimo (MVP)

### 3.1 Obiettivo

Validare, in ambiente controllato, che l'esperienza (proiezione + conversazione vocale AI in tempo reale) sia credibile e a bassa latenza, e che l'intero processo di consenso/compliance funzioni end-to-end, **prima** di investire in soggetti "sensibili" (defunti, celebrità).

### 3.2 Perimetro

- **1 muro singolo** (configurazione più semplice)
- **1 solo "soggetto" di test**: una persona vivente e disponibile (es. founder o collaboratore del team), che fornisce **consenso esplicito, informato e revocabile** — scelta deliberata per evitare, in questa fase, i rischi legali più alti legati a defunti o celebrità
- Nessuna diffusione pubblica dei contenuti generati senza consenso specifico aggiuntivo

### 3.3 Bill of materials MVP (CAPEX contenuto, uso di AI su cloud)

| Componente | Costo |
|---|---|
| Proiettore entry-level (3.000-4.000 lumen, non necessariamente 4K) | €1.500 – €2.500 |
| Superficie di proiezione semi-trasparente economica | €300 |
| 2 speaker | €150 |
| Microfono USB array | €150 |
| PC di supporto (senza GPU dedicata pesante, AI via API cloud) | €800 – €1.500 |
| Sensore di presenza economico (PIR/mmWave) | €50 – €100 |
| **Totale hardware MVP** | **≈ €3.000 – €4.700** |
| API AI (LLM+STT+TTS a consumo, uso limitato di test) | ≈ €50 – €150/mese |

### 3.4 Consenso del soggetto test — elementi minimi della liberatoria

- Identificazione del soggetto e descrizione **dettagliata** degli usi previsti (scansione 3D, campionamento vocale, generazione di conversazioni via AI, test interni)
- Distinzione esplicita tra "uso per test interno" e qualunque eventuale "uso in materiale promozionale/pubblico" (quest'ultimo richiede consenso separato e specifico)
- Durata del consenso e **diritto di revoca in qualsiasi momento**, con cancellazione dei dati biometrici raccolti
- Eventuale compenso
- Riferimento esplicito a GDPR art. 9 e allegata informativa privacy
- Foro competente e recapiti del titolare del trattamento

### 3.5 Timeline e budget

| Fase | Durata | Costo stimato |
|---|---|---|
| Predisposizione consenso/informativa (con legale) | 2 settimane | €1.500 – €3.000 |
| Approvvigionamento e setup hardware | 2 settimane | €3.000 – €4.700 (hardware, vedi 3.3) |
| Integrazione software AI (STT/LLM/TTS, tracking) | 2-3 settimane | €6.000 – €10.000 (sviluppo) |
| Test, raccolta feedback, iterazione | 1 settimana | €1.000 – €2.000 |
| **Totale MVP** | **6-8 settimane** | **≈ €12.000 – €20.000** |

### 3.6 KPI di validazione

- Latenza conversazionale end-to-end < 1,5 secondi
- Accuratezza riconoscimento vocale > 90% in ambiente reale (rumore di fondo)
- Soddisfazione soggetto test e utenti di prova (survey qualitativa)
- Zero incidenti di violazione del consenso o fuoriuscita dati
- Tempo medio di interazione per sessione (proxy di engagement)

---

## 4. Target di mercato

### 4.1 Segmento B2C — Privati

- **Profilo**: early adopter tecnologici, fascia alta di reddito (dato il costo hardware), collezionisti di tecnologia, case history "smart home di lusso"
- **Casi d'uso**: intrattenimento/compagnia, mentore virtuale/coaching, eventualmente commemorazione (persona cara) — quest'ultimo caso richiede la compliance più rafforzata (§1) e va introdotto solo dopo aver consolidato il processo legale
- **Rischi**: prezzo di ingresso elevato limita il mercato iniziale; il caso "commemorazione" ha alto potenziale emotivo ma anche alto rischio reputazionale/etico
- **Willingness to pay**: verosimilmente più adatto a un modello noleggio/abbonamento che vendita hardware una tantum, almeno in fase iniziale

### 4.2 Segmento B2B — Eventi, musei, hotel, showroom

- **Profilo**: musei scientifici/storici, organizzatori di fiere ed eventi, hotel/showroom di fascia alta
- **Casi d'uso principali**: personaggi storici/scientifici (spesso di pubblico dominio → rischio legale minimo), installazioni educative, marketing esperienziale
- **Vantaggi**: ciclo di vendita B2B prevedibile, willingness to pay già dimostrata per exhibit interattivi/immersivi, minor esposizione legale (soggetti storici, non commemorazione di persone recentemente scomparse)
- **Modello di ricavo**: licenza/noleggio impianto a canone (mensile o per evento), più contenuti su abbonamento

### 4.3 Raccomandazione di priorità go-to-market

> **Partire dal segmento B2B eventi/musei con personaggi storici di pubblico dominio.** È il segmento con il minor rischio legale (nessun avente diritto vivente da negoziare per molte figure storiche), il ciclo di vendita più prevedibile e la willingness to pay già validata dal mercato degli exhibit museali interattivi. Il mercato B2C (privati) e i casi d'uso più delicati (celebrità su licenza, commemorazione di persone scomparse di recente) vanno affrontati in una seconda fase, quando tecnologia, contratti-tipo e processo di compliance sono già consolidati e testati sul campo.

### 4.4 Dimensionamento di mercato (indicativo)

- Il mercato globale dei "digital experience"/installazioni immersive per musei ed eventi è in crescita strutturale, trainato dalla domanda di contenuti esperienziali e dalla transizione dei proiettori verso l'illuminazione laser/LED (anche per effetto del bando UE al mercurio nelle lampade, che spinge il rinnovo del parco proiettori installato).
- Un dimensionamento quantitativo affidabile richiede una ricerca di mercato dedicata (numero di musei scientifici/interattivi in Italia/UE, budget medio per exhibit temporanei, spesa media eventi aziendali per allestimenti esperienziali) — da includere tra le attività immediate della fase 2 (vedi §6).

---

## 5. Business plan — costi/ricavi

> Proiezioni **indicative** a 3 anni, scenario "base". Da rivedere con dati reali dopo l'MVP e le prime vendite pilota.

### 5.1 Modello di revenue

- Vendita hardware (pacchetti 1/2/3)
- Noleggio hardware per eventi brevi
- Abbonamento mensile alla libreria di "soggetti" con licenza (B2C)
- Licenze B2B ricorrenti per musei/eventi/hotel (canone mensile o annuale)
- Servizio premium di scansione/clonazione vocale personalizzata (persona cara, su richiesta)

### 5.2 Struttura costi

- **CAPEX/COGS**: componenti hardware, assemblaggio, logistica
- **OPEX**: personale (sviluppo AI/software, hardware/AV, vendite), consulenze legali e compliance, cloud/AI a consumo, marketing, overhead generale
- **Royalty**: quota riconosciuta ad agenzie/eredi per soggetti su licenza (15-30% stimato)

### 5.3 Proiezione a 3 anni (scenario base, EUR)

| Voce | Anno 1 | Anno 2 | Anno 3 |
|---|---:|---:|---:|
| Vendite hardware (pacchetti) | 60.000 | 320.000 | 1.180.000 |
| Noleggi eventi | 15.000 | 54.000 | 100.000 |
| Abbonamenti B2C libreria soggetti | — | 17.400 | 104.400 |
| Licenze B2B ricorrenti | — | 60.000 | 216.000 |
| **Ricavi totali** | **75.000** | **451.400** | **1.600.400** |
| COGS hardware | 50.000 | 200.000 | 590.000 |
| Personale | 90.000 | 280.000 | 600.000 |
| Legale/compliance/licenze contenuti | 25.000 | 40.000 | 70.000 |
| Cloud/AI opex | 8.000 | 35.000 | 90.000 |
| Marketing | 10.000 | 40.000 | 80.000 |
| Overhead | 15.000 | 30.000 | 60.000 |
| **Costi totali** | **198.000** | **625.000** | **1.490.000** |
| **EBITDA** | **-123.000** | **-173.600** | **+110.400** |

*Nota: R&D/prototipazione anno 1 (~€40.000, coperta dall'MVP di §3 e sviluppo successivo) è inclusa nella voce "Personale/Legale" sopra in forma aggregata; nella pianificazione finanziaria di dettaglio andrà isolata come voce CAPEX di sviluppo.*

### 5.4 Break-even e fabbisogno finanziario

- **Break-even operativo stimato**: nel corso dell'anno 3, con margine EBITDA che diventa positivo (~+7% sui ricavi)
- **Perdita cumulata anni 1-2**: ≈ €296.600
- **Fabbisogno di capitale indicativo** (copertura perdite + capitale circolante + buffer): **€500.000 – €700.000** in un round seed/pre-seed, da destinare principalmente a: sviluppo software AI, produzione dei primi pacchetti hardware, compliance legale, vendite B2B iniziali

### 5.5 Principali assunzioni e rischi del piano

- I volumi di vendita anno 2-3 assumono una validazione di mercato positiva nell'anno 1 (MVP + prime vendite pilota B2B) — **da verificare**, non garantita
- I costi hardware potrebbero scendere nel tempo (curva di apprendimento sui componenti, economia di scala sui proiettori laser) — il piano è conservativo su questo fronte
- I costi legali/compliance sono stimati per uno scenario "solo soggetti storici di pubblico dominio + pochi soggetti su licenza"; l'ingresso in casi d'uso più delicati (celebrità, commemorazione) aumenterebbe sensibilmente questa voce
- I ricavi da abbonamento B2C sono probabilmente il componente più incerto del piano (nuovo mercato, willingness to pay non ancora testata) e sono stati mantenuti volutamente contenuti

---

## 6. Roadmap e prossimi passi operativi

| # | Attività | Owner suggerito | Orizzonte |
|---|---|---|---|
| 1 | Consulenza legale formale (IP/immagine + privacy/GDPR + AI Act) — vedi checklist §1.7 | Legale esterno | 2-4 settimane |
| 2 | Richiesta preventivi reali a fornitori hardware (proiettori, audio, integratori AV) per i 3 pacchetti | Team hardware | 2-3 settimane, in parallelo al punto 1 |
| 3 | Costruzione MVP (§3): 1 muro singolo + 1 soggetto test con consenso | Team tecnico | 6-8 settimane |
| 4 | Ricerca di mercato quantitativa sul segmento B2B musei/eventi (dimensionamento, contatti pilota) | Team business | In parallelo ai punti 2-3 |
| 5 | Redazione contratti-tipo (consenso soggetto vivente, licenza eredi, informativa privacy) sulla base dell'esito del punto 1 | Legale + team business | Dopo punto 1 |
| 6 | Test MVP con utenti reali, raccolta feedback, iterazione | Team tecnico + business | Dopo punto 3 |
| 7 | Prime vendite pilota B2B (musei/eventi, personaggi storici di pubblico dominio) | Team business | Dopo punti 3-6 |
| 8 | Validazione e revisione del business plan con dati reali | Team business | Dopo punto 7 |
| 9 | Round di raccolta capitale (seed/pre-seed, €500k-700k indicativi) | Founder | In parallelo/dopo punto 7-8 |

---

## 7. Fonti

**Diritto d'immagine e post-mortem (Italia):**
- [Da Maradona alla tutela del diritto all'immagine dei defunti – IUS In Itinere](https://iusinitinere.it/da-maradona-alla-tutela-del-diritto-allimmagine-dei-defunti/)
- [La privacy delle persone decedute e i diritti degli eredi – diritto.it](https://www.diritto.it/privacy-delle-persone-decedute-e-diritti-eredi/)
- [Resurrezione digitale e diritto all'immagine – Studio Legale Fede](https://www.studiolegalefede.it/2016/12/28/resurrezione-digitale-diritto-allimmagine/)

**GDPR e dati biometrici:**
- [Dati biometrici – Protezione dati personali](https://protezionedatipersonali.it/dati-biometrici)
- [La voce come dato personale – GDPReady](https://www.gdpready.it/blog/la-voce-come-dato-personale/)
- [Dati biometrici e GDPR: guida completa per le aziende – legalfordigital](https://legalfordigital.it/gdpr/dati-biometrici-gdpr/)
- [Deepfake AI generativa: rischi GDPR e AI Act per PMI italiane – aipolicy.it](https://aipolicy.it/deepfake-ai-generativa-rischi-pmi-garante-privacy/)

**Right of publicity post-mortem (USA, per confronto):**
- [California Expands Its Post-Mortem Right of Publicity Law to Cover AI Digital Replicas – CDAS](https://cdas.com/california-expands-its-post-mortem-right-of-publicity-law-to-cover-ai-digital-replicas/)
- [Postmortem Publicity Rights and Digital Use of Celebrity Likeness – Expert Institute](https://www.expertinstitute.com/resources/insights/ai-digital-celebrity-likeness-right/)
- [Deepfakes of the Dead: Applying Postmortem Publicity Law to AI Digital Replicas – Wake Forest Journal of Law and Policy](https://wfujournaloflawandpolicy.org/deepfakes-of-the-dead-applying-postmortem-publicity-law-to-artificial-intelligence-digital-replicas/)

**AI Act (UE):**
- [The EU AI Act's Transparency Rules: A Practical Guide to Article 50](https://artificialintelligenceact.eu/transparency-rules-article-50/)
- [Transparency obligations under Article 50 of the AI Act – Digital Strategy EU](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act)

**Costi hardware:**
- [How much is a hologram projector? – HD Focus](https://www.hd-focus.com/info/how-much-is-a-hologram-projector-103218330.html)
- [Hologram Display Price – The Ultimate Guide – INAIRSPACE](https://inairspace.com/blogs/learn-with-inair/hologram-display-price-the-ultimate-guide-to-cost-technology-future)
- [A Pepper's Ghost 3D holographic projection system – ic3dsfx](https://www.ic3dsfx.co.uk/holographic-projection-3d-eventpod)
- [Best Business Projectors for 2026 – Projector Reviews](https://www.projectorreviews.com/projector-categories/business-projectors/)
- [3D Body Scanner Price Guide – Alibaba](https://electronics.alibaba.com/buyingguides/3d-body-scanner-price-guide-what-you-actually-need)

**Costi AI/software:**
- [Voice Agent Cost Per Minute 2026: Worked Cost Model – Inworld AI](https://inworld.ai/resources/voice-agent-cost-per-minute-2026)
- [AI Voice TTS Pricing (2026) – buildmvpfast](https://www.buildmvpfast.com/api-costs/ai-voice)
- [RTX 4090 Specs, Price & AI Performance Guide (2026) – millionminer](https://millionminer.com/news/nvidia-rtx-4090-specs-price-guide)

---

*Documento generato come sintesi di lavoro ("file master") a partire dall'idea di business originale e dai 5 punti di validazione richiesti: fattibilità legale, costi hardware, prototipo minimo, target di mercato, business plan. Da aggiornare con dati reali man mano che le attività di roadmap (§6) procedono.*
