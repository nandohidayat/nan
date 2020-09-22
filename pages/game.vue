<template>
  <a-layout>
    <a-menu mode="horizontal">
      <a-sub-menu key="diamond">
        <span slot="title"
          ><a-icon :component="diamond" :style="{ fontSize: '20px' }"></a-icon>
          <span>Assets</span></span
        >
        <a-menu-item key="game-mobile-legends">
          <nuxt-link :to="{ name: 'game-mobile-legends' }">
            Mobile Legends
          </nuxt-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>

    <a-layout-content>
      <nuxt-child></nuxt-child>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { diamond } from '@/components/icons'

export default {
  data() {
    return {
      diamond,
    }
  },
}
</script>
