export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  date: string; // ISO
  read: string;
  sections: { h: string; p: string[]; list?: string[] }[];
  services: string[];
  machines: string[];
  waMessage: string;
};

export const guides: Guide[] = [
  {
    slug: "gear-hobbing-vs-gear-shaping",
    title: "Gear hobbing vs gear shaping: which should you choose?",
    metaTitle: "Gear Hobbing vs Gear Shaping — How to Choose",
    description: "Hobbing and shaping both cut gear teeth, but they suit different parts. A plain-language guide to choosing between them.",
    date: "2026-11-05",
    read: "4 min",
    sections: [
      {
        h: "The short answer",
        p: [
          "Use hobbing for external gears when there is room for the cutter to run out. Use shaping for internal gears, and for gears with a shoulder or flange close to the teeth. If your part fits both, hobbing is usually faster and more economical.",
        ],
      },
      {
        h: "How hobbing works",
        p: [
          "A hob is a cylindrical cutter with teeth arranged in a helix. The hob and the blank turn together in a fixed ratio while the hob feeds along the face, cutting the teeth continuously. Because the cutting is continuous, hobbing is quick and well suited to batches of spur and helical gears.",
        ],
      },
      {
        h: "How shaping works",
        p: [
          "A shaper uses a cutter shaped like a gear itself. It reciprocates up and down while the cutter and blank rotate together, cutting on each downstroke. The cutter needs very little clearance at the end of its stroke, so it can work right up to a shoulder, and it can cut inside a bore.",
        ],
      },
      {
        h: "Choosing between them",
        p: ["Ask these questions in order:"],
        list: [
          "Is the gear internal? Choose shaping.",
          "Is there a shoulder, flange or second gear right next to the teeth (a cluster)? Choose shaping.",
          "Is it an external gear with clear run-out? Choose hobbing.",
          "Is the diameter large? Hobbing, on a larger machine such as our WMW 1250 (up to Ø1250 mm).",
        ],
      },
      {
        h: "Not sure?",
        p: ["Send us the drawing and we will tell you which process fits and which of our machines will run it."],
      },
    ],
    services: ["gear-hobbing", "gear-shaping"],
    machines: ["wmw-hobbing-1250", "liebherr-gear-shaper"],
    waMessage: "Hi Siva Engineering, I'm not sure whether my gear needs hobbing or shaping. Drawing attached.",
  },
  {
    slug: "keyway-slotting-vs-broaching",
    title: "Keyway slotting vs broaching: cost, speed and when to use each",
    metaTitle: "Keyway Slotting vs Broaching — Which Is Better?",
    description: "Slotting and broaching both cut keyways. Slotting is flexible; broaching is fast for batches. Here is how to choose.",
    date: "2026-11-05",
    read: "3 min",
    sections: [
      {
        h: "The short answer",
        p: ["For one-offs and repairs, slot it. For repeat batches, broach it."],
      },
      {
        h: "Slotting: flexible, no special tooling",
        p: [
          "A slotting machine moves a single-point tool up and down inside the bore. Setting it up for a new size is just a different tool and depth, so there is no special tooling to buy. That makes it the natural choice for a single keyway, a repair, or a small batch. The cost is time: the tool cuts a little each stroke.",
        ],
      },
      {
        h: "Broaching: fast and repeatable",
        p: [
          "A broach is a long bar with progressively larger teeth. Pulled through the bore, it cuts the whole keyway in one pass, so each part takes seconds and every part comes out the same. The trade-off is that a broach is made for one profile, so it pays back over a batch.",
        ],
      },
      {
        h: "A quick rule of thumb",
        p: ["Use this as a starting point:"],
        list: [
          "One piece or a repair: slotting.",
          "Many identical parts: broaching.",
          "Unusual or large-bore keyway: slotting.",
          "Standard keyway in a repeat order: broaching.",
        ],
      },
      {
        h: "What we offer",
        p: ["We have two slotting machines (keyways from 5 mm to 20 mm) and a 10-ton broaching machine, so we can quote whichever suits your job."],
      },
    ],
    services: ["keyway-slotting", "broaching"],
    machines: ["slotting-machine-1", "broaching-machine-10-ton"],
    waMessage: "Hi Siva Engineering, I need a keyway cut and I'm not sure whether to slot or broach. Details attached.",
  },
  {
    slug: "how-to-prepare-a-gear-job-work-enquiry",
    title: "How to prepare a gear job work enquiry (and get a quote faster)",
    metaTitle: "How to Prepare a Gear Job Work Enquiry — Checklist",
    description: "The information a machine shop needs to quote gear cutting accurately: module, teeth, pressure angle, face width, material and more.",
    date: "2026-11-05",
    read: "3 min",
    sections: [
      {
        h: "Why details matter",
        p: [
          "A gear cannot be quoted from a photo alone. The cutter, the machine and the set-up all depend on a handful of numbers. Sending them up front means one reply instead of a long exchange.",
        ],
      },
      {
        h: "The checklist",
        p: ["Send as much of this as you have:"],
        list: [
          "Drawing, or the worn gear as a sample",
          "Module (or diametral pitch) and number of teeth",
          "Pressure angle",
          "For helical gears: helix angle and hand",
          "Outside diameter and face width of the blank",
          "Material, and heat treatment if any",
          "Bore size, and keyway size if needed",
          "Quantity, and whether it will repeat",
          "Any tolerance or accuracy requirement",
        ],
      },
      {
        h: "If you only have a worn gear",
        p: [
          "That is fine. Send the gear or a clear photo with the diameter, face width and tooth count. We can usually work back to the module from those.",
        ],
      },
      {
        h: "Blanks",
        p: [
          "Gear cutting normally starts from a turned blank with the bore finished. If you are not sure about the blank, mention it and we will discuss it.",
        ],
      },
      {
        h: "Check your size against our range",
        p: ["Our capacity checker shows which machine fits your blank before you send anything."],
      },
    ],
    services: ["gear-hobbing", "gear-shaping"],
    machines: ["wmw-hobbing-250", "wmw-hobbing-1250"],
    waMessage: "Hi Siva Engineering, I'd like a gear quote. I'm sending the drawing and details now.",
  },
  {
    slug: "when-to-regrind-hob-cutters",
    title: "When to regrind a hob cutter: five signs it is time",
    metaTitle: "When to Regrind a Hob Cutter — 5 Warning Signs",
    description: "A dull hob quietly damages gear quality. These five signs tell you when to send your hob cutter for regrinding.",
    date: "2026-11-05",
    read: "3 min",
    sections: [
      {
        h: "Why timing matters",
        p: [
          "A hob wears gradually, so the drop in quality is easy to miss. Regrinding sooner removes less material, and a hob can only be reground a limited number of times, so catching wear early gets more life from the tool.",
        ],
      },
      {
        h: "Five signs",
        p: ["Watch for these:"],
        list: [
          "Rougher tooth surface finish than before",
          "More burr on the tooth edges",
          "Higher cutting load or noise during the cut",
          "Tooth thickness drifting out of size between parts",
          "Visible wear land or chipping on the cutting edges",
        ],
      },
      {
        h: "What regrinding does",
        p: [
          "Regrinding removes a thin layer from the cutting face of each tooth, restoring a sharp edge. Done on a proper tool and cutter grinder, it brings the hob back to cutting cleanly.",
        ],
      },
      {
        h: "Get it done where the gears are cut",
        p: ["We regrind hobs and cut gears in the same shop, so you can discuss tool and job together."],
      },
    ],
    services: ["hob-cutter-grinding", "tool-cutter-grinding"],
    machines: ["tool-cutter-grinder"],
    waMessage: "Hi Siva Engineering, my hob cutter needs regrinding. Photo and details attached.",
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
