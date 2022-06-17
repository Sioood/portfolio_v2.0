<template>
  <div class="page project">
    <section><h1>Project</h1></section>
    {{ project.title }}
  </div>
</template>

<script>
// import router from "@/router";

export default {
  name: "ProjectView",
  props: ["cursorColors", "projects"],
  data() {
    return {
      project: this.projects[this.$route.query.id - 1],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// import only utils ?? light css
@import "@/scss/_utils.scss";

.project {
  width: 100vw;
  height: 200vh;
  @extend %flex-center;
  flex-direction: column;
}

h1 {
  font-family: $garcia-marquez;
  font-weight: normal;
  text-align: center;
}
</style>
