<script lang="ts" setup>
// import a reference to our ItemsView component
import ItemsView from '@/views/Items.view.vue'
import { onMounted } from 'vue'

import { useLocalization } from '@/localization'

const { t, locales, currentLocale, isLoadingLocale, changeLocale } = useLocalization()

const onLocaleClick = (locale: string) => {
  changeLocale(locale)
}

// onMounted is a lifecycle hook that runs when the component is mounted
onMounted(() => {
  changeLocale(currentLocale.value)
})
</script>
<template>
  <div class="home">
    <div class="locale-selector">
      <div v-if="isLoadingLocale">Loading locale data...</div>
      <label
        v-for="item in locales"
        :key="item.key"
        :for="`radio-locale-${item.key}`"
        class="cursor-pointer"
        @click="onLocaleClick(item.key)"
      >
        <input
          :id="`radio-locale-${item.key}`"
          type="radio"
          :radiogroup="currentLocale"
          name="locale"
          :value="item.key"
          :checked="currentLocale === item.key"
        />
        {{ t(`locale.selector.${item.key}`) }}
      </label>
    </div>
    <h3>
      {{ t('home.welcome') }}
      [{{ currentLocale }}]
    </h3>
    <ItemsView />
  </div>
</template>

<style>
.home {
  padding: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 12px;
}
</style>
