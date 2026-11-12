// De bergtop uit het logo: de zigzaglijn in de wolk, als klein teken voor labels.
// Het verloop staat één keer in <BergtopDefs /> (id "bergtop-verloop"); de tekens verwijzen ernaar.
export const bergtopPad = "M15.68 58.61 L45.44 29.03 L51.59 35.14 L57.75 29.02 L100.04 71.08 L87.74 71.08 L57.75 41.26 L51.6 47.37 L45.45 41.26 L22.06 64.5 Z";
export const bergtopSvg = `<svg class="label__teken" viewBox="15.2 28.5 85.3 43" aria-hidden="true" focusable="false"><path d="${bergtopPad}" fill="url(#bergtop-verloop)"/></svg>`;
