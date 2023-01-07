<template>
  <template v-for="(title, index) in customRareHeader" :key="index">
    <el-select v-model="rareName" class="m-2" :placeholder="`选择${title}`" size="large">
    <el-option
      v-for="item in rareList[title]||[]"
      :key="item"
      :label="item"
      :value="item"
    />
  </el-select>
  </template>
</template>

<script lang="ts" setup>
import { ref, reactive  } from 'vue'
import { custom_rare_header, custom_rare_results } from '@/src/assets/data/rareCustom.js'

const rareName = ref('')
const customRareHeader = reactive(custom_rare_header)
const customRareResults = reactive(custom_rare_results)

const rareList: { [ propName: string ]: any }= {}

for (const head of customRareHeader) {
  rareList[head] = customRareResults.map((m: { [x: string]: any }) => m[head])
}

console.log(rareList)

</script>

<style scoped>

</style>