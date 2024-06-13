<script lang="ts">
  import { gameState } from "../../play.js";
  import OPortal from "../OPortal/OPortal.svelte";
  import OSide from "../OSide/OSide.svelte";
  import Shard from "../Shard/Shard.svelte";
</script>

<Shard>
  <OPortal
    height={gameState.canvasHeight}
    slot="o-portal"
    width={gameState.canvasWidth}
  ></OPortal>

  <OSide
    height={gameState.canvasHeight}
    slot="o-side"
    width={gameState.canvasWidth}
  ></OSide>
</Shard>
