<script setup lang="ts">
import { CadButton, CadInput } from '@cad/vue';
</script>

<template>
  <div style="padding: 20px">
    <h1>Vue Test App</h1>
    <cad-button variant="primary">Click Me</cad-button>
    <br><br>
    <cad-input placeholder="Type something..." type="text"></cad-input>
  </div>
</template>
