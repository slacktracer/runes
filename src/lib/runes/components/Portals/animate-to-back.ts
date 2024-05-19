import { getSwitchAnimation } from "./get-switch-animation.js";

export const animateToBack = async ({
  outgoingPortal,
}: {
  outgoingPortal: HTMLDivElement;
}) => {
  const outgoingPortalWidth = outgoingPortal.clientWidth;

  const { keyframes, options } = getSwitchAnimation({
    xTranslation: outgoingPortalWidth,
  });

  const animation = outgoingPortal.animate(keyframes, options);

  await animation.finished;

  animation.commitStyles();

  animation.cancel();
};
