/* @ts-self-types="./dhaturupa_wasm.d.ts" */

/**
 * The complete list of ordinary *kṛt pratyaya*s.
 *
 * Rust's naming convention is to start enum values with capital letters. However, we allow mixed
 * case explicitly here so that we can name pratyayas more concisely with SLP1. Doing so helps us
 * distinguish between pratyayas like `naN` and `nan`.
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119}
 */
const BaseKrt = Object.freeze({
    /**
     * -a
     */
    a: 0, "0": "a",
    /**
     * -a,
     */
    aN: 1, "1": "aN",
    /**
     * -a
     */
    ac: 2, "2": "ac",
    /**
     * -a
     */
    aR: 3, "3": "aR",
    /**
     * -aDyE
     */
    aDyE: 4, "4": "aDyE",
    /**
     * -aDyE
     */
    aDyEn: 5, "5": "aDyEn",
    /**
     * -at (jarat)
     */
    atfn: 6, "6": "atfn",
    /**
     * -aTu (vepaTu). Allowed only for dhatus that are `qvit`.
     */
    aTuc: 7, "7": "aTuc",
    /**
     * -ani
     */
    ani: 8, "8": "ani",
    /**
     * -anIya (gamanIya, BavanIya, ...)
     */
    anIyar: 9, "9": "anIyar",
    /**
     * -a
     */
    ap: 10, "10": "ap",
    /**
     * -ase
     */
    ase: 11, "11": "ase",
    /**
     * -ase
     */
    asen: 12, "12": "asen",
    /**
     * -Alu
     */
    Aluc: 13, "13": "Aluc",
    /**
     * -Aru
     */
    Aru: 14, "14": "Aru",
    /**
     * -ika
     */
    ika: 15, "15": "ika",
    /**
     * -ikavaka
     */
    ikavaka: 16, "16": "ikavaka",
    /**
     * -itra
     */
    itra: 17, "17": "itra",
    /**
     * -in. The trailing `_` is to avoid colliding with Rust's `in` keyword.
     */
    in_: 18, "18": "in_",
    /**
     * -in
     */
    ini: 19, "19": "ini",
    /**
     * -izRu (alaMkarizRu, prajanizRu, ...)
     */
    izRuc: 20, "20": "izRuc",
    /**
     * -u (yuyutsu, Bikzu, ...)
     */
    u: 21, "21": "u",
    /**
     * -uka
     */
    ukaY: 22, "22": "ukaY",
    /**
     * -Uka
     */
    Uka: 23, "23": "Uka",
    /**
     * -a
     */
    ka: 24, "24": "ka",
    /**
     * -a
     */
    kaY: 25, "25": "kaY",
    /**
     * -aDyE
     */
    kaDyE: 26, "26": "kaDyE",
    /**
     * -aDyE
     */
    kaDyEn: 27, "27": "kaDyEn",
    /**
     * -am
     */
    kamul: 28, "28": "kamul",
    /**
     * -as (visfpaH, ...)
     */
    kasun: 29, "29": "kasun",
    /**
     * -a
     */
    kap: 30, "30": "kap",
    /**
     * -ase
     */
    kase: 31, "31": "kase",
    /**
     * -ase
     */
    kasen: 32, "32": "kasen",
    /**
     * -Ana (cakrARa, ...)
     */
    kAnac: 33, "33": "kAnac",
    /**
     * -i (udaDi, ...)
     */
    ki: 34, "34": "ki",
    /**
     * -i
     */
    kin: 35, "35": "kin",
    /**
     * -ura (BaNgura, ...)
     */
    kurac: 36, "36": "kurac",
    /**
     * -elima (pacelima, ...)
     */
    kelimar: 37, "37": "kelimar",
    /**
     * -ta (gata, bhUta, ...)
     */
    kta: 38, "38": "kta",
    /**
     * -tavat (gatavat, bhUtavat, ...)
     */
    ktavatu: 39, "39": "ktavatu",
    /**
     * -ti
     */
    ktic: 40, "40": "ktic",
    /**
     * -ti
     */
    ktin: 41, "41": "ktin",
    /**
     * -tri
     */
    ktri: 42, "42": "ktri",
    /**
     * -tvA (gatvA, bhUtva, ...)
     */
    ktvA: 43, "43": "ktvA",
    /**
     * -nu
     */
    knu: 44, "44": "knu",
    /**
     * -mara
     */
    kmarac: 45, "45": "kmarac",
    /**
     * -ya
     */
    kyap: 46, "46": "kyap",
    /**
     * -ru (BIru)
     */
    kru: 47, "47": "kru",
    /**
     * -ruka (BIruka)
     */
    krukan: 48, "48": "krukan",
    /**
     * -luka (BIluka)
     */
    klukan: 49, "49": "klukan",
    /**
     * -van
     */
    kvanip: 50, "50": "kvanip",
    /**
     * -vara
     */
    kvarap: 51, "51": "kvarap",
    /**
     * -vas
     */
    kvasu: 52, "52": "kvasu",
    /**
     * -snu (glAsnu, jizRu, ...)
     */
    ksnu: 53, "53": "ksnu",
    /**
     * (empty suffix)
     */
    kvin: 54, "54": "kvin",
    /**
     * (empty suffix)
     */
    kvip: 55, "55": "kvip",
    /**
     * -a (priyaMvada, vaSaMvada)
     */
    Kac: 56, "56": "Kac",
    /**
     * -a
     */
    KaS: 57, "57": "KaS",
    /**
     * -a (Izatkara, duzkara, sukara, ...)
     */
    Kal: 58, "58": "Kal",
    /**
     * -izRu
     */
    KizRuc: 59, "59": "KizRuc",
    /**
     * -uka
     */
    KukaY: 60, "60": "KukaY",
    /**
     * -ana
     */
    Kyun: 61, "61": "Kyun",
    /**
     * -a
     */
    Ga: 62, "62": "Ga",
    /**
     * -a
     */
    GaY: 63, "63": "GaY",
    /**
     * -in
     */
    GinuR: 64, "64": "GinuR",
    /**
     * -ura
     */
    Gurac: 65, "65": "Gurac",
    /**
     * -van
     */
    Nvanip: 66, "66": "Nvanip",
    /**
     * -Ana
     */
    cAnaS: 67, "67": "cAnaS",
    /**
     * -ana
     */
    Yyuw: 68, "68": "Yyuw",
    /**
     * -a
     */
    wa: 69, "69": "wa",
    /**
     * -a
     */
    wak: 70, "70": "wak",
    /**
     * -a
     */
    qa: 71, "71": "qa",
    /**
     * -ara,
     */
    qara: 72, "72": "qara",
    /**
     * -u
     */
    qu: 73, "73": "qu",
    /**
     * -a
     */
    Ra: 74, "74": "Ra",
    /**
     * -am
     */
    Ramul: 75, "75": "Ramul",
    /**
     * -in
     */
    Rini: 76, "76": "Rini",
    /**
     * -ya
     */
    Ryat: 77, "77": "Ryat",
    /**
     * -ana
     */
    Ryuw: 78, "78": "Ryuw",
    /**
     * (empty)
     */
    Rvi: 79, "79": "Rvi",
    /**
     * -aka
     */
    Rvuc: 80, "80": "Rvuc",
    /**
     * -aka
     */
    Rvul: 81, "81": "Rvul",
    /**
     * -tave
     */
    taveN: 82, "82": "taveN",
    /**
     * -tave
     */
    taven: 83, "83": "taven",
    /**
     * -tavE
     */
    tavE: 84, "84": "tavE",
    /**
     * -tavya (gantavya, bhavitavya, ...)
     */
    tavya: 85, "85": "tavya",
    /**
     * -tavya
     */
    tavyat: 86, "86": "tavyat",
    /**
     * -tum (gantum, bhavitum, ...)
     */
    tumun: 87, "87": "tumun",
    /**
     * -tf (gantA, bhavitA, ...)
     */
    tfc: 88, "88": "tfc",
    /**
     * -tf
     */
    tfn: 89, "89": "tfn",
    /**
     * -tos (udetoH)
     */
    tosun: 90, "90": "tosun",
    /**
     * -Taka (gATaka)
     */
    Takan: 91, "91": "Takan",
    /**
     * -na
     */
    naN: 92, "92": "naN",
    /**
     * -naj
     */
    najiN: 93, "93": "najiN",
    /**
     * -na (svapna)
     */
    nan: 94, "94": "nan",
    /**
     * -ni,
     */
    ni: 95, "95": "ni",
    /**
     * -man
     */
    manin: 96, "96": "manin",
    /**
     * -ya
     */
    yat: 97, "97": "yat",
    /**
     * -ana
     */
    yuc: 98, "98": "yuc",
    /**
     * -na (namra, kampra, ...)
     */
    ra: 99, "99": "ra",
    /**
     * -ru
     */
    ru: 100, "100": "ru",
    /**
     * -ana
     */
    lyu: 101, "101": "lyu",
    /**
     * -ana
     */
    lyuw: 102, "102": "lyuw",
    /**
     * -van
     */
    vanip: 103, "103": "vanip",
    /**
     * -vara
     */
    varac: 104, "104": "varac",
    /**
     * (empty suffix)
     */
    vic: 105, "105": "vic",
    /**
     * (none)
     */
    viw: 106, "106": "viw",
    /**
     * -aka
     */
    vuY: 107, "107": "vuY",
    /**
     * -aka
     */
    vun: 108, "108": "vun",
    /**
     * -Aka
     */
    zAkan: 109, "109": "zAkan",
    /**
     * -tra
     */
    zwran: 110, "110": "zwran",
    /**
     * -aka
     */
    zvun: 111, "111": "zvun",
    /**
     * -a
     */
    Sa: 112, "112": "Sa",
    /**
     * -at (gacCat, Bavat, ...)
     */
    Satf: 113, "113": "Satf",
    /**
     * -aDyE
     */
    SaDyE: 114, "114": "SaDyE",
    /**
     * -aDyE
     */
    SaDyEn: 115, "115": "SaDyEn",
    /**
     * -Ana (laBamAna, sevamAna, ...)
     */
    SAnac: 116, "116": "SAnac",
    /**
     * -Ana
     */
    SAnan: 117, "117": "SAnan",
    /**
     * -se
     */
    se: 118, "118": "se",
    /**
     * -se
     */
    sen: 119, "119": "sen",
});
exports.BaseKrt = BaseKrt;

/**
 * The pada of some *tiṅanta* or *kṛdanta*.
 * @enum {0 | 1}
 */
const DhatuPada = Object.freeze({
    /**
     * *Parasmaipada*.
     */
    Parasmai: 0, "0": "Parasmai",
    /**
     * *Ātmanepada*.
     */
    Atmane: 1, "1": "Atmane",
});
exports.DhatuPada = DhatuPada;

/**
 * Defines a *gaṇa*.
 *
 * The dhatus in the Dhatupatha are organized in ten large *gaṇa*s or classes. These gaṇas
 * add various properties to the dhatu, most notably the specific *vikaraṇa* (stem suffix) we use
 * before *sārvadhātuka* suffixes.
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}
 */
const Gana = Object.freeze({
    /**
     * The first gaṇa, whose first dhatu is `BU`.
     */
    Bhvadi: 0, "0": "Bhvadi",
    /**
     * The second gaṇa, whose first dhatu is `ad`.
     */
    Adadi: 1, "1": "Adadi",
    /**
     * The third gaṇa, whose first dhatu is `hu`.
     */
    Juhotyadi: 2, "2": "Juhotyadi",
    /**
     * The fourth gaṇa, whose first dhatu is `div`.
     */
    Divadi: 3, "3": "Divadi",
    /**
     * The fifth gaṇa, whose first dhatu is `su`.
     */
    Svadi: 4, "4": "Svadi",
    /**
     * The sixth gaṇa, whose first dhatu is `tud`.
     */
    Tudadi: 5, "5": "Tudadi",
    /**
     * The seventh gaṇa, whose first dhatu is `ruD`.
     */
    Rudhadi: 6, "6": "Rudhadi",
    /**
     * The eighth gaṇa, whose first dhatu is `tan`.
     */
    Tanadi: 7, "7": "Tanadi",
    /**
     * The ninth gaṇa, whose first dhatu is `krI`.
     */
    Kryadi: 8, "8": "Kryadi",
    /**
     * The tenth gaṇa, whose first dhatu is `cur`.
     */
    Curadi: 9, "9": "Curadi",
    /**
     * The kandvAdi gaṇa, whose first dhatu is `kaRqU`.
     */
    Kandvadi: 10, "10": "Kandvadi",
});
exports.Gana = Gana;

/**
 * The tense/mood of some *tiṅanta*.
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}
 */
const Lakara = Object.freeze({
    /**
     * Describes action in the present tense. Ssometimes called the *present indicative*.
     */
    Lat: 0, "0": "Lat",
    /**
     * Describes unwitnessed past action. Sometimes called the *perfect*.
     */
    Lit: 1, "1": "Lit",
    /**
     * Describes future action after the current day. Sometimes called the *periphrastic future*.
     */
    Lut: 2, "2": "Lut",
    /**
     * Describes general future action. Sometimes called the *simple future*.
     */
    Lrt: 3, "3": "Lrt",
    /**
     * The Vedic subjunctive. `vidyut-prakriya` currently has poor support for this lakara.
     */
    Let: 4, "4": "Let",
    /**
     * Describes commands. Sometimes called the *imperative*.
     */
    Lot: 5, "5": "Lot",
    /**
     * Describes past action before the current day. Sometimes called the *imperfect*.
     */
    Lan: 6, "6": "Lan",
    /**
     * Describes potential or hypothetical actions. Sometimes called the *optative*.
     */
    VidhiLin: 7, "7": "VidhiLin",
    /**
     * Describes wishes and prayers. Sometimes called the *benedictive*.
     */
    AshirLin: 8, "8": "AshirLin",
    /**
     * Describes general past action. Sometimes called the *aorist*.
     */
    Lun: 9, "9": "Lun",
    /**
     * Describes past counterfactuals ("would not have ..."). Sometimes called the *conditional*.
     */
    Lrn: 10, "10": "Lrn",
});
exports.Lakara = Lakara;

/**
 * The gender of some *subanta*.
 * @enum {0 | 1 | 2}
 */
const Linga = Object.freeze({
    /**
     * The masculine.
     */
    Pum: 0, "0": "Pum",
    /**
     * The feminine.
     */
    Stri: 1, "1": "Stri",
    /**
     * The neuter.
     */
    Napumsaka: 2, "2": "Napumsaka",
});
exports.Linga = Linga;

/**
 * The *prayoga* of some *tiṅanta*.
 *
 * *Prayoga* is roughly similar to the Western concept of verb *voice*.
 * @enum {0 | 1 | 2}
 */
const Prayoga = Object.freeze({
    /**
     * Usage coreferent with the agent, e.g. "The horse *goes* to the village."
     */
    Kartari: 0, "0": "Kartari",
    /**
     * Usage coreferent with the object, e.g. "The village *is gone to* by the horse."
     */
    Karmani: 1, "1": "Karmani",
    /**
     * Usage without a referent, e.g. "*There is motion* by the horse to the village."
     * *bhāve prayoga* generally produces the same forms as karmani prayoga.
     */
    Bhave: 2, "2": "Bhave",
});
exports.Prayoga = Prayoga;

/**
 * The person of some *tiṅanta*.
 * @enum {0 | 1 | 2}
 */
const Purusha = Object.freeze({
    /**
     * The third person.
     */
    Prathama: 0, "0": "Prathama",
    /**
     * The second person.
     */
    Madhyama: 1, "1": "Madhyama",
    /**
     * The first person.
     */
    Uttama: 2, "2": "Uttama",
});
exports.Purusha = Purusha;

/**
 * A *sanādi pratyaya*.
 *
 * The *sanādi pratyaya*s create new *dhātu*s per 3.1.32. They are introduced in rules 3.1.7 -
 * 3.1.30, and since rule 3.1.7 contains the word "dhAtoH", they can be called *ārdhadhātuka* by
 * 3.4.114.
 *
 * Any *sanādi pratyaya*s not listed here are required by certain sutras and added by default.
 *
 * For details on what these pratyayas mean and what kinds of words they produce, see the comments
 * below.
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6}
 */
const Sanadi = Object.freeze({
    /**
     * `kAmyac`, which creates nAma-dhAtus per 3.1.9.
     *
     * Examples: `putrakAmyati`
     */
    kAmyac: 0, "0": "kAmyac",
    /**
     * `kyaN`, which creates nAma-dhAtus per 3.1.11.
     *
     * Examples: `SyenAyate`, `BfSAyate`
     */
    kyaN: 1, "1": "kyaN",
    /**
     * `kyac`, which creates nAma-dhAtus per 3.1.8.
     *
     * Examples: `putrIyati`
     */
    kyac: 2, "2": "kyac",
    /**
     * `Nic`, which creates causal roots per 3.1.26.
     *
     * Examples: `BAvayati`, `nAyayati`.
     */
    Ric: 3, "3": "Ric",
    /**
     * `yaN`, which creates intensive roots per 3.1.22. For certain dhatus, the semantics are
     * instead "crooked movement" (by 3.1.23) or "contemptible" action (by 3.1.24).
     *
     * Examples: boBUyate, nenIyate.
     *
     * Constraints: can be used only if the dhatu starts with a consonant and has exactly one
     * vowel. If this constraint is violated, our APIs will return an `Error`.
     */
    yaN: 4, "4": "yaN",
    /**
     * `yaN`, with lopa per 2.4.74. This is often listed separately due to its rarity and its
     * very different form.
     *
     * Examples: boBavIti, boBoti, nenayIti, neneti.
     */
    yaNluk: 5, "5": "yaNluk",
    /**
     * `san`, which creates desiderative roots per 3.1.7.
     *
     * Examples: buBUzati, ninIzati.
     */
    san: 6, "6": "san",
});
exports.Sanadi = Sanadi;

/**
 * The complete list of *taddhita pratyaya*s.
 *
 * Rust's naming convention is to start enum values with capital letters. However, we allow mixed
 * case explicitly here so that we can name pratyayas more concisely with SLP1. Doing so helps us
 * distinguish between pratyayas like `naN` and `nan`.
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140 | 141 | 142 | 143 | 144 | 145 | 146 | 147 | 148 | 149 | 150 | 151 | 152 | 153 | 154 | 155 | 156 | 157 | 158 | 159 | 160 | 161 | 162 | 163 | 164 | 165 | 166 | 167 | 168 | 169 | 170 | 171 | 172 | 173 | 174}
 */
const Taddhita = Object.freeze({
    /**
     * a
     */
    a: 0, "0": "a",
    /**
     * -aka
     */
    akac: 1, "1": "akac",
    /**
     * -a
     */
    ac: 2, "2": "ac",
    /**
     * -aWa
     */
    aWac: 3, "3": "aWac",
    /**
     * -a
     */
    aR: 4, "4": "aR",
    /**
     * -a
     */
    aY: 5, "5": "aY",
    /**
     * -a
     */
    at: 6, "6": "at",
    /**
     * -atas
     */
    atasuc: 7, "7": "atasuc",
    /**
     * -an
     */
    anic: 8, "8": "anic",
    /**
     * -a
     */
    ap: 9, "9": "ap",
    /**
     * -as
     */
    asic: 10, "10": "asic",
    /**
     * -astAt
     */
    astAti: 11, "11": "astAti",
    /**
     * -Akin
     */
    Akinic: 12, "12": "Akinic",
    /**
     * -Ara
     */
    Arak: 13, "13": "Arak",
    /**
     * -i
     */
    iY: 14, "14": "iY",
    /**
     * -ita
     */
    itac: 15, "15": "itac",
    /**
     * -ina
     */
    inac: 16, "16": "inac",
    /**
     * -in
     */
    ini: 17, "17": "ini",
    /**
     * -iman
     */
    imanic: 18, "18": "imanic",
    /**
     * -ila
     */
    ila: 19, "19": "ila",
    /**
     * -ila
     */
    ilac: 20, "20": "ilac",
    /**
     * -izWa
     */
    izWan: 21, "21": "izWan",
    /**
     * -Ika
     */
    Ikak: 22, "22": "Ikak",
    /**
     * -Ika
     */
    Ikan: 23, "23": "Ikan",
    /**
     * -Iyas
     */
    Iyasun: 24, "24": "Iyasun",
    /**
     * -eRya
     */
    eRya: 25, "25": "eRya",
    /**
     * -Era
     */
    Erak: 26, "26": "Erak",
    /**
     * -ka
     */
    ka: 27, "27": "ka",
    /**
     * -ka
     */
    kak: 28, "28": "kak",
    /**
     * -kawa
     */
    kawac: 29, "29": "kawac",
    /**
     * -ka
     */
    kan: 30, "30": "kan",
    /**
     * -ka
     */
    kap: 31, "31": "kap",
    /**
     * -kalpa
     */
    kalpap: 32, "32": "kalpap",
    /**
     * -kftvas
     */
    kftvasuc: 33, "33": "kftvasuc",
    /**
     * -kuwAra
     */
    kuwArac: 34, "34": "kuwArac",
    /**
     * -kura
     */
    kuRap: 35, "35": "kuRap",
    /**
     * -Ina
     */
    Ka: 36, "36": "Ka",
    /**
     * -Ina
     */
    KaY: 37, "37": "KaY",
    /**
     * -iya
     */
    Ga: 38, "38": "Ga",
    /**
     * -iya
     */
    Gac: 39, "39": "Gac",
    /**
     * -iya
     */
    Gan: 40, "40": "Gan",
    /**
     * -iya
     */
    Gas: 41, "41": "Gas",
    /**
     * -caRa
     */
    caRap: 42, "42": "caRap",
    /**
     * -cara
     */
    caraw: 43, "43": "caraw",
    /**
     * -cuYcu
     */
    cuYcup: 44, "44": "cuYcup",
    /**
     * -Ayana
     */
    cPaY: 45, "45": "cPaY",
    /**
     * --
     */
    cvi: 46, "46": "cvi",
    /**
     * -Iya
     */
    Ca: 47, "47": "Ca",
    /**
     * -Iya
     */
    CaR: 48, "48": "CaR",
    /**
     * -Iya
     */
    Cas: 49, "49": "Cas",
    /**
     * -jAtIya
     */
    jAtIyar: 50, "50": "jAtIyar",
    /**
     * -jAha
     */
    jAhac: 51, "51": "jAhac",
    /**
     * -a
     */
    Ya: 52, "52": "Ya",
    /**
     * -ika
     */
    YiW: 53, "53": "YiW",
    /**
     * -ya
     */
    Yya: 54, "54": "Yya",
    /**
     * -ya
     */
    YyaN: 55, "55": "YyaN",
    /**
     * -ya
     */
    Yyaw: 56, "56": "Yyaw",
    /**
     * -a
     */
    wac: 57, "57": "wac",
    /**
     * -a
     */
    waq: 58, "58": "waq",
    /**
     * -iWa
     */
    wiWan: 59, "59": "wiWan",
    /**
     * -wIwa
     */
    wIwac: 60, "60": "wIwac",
    /**
     * -eRya
     */
    weRyaR: 61, "61": "weRyaR",
    /**
     * -ya
     */
    wyaR: 62, "62": "wyaR",
    /**
     * -ana
     */
    wyu: 63, "63": "wyu",
    /**
     * -ana
     */
    wyul: 64, "64": "wyul",
    /**
     * -la
     */
    wlaY: 65, "65": "wlaY",
    /**
     * -ika
     */
    Wak: 66, "66": "Wak",
    /**
     * -ika
     */
    Wac: 67, "67": "Wac",
    /**
     * -ika
     */
    WaY: 68, "68": "WaY",
    /**
     * -ika
     */
    Wan: 69, "69": "Wan",
    /**
     * -ika
     */
    Wap: 70, "70": "Wap",
    /**
     * -a
     */
    qaw: 71, "71": "qaw",
    /**
     * -ati
     */
    qati: 72, "72": "qati",
    /**
     * -atara
     */
    qatarac: 73, "73": "qatarac",
    /**
     * -atama
     */
    qatamac: 74, "74": "qatamac",
    /**
     * -pa
     */
    qupac: 75, "75": "qupac",
    /**
     * -mat
     */
    qmatup: 76, "76": "qmatup",
    /**
     * -ya
     */
    qyaR: 77, "77": "qyaR",
    /**
     * -vala
     */
    qvalac: 78, "78": "qvalac",
    /**
     * -aka
     */
    qvun: 79, "79": "qvun",
    /**
     * -eya
     */
    Qak: 80, "80": "Qak",
    /**
     * -eyaka
     */
    QakaY: 81, "81": "QakaY",
    /**
     * -eya
     */
    Qa: 82, "82": "Qa",
    /**
     * -eya
     */
    QaY: 83, "83": "QaY",
    /**
     * -eyin
     */
    Qinuk: 84, "84": "Qinuk",
    /**
     * -era
     */
    Qrak: 85, "85": "Qrak",
    /**
     * -a
     */
    Ra: 86, "86": "Ra",
    /**
     * -in
     */
    Rini: 87, "87": "Rini",
    /**
     * -ya
     */
    Rya: 88, "88": "Rya",
    /**
     * -tama
     */
    tamap: 89, "89": "tamap",
    /**
     * -taya
     */
    tayap: 90, "90": "tayap",
    /**
     * -tara
     */
    tarap: 91, "91": "tarap",
    /**
     * -ta (becomes -tA)
     */
    tal: 92, "92": "tal",
    /**
     * -tas
     */
    tasi: 93, "93": "tasi",
    /**
     * -tas
     */
    tasil: 94, "94": "tasil",
    /**
     * -ti
     */
    ti: 95, "95": "ti",
    /**
     * -tika
     */
    tikan: 96, "96": "tikan",
    /**
     * -tIya
     */
    tIya: 97, "97": "tIya",
    /**
     * -tya
     */
    tyak: 98, "98": "tyak",
    /**
     * -tyaka
     */
    tyakan: 99, "99": "tyakan",
    /**
     * -tya
     */
    tyap: 100, "100": "tyap",
    /**
     * -tana
     */
    tyu: 101, "101": "tyu",
    /**
     * -tana
     */
    tyul: 102, "102": "tyul",
    /**
     * -tra
     */
    tral: 103, "103": "tral",
    /**
     * -trA
     */
    trA: 104, "104": "trA",
    /**
     * -tva
     */
    tva: 105, "105": "tva",
    /**
     * -Tam
     */
    Tamu: 106, "106": "Tamu",
    /**
     * -Tya
     */
    Tyan: 107, "107": "Tyan",
    /**
     * -TA
     */
    TAl: 108, "108": "TAl",
    /**
     * -daGna
     */
    daGnac: 109, "109": "daGnac",
    /**
     * -dA
     */
    dA: 110, "110": "dA",
    /**
     * -dAnIm
     */
    dAnIm: 111, "111": "dAnIm",
    /**
     * -deSya
     */
    deSya: 112, "112": "deSya",
    /**
     * -deSIya
     */
    deSIyar: 113, "113": "deSIyar",
    /**
     * -dvayasa
     */
    dvayasac: 114, "114": "dvayasac",
    /**
     * -dhA
     */
    DA: 115, "115": "DA",
    /**
     * -na
     */
    na: 116, "116": "na",
    /**
     * -na
     */
    naY: 117, "117": "naY",
    /**
     * -nAwa
     */
    nAwac: 118, "118": "nAwac",
    /**
     * -Ayana
     */
    Pak: 119, "119": "Pak",
    /**
     * -Ayana
     */
    PaY: 120, "120": "PaY",
    /**
     * -Ayani
     */
    PiY: 121, "121": "PiY",
    /**
     * -bahu
     */
    bahuc: 122, "122": "bahuc",
    /**
     * -biqa
     */
    biqac: 123, "123": "biqac",
    /**
     * -birIsa
     */
    birIsac: 124, "124": "birIsac",
    /**
     * -Bakta
     */
    Baktal: 125, "125": "Baktal",
    /**
     * -Brawa
     */
    Brawac: 126, "126": "Brawac",
    /**
     * -ma
     */
    ma: 127, "127": "ma",
    /**
     * -mat
     */
    matup: 128, "128": "matup",
    /**
     * -ma
     */
    map: 129, "129": "map",
    /**
     * -maya
     */
    mayaw: 130, "130": "mayaw",
    /**
     * -mAtra
     */
    mAtrac: 131, "131": "mAtrac",
    /**
     * -pASa
     */
    pASap: 132, "132": "pASap",
    /**
     * -piwa
     */
    piwac: 133, "133": "piwac",
    /**
     * -ya
     */
    ya: 134, "134": "ya",
    /**
     * -ya
     */
    yak: 135, "135": "yak",
    /**
     * -ya
     */
    yaY: 136, "136": "yaY",
    /**
     * -ya
     */
    yat: 137, "137": "yat",
    /**
     * -ya
     */
    yan: 138, "138": "yan",
    /**
     * -yu
     */
    yus: 139, "139": "yus",
    /**
     * -ra
     */
    ra: 140, "140": "ra",
    /**
     * -rUpa
     */
    rUpap: 141, "141": "rUpap",
    /**
     * -rhi
     */
    rhil: 142, "142": "rhil",
    /**
     * -rUpya
     */
    rUpya: 143, "143": "rUpya",
    /**
     * -la
     */
    lac: 144, "144": "lac",
    /**
     * -vat
     */
    vati: 145, "145": "vati",
    /**
     * -vat
     */
    vatup: 146, "146": "vatup",
    /**
     * -vaya
     */
    vaya: 147, "147": "vaya",
    /**
     * -vala
     */
    valac: 148, "148": "valac",
    /**
     * -vin
     */
    vini: 149, "149": "vini",
    /**
     * -viDu
     */
    viDal: 150, "150": "viDal",
    /**
     * -aka
     */
    vuk: 151, "151": "vuk",
    /**
     * -aka
     */
    vuY: 152, "152": "vuY",
    /**
     * -aka
     */
    vun: 153, "153": "vun",
    /**
     * -vya
     */
    vyat: 154, "154": "vyat",
    /**
     * -vya
     */
    vyan: 155, "155": "vyan",
    /**
     * -Sa
     */
    Sa: 156, "156": "Sa",
    /**
     * -SaNkawa
     */
    SaNkawac: 157, "157": "SaNkawac",
    /**
     * -SAla
     */
    SAlac: 158, "158": "SAlac",
    /**
     * -Sas
     */
    Sas: 159, "159": "Sas",
    /**
     * -za
     */
    za: 160, "160": "za",
    /**
     * -ka
     */
    zkan: 161, "161": "zkan",
    /**
     * -tara
     */
    zwarac: 162, "162": "zwarac",
    /**
     * -ika
     */
    zWac: 163, "163": "zWac",
    /**
     * -ika
     */
    zWan: 164, "164": "zWan",
    /**
     * -ika
     */
    zWal: 165, "165": "zWal",
    /**
     * Ayana
     */
    zPak: 166, "166": "zPak",
    /**
     * -ya
     */
    zyaN: 167, "167": "zyaN",
    /**
     * -ya
     */
    zyaY: 168, "168": "zyaY",
    /**
     * -sa
     */
    sa: 169, "169": "sa",
    /**
     * -sna
     */
    sna: 170, "170": "sna",
    /**
     * -sAt
     */
    sAti: 171, "171": "sAti",
    /**
     * -s
     */
    suc: 172, "172": "suc",
    /**
     * -sna
     */
    snaY: 173, "173": "snaY",
    /**
     * -ha
     */
    ha: 174, "174": "ha",
});
exports.Taddhita = Taddhita;

/**
 * The complete list of *uṇādi pratyaya*s.
 *
 * Rust's naming convention is to start enum values with capital letters. However, we allow mixed
 * case explicitly here so that we can name pratyayas more concisely with SLP1. Doing so helps us
 * distinguish between pratyayas like `naN` and `nan`.
 *
 * NOTE: we generated this list programmatically. Many of these pratyayas have typos.
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140 | 141 | 142 | 143 | 144 | 145 | 146 | 147 | 148 | 149 | 150 | 151 | 152 | 153 | 154 | 155 | 156 | 157 | 158 | 159 | 160 | 161 | 162 | 163 | 164 | 165 | 166 | 167 | 168 | 169 | 170 | 171 | 172 | 173 | 174 | 175 | 176 | 177 | 178 | 179 | 180 | 181 | 182 | 183 | 184 | 185 | 186 | 187 | 188 | 189 | 190 | 191 | 192 | 193 | 194 | 195 | 196 | 197 | 198 | 199 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 209 | 210 | 211 | 212 | 213 | 214 | 215 | 216 | 217 | 218 | 219 | 220 | 221 | 222 | 223 | 224 | 225 | 226 | 227 | 228 | 229 | 230 | 231 | 232 | 233 | 234 | 235 | 236 | 237 | 238 | 239 | 240 | 241 | 242 | 243 | 244 | 245 | 246 | 247 | 248 | 249 | 250 | 251 | 252 | 253 | 254 | 255 | 256 | 257 | 258 | 259 | 260 | 261 | 262 | 263 | 264 | 265 | 266 | 267 | 268 | 269 | 270 | 271 | 272 | 273 | 274 | 275 | 276 | 277 | 278 | 279 | 280 | 281 | 282 | 283 | 284 | 285 | 286 | 287 | 288 | 289 | 290 | 291 | 292 | 293 | 294 | 295 | 296 | 297 | 298 | 299 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 309 | 310 | 311}
 */
const Unadi = Object.freeze({
    /**
     * -a
     */
    a: 0, "0": "a",
    /**
     * -aknu
     */
    aknuc: 1, "1": "aknuc",
    /**
     * -aNga
     */
    aNgac: 2, "2": "aNgac",
    /**
     * -adAnu
     */
    radAnuk: 3, "3": "radAnuk",
    /**
     * -a
     */
    ac: 4, "4": "ac",
    /**
     * -aj
     */
    aji: 5, "5": "aji",
    /**
     * -awa
     */
    awan: 6, "6": "awan",
    /**
     * -aw
     */
    awi: 7, "7": "awi",
    /**
     * -aWa
     */
    aWa: 8, "8": "aWa",
    /**
     * -aRqa
     */
    aRqan: 9, "9": "aRqan",
    /**
     * -ata
     */
    atac: 10, "10": "atac",
    /**
     * -at
     */
    ati: 11, "11": "ati",
    /**
     * -ati
     */
    ati_: 12, "12": "ati_",
    /**
     * -atra
     */
    atran: 13, "13": "atran",
    /**
     * -atri
     */
    atrin: 14, "14": "atrin",
    /**
     * -aTa
     */
    aTa: 15, "15": "aTa",
    /**
     * -ad
     */
    adi: 16, "16": "adi",
    /**
     * -a
     */
    an: 17, "17": "an",
    /**
     * -ani
     */
    ani: 18, "18": "ani",
    /**
     * -anu
     */
    anuN: 19, "19": "anuN",
    /**
     * -anya
     */
    anya: 20, "20": "anya",
    /**
     * -anyu
     */
    anyuc: 21, "21": "anyuc",
    /**
     * -apa
     */
    apa: 22, "22": "apa",
    /**
     * -abaka
     */
    abaka: 23, "23": "abaka",
    /**
     * -amba
     */
    ambac: 24, "24": "ambac",
    /**
     * -aBa
     */
    aBac: 25, "25": "aBac",
    /**
     * -ama
     */
    ama: 26, "26": "ama",
    /**
     * -ama (praTama)
     */
    amac: 27, "27": "amac",
    /**
     * -amba
     */
    ambaj: 28, "28": "ambaj",
    /**
     * -ayu
     */
    ayu: 29, "29": "ayu",
    /**
     * -ara
     */
    ara: 30, "30": "ara",
    /**
     * -ara
     */
    aran: 31, "31": "aran",
    /**
     * -ar
     */
    aran_: 32, "32": "aran_",
    /**
     * -aru
     */
    aru: 33, "33": "aru",
    /**
     * -a
     */
    al: 34, "34": "al",
    /**
     * -ala (maNgala)
     */
    alac: 35, "35": "alac",
    /**
     * -ali
     */
    alic: 36, "36": "alic",
    /**
     * -avi
     */
    avi: 37, "37": "avi",
    /**
     * -a
     */
    asa: 38, "38": "asa",
    /**
     * -asa
     */
    asac: 39, "39": "asac",
    /**
     * -asAna
     */
    asAnac: 40, "40": "asAnac",
    /**
     * -as
     */
    asi: 41, "41": "asi",
    /**
     * -as (cetas)
     */
    asun: 42, "42": "asun",
    /**
     * -A
     */
    A: 43, "43": "A",
    /**
     * -Aka
     */
    Aka: 44, "44": "Aka",
    /**
     * -AgU
     */
    AgUc: 45, "45": "AgUc",
    /**
     * -Awa
     */
    Awac: 46, "46": "Awac",
    /**
     * -ARaka
     */
    ARaka: 47, "47": "ARaka",
    /**
     * -Atu
     */
    Atu: 48, "48": "Atu",
    /**
     * -Atfka
     */
    Atfkan: 49, "49": "Atfkan",
    /**
     * -Anaka
     */
    Anaka: 50, "50": "Anaka",
    /**
     * -Ana
     */
    Anac: 51, "51": "Anac",
    /**
     * -Anu
     */
    Anuk: 52, "52": "Anuk",
    /**
     * -Anya
     */
    Anya: 53, "53": "Anya",
    /**
     * -Ayya
     */
    Ayya: 54, "54": "Ayya",
    /**
     * -Ara
     */
    Aran: 55, "55": "Aran",
    /**
     * -Ala
     */
    Ala: 56, "56": "Ala",
    /**
     * -Ala
     */
    Alac: 57, "57": "Alac",
    /**
     * -Ala
     */
    AlaY: 58, "58": "AlaY",
    /**
     * -AlIya
     */
    AlIyac: 59, "59": "AlIyac",
    /**
     * -A
     */
    Asa: 60, "60": "Asa",
    /**
     * -As
     */
    Asi: 61, "61": "Asi",
    /**
     * -i
     */
    i: 62, "62": "i",
    /**
     * -ika
     */
    ikan: 63, "63": "ikan",
    /**
     * -ij
     */
    iji: 64, "64": "iji",
    /**
     * -i
     */
    iY: 65, "65": "iY",
    /**
     * -i
     */
    iR: 66, "66": "iR",
    /**
     * -ita
     */
    ita: 67, "67": "ita",
    /**
     * -ita
     */
    itac: 68, "68": "itac",
    /**
     * -ita
     */
    itan: 69, "69": "itan",
    /**
     * -it
     */
    iti: 70, "70": "iti",
    /**
     * -itnu
     */
    itnuc: 71, "71": "itnuc",
    /**
     * -itra
     */
    itra: 72, "72": "itra",
    /**
     * -itva
     */
    itvan: 73, "73": "itvan",
    /**
     * -iTi
     */
    iTin: 74, "74": "iTin",
    /**
     * -i
     */
    in_: 75, "75": "in_",
    /**
     * -ina
     */
    inac: 76, "76": "inac",
    /**
     * -ina
     */
    inaR: 77, "77": "inaR",
    /**
     * -ina
     */
    inan: 78, "78": "inan",
    /**
     * -in
     */
    ini: 79, "79": "ini",
    /**
     * -iman
     */
    imanic: 80, "80": "imanic",
    /**
     * -iman
     */
    imanin: 81, "81": "imanin",
    /**
     * -ila
     */
    ilac: 82, "82": "ilac",
    /**
     * -izWa
     */
    izWac: 83, "83": "izWac",
    /**
     * -izWu
     */
    izWuc: 84, "84": "izWuc",
    /**
     * -izRu
     */
    izRuc: 85, "85": "izRuc",
    /**
     * -isa
     */
    isan: 86, "86": "isan",
    /**
     * -is
     */
    isi: 87, "87": "isi",
    /**
     * -is
     */
    isin: 88, "88": "isin",
    /**
     * -I
     */
    I: 89, "89": "I",
    /**
     * -Ika
     */
    Ikan: 90, "90": "Ikan",
    /**
     * -Ici
     */
    Ici: 91, "91": "Ici",
    /**
     * -Ida
     */
    Ida: 92, "92": "Ida",
    /**
     * -Ira
     */
    Irac: 93, "93": "Irac",
    /**
     * -Ira
     */
    Iran: 94, "94": "Iran",
    /**
     * -Iza
     */
    Izan: 95, "95": "Izan",
    /**
     * -u
     */
    u: 96, "96": "u",
    /**
     * -uka
     */
    ukan: 97, "97": "ukan",
    /**
     * -uqa
     */
    uqac: 98, "98": "uqac",
    /**
     * -u
     */
    uR: 99, "99": "uR",
    /**
     * -ut
     */
    uti: 100, "100": "uti",
    /**
     * -utra
     */
    utra: 101, "101": "utra",
    /**
     * -una
     */
    una: 102, "102": "una",
    /**
     * -una
     */
    unan: 103, "103": "unan",
    /**
     * -unas
     */
    unasi: 104, "104": "unasi",
    /**
     * -uni
     */
    uni: 105, "105": "uni",
    /**
     * -unta
     */
    unta: 106, "106": "unta",
    /**
     * -unti
     */
    unti: 107, "107": "unti",
    /**
     * -uma
     */
    uma: 108, "108": "uma",
    /**
     * -umBa
     */
    umBa: 109, "109": "umBa",
    /**
     * -ura
     */
    urac: 110, "110": "urac",
    /**
     * -ura
     */
    uran: 111, "111": "uran",
    /**
     * -ur
     */
    uran_: 112, "112": "uran_",
    /**
     * -uri
     */
    urin: 113, "113": "urin",
    /**
     * -ula
     */
    ulac: 114, "114": "ulac",
    /**
     * -uli
     */
    uli: 115, "115": "uli",
    /**
     * -uza
     */
    uzac: 116, "116": "uzac",
    /**
     * -us (Danus)
     */
    usi: 117, "117": "usi",
    /**
     * -U
     */
    U: 118, "118": "U",
    /**
     * -Uka
     */
    Uka: 119, "119": "Uka",
    /**
     * -Uka
     */
    UkaR: 120, "120": "UkaR",
    /**
     * -UKa
     */
    UKa: 121, "121": "UKa",
    /**
     * -UTa
     */
    UTan: 122, "122": "UTan",
    /**
     * -Uma
     */
    Uma: 123, "123": "Uma",
    /**
     * -U
     */
    Ur: 124, "124": "Ur",
    /**
     * -Ura
     */
    Uran: 125, "125": "Uran",
    /**
     * -Uza
     */
    Uzan: 126, "126": "Uzan",
    /**
     * -f
     */
    f: 127, "127": "f",
    /**
     * -ft
     */
    ftin: 128, "128": "ftin",
    /**
     * -f
     */
    fn_: 129, "129": "fn_",
    /**
     * -eRu
     */
    eRu: 130, "130": "eRu",
    /**
     * -eRya
     */
    eRya: 131, "131": "eRya",
    /**
     * -era
     */
    erak: 132, "132": "erak",
    /**
     * -elima
     */
    elimac: 133, "133": "elimac",
    /**
     * -ota
     */
    otac: 134, "134": "otac",
    /**
     * -ora
     */
    oran: 135, "135": "oran",
    /**
     * -ola
     */
    olac: 136, "136": "olac",
    /**
     * -ka
     */
    ka: 137, "137": "ka",
    /**
     * -ka
     */
    kak: 138, "138": "kak",
    /**
     * -kaNkaRa
     */
    kaNkaRa: 139, "139": "kaNkaRa",
    /**
     * -kaRa
     */
    kaRa: 140, "140": "kaRa",
    /**
     * -katu
     */
    katu: 141, "141": "katu",
    /**
     * -katni
     */
    katnic: 142, "142": "katnic",
    /**
     * -katra
     */
    katra: 143, "143": "katra",
    /**
     * -kTa
     */
    kTan: 144, "144": "kTan",
    /**
     * -ka
     */
    kan: 145, "145": "kan",
    /**
     * -anas
     */
    kanasi: 146, "146": "kanasi",
    /**
     * -an
     */
    kanin: 147, "147": "kanin",
    /**
     * -kanu
     */
    kanum: 148, "148": "kanum",
    /**
     * -kanya
     */
    kanyan: 149, "149": "kanyan",
    /**
     * -kanyu
     */
    kanyuc: 150, "150": "kanyuc",
    /**
     * -kapa
     */
    kapa: 151, "151": "kapa",
    /**
     * -kapa
     */
    kapan: 152, "152": "kapan",
    /**
     * -am
     */
    kamin: 153, "153": "kamin",
    /**
     * -kaya
     */
    kayan: 154, "154": "kayan",
    /**
     * -kara
     */
    karan: 155, "155": "karan",
    /**
     * -kala
     */
    kala: 156, "156": "kala",
    /**
     * -kAku
     */
    kAku: 157, "157": "kAku",
    /**
     * -kAla
     */
    kAlan: 158, "158": "kAlan",
    /**
     * -ika
     */
    kikan: 159, "159": "kikan",
    /**
     * -kita
     */
    kitac: 160, "160": "kitac",
    /**
     * -kinda
     */
    kindac: 161, "161": "kindac",
    /**
     * -kira
     */
    kirac: 162, "162": "kirac",
    /**
     * -kizya
     */
    kizyan: 163, "163": "kizyan",
    /**
     * -kIka
     */
    kIkac: 164, "164": "kIkac",
    /**
     * -kIka
     */
    kIkan: 165, "165": "kIkan",
    /**
     * -kIwa
     */
    kIwan: 166, "166": "kIwan",
    /**
     * -ku
     */
    ku: 167, "167": "ku",
    /**
     * -ku
     */
    kuk: 168, "168": "kuk",
    /**
     * -kuka
     */
    kukan: 169, "169": "kukan",
    /**
     * -kuza
     */
    kuzan: 170, "170": "kuzan",
    /**
     * -kU
     */
    kU: 171, "171": "kU",
    /**
     * -kta
     */
    kta: 172, "172": "kta",
    /**
     * -ktnu
     */
    ktnu: 173, "173": "ktnu",
    /**
     * -ktra
     */
    ktra: 174, "174": "ktra",
    /**
     * -kTi
     */
    kTin: 175, "175": "kTin",
    /**
     * -kna
     */
    kna: 176, "176": "kna",
    /**
     * -kni
     */
    knin: 177, "177": "knin",
    /**
     * -kmala
     */
    kmalan: 178, "178": "kmalan",
    /**
     * -ana
     */
    kyu: 179, "179": "kyu",
    /**
     * -ana
     */
    kyun: 180, "180": "kyun",
    /**
     * -kra
     */
    kran: 181, "181": "kran",
    /**
     * -krara
     */
    kraran: 182, "182": "kraran",
    /**
     * -kri
     */
    kri: 183, "183": "kri",
    /**
     * -kri
     */
    krin: 184, "184": "krin",
    /**
     * -ruka
     */
    krukan: 185, "185": "krukan",
    /**
     * -kru
     */
    krun: 186, "186": "krun",
    /**
     * -kla
     */
    kla: 187, "187": "kla",
    /**
     * -kva
     */
    kvan: 188, "188": "kvan",
    /**
     * -van
     */
    kvanip: 189, "189": "kvanip",
    /**
     * -kvi
     */
    kvin: 190, "190": "kvin",
    /**
     * -
     */
    kvip: 191, "191": "kvip",
    /**
     * -aka
     */
    kvun: 192, "192": "kvun",
    /**
     * -ksara
     */
    ksaran: 193, "193": "ksaran",
    /**
     * -ksi
     */
    ksi: 194, "194": "ksi",
    /**
     * -ksu
     */
    ksu: 195, "195": "ksu",
    /**
     * -kseyya
     */
    kseyya: 196, "196": "kseyya",
    /**
     * -ksna
     */
    ksna: 197, "197": "ksna",
    /**
     * -Ka
     */
    Ka: 198, "198": "Ka",
    /**
     * -ga
     */
    ga: 199, "199": "ga",
    /**
     * -ga
     */
    gak: 200, "200": "gak",
    /**
     * -ga
     */
    gaR: 201, "201": "gaR",
    /**
     * -ga
     */
    gan: 202, "202": "gan",
    /**
     * -GaTi
     */
    GaTin: 203, "203": "GaTin",
    /**
     * -ca
     */
    caw: 204, "204": "caw",
    /**
     * -catu
     */
    catu: 205, "205": "catu",
    /**
     * -c
     */
    cik: 206, "206": "cik",
    /**
     * -Ja
     */
    Jac: 207, "207": "Jac",
    /**
     * -Ji
     */
    Jic: 208, "208": "Jic",
    /**
     * -Yu
     */
    YuR: 209, "209": "YuR",
    /**
     * -wa
     */
    wa: 210, "210": "wa",
    /**
     * -wa
     */
    wan: 211, "211": "wan",
    /**
     * -wiza
     */
    wizac: 212, "212": "wizac",
    /**
     * -Wa
     */
    Wa: 213, "213": "Wa",
    /**
     * -qa
     */
    qa: 214, "214": "qa",
    /**
     * -qau
     */
    qau: 215, "215": "qau",
    /**
     * -ra
     */
    qraw: 216, "216": "qraw",
    /**
     * -qati
     */
    qati: 217, "217": "qati",
    /**
     * -avat
     */
    qavatu: 218, "218": "qavatu",
    /**
     * -qim
     */
    qimi: 219, "219": "qimi",
    /**
     * -quta
     */
    qutac: 220, "220": "qutac",
    /**
     * -qu
     */
    qun: 221, "221": "qun",
    /**
     * -ums
     */
    qumsun: 222, "222": "qumsun",
    /**
     * -U
     */
    qU: 223, "223": "qU",
    /**
     * -E
     */
    qE: 224, "224": "qE",
    /**
     * -Es
     */
    qEsi: 225, "225": "qEsi",
    /**
     * -o
     */
    qo: 226, "226": "qo",
    /**
     * -os
     */
    qosi: 227, "227": "qosi",
    /**
     * -O
     */
    qO: 228, "228": "qO",
    /**
     * -qri
     */
    qri: 229, "229": "qri",
    /**
     * -Qa
     */
    Qa: 230, "230": "Qa",
    /**
     * -Ritra
     */
    Ritran: 231, "231": "Ritran",
    /**
     * -Ru
     */
    Ru: 232, "232": "Ru",
    /**
     * -Ruka
     */
    Rukan: 233, "233": "Rukan",
    /**
     * -ta
     */
    ta: 234, "234": "ta",
    /**
     * -taka
     */
    takan: 235, "235": "takan",
    /**
     * -ta
     */
    tan: 236, "236": "tan",
    /**
     * -tana
     */
    tanan: 237, "237": "tanan",
    /**
     * -taSa
     */
    taSan: 238, "238": "taSan",
    /**
     * -taSas
     */
    taSasun: 239, "239": "taSasun",
    /**
     * -ti
     */
    ti: 240, "240": "ti",
    /**
     * -tika
     */
    tikan: 241, "241": "tikan",
    /**
     * -tu
     */
    tu: 242, "242": "tu",
    /**
     * -tu
     */
    tun: 243, "243": "tun",
    /**
     * -tf
     */
    tfc: 244, "244": "tfc",
    /**
     * -tf
     */
    tfn: 245, "245": "tfn",
    /**
     * -tna
     */
    tnaR: 246, "246": "tnaR",
    /**
     * -tyu
     */
    tyuk: 247, "247": "tyuk",
    /**
     * -tra
     */
    tra: 248, "248": "tra",
    /**
     * -tra
     */
    tran: 249, "249": "tran",
    /**
     * -tri
     */
    trin: 250, "250": "trin",
    /**
     * -tri
     */
    trip: 251, "251": "trip",
    /**
     * -tva
     */
    tvan: 252, "252": "tvan",
    /**
     * -Ta
     */
    Tak: 253, "253": "Tak",
    /**
     * -da
     */
    da: 254, "254": "da",
    /**
     * -da
     */
    dan: 255, "255": "dan",
    /**
     * -Du
     */
    Duk: 256, "256": "Duk",
    /**
     * -na
     */
    na: 257, "257": "na",
    /**
     * -na
     */
    nak: 258, "258": "nak",
    /**
     * -ni
     */
    ni: 259, "259": "ni",
    /**
     * -nu
     */
    nu: 260, "260": "nu",
    /**
     * -pa
     */
    pa: 261, "261": "pa",
    /**
     * -pAsa
     */
    pAsa: 262, "262": "pAsa",
    /**
     * -Pa
     */
    Pak: 263, "263": "Pak",
    /**
     * -ba
     */
    ban: 264, "264": "ban",
    /**
     * -Ba
     */
    Ba: 265, "265": "Ba",
    /**
     * -Ba
     */
    Ban: 266, "266": "Ban",
    /**
     * -ma
     */
    mak: 267, "267": "mak",
    /**
     * -madi
     */
    madik: 268, "268": "madik",
    /**
     * -ma
     */
    man: 269, "269": "man",
    /**
     * -man
     */
    mani: 270, "270": "mani",
    /**
     * -man
     */
    maniR: 271, "271": "maniR",
    /**
     * -man
     */
    manin: 272, "272": "manin",
    /**
     * -mi
     */
    mi: 273, "273": "mi",
    /**
     * -mi
     */
    min: 274, "274": "min",
    /**
     * -mu
     */
    muk: 275, "275": "muk",
    /**
     * -ya
     */
    ya: 276, "276": "ya",
    /**
     * -ya
     */
    yak: 277, "277": "yak",
    /**
     * -ya
     */
    yat: 278, "278": "yat",
    /**
     * -yatu
     */
    yatuc: 279, "279": "yatuc",
    /**
     * -yu
     */
    yuk: 280, "280": "yuk",
    /**
     * -ana
     */
    yuc: 281, "281": "yuc",
    /**
     * -ana
     */
    yun: 282, "282": "yun",
    /**
     * -ra
     */
    ra: 283, "283": "ra",
    /**
     * -ra
     */
    rak: 284, "284": "rak",
    /**
     * -ra
     */
    ran: 285, "285": "ran",
    /**
     * -ru
     */
    ru: 286, "286": "ru",
    /**
     * -la
     */
    lak: 287, "287": "lak",
    /**
     * -va
     */
    va: 288, "288": "va",
    /**
     * -va
     */
    vaR: 289, "289": "vaR",
    /**
     * -va
     */
    van: 290, "290": "van",
    /**
     * -van
     */
    vanip: 291, "291": "vanip",
    /**
     * -vara
     */
    varaw: 292, "292": "varaw",
    /**
     * -vala
     */
    valaY: 293, "293": "valaY",
    /**
     * -vAla
     */
    vAlac: 294, "294": "vAlac",
    /**
     * -vAla
     */
    vAlan: 295, "295": "vAlan",
    /**
     * -vi
     */
    vin: 296, "296": "vin",
    /**
     * -aka
     */
    vun: 297, "297": "vun",
    /**
     * -Sa
     */
    Sak: 298, "298": "Sak",
    /**
     * -Su
     */
    Sun: 299, "299": "Sun",
    /**
     * -Sva
     */
    SvaR: 300, "300": "SvaR",
    /**
     * -ziva
     */
    zivan: 301, "301": "zivan",
    /**
     * -zwra
     */
    zwran: 302, "302": "zwran",
    /**
     * -zvara
     */
    zvarac: 303, "303": "zvarac",
    /**
     * -sa
     */
    sa: 304, "304": "sa",
    /**
     * -sa
     */
    san: 305, "305": "san",
    /**
     * -sara
     */
    sara: 306, "306": "sara",
    /**
     * -sika
     */
    sikan: 307, "307": "sikan",
    /**
     * -sTa
     */
    sTan: 308, "308": "sTan",
    /**
     * -sma
     */
    sman: 309, "309": "sman",
    /**
     * -sya
     */
    sya: 310, "310": "sya",
    /**
     * -sya
     */
    syan: 311, "311": "syan",
});
exports.Unadi = Unadi;

/**
 * The number of some *tiṅanta* or *subanta*.
 * @enum {0 | 1 | 2}
 */
const Vacana = Object.freeze({
    /**
     * The singular.
     */
    Eka: 0, "0": "Eka",
    /**
     * The dual.
     */
    Dvi: 1, "1": "Dvi",
    /**
     * The plural.
     */
    Bahu: 2, "2": "Bahu",
});
exports.Vacana = Vacana;

/**
 * The case ending of some *subanta*.
 *
 * A *vibhakti* is a set of 3 endings that share all of the same properties except for their
 * number (singular, dual, plural). While *tiṅanta*s also have *vibhakti*s, in practice the term
 * *vibhakti* refers more specifically to the endings used with *subanta*s.
 *
 * *Vibhakti* is broadly similar to the Western notion of grammatical case.
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7}
 */
const Vibhakti = Object.freeze({
    /**
     * The first *vibhakti*. Sometimes called the *nominative case*.
     */
    Prathama: 0, "0": "Prathama",
    /**
     * The second *vibhakti*. Sometimes called the *accusative case*.
     */
    Dvitiya: 1, "1": "Dvitiya",
    /**
     * The third *vibhakti*. Sometimes called the *instrumental case*.
     */
    Trtiya: 2, "2": "Trtiya",
    /**
     * The fourth *vibhakti*. Sometimes called the *dative case*.
     */
    Caturthi: 3, "3": "Caturthi",
    /**
     * The fifth *vibhakti*. Sometimes called the *ablative case*.
     */
    Panchami: 4, "4": "Panchami",
    /**
     * The sixth *vibhakti*. Sometimes called the *genitive case*.
     */
    Sasthi: 5, "5": "Sasthi",
    /**
     * The seventh *vibhakti*. Sometimes called the *locative case*.
     */
    Saptami: 6, "6": "Saptami",
    /**
     * The first *vibhakti* used in the sense of *sambodhana*. Sometimes called the *vocative case*.
     *
     * *Sambodhana* is technically not a *vibhakti* but rather an additional semantic condition
     * on the first vibhakti. But we felt that users would find it more convenient to have this
     * condition available on `Vibhakti` directly rather than have to define the *sambodhana*
     * condition separately.
     */
    Sambodhana: 7, "7": "Sambodhana",
});
exports.Vibhakti = Vibhakti;

/**
 * WebAssembly API for vidyut-prakriya.
 *
 * Within reason, we have tried to mimic a native JavaScript API. At some point, we wish to
 * support optional arguments, perhaps by using `Reflect`.
 */
class Vidyut {
    static __wrap(ptr) {
        const obj = Object.create(Vidyut.prototype);
        obj.__wbg_ptr = ptr;
        VidyutFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VidyutFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vidyut_free(ptr, 0);
    }
    /**
     * Wrapper for `Vyakarana::derive_dhatus`.
     * @param {string} code
     * @returns {any}
     */
    deriveDhatus(code) {
        const ptr0 = passStringToWasm0(code, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.vidyut_deriveDhatus(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
     * Wrapper for `Vyakarana::derive_krdantas`.
     * @param {any} val
     * @returns {any}
     */
    deriveKrdantas(val) {
        const ret = wasm.vidyut_deriveKrdantas(this.__wbg_ptr, addHeapObject(val));
        return takeObject(ret);
    }
    /**
     * Wrapper for `Vyakarana::derive_subantas`.
     * @param {any} val
     * @returns {any}
     */
    deriveSubantas(val) {
        const ret = wasm.vidyut_deriveSubantas(this.__wbg_ptr, addHeapObject(val));
        return takeObject(ret);
    }
    /**
     * Wrapper for `Vyakarana::derive_tinantas`.
     *
     * TODO: how might we reduce the number of arguments here?
     * @param {any} val
     * @returns {any}
     */
    deriveTinantas(val) {
        const ret = wasm.vidyut_deriveTinantas(this.__wbg_ptr, addHeapObject(val));
        return takeObject(ret);
    }
    /**
     * Creates a new API manager.
     *
     * This constructor is not called `new` because `new` is a reserved word in JavaScript.
     * @param {string} dhatupatha
     * @returns {Vidyut}
     */
    static init(dhatupatha) {
        const ptr0 = passStringToWasm0(dhatupatha, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.vidyut_init(ptr0, len0);
        return Vidyut.__wrap(ret);
    }
}
if (Symbol.dispose) Vidyut.prototype[Symbol.dispose] = Vidyut.prototype.free;
exports.Vidyut = Vidyut;

/**
 * Fully engine-derived prefixed kṛdanta rows for one (upasarga-stack,
 * dhātu, family, kṛt): `{rows: [{base, m, f, n}]}` in Devanagari, one row
 * per distinct stem. `upstream_json` carries the dhātu's upstream rows
 * (`[{base, m, f, n}]` Devanagari strings) for the pre-feminized
 * supplement + vidyuṭ-missing fallback; `slp1`/`category`/`note` feed its
 * `GenCtx`. `pinned_cell` carries the corpus-pinned cell for this
 * (stack, family, kṛt) — the portal's `blob.krut_prefixed` piece, built by
 * [`crate::morphdata::backfill_prefixed_krut`] — and is served verbatim in
 * row order when non-empty (the site's data is the corpus; re-deriving
 * could only drift). Same normalization as [`derive_prefixed_ting`].
 * @param {string} stack
 * @param {string} baseindex
 * @param {string} family
 * @param {string} krt
 * @param {string} upstream_json
 * @param {string} slp1
 * @param {string} category
 * @param {string} note
 * @param {string} pinned_cell
 * @returns {string}
 */
function derive_prefixed_krut(stack, baseindex, family, krt, upstream_json, slp1, category, note, pinned_cell) {
    let deferred10_0;
    let deferred10_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(stack, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(baseindex, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(family, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(krt, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len3 = WASM_VECTOR_LEN;
        const ptr4 = passStringToWasm0(upstream_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len4 = WASM_VECTOR_LEN;
        const ptr5 = passStringToWasm0(slp1, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len5 = WASM_VECTOR_LEN;
        const ptr6 = passStringToWasm0(category, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len6 = WASM_VECTOR_LEN;
        const ptr7 = passStringToWasm0(note, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len7 = WASM_VECTOR_LEN;
        const ptr8 = passStringToWasm0(pinned_cell, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len8 = WASM_VECTOR_LEN;
        wasm.derive_prefixed_krut(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred10_0 = r0;
        deferred10_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred10_0, deferred10_1, 1);
    }
}
exports.derive_prefixed_krut = derive_prefixed_krut;

/**
 * Batch prefixing with explicit dhatu context: `slp1_dhatu` is the vidyut
 * SLP1 dhatu (markers kept), `engine_category` comes from
 * [`engine_category`], and `dhatu_note` carries nitya-adi markings.
 * Same shape as [`prefixed_table`].
 *
 * Fully engine-derived prefixed tiṅanta table for one (upasarga-stack,
 * dhātu, family, prayoga): `{tables: {lakara_key: "row;row;…"}}` in blob
 * cell format, Devanagari. Used by prefixed views where upstream ships no
 * base cell to prefix (e.g. वि + जि has no `a*` kartari keys upstream, yet
 * the site shows विजयते — derived, not prefixed). Pada resolution is the
 * engine's: each pada derived explicitly, missing paradigms have no key.
 * @param {string} stack
 * @param {string} baseindex
 * @param {string} family
 * @param {string} prayoga
 * @returns {string}
 */
function derive_prefixed_ting(stack, baseindex, family, prayoga) {
    let deferred5_0;
    let deferred5_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(stack, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(baseindex, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(family, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(prayoga, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len3 = WASM_VECTOR_LEN;
        wasm.derive_prefixed_ting(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred5_0 = r0;
        deferred5_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred5_0, deferred5_1, 1);
    }
}
exports.derive_prefixed_ting = derive_prefixed_ting;

/**
 * Dhatu info card + upasarga names from `dhatu/data.txt`-shaped JSON.
 * @param {string} dhatu_json
 * @param {string} baseindex
 * @returns {string}
 */
function dhatu_card(dhatu_json, baseindex) {
    let deferred3_0;
    let deferred3_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(dhatu_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(baseindex, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        wasm.dhatu_card(retptr, ptr0, len0, ptr1, len1);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred3_0 = r0;
        deferred3_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred3_0, deferred3_1, 1);
    }
}
exports.dhatu_card = dhatu_card;

/**
 * Engine category for a dhatuforms table (`ting`/`krut` + family), for
 * portal code that only knows display-side names. Returns the category
 * string (`ting`, `nich`, `san_krut`, …) or an error envelope.
 * @param {string} family
 * @param {string} table
 * @returns {string}
 */
function engine_category(family, table) {
    let deferred3_0;
    let deferred3_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(family, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(table, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        wasm.engine_category(retptr, ptr0, len0, ptr1, len1);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred3_0 = r0;
        deferred3_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred3_0, deferred3_1, 1);
    }
}
exports.engine_category = engine_category;

/**
 * The engine stamp this wasm was built from (see `src/stamp.rs`); the
 * web shell compares it with the served artifacts' `manifest.json` and
 * warns on a mismatch.
 * @returns {string}
 */
function engine_stamp() {
    let deferred1_0;
    let deferred1_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.engine_stamp(retptr);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred1_0 = r0;
        deferred1_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred1_0, deferred1_1, 1);
    }
}
exports.engine_stamp = engine_stamp;

/**
 * Drop a cached family index to free memory.
 * @param {string} family
 * @returns {string}
 */
function index_drop_family(family) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(family, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.index_drop_family(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred2_0, deferred2_1, 1);
    }
}
exports.index_drop_family = index_drop_family;

/**
 * Ensure all five family base indexes from their artifact JSONs, for
 * cross-family search. The portal calls this once (parallel fetches);
 * artifacts stay cached offline after.
 * @param {string} shuddha_json
 * @param {string} nich_json
 * @param {string} san_json
 * @param {string} yang_json
 * @param {string} yangluk_json
 * @returns {string}
 */
function index_ensure_all(shuddha_json, nich_json, san_json, yang_json, yangluk_json) {
    let deferred6_0;
    let deferred6_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(shuddha_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(nich_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(san_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(yang_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len3 = WASM_VECTOR_LEN;
        const ptr4 = passStringToWasm0(yangluk_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len4 = WASM_VECTOR_LEN;
        wasm.index_ensure_all(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred6_0 = r0;
        deferred6_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred6_0, deferred6_1, 1);
    }
}
exports.index_ensure_all = index_ensure_all;

/**
 * Build (or rebuild) the cached base reverse index for one family from its
 * three table JSONs. The portal calls this once per family after fetching.
 * @param {string} family
 * @param {string} ting_kartari_json
 * @param {string} ting_karmani_json
 * @param {string} krut_json
 * @returns {string}
 */
function index_ensure_family(family, ting_kartari_json, ting_karmani_json, krut_json) {
    let deferred5_0;
    let deferred5_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(family, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(ting_kartari_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(ting_karmani_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(krut_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len3 = WASM_VECTOR_LEN;
        wasm.index_ensure_family(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred5_0 = r0;
        deferred5_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred5_0, deferred5_1, 1);
    }
}
exports.index_ensure_family = index_ensure_family;

/**
 * Export a cached family index in compact artifact form (debugging and
 * roundtrip tests; the build pipeline uses `build-index` instead).
 * @param {string} family
 * @returns {string}
 */
function index_export_family(family) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(family, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.index_export_family(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred2_0, deferred2_1, 1);
    }
}
exports.index_export_family = index_export_family;

/**
 * Load a prebuilt compact index artifact (`build-index` output) into the
 * family cache. The portal fetches `data/indexes/<family>.index.json` once
 * instead of the raw table files + runtime build.
 * @param {string} family
 * @param {string} index_json
 * @returns {string}
 */
function index_load_family(family, index_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(family, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(index_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        wasm.index_load_family(retptr, ptr0, len0, ptr1, len1);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred3_0 = r0;
        deferred3_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred3_0, deferred3_1, 1);
    }
}
exports.index_load_family = index_load_family;

/**
 * Load any compact index under an arbitrary cache key (portal shard sets).
 * @param {string} key
 * @param {string} index_json
 * @returns {string}
 */
function index_load_key(key, index_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(index_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        wasm.index_load_key(retptr, ptr0, len0, ptr1, len1);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred3_0 = r0;
        deferred3_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred3_0, deferred3_1, 1);
    }
}
exports.index_load_key = index_load_key;

/**
 * Reverse-search every cached family index and merge (Devanagari or HK).
 * @param {string} query
 * @returns {string}
 */
function index_query_all(query) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(query, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.index_query_all(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred2_0, deferred2_1, 1);
    }
}
exports.index_query_all = index_query_all;

/**
 * Reverse-search the cached family index (Devanagari or HK query).
 * @param {string} family
 * @param {string} query
 * @returns {string}
 */
function index_query_family(family, query) {
    let deferred3_0;
    let deferred3_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(family, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(query, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        wasm.index_query_family(retptr, ptr0, len0, ptr1, len1);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred3_0 = r0;
        deferred3_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred3_0, deferred3_1, 1);
    }
}
exports.index_query_family = index_query_family;

/**
 * FNV-1a shard of a form, mirroring `revindex::shard_of` (portal hashing).
 * @param {string} form
 * @param {number} shards
 * @returns {string}
 */
function index_shard(form, shards) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(form, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.index_shard(retptr, ptr0, len0, shards);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred2_0, deferred2_1, 1);
    }
}
exports.index_shard = index_shard;

/**
 * @param {string} family
 * @param {string} krt
 * @param {string} field
 * @param {string} value
 * @param {string} baseindex
 * @returns {string}
 */
function krt_subanta(family, krt, field, value, baseindex) {
    let deferred6_0;
    let deferred6_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(family, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(krt, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(field, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(value, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len3 = WASM_VECTOR_LEN;
        const ptr4 = passStringToWasm0(baseindex, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len4 = WASM_VECTOR_LEN;
        wasm.krt_subanta(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred6_0 = r0;
        deferred6_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred6_0, deferred6_1, 1);
    }
}
exports.krt_subanta = krt_subanta;

/**
 * Krdanta rows for one dhatu from a krut-file JSON; each krt lists its
 * `;`-rows of `base,m,f,n` (empty string = absent for that field).
 * @param {string} krut_json
 * @param {string} baseindex
 * @returns {string}
 */
function krut_table_json(krut_json, baseindex) {
    let deferred3_0;
    let deferred3_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(krut_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(baseindex, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        wasm.krut_table_json(retptr, ptr0, len0, ptr1, len1);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred3_0 = r0;
        deferred3_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred3_0, deferred3_1, 1);
    }
}
exports.krut_table_json = krut_table_json;

/**
 * Upasarga-prefixed surfaces for a stack + base form (Devanagari or SLP1).
 * @param {string} stack
 * @param {string} base
 * @returns {string}
 */
function prefixed_forms(stack, base) {
    let deferred3_0;
    let deferred3_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(stack, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(base, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        wasm.prefixed_forms(retptr, ptr0, len0, ptr1, len1);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred3_0 = r0;
        deferred3_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred3_0, deferred3_1, 1);
    }
}
exports.prefixed_forms = prefixed_forms;

/**
 * Kṛt-aware batch prefixing for one kṛt ROW: `rows_json` is the whole
 * upstream cell (`[{base, m, f, n}]` Devanagari strings, `/`-joined
 * alternants) and `row_index` selects the row this call renders. Returns
 * `{base, m, f, n}` alternatives for that row.
 *
 * `pinned_cell` carries the corpus cell for this (stack, family, kṛt) when
 * the caller has it (portal blob piece, audit): it is partitioned across
 * the upstream rows ([`crate::prefix_krut::partition_pinned`], pure string
 * matching — no engine calls) and this row's slice is returned, so the
 * union of the per-row calls is the cell, losslessly. Without a pin the
 * engine path runs (ल्यप् baked-stack strip, prathamā-ekavacana
 * declension, twin-suppression — see `prefix_krut`) and is validated by
 * `tests/prefixed_krut_audit.rs`.
 * @param {string} stack
 * @param {string} krt
 * @param {string} rows_json
 * @param {number} row_index
 * @param {string} slp1_dhatu
 * @param {string} engine_category
 * @param {string} dhatu_note
 * @param {string} pinned_cell
 * @returns {string}
 */
function prefixed_krut_row(stack, krt, rows_json, row_index, slp1_dhatu, engine_category, dhatu_note, pinned_cell) {
    let deferred8_0;
    let deferred8_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(stack, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(krt, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(rows_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(slp1_dhatu, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len3 = WASM_VECTOR_LEN;
        const ptr4 = passStringToWasm0(engine_category, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len4 = WASM_VECTOR_LEN;
        const ptr5 = passStringToWasm0(dhatu_note, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len5 = WASM_VECTOR_LEN;
        const ptr6 = passStringToWasm0(pinned_cell, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len6 = WASM_VECTOR_LEN;
        wasm.prefixed_krut_row(retptr, ptr0, len0, ptr1, len1, ptr2, len2, row_index, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred8_0 = r0;
        deferred8_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred8_0, deferred8_1, 1);
    }
}
exports.prefixed_krut_row = prefixed_krut_row;

/**
 * Batch prefixing for whole tables: `forms_json` is an array of Devanagari
 * (or SLP1) base forms; returns the surface arrays in order. Unusable
 * inputs yield empty arrays at their positions (never an error).
 * Uses the default (root-level) context; pass dhatu context explicitly via
 * [`prefixed_table_ctx`] when the dhatu and category are known.
 * @param {string} stack
 * @param {string} forms_json
 * @returns {string}
 */
function prefixed_table(stack, forms_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(stack, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(forms_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        wasm.prefixed_table(retptr, ptr0, len0, ptr1, len1);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred3_0 = r0;
        deferred3_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred3_0, deferred3_1, 1);
    }
}
exports.prefixed_table = prefixed_table;

/**
 * @param {string} stack
 * @param {string} forms_json
 * @param {string} slp1_dhatu
 * @param {string} engine_category
 * @param {string} dhatu_note
 * @returns {string}
 */
function prefixed_table_ctx(stack, forms_json, slp1_dhatu, engine_category, dhatu_note) {
    let deferred6_0;
    let deferred6_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(stack, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(forms_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(slp1_dhatu, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(engine_category, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len3 = WASM_VECTOR_LEN;
        const ptr4 = passStringToWasm0(dhatu_note, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len4 = WASM_VECTOR_LEN;
        wasm.prefixed_table_ctx(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred6_0 = r0;
        deferred6_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred6_0, deferred6_1, 1);
    }
}
exports.prefixed_table_ctx = prefixed_table_ctx;

/**
 * Search-box readings for `query` (Devanagari candidates for table lookup),
 * each labeled with its scheme.
 * @param {string} query
 * @returns {string}
 */
function query_candidates(query) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(query, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.query_candidates(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred2_0, deferred2_1, 1);
    }
}
exports.query_candidates = query_candidates;

/**
 * Reverse-search prefixed surfaces for one dhatu. Entry JSONs are the
 * per-dhatu table slices (`{lakara: "…;…"}`, `{krt: "base,m,f,n"}`);
 * `dhatu_json` is `{"family","baseindex","slp1","note"}` (vidyut dhatu +
 * note drive the generation context); `stacks_json` is `["वि + अति", …]`.
 * The small index is dropped after.
 * @param {string} ting_kartari_entry_json
 * @param {string} ting_karmani_entry_json
 * @param {string} krut_entry_json
 * @param {string} dhatu_json
 * @param {string} stacks_json
 * @param {string} query
 * @returns {string}
 */
function search_prefixed_dhatu(ting_kartari_entry_json, ting_karmani_entry_json, krut_entry_json, dhatu_json, stacks_json, query) {
    let deferred7_0;
    let deferred7_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(ting_kartari_entry_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(ting_karmani_entry_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(krut_entry_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(dhatu_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len3 = WASM_VECTOR_LEN;
        const ptr4 = passStringToWasm0(stacks_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len4 = WASM_VECTOR_LEN;
        const ptr5 = passStringToWasm0(query, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len5 = WASM_VECTOR_LEN;
        wasm.search_prefixed_dhatu(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred7_0 = r0;
        deferred7_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred7_0, deferred7_1, 1);
    }
}
exports.search_prefixed_dhatu = search_prefixed_dhatu;

/**
 * Reverse-search subanta surfaces for one dhatu's krut entry
 * (`{krt: "base,m,f,n"}`). The small index is dropped after.
 * @param {string} krut_entry_json
 * @param {string} family
 * @param {string} baseindex
 * @param {string} query
 * @returns {string}
 */
function search_subanta_dhatu(krut_entry_json, family, baseindex, query) {
    let deferred5_0;
    let deferred5_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(krut_entry_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(family, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(baseindex, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(query, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len3 = WASM_VECTOR_LEN;
        wasm.search_subanta_dhatu(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred5_0 = r0;
        deferred5_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred5_0, deferred5_1, 1);
    }
}
exports.search_subanta_dhatu = search_subanta_dhatu;

/**
 * Build the prefix surface map from Devanagari stack names
 * (`["प्र", "वि + अति", …]`, e.g. distinct `upasargas` across `dhatu_data`).
 * Called once by the portal; later calls rebuild (same input → same map).
 * @param {string} stacks_json
 * @returns {string}
 */
function split_init(stacks_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(stacks_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.split_init(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred2_0, deferred2_1, 1);
    }
}
exports.split_init = split_init;

/**
 * Split a query into `(stack, base)` candidates with their base shards
 * (`SHARDS` must match the built artifacts). Stacks and bases are
 * Devanagari display strings; bases are attested in the loaded cache.
 * @param {string} query
 * @param {number} shards
 * @returns {string}
 */
function split_query(query, shards) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(query, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.split_query(retptr, ptr0, len0, shards);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred2_0, deferred2_1, 1);
    }
}
exports.split_query = split_query;

/**
 * Word view: any word → readings (base word + slot) and declension
 * candidates (the word re-declined as a fresh stem, all three genders).
 *
 * `Wrampena` resolves only to itself as a vocative (an instrumental
 * reading would need natva → `WrampeRa`); `WrampeRa` resolves both to
 * `Wrampa`'s instrumental singular and to itself.
 * @param {string} word
 * @returns {string}
 */
function subanta_analyze(word) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(word, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.subanta_analyze(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred2_0, deferred2_1, 1);
    }
}
exports.subanta_analyze = subanta_analyze;

/**
 * Full subanta declension for a stem (Devanagari or SLP1) + `m|f|n`.
 * @param {string} stem
 * @param {string} linga
 * @returns {string}
 */
function subanta_table(stem, linga) {
    let deferred3_0;
    let deferred3_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(stem, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(linga, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        wasm.subanta_table(retptr, ptr0, len0, ptr1, len1);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred3_0 = r0;
        deferred3_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred3_0, deferred3_1, 1);
    }
}
exports.subanta_table = subanta_table;

/**
 * Tinanta tables for one dhatu from a ting-file JSON
 * (`{"01.0001":{"plat":"…;…",…},…}`); lakara values split into slots of variants.
 * @param {string} ting_json
 * @param {string} baseindex
 * @returns {string}
 */
function ting_table(ting_json, baseindex) {
    let deferred3_0;
    let deferred3_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(ting_json, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(baseindex, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        wasm.ting_table(retptr, ptr0, len0, ptr1, len1);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred3_0 = r0;
        deferred3_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred3_0, deferred3_1, 1);
    }
}
exports.ting_table = ting_table;

/**
 * Devanagari reading of a portal query for client-side filtering: the list
 * boxes compare against Devanagari stems, so `dA` must normalize to `दा`
 * before matching. Same frontend rule as [`query_candidates`] — Devanagari
 * as-is, ASCII strictly Harvard-Kyoto (raw SLP1 never surfaces).
 * @param {string} query
 * @returns {string}
 */
function to_devanagari(query) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(query, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.to_devanagari(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred2_0, deferred2_1, 1);
    }
}
exports.to_devanagari = to_devanagari;

/**
 * Verify one `(stack, base)` split against the loaded cache: exact forward
 * regeneration (category-only context) must reproduce the query.
 * @param {string} query
 * @param {string} stack
 * @param {string} base
 * @returns {string}
 */
function verify_split(query, stack, base) {
    let deferred4_0;
    let deferred4_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(query, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(stack, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(base, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len2 = WASM_VECTOR_LEN;
        wasm.verify_split(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred4_0 = r0;
        deferred4_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export4(deferred4_0, deferred4_1, 1);
    }
}
exports.verify_split = verify_split;
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_30c8987f7c2ed4e2: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return addHeapObject(ret);
        },
        __wbg___wbindgen_boolean_get_5b446f51afd21013: function(arg0) {
            const v = getObject(arg0);
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_4687d8d8c2017d52: function(arg0, arg1) {
            const ret = debugString(getObject(arg1));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_in_92f62ee1427d9e49: function(arg0, arg1) {
            const ret = getObject(arg0) in getObject(arg1);
            return ret;
        },
        __wbg___wbindgen_is_function_1f9d30630b8b1d3d: function(arg0) {
            const ret = typeof(getObject(arg0)) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_object_3c45d4f2dde4e749: function(arg0) {
            const val = getObject(arg0);
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_string_90b56bc79aad6f6c: function(arg0) {
            const ret = typeof(getObject(arg0)) === 'string';
            return ret;
        },
        __wbg___wbindgen_is_undefined_8865fb403f8fe9d8: function(arg0) {
            const ret = getObject(arg0) === undefined;
            return ret;
        },
        __wbg___wbindgen_jsval_loose_eq_677f21e468d6b461: function(arg0, arg1) {
            const ret = getObject(arg0) == getObject(arg1);
            return ret;
        },
        __wbg___wbindgen_number_get_2e0e7dee9f701a71: function(arg0, arg1) {
            const obj = getObject(arg1);
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_0380ccaa2f57f0d9: function(arg0, arg1) {
            const obj = getObject(arg1);
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_41e9ee4f547fc59a: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_call_6137034ef55c9d0f: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg0).call(getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_done_b41a1d26cdb37fb6: function(arg0) {
            const ret = getObject(arg0).done;
            return ret;
        },
        __wbg_entries_fb6397112b1de25f: function(arg0) {
            const ret = Object.entries(getObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_error_757e9472f8410341: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_export4(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_error_d3ceb2f44d6ca3c4: function(arg0, arg1) {
            console.error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_get_658f6698067d9515: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(getObject(arg0), getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_get_6c896e0571ddae51: function(arg0, arg1) {
            const ret = getObject(arg0)[arg1 >>> 0];
            return addHeapObject(ret);
        },
        __wbg_get_unchecked_288889d017702237: function(arg0, arg1) {
            const ret = getObject(arg0)[arg1 >>> 0];
            return addHeapObject(ret);
        },
        __wbg_get_with_ref_key_f38bf27dc398d91b: function(arg0, arg1) {
            const ret = getObject(arg0)[getObject(arg1)];
            return addHeapObject(ret);
        },
        __wbg_instanceof_ArrayBuffer_a99f175873e5d9b8: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint8Array_828cef2aaacafc31: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_isArray_e15a2ff68ffdbef2: function(arg0) {
            const ret = Array.isArray(getObject(arg0));
            return ret;
        },
        __wbg_iterator_e3c31c892080e444: function() {
            const ret = Symbol.iterator;
            return addHeapObject(ret);
        },
        __wbg_length_7f3c00c40364105e: function(arg0) {
            const ret = getObject(arg0).length;
            return ret;
        },
        __wbg_length_d4bdea10311bd9cf: function(arg0) {
            const ret = getObject(arg0).length;
            return ret;
        },
        __wbg_new_1dbf7428bba60a42: function(arg0) {
            const ret = new Uint8Array(getObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return addHeapObject(ret);
        },
        __wbg_new_617a8cdb8bb1130e: function() {
            const ret = new Object();
            return addHeapObject(ret);
        },
        __wbg_new_ee2291f50781bf1d: function() {
            const ret = new Array();
            return addHeapObject(ret);
        },
        __wbg_next_33784799010f1bbe: function(arg0) {
            const ret = getObject(arg0).next;
            return addHeapObject(ret);
        },
        __wbg_next_f4aac29c42af995c: function() { return handleError(function (arg0) {
            const ret = getObject(arg0).next();
            return addHeapObject(ret);
        }, arguments); },
        __wbg_prototypesetcall_bc27214492979395: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), getObject(arg2));
        },
        __wbg_set_bea140a88be9b277: function(arg0, arg1, arg2) {
            getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
        },
        __wbg_set_d1cb61e9f39c870f: function(arg0, arg1, arg2) {
            getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
        },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = getObject(arg1).stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_value_f3c585ee8f5ba40c: function(arg0) {
            const ret = getObject(arg0).value;
            return addHeapObject(ret);
        },
        __wbindgen_generic_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return addHeapObject(ret);
        },
        __wbindgen_object_clone_ref: function(arg0) {
            const ret = getObject(arg0);
            return addHeapObject(ret);
        },
        __wbindgen_object_drop_ref: function(arg0) {
            takeObject(arg0);
        },
    };
    return {
        __proto__: null,
        "./dhaturupa_wasm_bg.js": import0,
    };
}

const VidyutFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vidyut_free(ptr, 1));

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function dropObject(idx) {
    if (idx < 1028) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getObject(idx) { return heap[idx]; }

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_export3(addHeapObject(e));
    }
}

let heap = new Array(1024).fill(undefined);
heap.push(undefined, null, true, false);

let heap_next = heap.length;

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
function decodeText(ptr, len) {
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

const wasmPath = `${__dirname}/dhaturupa_wasm_bg.wasm`;
const wasmBytes = require('fs').readFileSync(wasmPath);
const wasmModule = new WebAssembly.Module(wasmBytes);
let wasmInstance = new WebAssembly.Instance(wasmModule, __wbg_get_imports());
let wasm = wasmInstance.exports;
