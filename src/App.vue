<script lang="ts"
        setup>
import ItemsListComponent from "./components/items/ItemsList.component.vue";
import {reactive} from "vue";


const items = reactive([
  {
    id: 1,
    name: 'Item 1',
    selected: false
  }, {
    id: 2,
    name: 'Item 2',
    selected: false
  }, {
    id: 3,
    name: 'Item 3',
    selected: false
  }
]);

const onSelectItem = (id: number) => {
  const item = items.find(item => item.id === id);
  if (!item) {
    console.warn(`onSelectItem: item with id ${id} not found`);
    return;
  }

  item.selected = !item.selected;
  console.log(`onSelectItem: item with id ${id} is now ${item.selected ? 'selected' : 'unselected'}`);
}
</script>

<template>
  <div class="home">
    <ItemsListComponent :items="items"
                        @select-item="onSelectItem"/>
  </div>
</template>

<style> .home {
  padding: 20px;
}
</style>
