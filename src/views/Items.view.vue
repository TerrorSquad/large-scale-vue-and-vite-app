<template>
  <div>
    <ItemsListComponent :items="items"
                        :loading="loading"
                        @selectItem="onSelectItem"
    />
  </div>
</template>

<script lang="ts"
        setup>
import {computed, onMounted} from 'vue'
import ItemsListComponent from '@/components/items/ItemsList.component.vue'
import {useAppStore} from '@/store'
import {ItemInterface} from '@/models'


const {itemsStore} = useAppStore()
const {actions: itemsStoreActions} = itemsStore
// computed:
const items = computed((): ItemInterface[] => {
  return itemsStore.getters.items
})
const loading = computed((): boolean => {
  return itemsStore.getters.loading
})
// methods:
const onSelectItem = async (id: number) => {
// always await store actions because they are async
  await itemsStoreActions.toggleItemSelected(id)
}
// lifecycle event handlers:
onMounted(async () => {
// always await store actions because they are async
  await itemsStoreActions.loadItems()
})
</script>
