<template>
  <div class="projects__cards__card card">
    <a :href="'/project?id=' + project.id" class="card__wrapper">
      <h6 v-if="project.id < 10" class="card__wrapper__index">
        {{ "0" + project.id }}
      </h6>
      <h6 v-else class="card__wrapper__index">{{ project.id }}</h6>
      <h6 class="card__wrapper__title">{{ project.title }}</h6>
      <img
        v-if="project.preview"
        class="card__wrapper__img"
        :src="require('@/assets/img/projects/' + project.preview)"
        alt=""
      />
    </a>
  </div>
</template>

<script>
export default {
  name: "CardComp",
  props: ["project"],
};
</script>

<style lang="scss">
@import "@/scss/_utils.scss";

.card {
  @extend %flex-center;
  // background: rgba(100, 100, 100, 0.4);
  // overflow: hidden;
  &__wrapper {
    position: relative;
    min-width: 200px;
    min-height: 100px;
    // need to set the same max-height on img
    max-height: 70vh;
    @extend %flex-center;
    font-family: $aileron;
    color: var($--secondary-color);
    filter: grayscale(1);
    transition: all 0.5s ease-out;
    // outline: 2px solid;
    &__index {
      position: absolute;
      top: 0;
      left: -2rem;
      font-weight: 300;
    }
    &__title {
      position: absolute;
      top: 0;
      left: 0rem;
      font-weight: 300;
      opacity: 0;
      transition: all 0.5s ease-out;
      z-index: -1;
    }
    &__img {
      width: 100%;
      height: 100%;
      // need to set the same max-height on card parent
      max-height: 70vh;
      object-fit: contain;
    }
    &:hover {
      filter: grayscale(0);
    }
    &:hover > &__title {
      top: -3rem;
      opacity: 1;
    }
  }
}
</style>
