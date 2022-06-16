<template>
  <button v-if="!link" :class="'link button  button--' + type">{{ text }}</button>
  <a v-else target="_blank" :href="link" :class="'link button  button--' + type">{{
    text
  }}</a>
</template>

<script>
export default {
  name: "ButtonsComp",
  props: ["type", "text", "link"],
};
</script>

<style lang="scss">
@import "@/scss/_utils.scss";

.button {
  all: unset;
  padding: 0.4375rem 1.5625rem;
  cursor: pointer;
  &:hover {
    background: radial-gradient(
      72.52% 98.08% at 49.63% 100%,
      var($--secondary-color) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
  }
  &:active {
    background: var($--secondary-color);
  }
  &--main {
    border: 1px solid var($--secondary-color);
  }
  &--third {
    padding: 0.2rem;
    border-bottom: 1px solid var($--secondary-color);
  }
}
</style>
