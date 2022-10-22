<template>
  <div class="description">
    <el-descriptions class="margin-top" :title="title" :column="column" border>
      <template v-for="(item, index) in tableDatas" :key="index">
        <el-descriptions-item>
          <template #label>
            {{ item.name }}
          </template>
          <el-tag size="small">{{ item.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { DescriptionProp } from '../types/types';

withDefaults(defineProps<{
  title?: string,
  column: number,
  tableDatas: DescriptionProp[]
}>(), {
  title: '',
  column: 1,
  tableDatas: () => ([])
})

</script>

<style scoped></style>
