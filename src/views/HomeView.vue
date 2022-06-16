<template>
  <div @scroll="easterEgg()" class="page home">
    <section class="home" @mouseenter="$emit('cursorColor')">
      <h1>Théo Dupont, Graphiste et Développeur Frontend</h1>
      <!-- <h6 class="home__caption">
        Toujours en recherche de progression, je laisse trainer ma curisioté
        dans tous les domaines.
      </h6> -->
      <h6 class="home__caption">
        Toujours en recherche de progression, je laisse trainer ma
        <mark>curisioté</mark>
        dans tous les domaines.
      </h6>
    </section>
    <section
      class="contact"
      @mouseenter="$emit('cursorColor')"
      id="egg--trigger"
      @click="easterEgg()"
    >
      <div class="wrapper__email">
        <h1 class="email">
          theodupontpro@ <br />
          gmail.com
          <Button
            id="send__mail"
            text="→ send me a message"
            type="secondary"
            link="mailto:theodupontpro@gmail.com?subject=Contact&body="
          />
        </h1>
      </div>
      <footer>
        <h6 class="copyright">©2022</h6>
        <ul class="links">
          <li>
            <Button
              text="github, "
              type="third"
              link="https://github.com/Sioood"
            />
            <Button
              text="instagram, "
              type="third"
              link="https://www.instagram.com/sioooood/"
            />
            <Button
              text="twitter."
              type="third"
              link="https://twitter.com/Siooooood"
            />
          </li>
        </ul>
        <h6 class="end__message">
          Made by myself with figma, vue.js, scss and more...
        </h6>
      </footer>
    </section>
  </div>
</template>

<script>
import Button from "@/components/ButtonsComp.vue";

export default {
  name: "HomeView",
  components: {
    Button,
  },
  props: ["cursorColors"],
  methods: {
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
// @import "@/scss/style.scss";
@import "@/scss/_utils.scss";

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
    color: var($--main-color);
  }
}

.contact {
  position: relative;
  .wrapper__email {
    width: 77%;
    .email {
      position: relative;
      text-align: left;
      text-transform: uppercase;
      #send__mail {
        position: absolute;
        top: 65%;
        right: 30%;
        font-family: $aileron;
        font-size: 1rem;
      }
    }
  }
  footer {
    width: 77%;
    position: absolute;
    @extend %flex-space-between;
    bottom: 1.5rem;
    & > * {
      font-weight: 200;
    }
  }
}

p {
  width: 50vw;
}
</style>
