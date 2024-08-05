<!-- 
** HeadText 사용법 **

 <HeadText 
 headerText = "제목"
 />

-->
<script setup>
const props = defineProps({
  headerText: {
    type: String,
    default: "제목",
  },
  color: {
    type: String,
    default: "black"
  }
});
</script>

<template>
  <h1 :style="{color: color}">{{ headerText }}</h1>
</template>

<style scoped>
h1 {
  font-weight: 700;
  color: #222222;
  font-size: 20px;
}
</style>