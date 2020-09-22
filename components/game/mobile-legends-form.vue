<template>
  <a-drawer
    :title="`${edit ? 'Edit' : 'New'} Transaction`"
    :width="720"
    :visible="true"
    @close="visible = false"
  ></a-drawer>
</template>

<script>
export default {
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    visible: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
}
</script>
