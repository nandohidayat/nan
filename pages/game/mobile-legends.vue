<template>
  <div style="position: relative; height: 100%">
    <div class="h-40 grid place-content-center">
      <h1 class="text-center text-6xl">
        {{ total | currency }}
        <span class="text-xl"
          >/
          <a-icon :component="diamondLinear" style="vertical-align: 0"></a-icon
        ></span>
      </h1>
    </div>
    <a-table :columns="columns" class="mx-6"></a-table>
    <a-button
      shape="round"
      size="large"
      style="position: fixed; bottom: 20px; right: 20px"
      @click="visible = true"
      ><a-icon :component="plus" style="vertical-align: 0.12em"></a-icon>
      Insert</a-button
    >
    <a-drawer
      title="New Transaction"
      :width="720"
      :visible="visible"
      @close="visible = false"
    ></a-drawer>
    <mobile-legends-form v-model="visible"></mobile-legends-form>
  </div>
</template>

<script>
import { plus, diamondLinear } from '@/components/icons'
import MobileLegendsForm from '@/components/game/mobile-legends-form'

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export default {
  components: {
    MobileLegendsForm,
  },
  filters: {
    currency(val) {
      return formatter.format(val)
    },
  },
  data() {
    return {
      plus,
      diamondLinear,
      columns: [
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Source',
          dataIndex: 'source',
          key: 'source',
        },
        {
          title: 'Note',
          dataIndex: 'note',
          key: 'note',
        },
      ],
      total: 0,
      visible: false,
    }
  },
}
</script>
