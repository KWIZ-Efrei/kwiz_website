<script setup>
import router from "@/router/index.js";
</script>

<template>
  <main>
    <div class="center-screen">
      <div class="title">KWIZ</div>
      <button @click="router.push('/game')">Kwiz me !</button>
    </div>
  </main>
</template>

<style>
  .title {
    font-weight: bolder;
    font-size: 10rem;
    transition: 0.4s;
    font-family: DiloWorld, sans-serif;
    letter-spacing: 0.5rem;
    line-height: 1.2;
    margin-bottom: 2rem;
  }

  .title:hover {
    transform: scale(1.2);
  }
</style>
