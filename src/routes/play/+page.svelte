<script>
  import { browser } from "$app/environment";

  import OPortal from "../../lib/runes/components/OPortal/OPortal.svelte";
  import Portals from "../../lib/runes/components/Portals/Portals.svelte";

  if (browser) {
    document.body.requestFullscreen().catch(console.warn);
  }
</script>

<Portals>
  <OPortal slot="o-portal"></OPortal>
</Portals>
