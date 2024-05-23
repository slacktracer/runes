<script>
  import { browser } from "$app/environment";

  import OPortal from "../../../lib/runes/components/OPortal/OPortal.svelte";
  import Shard from "../../../lib/runes/components/Shard/Shard.svelte";

  if (browser) {
    document.body.requestFullscreen().catch(console.warn);
  }
</script>

<Shard>
  <OPortal slot="o-portal"></OPortal>
</Shard>
