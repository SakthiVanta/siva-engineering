export type MachineKind = "hobbing" | "shaping" | "slotting" | "broaching" | "grinding";

export type Machine = {
  slug: string;
  name: string;
  kind: MachineKind;
  /** slug of the service page this machine primarily serves */
  service: string;
  tag: string;
  image: { src: string; w: number; h: number; alt: string };
  /** Only values printed in the company catalog. */
  specs: [label: string, value: string][];
  /** numeric limits used by the capacity checker (catalog values only) */
  limits?: { minOD?: number; maxOD?: number; face?: number; keyMin?: number; keyMax?: number };
  summary: string;
  body: string[];
  bestFor: string[];
};

export const machines: Machine[] = [
  {
    slug: "wmw-hobbing-1250",
    name: "WMW Hobbing Machine 1250",
    kind: "hobbing",
    service: "gear-hobbing",
    tag: "Large-diameter gears",
    image: { src: "/machines/wmw-hobbing-1250.webp", w: 1181, h: 533, alt: "WMW 1250 gear hobbing machine at Siva Engineering, Coimbatore" },
    specs: [
      ["Minimum OD", "200 mm"],
      ["Maximum OD", "1250 mm"],
      ["Face width", "up to 500 mm"],
    ],
    limits: { minOD: 200, maxOD: 1250, face: 500 },
    summary: "Our largest hobber — gear blanks from Ø200 mm up to Ø1250 mm with a 500 mm face.",
    body: [
      "The WMW 1250 is the machine we reach for when the gear is big. It takes blanks from 200 mm to 1250 mm outside diameter and face widths up to 500 mm, which covers the heavy end of industrial gearbox, drive and machine-tool gearing.",
      "Large gears are as much about handling and set-up as cutting. Tell us the blank weight and bore, and we will confirm how it will be mounted before you commit to anything.",
    ],
    bestFor: ["Large spur and helical gear wheels", "Heavy drive gears and rims", "Single repair gears and small batches"],
  },
  {
    slug: "wmw-hobbing-250",
    name: "WMW Hobbing Machine 250",
    kind: "hobbing",
    service: "gear-hobbing",
    tag: "Small and medium gears",
    image: { src: "/machines/wmw-hobbing-250.webp", w: 1051, h: 474, alt: "WMW 250 gear hobbing machine cutting small and medium gears" },
    specs: [
      ["Minimum OD", "25 mm"],
      ["Maximum OD", "250 mm"],
      ["Face width", "up to 200 mm"],
    ],
    limits: { minOD: 25, maxOD: 250, face: 200 },
    summary: "The everyday hobber for pinions and wheels from Ø25 mm to Ø250 mm.",
    body: [
      "Most gear job work falls between a few tens of millimetres and a quarter of a metre, and this is the machine built around that range: 25 mm to 250 mm outside diameter, up to 200 mm face width.",
      "Pinions, reduction gears and pump or compressor drive gears are typical work. Send the drawing and quantity and we will confirm set-up and cutter availability.",
    ],
    bestFor: ["Gearbox pinions and reduction gears", "Pump and compressor drive gears", "Repeat batch work"],
  },
  {
    slug: "hmt-liebherr-400-hobbing",
    name: "HMT Liebherr 400 Hobbing Machine",
    kind: "hobbing",
    service: "gear-hobbing",
    tag: "Mid-size hobbing",
    image: { src: "/machines/hmt-liebherr-400-hobbing.webp", w: 1087, h: 815, alt: "HMT Liebherr 400 hobbing machine on the Siva Engineering shop floor" },
    specs: [
      ["Model", "HMT Liebherr 400"],
      ["Process", "Gear hobbing"],
    ],
    summary: "A third hobbing line that keeps mid-size work moving when the others are busy.",
    body: [
      "The HMT Liebherr 400 adds hobbing capacity for medium-size gears. Its exact capacity for your part depends on diameter, face width and module, so we confirm it against your drawing instead of quoting a generic range.",
    ],
    bestFor: ["Medium-size gears", "Extra hobbing capacity for batches", "Work that overflows the WMW machines"],
  },
  {
    slug: "cooper-hobbing-250",
    name: "Cooper Hobbing Machine 250",
    kind: "hobbing",
    service: "gear-hobbing",
    tag: "Batch hobbing",
    image: { src: "/machines/cooper-hobbing-250.webp", w: 1089, h: 817, alt: "Cooper 250 hobbing machine used for batch gear cutting" },
    specs: [
      ["Model", "Cooper 250"],
      ["Process", "Gear hobbing"],
    ],
    summary: "A fourth hobber for batch work and for running jobs in parallel.",
    body: [
      "The Cooper 250 gives us parallel hobbing capacity, so a repeat batch does not have to wait behind a one-off. As with every machine here, we match your drawing to the right hobber rather than guessing from a model number.",
    ],
    bestFor: ["Repeat batch work", "Parallel jobs", "Small and medium gears"],
  },
  {
    slug: "liebherr-gear-shaper",
    name: "Liebherr Gear Shaper",
    kind: "shaping",
    service: "gear-shaping",
    tag: "Internal gears & clusters",
    image: { src: "/machines/liebherr-gear-shaper.webp", w: 489, h: 917, alt: "Liebherr gear shaping machine for internal and cluster gears" },
    specs: [
      ["Minimum OD", "20 mm"],
      ["Maximum OD", "200 mm"],
      ["Face width", "up to 40 mm"],
    ],
    limits: { minOD: 20, maxOD: 200, face: 40 },
    summary: "For internal gears and gears a hob cannot reach — Ø20 to Ø200 mm, 40 mm face.",
    body: [
      "A shaper cuts with a reciprocating cutter, so it can produce internal gears and gears with a shoulder close to the teeth, where a hob has no run-out room.",
      "Our Liebherr shaper takes blanks from 20 mm to 200 mm outside diameter with a face width up to 40 mm.",
    ],
    bestFor: ["Internal gears and ring gears", "Cluster gears with close shoulders", "Internal splines"],
  },
  {
    slug: "slotting-machine-1",
    name: "Slotting Machine 1",
    kind: "slotting",
    service: "keyway-slotting",
    tag: "Keyways 5–20 mm",
    image: { src: "/machines/slotting-machine-1.webp", w: 385, h: 854, alt: "Vertical slotting machine for internal keyway cutting" },
    specs: [
      ["Minimum key", "5 mm"],
      ["Maximum key", "20 mm"],
    ],
    limits: { keyMin: 5, keyMax: 20 },
    summary: "Vertical slotter for keyways from 5 mm to 20 mm.",
    body: [
      "A vertical slotting machine drives a single-point tool up and down inside the bore to cut keyways and internal profiles. This machine covers key widths from 5 mm to 20 mm.",
    ],
    bestFor: ["Keyways in gear and pulley bores", "Couplings and sprockets", "Repair and one-off keyways"],
  },
  {
    slug: "slotting-machine-2",
    name: "Slotting Machine 2",
    kind: "slotting",
    service: "keyway-slotting",
    tag: "Second slotting cell",
    image: { src: "/machines/slotting-machine-2.webp", w: 388, h: 859, alt: "Second slotting machine at Siva Engineering" },
    specs: [
      ["Process", "Keyway & internal slotting"],
      ["Role", "Second slotting cell"],
    ],
    summary: "A second slotter so urgent keyways do not queue behind longer jobs.",
    body: [
      "Having two slotting machines means a quick keyway or repair job can run alongside a larger batch. Tell us the key size and bore and we will route it to the right machine.",
    ],
    bestFor: ["Urgent single keyways", "Parallel slotting jobs", "Bores of varied size"],
  },
  {
    slug: "broaching-machine-10-ton",
    name: "Broaching Machine, 10 Ton",
    kind: "broaching",
    service: "broaching",
    tag: "10-ton broach",
    image: { src: "/machines/broaching-machine-10-ton.webp", w: 1043, h: 470, alt: "10 ton broaching machine for keyways and splines" },
    specs: [
      ["Capacity", "10 ton"],
      ["Process", "Keyway & spline broaching"],
    ],
    summary: "10-ton broaching for fast, repeatable keyways and splines in batches.",
    body: [
      "Broaching cuts a keyway or spline in a single pass of a toothed bar, which makes it the quicker choice when you have a batch. Our machine has 10 ton capacity.",
      "A broach is matched to a specific keyway or profile, so send us the size and we will confirm the tooling.",
    ],
    bestFor: ["Batch keyways", "Splines and internal profiles", "Repeatable bore work"],
  },
  {
    slug: "tool-cutter-grinder",
    name: "Tool & Cutter Grinder",
    kind: "grinding",
    service: "hob-cutter-grinding",
    tag: "Hob & tool regrinding",
    image: { src: "/machines/tool-cutter-grinder.webp", w: 390, h: 865, alt: "Tool and cutter grinding machine used for hob cutter regrinding" },
    specs: [
      ["Process", "Tool & hob cutter grinding"],
      ["Used for", "Hobs, slotting tools, cutters"],
    ],
    summary: "Regrinds hob cutters and cutting tools so they cut like new again.",
    body: [
      "Cutting tools lose their edge, and a dull hob spoils gear quality long before it fails. Our tool and cutter grinder resharpens hob cutters and other cutting tools so they can go back into service.",
    ],
    bestFor: ["Hob cutter regrinding", "Slotting and form tools", "Cutters from other shops"],
  },
];

export const machineBySlug = (slug: string) => machines.find((m) => m.slug === slug);
export const machinesForService = (service: string) =>
  machines.filter((m) => m.service === service || (service === "tool-cutter-grinding" && m.kind === "grinding"));
export const machineKindLabel: Record<MachineKind, string> = {
  hobbing: "Hobbing",
  shaping: "Shaping",
  slotting: "Slotting",
  broaching: "Broaching",
  grinding: "Grinding",
};
