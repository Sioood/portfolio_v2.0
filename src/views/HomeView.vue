<template>
  <div @scroll="easterEgg()" class="page home">
    <section class="baseline section" @mouseenter="$emit('cursorColor')">
      <!-- add <br /> but watch out for responsive in the futur -->
      <h1>
        Théo Dupont, Graphiste et<br />
        Développeur Frontend
      </h1>
      <p class="baseline__caption">
        Toujours en recherche de progression, je laisse trainer ma
        <mark>curiosité</mark>
        dans tous les domaines.
      </p>
      <div class="baseline__bottom">
        <span class="baseline__bottom__line"></span>
        <h6>me décrouvrir</h6>
        <span class="baseline__bottom__line"></span>
      </div>
    </section>
    <section class="me section">
      <img
        class="logo parallax"
        data-parallax="3"
        @mousemove="parallax"
        @mouseleave="resetParallax"
        src="@/assets/img/logo.svg"
        alt=""
        data-aos="fade-down"
      />
      <div class="me__wrapper__text">
        <h2 class="me__wrapper__text__title" data-aos="fade-down">About me</h2>
        <h5 class="me__wrapper__text__caption" data-aos="fade-down">
          Hello! Je suis <em>Théo</em>, Graphiste & Développeur Front-End,
          curieux à plein temps, Enfant d'internet je me sert de celui-ci
          apprendre et comprendre constamment.
        </h5>
        <div class="me__wrapper__text__citation">
          <h4 class="me__wrapper__text__citation__quote" data-aos="fade-down">
            "La laideur se vend mal."
          </h4>
          <h6 class="me__wrapper__text__citation__autor" data-aos="fade-down">
            → Raymond Loewy
          </h6>
        </div>
      </div>
    </section>
    <section class="projects section">
      <h2 class="projects__title" data-aos="fade-down">Projects</h2>
      <div class="projects__cards">
        <Card
          v-for="project in projects"
          :key="project.id"
          :data-id="project.id"
          :project="project"
          data-aos="fade-down"
        />
      </div>
    </section>
    <section
      class="contact section"
      @mouseenter="$emit('cursorColor')"
      id="egg--trigger"
      @click="easterEgg()"
    >
      <div class="wrapper__email">
        <h2 class="email copy" @click="copyEmail()" data-aos="fade-down">
          theodupontpro@gmail.com
        </h2>
        <div class="container__send">
          <Button
            id="send__mail"
            text="→ send me a message"
            type="secondary"
            :router="false"
            link="mailto:theodupontpro@gmail.com?subject=Contact&body="
            data-aos="fade-down"
          />
        </div>
      </div>
      <footer>
        <h6 class="copyright">©2022 Théo Dupont. All rights reserved.</h6>
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
    parallax: function parallax(event) {
      //       document.querySelectorAll(".parallax").forEach((el) => {
      //         const score = el.getAttribute("data-parallax");
      //         const x = (window.innerWidth - e.clientX * score) / 100;
      //         const y = (window.innerWidth - e.clientY * score) / 100;

      //         el.style.transform = `
      //     skewX(${x}deg)
      //     skewY(${x}deg)
      //     translateY(${y}px)
      // `;
      //       });
      const score = event.target.getAttribute("data-parallax");
      const x = (window.innerWidth - event.clientX * score) / 100;
      const y = (window.innerHeight - event.clientY * score) / 50;

      event.target.style.transform = `
    skewX(${x}deg)
    translateY(${y}px)
`;
    },
    resetParallax: function resetParallax(event) {
      event.target.style.transform = `
    skewX(0deg)
    translateY(0px)
`;
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
    emailEnter() {
      const cursorCopy = document.getElementById("cursor__copy");
      cursorCopy.classList.add("cursor__copy--active");
    },
    copyEmail() {
      navigator.clipboard.writeText("theodupontpro@gmail.com");
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

.baseline {
  position: relative;
  height: 100vh;
  h1 {
    font-family: $garcia-marquez;
    text-align: center;
    animation: 0.4s ease-in-out forwards appear;

    @keyframes appear {
      from {
        transform: translate(0, 50%);
      }
      to {
        transform: translate(0, 0);
      }
    }
  }
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
  padding-top: 10rem;
  width: 77%;
  height: 110vh;
  // @extend %flex-center;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  .logo {
    width: 30rem;
    transition: all 0.3s ease-out;
    // &:hover {
    //   transition: all 0s linear;
    // }
  }
  &__wrapper__text {
    padding: 5rem 0 0 0;
    & > * {
      text-align: left;
    }
    &__title {
      margin: 0 0 0 2rem;
      font-family: $garcia-marquez;
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
  margin: 15rem 0 10rem 0;
  // position: relative;
  width: 77%;
  // height: auto;
  @extend %flex-center;
  flex-direction: column;
  font-family: $garcia-marquez;
  text-align: left;
  &__title {
    position: sticky;
    top: 5rem;
    // margin: 0 0 5rem 0;
    font-size: 20vw;
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
  min-height: 100vh;
  .wrapper__email {
    width: 77%;
    @extend %flex-space-between;
    flex-direction: row;
    .email {
      position: relative;
      width: 45%;
      font-family: $garcia-marquez;
      text-align: left;
      text-transform: uppercase;
      word-break: break-all;
      cursor: pointer;
    }
    .container__send {
      padding-top: 7rem;
      flex-grow: 1;
      #send__mail {
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
      flex-wrap: wrap;
    }
  }
}

// p {
//   width: 50vw;
// }

@media screen and (max-width: 1536px) {
  .contact {
    .wrapper__email {
      .email {
        width: 56%;
      }
      .container__send {
        padding-top: 3rem;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .me {
    width: 77%;
    height: auto;
    gap: 2rem;
    .logo {
      padding: 3rem 0 0 0;
      width: 20rem;
    }
    &__wrapper__text {
      padding: 2rem 0 0 0;
    }
  }

  .contact {
    .wrapper__email {
      .email {
        font-size: 4vw;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .baseline {
    padding: 0 10vw;
    h1 {
      text-align: left;
      line-height: 1.2;
    }
  }
  .me {
    flex-direction: column;
    align-items: center;
    .logo {
      padding: 3rem 0 0 0;
      width: 20rem;
    }
    &__wrapper__text {
      padding: 2rem 0 0 0;
    }
  }

  .contact {
    padding-top: 10rem;
    justify-content: space-between;
    gap: 5rem;
    .wrapper__email {
      width: 85%;
      flex-direction: column;
      .email {
        width: 100%;
        font-size: 8.5vw;
      }
      .container__send {
        margin-top: 5rem;
        margin: 2rem 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        padding-top: 0rem;
      }
    }
    footer {
      width: 77%;
      position: absolute;
      @extend %flex-space-between;
      flex-direction: column;
      bottom: 1.5rem;
      & > * {
        font-weight: 200;
      }
      .links {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .me {
    .logo {
      width: 80vw;
    }
  }

  .contact {
    footer {
      .copyright {
        width: 100%;
      }
    }
  }
}
</style>
