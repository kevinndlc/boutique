<script setup lang="ts">

defineProps<{
  open: boolean,
  transparent?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Teleport to="body">
    <div @click="emit('close')" v-if="open" class="calc" :class="{ transparent }"></div>
  </Teleport>
</template>

<style scoped lang="scss">
.calc {
  position: fixed;
  inset: 0;
  background-color: hsl(0deg 0% 30% / 0.4);
  z-index: 1;
}
.transparent {
  background-color: transparent;
}
</style>
