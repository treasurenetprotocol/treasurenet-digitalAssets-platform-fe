<template>
  <span class="tag" :style="{ color: props.iconColor, backgroundColor: props.bgColor}">
    <!-- icon -->
    <slot name="icon"></slot>

    <!-- default -->
    <slot></slot>
  </span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  bgColor: string
  iconColor: string
}>()
</script>

<style lang="less" scoped>
.tag {
  padding: 7px 12px;
  font-weight: 500;
  font-size: 16px;
  border-radius: 20px;

  // :slotted(img),
  // :slotted(span) {
  //   vertical-align: middle;
  // }

  :slotted(img) {
    width: 16px;
    margin: 0 5px -2px 0;
  }
}
</style>