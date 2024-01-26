<template>
  <span class="tag" :style="{ color: props.iconColor, backgroundColor: props.bgColor}">
    <!-- <template #default></template> -->
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
  background-color: red;
}
</style>