export const getSwitchAnimation = ({
  xTranslation,
}: {
  xTranslation: number;
}) => ({
  keyframes: [
    { transform: "translateX(0px)" },
    { transform: `translateX(-${xTranslation}px)` },
    { transform: `translateX(-${xTranslation}px) translateZ(-40px)` },
    { transform: "translateX(0px) translateZ(-40px)" },
  ],
  options: {
    duration: 1000,
    fill: "forwards",
  },
});
