<script lang="ts" setup>
// import a reference to our ItemInterace
import type { ItemInterface } from '@/models'
// import a reference to the Item component:
import ItemComponent from './children/Item.component.vue'
// import a reference to the Laoder component
import Loader from '@/components/shared/Loader.component.vue'
// expose a property called items with a default value of a blank array
defineProps<{
  items: ItemInterface[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'selectItem', id: number): any
}>()

const onSelectItem = (id: number) => {
  emit('selectItem', id)
}
</script>

<template>
  <div>
    <h3>Items:</h3>
    <Loader v-show="loading" />
    <ul v-show="!loading">
      <ItemComponent
        v-for="item in items"
        :key="item.id"
        :model="item"
        @select-item="onSelectItem"
      >
        {{ item.name }} [{{ item.selected }}]
      </ItemComponent>
    </ul>
  </div>
</template>

<style>
ul {
  padding-inline-start: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
}
</style>
