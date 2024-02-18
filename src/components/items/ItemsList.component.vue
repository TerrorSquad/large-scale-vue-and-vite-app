<script lang="ts"
        setup>
import {ItemInterface} from "../../models/items/Item.interface.ts";
// expose a property called items with a default value of a blank array
defineProps<{ items: ItemInterface[] }>()
</script>

<template>
  <div>
    <h3>Items:</h3>
    <ul>
      <li v-for="(item, index) in items"
          :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
