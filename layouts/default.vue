<template>
  <a-layout style="position: relative">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div
        class="h-full flex items-center"
        @mouseenter="collapsed = false"
        @mouseleave="collapsed = true"
      >
        <a-menu mode="inline" :default-selected-keys="[active]" theme="dark">
          <a-menu-item key="index">
            <nuxt-link :to="{ name: 'index' }">
              <a-icon :component="home" :style="{ fontSize: '20px' }"></a-icon>
              <span>Home</span>
            </nuxt-link>
          </a-menu-item>
          <a-menu-item key="game">
            <nuxt-link :to="{ name: 'game' }">
              <a-icon :component="game" :style="{ fontSize: '20px' }"></a-icon>
              <span>Game</span>
            </nuxt-link>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout class="h-screen">
      <Nuxt />
    </a-layout>
  </a-layout>
</template>

<script>
import { home, game } from '@/components/icons'

export default {
  data() {
    return {
      home,
      game,
      active: undefined,
      collapsed: true,
    }
  },
  created() {
    this.active = this.$route.name
  },
}
</script>
