<script setup></script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />
  </header>
  <main>
    <div class="content-container"></div>
  </main>
</template>

<style>
  @import "./assets/base.css";

  #app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;

    font-weight: normal;
  }
  .content-container {
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  @media (min-width: 1024px) {
  }
</style>
