<template>
  <a-drawer
    :title="`${edit ? 'Edit' : 'New'} Transaction`"
    :width="400"
    :visible="visible"
    @close="visible = false"
  >
    <a-form :form="form" layout="vertical" @submit="handleSubmit">
      <a-form-item label="Diamond">
        <a-input
          v-decorator="[
            'diamond',
            {
              rules: [
                { required: true, message: 'Please input diamond amount' },
              ],
            },
          ]"
          @change="(e) => updateValue(e)"
        ></a-input>
      </a-form-item>
      <a-form-item label="Price">
        <a-input
          v-decorator="[
            'price',
            {
              rules: [
                { required: true, message: 'Please input diamond price' },
              ],
            },
          ]"
          @change="(e) => updateValue(e, true)"
        ></a-input>
      </a-form-item>
      <a-form-item label="Source">
        <a-input v-decorator="['source']"></a-input>
      </a-form-item>
      <a-form-item label="Note">
        <a-textarea v-decorator="['note']"></a-textarea>
      </a-form-item>

      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <h1 class="text-lg">{{ priceperdiamond }}</h1>
        <a-button :style="{ marginRight: '8px' }" @click="visible = false">
          Cancel
        </a-button>
        <a-button type="primary" html-type="submit"> Submit </a-button>
      </div>
    </a-form>
  </a-drawer>
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
  data() {
    return {
      diamond: 0,
      price: 0,
      form: this.$form.createForm(this, { name: 'transaction' }),
    }
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
    priceperdiamond() {
      return this.price / this.diamond || 0
    },
  },
  methods: {
    updateValue(e, price = false) {
      const value = parseInt(e.target.value)
      price ? (this.price = value) : (this.diamond = value)
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.commit('mobilelegends/ADD_ASSET', values)
        }
      })
      this.form.resetFields()
      this.visible = false
    },
  },
}
</script>
