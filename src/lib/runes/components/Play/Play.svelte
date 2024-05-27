<script lang="ts">
  import "./play.js";

  import OPortal from "../OPortal/OPortal.svelte";
  import Shard from "../Shard/Shard.svelte";
</script>

<Shard>
  <OPortal height={500} slot="o-portal" width={320}></OPortal>
</Shard>
