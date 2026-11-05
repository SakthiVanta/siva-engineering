export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  num: string;
  title: string;
  /** short label for nav / lists */
  short: string;
  /** one line used in lists and cards */
  blurb: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  keyFacts: [string, string][];
  applications: string[];
  /** what the customer should send us to get a quote */
  send: string[];
  faqs: Faq[];
  guides: string[];
  related: string[];
  waMessage: string;
};

export const services: Service[] = [
  {
    slug: "gear-hobbing",
    num: "01",
    title: "Gear Hobbing",
    short: "Gear hobbing",
    blurb: "Spur and helical gears from Ø25 mm to Ø1250 mm on four hobbing machines.",
    h1: "Gear hobbing job work in Coimbatore",
    metaTitle: "Gear Hobbing Job Work in Coimbatore | Up to Ø1250 mm",
    metaDescription:
      "Gear hobbing job work in Coimbatore on WMW 1250, WMW 250, HMT Liebherr 400 and Cooper 250 hobbers. Blanks from Ø25 mm to Ø1250 mm, face width up to 500 mm. WhatsApp your drawing.",
    intro: [
      "Hobbing is the workhorse of gear cutting. A hob cutter and your gear blank rotate in step while the cutter feeds across the face, generating the teeth one after another. It is the fastest, most economical way to cut external spur and helical gears, which is why most gear job work starts here.",
      "We run four hobbing machines, so we can match the machine to the size of your gear: the WMW 250 for pinions and small wheels, the WMW 1250 for blanks up to 1250 mm in diameter, and the HMT Liebherr 400 and Cooper 250 for additional capacity.",
    ],
    keyFacts: [
      ["Blank diameter", "Ø25 mm – Ø1250 mm"],
      ["Face width", "up to 500 mm"],
      ["Machines", "WMW 1250 · WMW 250 · HMT Liebherr 400 · Cooper 250"],
    ],
    applications: [
      "Gearbox pinions and wheels",
      "Pump and compressor drive gears",
      "Textile and agricultural machinery gears",
      "Heavy industrial drive gears",
      "Replacement gears from a sample or drawing",
    ],
    send: [
      "Drawing, or the worn gear as a sample",
      "Module (or DP), number of teeth and pressure angle",
      "Helix angle and hand, for helical gears",
      "Face width, material and quantity",
      "Turned blank with the finished bore (we can discuss blanks if you do not have them)",
    ],
    faqs: [
      { q: "What is the largest gear you can hob?", a: "Our WMW 1250 takes blanks up to 1250 mm in outside diameter with a face width up to 500 mm. Send the drawing and blank weight and we will confirm set-up." },
      { q: "Can you cut helical gears as well as spur gears?", a: "Hobbing is the standard process for both. Send the helix angle and hand with your drawing and we will confirm the hob and set-up before quoting." },
      { q: "Do you take single pieces or only batches?", a: "Tell us the quantity, whether that is a single repair gear or a repeat batch, and we will confirm what is practical." },
      { q: "What do I need to send for a quote?", a: "A drawing (or sample), module, number of teeth, pressure angle, face width, material and quantity. The checklist on this page lists everything." },
    ],
    guides: ["gear-hobbing-vs-gear-shaping", "how-to-prepare-a-gear-job-work-enquiry"],
    related: ["gear-shaping", "keyway-slotting", "hob-cutter-grinding"],
    waMessage: "Hi Siva Engineering, I need a quote for gear hobbing. Details: OD ___ mm, face ___ mm, module ___, teeth ___, qty ___. Drawing attached.",
  },
  {
    slug: "gear-shaping",
    num: "02",
    title: "Gear Shaping",
    short: "Gear shaping",
    blurb: "Internal gears, cluster gears and close-shoulder work on a Liebherr shaper.",
    h1: "Gear shaping job work in Coimbatore",
    metaTitle: "Gear Shaping Job Work in Coimbatore | Internal & Cluster Gears",
    metaDescription:
      "Gear shaping job work in Coimbatore on a Liebherr gear shaper — internal gears, cluster gears and gears with close shoulders. Ø20–200 mm, face width up to 40 mm.",
    intro: [
      "A gear shaper cuts with a reciprocating cutter, moving up and down like a vertical slotter while the blank and cutter turn together. Because the cutter needs almost no run-out space, a shaper can cut gears a hob simply cannot: internal gears, and external gears with a shoulder or flange right next to the teeth.",
      "Our Liebherr gear shaper handles blanks from 20 mm to 200 mm in outside diameter with a face width up to 40 mm.",
    ],
    keyFacts: [
      ["Blank diameter", "Ø20 mm – Ø200 mm"],
      ["Face width", "up to 40 mm"],
      ["Machine", "Liebherr gear shaper"],
    ],
    applications: ["Internal (ring) gears", "Cluster and stepped gears", "Gears with a shoulder close to the teeth", "Internal splines"],
    send: [
      "Drawing showing the shoulder or clearance behind the teeth",
      "Module (or DP), number of teeth and pressure angle",
      "Internal or external, and face width",
      "Material and quantity",
    ],
    faqs: [
      { q: "When should I choose shaping instead of hobbing?", a: "Choose shaping for internal gears, or when a shoulder or flange sits too close to the teeth for a hob to run out. Otherwise hobbing is usually faster for external gears." },
      { q: "What size can the shaper handle?", a: "Blanks from 20 mm to 200 mm in outside diameter, with a face width up to 40 mm." },
      { q: "Can you shape internal splines?", a: "Internal gear and spline forms are what the shaper is suited to. Send the profile and we will confirm the cutter." },
    ],
    guides: ["gear-hobbing-vs-gear-shaping"],
    related: ["gear-hobbing", "keyway-slotting", "broaching"],
    waMessage: "Hi Siva Engineering, I need a quote for gear shaping (internal / cluster). Details: OD ___ mm, face ___ mm, module ___, teeth ___, qty ___. Drawing attached.",
  },
  {
    slug: "keyway-slotting",
    num: "03",
    title: "Keyway Slotting",
    short: "Keyway slotting",
    blurb: "Keyways from 5 mm to 20 mm cut on two vertical slotting machines.",
    h1: "Keyway slotting job work in Coimbatore",
    metaTitle: "Keyway Slotting Job Work in Coimbatore | 5–20 mm Keys",
    metaDescription:
      "Keyway slotting job work in Coimbatore on two vertical slotting machines. Keyways from 5 mm to 20 mm in gears, pulleys, couplings and sprockets. Quick turnaround on repair jobs.",
    intro: [
      "A slotting machine drives a single-point tool up and down inside a bore to cut a keyway or internal profile. It is flexible: one tool, any bore that fits on the table, and no special broach to buy. That makes it ideal for one-off keyways, repairs and small batches.",
      "We have two slotting machines. Slotting Machine 1 cuts keyways from 5 mm to 20 mm wide, and the second machine means an urgent job does not have to wait behind a long one.",
    ],
    keyFacts: [
      ["Key width", "5 mm – 20 mm"],
      ["Machines", "2 vertical slotting machines"],
      ["Best for", "One-off keyways, repairs, small batches"],
    ],
    applications: ["Gear and pulley bores", "Couplings and sprockets", "Replacement or re-cut keyways", "Internal profiles"],
    send: ["Bore diameter and key width and depth", "Material and part sketch or drawing", "Quantity", "Whether it is a new keyway or a repair"],
    faqs: [
      { q: "What keyway sizes can you cut?", a: "From 5 mm to 20 mm in key width on Slotting Machine 1. Send the bore, key width and depth and we will confirm." },
      { q: "Slotting or broaching, which is better?", a: "Slotting needs no dedicated tooling, so it suits one-offs and repairs. Broaching is quicker per part and suits repeat batches. Our guide compares them in detail." },
      { q: "Can you do urgent single keyways?", a: "With two slotting machines we can often run a small job alongside a larger one. Message us the details and we will tell you what is possible." },
    ],
    guides: ["keyway-slotting-vs-broaching"],
    related: ["broaching", "gear-hobbing", "gear-shaping"],
    waMessage: "Hi Siva Engineering, I need keyway slotting. Bore ___ mm, key ___ mm × ___ mm, qty ___. Photo / drawing attached.",
  },
  {
    slug: "broaching",
    num: "04",
    title: "Broaching",
    short: "Broaching",
    blurb: "10-ton broaching for repeatable keyways and splines in batches.",
    h1: "Broaching job work in Coimbatore",
    metaTitle: "Broaching Job Work in Coimbatore | 10-Ton Keyway & Spline",
    metaDescription:
      "Broaching job work in Coimbatore on a 10-ton broaching machine — fast, repeatable keyways and splines for batch production. Send your bore and key size on WhatsApp.",
    intro: [
      "Broaching pulls a long toothed bar through the bore, and each tooth removes a little more material until the keyway or spline is complete in a single stroke. Once a broach exists for your profile, each part takes a fraction of the time slotting would, and every part is the same.",
      "Our broaching machine has 10 ton capacity. Because a broach is matched to a specific profile, we confirm the tooling against your key size before we quote.",
    ],
    keyFacts: [
      ["Capacity", "10 ton"],
      ["Process", "Keyway and spline broaching"],
      ["Best for", "Repeat batches"],
    ],
    applications: ["Batch keyways in gears and hubs", "Internal splines", "Couplings and sleeves", "Repeatable bore profiles"],
    send: ["Bore diameter and length", "Key width and depth, or spline profile", "Material", "Batch quantity"],
    faqs: [
      { q: "How much force does your broaching machine have?", a: "It has 10 ton capacity." },
      { q: "Do I need to supply a broach?", a: "Tell us the keyway or spline you need. We will confirm the tooling before quoting so there are no surprises." },
      { q: "When is broaching better than slotting?", a: "For batches. A broach cuts the full profile in one pass, so repeat parts are faster and more uniform." },
    ],
    guides: ["keyway-slotting-vs-broaching"],
    related: ["keyway-slotting", "gear-hobbing", "gear-shaping"],
    waMessage: "Hi Siva Engineering, I need broaching (keyway / spline). Bore ___ mm, key ___ mm, qty ___. Drawing attached.",
  },
  {
    slug: "hob-cutter-grinding",
    num: "05",
    title: "Hob Cutter Grinding",
    short: "Hob cutter grinding",
    blurb: "Regrinding of hobbing cutters so they cut clean teeth again.",
    h1: "Hob cutter grinding in Coimbatore",
    metaTitle: "Hob Cutter Grinding & Regrinding in Coimbatore",
    metaDescription:
      "Hob cutter grinding and regrinding in Coimbatore. Restore worn gear hobs for cleaner teeth and longer tool life. Send your hob cutter or WhatsApp us the details.",
    intro: [
      "A gear hob is an expensive tool, and a worn one quietly ruins gear quality: rougher tooth surfaces, more burr, and teeth that drift from size. Regrinding the cutting face restores the sharp edge so the hob can go back to work, often several times over its life.",
      "We offer hob cutter grinding on our tool and cutter grinder, alongside the gear cutting itself, so you can have your hobs sharpened and your gears cut in the same place.",
    ],
    keyFacts: [
      ["Process", "Hob cutter regrinding"],
      ["Machine", "Tool & cutter grinder"],
      ["Also", "Other cutting tools on request"],
    ],
    applications: ["Gear hob cutters", "Hobs used in your own shop", "Tools that need sharpening between jobs"],
    send: ["The hob itself, or its details (module, diameter, bore)", "Number of gashes / flutes, if known", "A note on what you are seeing (finish, burr, size drift)"],
    faqs: [
      { q: "How do I know my hob needs regrinding?", a: "Rougher tooth surfaces, more burr, rising cutting load or teeth drifting out of size are the usual signs. Our guide on when to regrind lists them." },
      { q: "Can you sharpen hobs from other shops?", a: "Yes, send the hob or its details and we will confirm what is needed." },
    ],
    guides: ["when-to-regrind-hob-cutters"],
    related: ["tool-cutter-grinding", "gear-hobbing", "keyway-slotting"],
    waMessage: "Hi Siva Engineering, I need hob cutter regrinding. Hob details: module ___, OD ___ mm, bore ___ mm. Photo attached.",
  },
  {
    slug: "tool-cutter-grinding",
    num: "06",
    title: "Tool & Cutter Grinding",
    short: "Tool & cutter grinding",
    blurb: "Resharpening of slotting tools, form tools and other cutters.",
    h1: "Tool and cutter grinding in Coimbatore",
    metaTitle: "Tool & Cutter Grinding in Coimbatore | Resharpening",
    metaDescription:
      "Tool and cutter grinding in Coimbatore — resharpening of slotting tools, form tools, milling cutters and other cutting tools. Send the tool or a photo on WhatsApp.",
    intro: [
      "Every cutting tool eventually goes dull. Resharpening is cheaper than replacement, and a well-ground tool cuts cleaner, runs cooler and lasts longer in service.",
      "Our tool and cutter grinder resharpens slotting tools, form tools, cutters and similar tooling. It is the same machine that regrinds hobs, and it keeps our own slotting and shaping tools in condition.",
    ],
    keyFacts: [
      ["Process", "Tool & cutter grinding"],
      ["Machine", "Tool & cutter grinder"],
      ["Used for", "Slotting tools, form tools, cutters"],
    ],
    applications: ["Slotting tools", "Form tools", "Milling and end cutters", "Special tooling"],
    send: ["The tool, or a clear photo and dimensions", "What material it cuts", "What the tool is doing wrong"],
    faqs: [
      { q: "What tools can you resharpen?", a: "Slotting tools, form tools, cutters and similar cutting tools. Send a photo and we will confirm." },
      { q: "Can you grind a special profile?", a: "Tell us the profile and send the drawing or sample so we can confirm it before starting." },
    ],
    guides: ["when-to-regrind-hob-cutters"],
    related: ["hob-cutter-grinding", "keyway-slotting", "gear-shaping"],
    waMessage: "Hi Siva Engineering, I need tool / cutter grinding. Tool: ___. Photo attached.",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
