import { Activity, ACT_Attendance, Course, Hall, Student, Teacher, Time } from "./Entities.js";
import { ACT_Distribution, TimetableGenerator } from "./TimetableGenerator.js";
import tf from "@tensorflow/tfjs-node"

tf.setBackend('cpu');

let tg = new TimetableGenerator(1, new Time(0,0,0), new Time(0,5,0), new Time(0,1,0));

let halls = [];
halls.push(new Hall("A", 100), new Hall("B", 50), new Hall("C", 10));

let st = [
new Student("Asfaltina", "Betončič"), new Student("Ante", "KiTeGledaIzKante"), new Student("KruhMed", "Paštetovič"),
new Student("Pedro", "Opeka"), new Student("Rikardo", "Mortimir"), new Student("Kastelic", "Jakob"), new Student("Dobr", "Man"),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("","")
];

let T_BatageljBorut = new Teacher("Batagelj", "Borut");
let T_BovconNarvika = new Teacher("Bovcon", "Narvika");
let T_BrodnikAndrej = new Teacher("Brodnik", "Andrej");
let T_BulićPatricio = new Teacher("Bulić", "Patricio");
let T_CiglaričMojca = new Teacher("Ciglarič", "Mojca");
let T_CurkTomaž = new Teacher("Curk", "Tomaž");
let T_ČešnovarRok = new Teacher("Češnovar", "Rok");
let T_DemšarJanez = new Teacher("Demšar", "Janez");
let T_DobravecTomaž = new Teacher("Dobravec", "Tomaž");
let T_DobrevskiMatej = new Teacher("Dobrevski", "Matej");
let T_EmersicZiga = new Teacher("Emeršič", "Žiga");
let T_FrancAleksandra = new Teacher("Franc", "Aleksandra");
let T_FujsDamjan = new Teacher("Fujs", "Damjan");
let T_GodecPrimož = new Teacher("Godec", "Primož");
let T_GomiščekRok = new Teacher("Gomišček", "Rok");
let T_GroharMiha = new Teacher("Grohar", "Miha");
let T_HočevarTomaž = new Teacher("Hočevar", "Tomaž");
let T_IlcNejc = new Teacher("Ilc", "Nejc");
let T_JagerFranc = new Teacher("Jager", "Franc");
let T_JakličAleš = new Teacher("Jaklič", "Aleš");
let T_JelencDavid = new Teacher("Jelenc", "David");
let T_JurišićAleksandar = new Teacher("Jurišić", "Aleksandar");
let T_KavčičAlenka = new Teacher("Kavčič", "Alenka");
let T_KinkPeter_Marijan = new Teacher("Kink", "Peter Marijan");
let T_KochovskiPetar = new Teacher("Kochovski", "Petar");
let T_KononenkoIgor = new Teacher("Kononenko", "Igor");
let T_KukarMatjaž = new Teacher("Kukar", "Matjaž");
let T_Lebar_BajecIztok = new Teacher("Lebar Bajec", "Iztok");
let T_LesarŽiga = new Teacher("Lesar", "Žiga");
let T_LotričUroš = new Teacher("Lotrič", "Uroš");
let T_MedenBlaž = new Teacher("Meden", "Blaž");
let T_MiheličJurij = new Teacher("Mihelič", "Jurij");
let T_MoškonMiha = new Teacher("Moškon", "Miha");
let T_MožinaMartin = new Teacher("Možina", "Martin");
let T_OmanovićAmra = new Teacher("Omanović", "Amra");
let T_PančurMatjaž = new Teacher("Pančur", "Matjaž");
let T_PeerPeter = new Teacher("Peer", "Peter");
let T_PesekMatevž = new Teacher("Pesek", "Matevž");
let T_PičulinMatej = new Teacher("Pičulin", "Matej");
let T_PoličarPavlin_Gregor = new Teacher("Poličar", "Pavlin Gregor");
let T_PušnikŽiga = new Teacher("Pušnik", "Žiga");
let T_RozmanRobert = new Teacher("Rozman", "Robert");
let T_RožancIgor = new Teacher("Rožanc", "Igor");
let T_RupnikRok = new Teacher("Rupnik", "Rok");
let T_SadikovAleksander = new Teacher("Sadikov", "Aleksander");
let T_SkočajDanijel = new Teacher("Skočaj", "Danijel");
let T_SlivnikBoštjan = new Teacher("Slivnik", "Boštjan");
let T_SlugaDavor = new Teacher("Sluga", "Davor");
let T_SmrdelAleš = new Teacher("Smrdel", "Aleš");
let T_SolinaFranc = new Teacher("Solina", "Franc");
let T_StankovskiVlado = new Teacher("Stankovski", "Vlado");
let T_ŠajnLuka = new Teacher("Šajn", "Luka");
let T_ŠpetičAleš = new Teacher("Špetič", "Aleš");
let T_ŠterBranko = new Teacher("Šter", "Branko");
let T_TrebarMira = new Teacher("Trebar", "Mira");
let T_VavpotičDamjan = new Teacher("Vavpotič", "Damjan");
let T_VeljkovićKristina = new Teacher("Veljković", "Kristina");
let T_VračarPetar = new Teacher("Vračar", "Petar");
let T_ZalarAljaž = new Teacher("Zalar", "Aljaž");
let T_ZrnecAljaž = new Teacher("Zrnec", "Aljaž");
let T_ŽustLojze = new Teacher("Žust", "Lojze");
let T_FelePolž = new Teacher("Fele Žorž", "Gašper");
let T_Huč = new Teacher("Huč", "Aleks");
let T_Čehovin = new Teacher("Čehovin Zajc", "Luka");

let C1_Produkcija_multimedijskih = new Course("Produkcija multimedijskih gradiv", T_BatageljBorut) ;
C1_Produkcija_multimedijskih.asistants = [T_PesekMatevž];
let C1_Grafično_oblikovanje = new Course("Grafično oblikovanje", T_BovconNarvika);
C1_Grafično_oblikovanje.asistants = [T_MedenBlaž, T_Lebar_BajecIztok];
let C1_Komunikacijski_protokoli = new Course("Komunikacijski protokoli in omrežna varnost", T_BrodnikAndrej);
C1_Komunikacijski_protokoli.asistants = [T_FelePolž, T_Huč];
let C1_Vgrajeni_sistemi = new Course("Vgrajeni sistemi");
C1_Vgrajeni_sistemi.asistants = [T_ČešnovarRok];
let C1_Vzporedni_in = new Course("Vzporedni in porazdeljeni sistemi in algoritmi", T_BulićPatricio);
C1_Vzporedni_in.asistants = [T_SlugaDavor, T_ČešnovarRok];
let C1_Računalniške_komunikacije = new Course("Računalniške komunikacije", T_CiglaričMojca);
C1_Računalniške_komunikacije.asistants = [T_GroharMiha, T_PančurMatjaž];
let C1_Podatkovno_rudarjenje = new Course("Podatkovno rudarjenje", T_CurkTomaž);
C1_Podatkovno_rudarjenje.asistants = [T_GomiščekRok, T_OmanovićAmra];
let C1_Robotika_in = new Course("Robotika in računalniško zaznavanje", T_SkočajDanijel);
C1_Robotika_in.asistants = [T_Čehovin];
let C1_Programski_jezik = new Course("Programski jezik C", T_DobravecTomaž);
C1_Programski_jezik.asistants = [T_ČešnovarRok, T_DobravecTomaž]
let C1_Računalniška_arhitektura = new Course("Računalniška arhitektura", T_RozmanRobert);
C1_Računalniška_arhitektura = [T_RozmanRobert, T_PušnikŽiga, T_TrebarMira, T_ČešnovarRok]
let C1_Programiranje_1 = new Course("Programiranje 1", T_DemšarJanez);
C1_Programiranje_1.asistants = [T_GodecPrimož, T_HočevarTomaž, T_PoličarPavlin_Gregor]
let C1_Algoritmi_in = new Course("Algoritmi in podatkovne strukture 2", T_DobravecTomaž);
C1_Algoritmi_in.asistants = [T_KavčičAlenka]
let C1_Programiranje_2 = new Course("Programiranje 2", T_DobravecTomaž);
C1_Programiranje_2.asistants = [T_KavčičAlenka, T_ŽustLojze]
let C1_Uvod_v = new Course("Uvod v računalništvo", T_StankovskiVlado);
C1_Uvod_v.asistants = [T_DobrevskiMatej, T_GomiščekRok]
let C1_Osnove_verjetnosti = new Course("Osnove verjetnosti in statistike", T_JurišićAleksandar);
C1_Osnove_verjetnosti.asistants = [T_VeljkovićKristina, T_FrancAleksandra]
let C1_Planiranje_in = new Course("Planiranje in upravljanje informatike", T_RupnikRok);
C1_Planiranje_in.asistants = [T_FujsDamjan]
let C1_Razvoj_informacijskih = new Course("Razvoj informacijskih sistemov", T_KavčičAlenka);
C1_Razvoj_informacijskih.asistants = [T_FujsDamjan]
let C1_Tehnologija_programske = new Course("Tehnologija programske opreme", T_RožancIgor);
C1_Tehnologija_programske.asistants = [T_FujsDamjan]
let C1_Informacijski_sistemi = new Course("Informacijski sistemi", T_VavpotičDamjan);
C1_Informacijski_sistemi.asistants = [T_GroharMiha]
let C1_Digitalno_procesiranje = new Course("Digitalno procesiranje signalov", T_JagerFranc);
C1_Digitalno_procesiranje.asistants = [T_Huč]
let C1_Procesna_avtomatika = new Course("Procesna avtomatika", T_LotričUroš);
C1_Procesna_avtomatika.asistants = [T_IlcNejc]
let C1_Sistemska_programska = new Course("Sistemska programska oprema", T_ŠterBranko);
C1_Sistemska_programska.asistants = [T_IlcNejc]
let C1_Tehnologija_iger = new Course("Tehnologija iger in navidezna resničnost", T_JakličAleš);
C1_Tehnologija_iger.asistants = [T_KlemencBojan]
let C1_Spletne_tehnologije = new Course("Spletne tehnologije", T_SmrdelAleš);
C1_Spletne_tehnologije.asistants = [T_JelencDavid]
let C1_Multimedijske_tehnologije = new Course("Multimedijske tehnologije", T_KavčičAlenka);
C1_Multimedijske_tehnologije.asistants = [ T_PesekMatevž]
let C1_Numerične_metode = new Course("Numerične metode", T_ZalarAljaž);
C1_Numerične_metode.asistants = [T_KinkPeter_Marijan]
let C1_Umetna_inteligenca = new Course("Umetna inteligenca", T_KononenkoIgor);
C1_Umetna_inteligenca.asistants = [T_VračarPetar]
let C1_Podatkovne_baze = new Course("Podatkovne baze", T_KukarMatjaž);
C1_Podatkovne_baze.asistants = [T_PičulinMatej]
let C1_Računalniška_grafika = new Course("Računalniška grafika", T_Lebar_BajecIztok);
C1_Računalniška_grafika.asistants = [T_LesarŽiga]
let C1_Načrtovanje_digitalnih = new Course("Načrtovanje digitalnih naprav", T_MoškonMiha);
C1_Načrtovanje_digitalnih.asistants = [T_MoškonMiha]
let C1_Odločitveni_sistemi = new Course("Odločitveni sistemi", T_SadikovAleksander);
C1_Odločitveni_sistemi.asistants = [T_MožinaMartin]
let C1_Tehnične_veščine = new Course("Tehnične veščine", T_PančurMatjaž);
C1_Tehnične_veščine.asistants = [T_PančurMatjaž]
let C1_Organizacija_računalnikov = new Course("Organizacija računalnikov", T_RozmanRobert);
C1_Organizacija_računalnikov.asistants = [T_RozmanRobert]
let C1_Testiranje_in = new Course("Testiranje in kakovost", T_RožancIgor);
C1_Testiranje_in.asistants = [T_RožancIgor]
let C1_Elektronsko_in = new Course("Elektronsko in mobilno poslovanje", T_RupnikRok);
C1_Elektronsko_in.asistants = [T_RupnikRok]
let C1_Prevajalniki_in = new Course("Prevajalniki in navidezni stroji", T_SlivnikBoštjan);
C1_Prevajalniki_in.asistants = [T_SlivnikBoštjan]
let C1_Uporabniški_vmesniki = new Course("Uporabniški vmesniki", T_SmrdelAleš);
C1_Uporabniški_vmesniki.asistants = [T_SmrdelAleš]
let C1_Izbrana_poglavja = new Course("Izbrana poglavja iz računalništva in informatike", T_ŠpetičAleš);
C1_Uporabniški_vmesniki.asistants = [T_ŠpetičAleš]
let C1_Digitalna_vezja = new Course("Digitalna vezja", T_TrebarMira);
C1_Digitalna_vezja.asistants = [T_TrebarMira]
let C1_Diskretne_strukture = new Course("Diskretne strukture", T_ZalarAljaž);
C1_Diskretne_strukture.asistants = [T_ZalarAljaž]

let C1_Operacijski_sistemi = new Course("Operacijski sistemi",T_PeerPeter);
C1_Operacijski_sistemi.asistants = [T_BatageljBorut, T_EmersicZiga, T_KlemencBojan];




let A1 = new Teacher("Asfaltina", "Betončič")

let T2 = new Teacher("KruhMed", "Paštetovič");

let T3 = new Teacher("Juho", "Mešovič");

let C1 = new Course("Divjanje in kakovost");
C1.asistants = [A1];
C1.students = st.slice(0, 30);
let C2 = new Course("Komunikacijski protokoli in smrtna nevarnost", T2);
C2.students = st.slice(25,45)
let C3 = new Course("Testiranje smučarske opreme")
C3.students = st.slice(40,50);

let activities = [];
activities.push(
                new Activity(C1_Umetna_inteligenca, T_KononenkoIgor, new Time(0,3,0), ACT_Attendance.ALL),
                new Activity(C1_Umetna_inteligenca, T_VračarPetar , new Time(0,2,0), ACT_Attendance.NATIVE),
                new Activity(C1_Diskretne_strukture, T_ZalarAljaž , new Time(0,2,0), ACT_Attendance.NATIVE),
                new Activity(C1_Diskretne_strukture, T_ZalarAljaž , new Time(0,2,0), ACT_Attendance.NATIVE),
                new Activity(, T_ZalarAljaž , new Time(0,2,0), ACT_Attendance.NATIVE),
                );

tg.activities = activities;
tg.halls = halls;


tg.populateActivities(ACT_Distribution.DISTRIB_LIN);
tg.train(100, 20);