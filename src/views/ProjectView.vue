<template>
  <div class="page project">
    <h1>Project</h1>
    <section class="project__container">
      <div class="project__container__title">
        {{ project.title }}
      </div>
      <div class="project__container__content">
        {{ project.title }}
      </div>
      <div class="project__container__date">
        {{ project.date }}
      </div>
      <div class="project__container__nav">
        <router-link v-if="project.id == 1" to="/">← back to home</router-link>
        <router-link v-else :to="`${project.id - 1}`"
          >← previous project</router-link
        >
        <router-link v-if="project.id == projects.length" to="/"
          >back to home →</router-link
        >
        <router-link v-else :to="`${project.id + 1}`"
          >next project →</router-link
        >
      </div>
    </section>
  </div>
</template>

<script>
// import router from "@/router";

export default {
  name: "ProjectView",
  props: ["cursorColors", "projects"],
  data() {
    return {
      project: this.projects[this.$route.params.id - 1],
    };
  },
  updated() {
    console.log(this.project.id + " " + this.projects.length);
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        // document.title = to.meta.title || "Théo Dupont";
        this.project = this.projects[this.$route.params.id - 1];
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// import only utils ?? light css
@import "@/scss/_utils.scss";

.project {
  width: 100vw;
  height: 100vh;
  @extend %flex-center;
  flex-direction: column;
  &__container {
    width: 55%;
    &__nav {
      width: 100%;
      @extend %flex-space-between;
      a {
        color: var($--secondary-color);
      }
    }
  }
}

h1 {
  font-family: $garcia-marquez;
  font-weight: normal;
  text-align: center;
}
</style>
