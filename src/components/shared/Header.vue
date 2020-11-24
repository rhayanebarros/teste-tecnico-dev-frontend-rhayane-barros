<template>
  <div class="header">
    <div class="header__content">
      <slot name="header-home"></slot>
      <slot name="header-question"></slot>
      <slot name="header-result"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header {
    background-color: $header;
    height: 56px;
    width: 100%;

    &__title {
      font-family: $font;
      font-weight: $semi-bold;
      font-size: 18px;
      color: $white;
      padding: 18px 25px;

      @include above(md) {
        padding: 20px 40px;
      }

      @include above(lg) {
        padding: 20px 0;
        max-width: 600px;
        width: 100%;
        margin: 0 auto;
      }
    }
  }
</style>
