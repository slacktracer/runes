<div class="sbhud">
  <div class="sbhud-item"><slot name="a"></slot></div>
  <div class="sbhud-item"><slot name="b"></slot></div>
</div>

<style>
  .sbhud {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: 1fr 1fr;
  }

  .sbhud-item {
    color: #ede9dd;
    font-size: 1.75rem;
    text-align: center;
    text-decoration: none;
    text-shadow: 1px 1px 15px #ede9dd;
  }
</style>
