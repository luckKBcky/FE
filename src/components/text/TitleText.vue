<!-- 
** TitleText 사용법 **

 <Cardhead 
 titleText = "제목"/>

-->
<script setup>
const props = defineProps({
  titleText: {
    type: String,
    default: "제목",
  }
});
</script>

<template>
    <h1>{{ titleText }}</h1>
</template>

<style scoped>
h1 {
  font-weight: 600;
  color: #464255;
  font-size: 14px;
}
</style>