<template>
  <div style="position: relative; height: 100%">
    <div class="h-40 grid place-content-center">
      <h1 class="text-center text-6xl">
        {{ getAvg | currency }}
        <span class="text-xl"
          >/
          <a-icon :component="diamondLinear" style="vertical-align: 0"></a-icon
        ></span>
      </h1>
    </div>
    <a-table
      :columns="columns"
      :data-source="mobilelegends.assets"
      class="mx-6"
      row-key="id"
      style="overflow-x: auto"
      bordered
    >
      <template
        v-for="col in ['diamond', 'price', 'source', 'note']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChange(e.target.value, record.id, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="action" slot-scope="text, record">
        <div>
          <span v-if="record.editable">
            <a-button @click="save(record.id)">Save</a-button>
            <a-popconfirm
              title="Sure to cancel?"
              @confirm="() => cancel(record.id)"
            >
              <a-button>Cancel</a-button>
            </a-popconfirm>
          </span>
          <span v-else>
            <a-button :disabled="editingKey !== ''" @click="edit(record.id)"
              >Edit</a-button
            >
            <a-popconfirm
              title="Sure to delete?"
              @confirm="onDelete(record.id)"
            >
              <a-button type="danger">Delete</a-button>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>
    <a-button
      shape="round"
      size="large"
      style="position: fixed; bottom: 20px; right: 20px; z-index: 20"
      @click="visible = true"
      ><a-icon :component="plus" style="vertical-align: 0.12em"></a-icon>
      Insert</a-button
    >
    <mobile-legends-form v-model="visible"></mobile-legends-form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { plus, diamondLinear } from '@/components/icons'
import MobileLegendsForm from '@/components/game/mobile-legends-form'

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
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
          title: 'Diamond',
          dataIndex: 'diamond',
          key: 'diamond',
          scopedSlots: { customRender: 'diamond' },
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          scopedSlots: { customRender: 'price' },
        },
        {
          title: 'Source',
          dataIndex: 'source',
          key: 'source',
          scopedSlots: { customRender: 'source' },
        },
        {
          title: 'Note',
          dataIndex: 'note',
          key: 'note',
          scopedSlots: { customRender: 'note' },
        },
        {
          title: 'Action',
          dataIndex: 'action',
          width: '20%',
          scopedSlots: { customRender: 'action' },
        },
      ],
      visible: false,
      editingKey: '',
    }
  },
  computed: {
    ...mapState(['mobilelegends']),
    ...mapGetters('mobilelegends', ['getAvg']),
  },
  mounted() {
    this.$store.commit('mobilelegends/SET_INITIAL')
  },
  methods: {
    onDelete(id) {
      this.$store.commit('mobilelegends/DEL_ASSET', id)
    },
    handleChange(value, id, column) {
      const newData = JSON.parse(JSON.stringify(this.mobilelegends.assets))
      const target = newData.filter((a) => id === a.id)[0]
      if (target) {
        target[column] = value
        this.$store.commit('mobilelegends/SET_ASSETS', newData)
      }
    },
    edit(id) {
      const newData = JSON.parse(JSON.stringify(this.mobilelegends.assets))
      const target = newData.filter((a) => id === a.id)[0]
      this.editingKey = id
      if (target) {
        target.editable = true
        this.$store.commit('mobilelegends/SET_ASSETS', newData)
      }
    },
    save(id) {
      const newData = JSON.parse(JSON.stringify(this.mobilelegends.assets))
      const newCacheData = [...this.mobilelegends.cache]
      const target = newData.filter((a) => id === a.id)[0]
      const targetCache = newCacheData.filter((a) => id === a.id)[0]
      if (target && targetCache) {
        delete target.editable
        this.$store.commit('mobilelegends/SET_ASSETS', newData)
        Object.assign(targetCache, target)
        this.$store.commit('mobilelegends/SET_CACHE', newCacheData)
      }
      this.editingKey = ''
    },
    cancel(id) {
      const newData = JSON.parse(JSON.stringify(this.mobilelegends.assets))
      const target = newData.filter((a) => id === a.id)[0]
      this.editingKey = ''
      if (target) {
        Object.assign(
          target,
          this.mobilelegends.cache.filter((a) => id === a.id)[0]
        )
        delete target.editable
        this.$store.commit('mobilelegends/SET_ASSETS', newData)
      }
    },
  },
}
</script>
