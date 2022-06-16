<template>
  <div @scroll="easterEgg()" class="page home">
    <section @mouseenter="cursorColor()" class="home">
      <h1>Théo Dupont, Graphiste et Développeur Frontend</h1>
      <h6 class="home__caption">
        Toujours en recherche de progression, je laisse trainer ma curisioté
        dans tous les domaines.
      </h6>
      <h6 class="home__caption">
        Toujours en recherche de progression, je laisse trainer ma curisioté
        dans tous les domaines.
      </h6>
    </section>
    <section @mouseenter="cursorColor()" id="egg--trigger" @click="easterEgg()">
      <h1>Other Title</h1>

      <h2>Header 2</h2>
      <p>
        TOUJOURS EN RECHERCHE DE PROGRESSION, JE LAISSE TRAINER MA CURIOSITÉ
        DANS TOUS LES DOMAINES.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  props: ["cursorColors"],
  methods: {
    cursorColor() {
      const randomNumber = Math.floor(
        Math.random() * (this.cursorColors.length - 0) + 0
      );
      const randomNumberMask = Math.floor(
        Math.random() * (this.cursorColors.length - 0) + 0
      );
      const cursor = document.getElementById("cursor");
      const cursorMask = document.getElementById("cursor--mask");
      cursor.style.background = `${this.cursorColors[randomNumber]}`;
      cursorMask.style.background = `${this.cursorColors[randomNumberMask]}`;
    },
    easterEgg() {
      console.log("hello");

      var htmlElement = document.documentElement;
      var bodyElement = document.body;

      var height = Math.max(
        //  <---------------------------- entire document height
        htmlElement.clientHeight,
        htmlElement.scrollHeight,
        htmlElement.offsetHeight,
        bodyElement.scrollHeight,
        bodyElement.offsetHeight
      );

      console.log("entire document height: " + height + "px");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// import only utils ?? light css
@import "@/scss/style.scss";

.home {
  width: 100vw;
  @extend %flex-center;
  flex-direction: column;
}

section {
  width: 100%;
  height: 100vh;
  @extend %flex-center;
  flex-direction: column;
}

h1 {
  font-family: $garcia-marquez;
  font-weight: normal;
  text-align: center;
  // color: transparent;
  // -webkit-text-stroke: 0.3px white;
}

.home {
  &__caption {
    margin: 1rem 0 0 0;
    font-weight: 300;
  }
  &__caption:nth-child(3) {
    margin: 1rem 0 0 0;
    font-weight: 300;
    color: var($--main-color);
  }
}

p {
  width: 50vw;
}
</style>
