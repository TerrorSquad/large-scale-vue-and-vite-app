<script lang="ts"
        setup>
import type {ItemInterface} from "@/models/items/Item.interface.ts";
import ItemComponent from './children/Item.component.vue'
// expose a property called items with a default value of a blank array
defineProps<{ items: ItemInterface[] }>()

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
    <ul>
      <ItemComponent v-for="(item, index) in items"
                     :key="item.id"
                     :model="item"
                     @select-item="onSelectItem">
        {{ item.name }} [{{ item.selected }}]
      </ItemComponent>
    </ul>
  </div>
</template>

<style> ul {
  padding-inline-start: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
} </style>
