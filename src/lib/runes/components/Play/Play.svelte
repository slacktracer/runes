<script lang="ts">
  import { gameState } from "../../play.js";
  import OPortal from "../ASide/ASide.svelte";
  import OSide from "../BSide/BSide.svelte";
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
