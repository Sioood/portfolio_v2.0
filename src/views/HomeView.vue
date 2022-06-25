<template>
  <div @scroll="easterEgg()" class="page home">
    <section class="baseline" @mouseenter="$emit('cursorColor')">
      <!-- add <br /> but watch out for responsive in the futur -->
      <h1>
        Théo Dupont, Graphiste et<br />
        Développeur Frontend
      </h1>
      <h6 class="baseline__caption">
        Toujours en recherche de progression, je laisse trainer ma
        <mark>curiosité</mark>
        dans tous les domaines.
      </h6>
      <div class="baseline__bottom">
        <span class="baseline__bottom__line"></span>
        <h6>me décrouvrir</h6>
        <span class="baseline__bottom__line"></span>
      </div>
    </section>
    <section class="me">
      <img class="logo" src="@/assets/img/logo.svg" alt="" />
      <div class="me__wrapper__text">
        <h1 class="me__wrapper__text__title">me</h1>
        <p class="me__wrapper__text__caption">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a
          lacinia nisi, ut rhoncus metus. Praesent in quam felis. Vivamus
          fermentum euismod diam, pellentesque convallis felis dignissim ut.
          Mauris facilisis ornare condimentum. Vivamus auctor sapien ac diam
          scelerisque, vel maximus ligula maximus. Aliquam sed euismod mauris.
          In hac habitasse platea dictumst. Sed at congue neque.
        </p>
        <div class="me__wrapper__text__citation">
          <h4 class="me__wrapper__text__citation__quote">
            "La laideur se vend mal."
          </h4>
          <h6 class="me__wrapper__text__citation__autor">→ Raymond Loewy</h6>
        </div>
      </div>
    </section>
    <section class="projects">
      <h2>Projects</h2>
      <div class="projects__cards">
        <Card
          v-for="project in projects"
          :key="project.id"
          :data-id="project.id"
          :project="project"
        />
      </div>
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
            :router="false"
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
              :router="false"
              link="https://github.com/Sioood"
            />
          </li>
          <li>
            <Button
              text="instagram, "
              type="third"
              :router="false"
              link="https://www.instagram.com/sioooood/"
            />
          </li>
          <li>
            <Button
              text="twitter,"
              type="third"
              :router="false"
              link="https://twitter.com/Siooooood"
            />
          </li>
          <li>
            <Button
              text="99REFERENCE."
              type="third"
              :router="false"
              link="https://99reference.fr"
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
import Card from "@/components/CardComp.vue";

export default {
  name: "HomeView",
  components: {
    Button,
    Card,
  },
  props: ["cursorColors", "projects"],
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
  // height: 100vh;
  @extend %flex-center;
  flex-direction: column;
}

h1 {
  font-family: $garcia-marquez;
  text-align: center;
  // color: transparent;
  // -webkit-text-stroke: 0.3px white;
}

.baseline {
  position: relative;
  height: 100vh;
  &__caption {
    margin: 1rem 0 0 0;
    font-weight: 300;
    color: var($--main-color);
  }
  &__bottom {
    width: 95%;
    @extend %flex-center;
    flex-direction: row;
    gap: 1rem;
    position: absolute;
    bottom: 1rem;
    &__line {
      position: relative;
      height: 0.5px;
      background: var($--secondary-color);
      flex: 1;
      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        width: 0.3rem;
        height: 0.3rem;
        background: var($--secondary-color);
        transform: translate(0, -50%);
        clip-path: polygon(0 0, 0 100%, 100% 50%);
        transition: background 1s ease-in-out, color 0.1s ease-in-out;
      }
      &::after {
        left: auto;
        right: 0;
        clip-path: polygon(100% 0, 0 50%, 100% 100%);
      }
    }

    h6 {
      width: auto;
    }
  }
}

.me {
  width: 77%;
  height: 110vh;
  @extend %flex-center;
  flex-direction: row;
  .logo {
    width: 30rem;
  }
  &__wrapper__text {
    padding: 10rem 0 0 0;
    & > * {
      text-align: left;
    }
    &__title {
      margin: 0 0 0 2rem;
    }
    &__caption {
      font-weight: 300;
    }
    &__citation {
      margin: 2rem 0 0 0;
      text-align: right;
      &__quote {
        font-family: $garcia-marquez;
        // font-style: italic;
      }
      &__autor {
        font-style: italic;
      }
    }
  }
}

.projects {
  margin: 15rem 0 1rem 0;
  width: 77%;
  // height: 100%;
  @extend %flex-center;
  flex-direction: column;
  font-family: $garcia-marquez;
  text-align: left;
  h2 {
    margin: 0 0 5rem 0;
    width: 100%;
  }
  &__cards {
    width: 100%;
    @extend %flex-space-between;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 25rem 5rem;
    &__card:nth-child(3n + 0) {
      // background: red;
      flex: 1 1 20vw;
    }
    &__card:nth-child(3n + 1) {
      // background: green;
      flex: 1 1 30vw;
    }
    &__card:nth-child(3n + 2) {
      // background: blue;
      flex: 1 1 25vw;
    }
  }
}

.contact {
  position: relative;
  height: 100vh;
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
    .links {
      @extend %flex-center;
      flex-direction: row;
    }
  }
}

// p {
//   width: 50vw;
// }
</style>
