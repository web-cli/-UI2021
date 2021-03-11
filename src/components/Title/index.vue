<template>
  <div>
    <svg
      class="svg iconImg"
      aria-hidden="true"
      :style="iStyle"
    >
      <use :xlink:href="`#icon${icon}`"></use>
    </svg>
    {{ title }}
  </div>
</template>

<script>
// width: 30px;height: 30px;
export default {
  props: ['icon', 'title', 'iconStyle'],
  computed: {
    iStyle() {
      return `${iconStyle || 'width: 30px;height: 30px;'} vertical-align: text-bottom;`
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
