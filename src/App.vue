<template @click="console.log(true)">
  <nav>
    <div class="links">
      <!-- <router-link to="/">Home</router-link> -->
      <!-- <router-link to="/project/1">Project</router-link> -->
      <a
        v-if="$route.name !== 'home' && $route.name !== 'links'"
        @click="$router.go(-1)"
        class="links__back"
      >
        <span></span><span></span>
      </a>
    </div>

    <div class="change__mode" @click="changeMode">
      <img src="@/assets/img/half-moon.svg" alt="" />
      <div class="sun"></div>
    </div>
  </nav>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName" mode="out-in">
      <component
        :key="$route.params.id"
        @mouseenter="cursorColor()"
        :cursorColors="cursorColors"
        :is="Component"
        v-on:cursorColor="cursorColor()"
        :projects="projects"
      />
    </transition>
  </router-view>
</template>

<script>
import Projects from "@/assets/projects.json";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();
AOS.refresh();

AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 150, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 300, // values from 0 to 3000, with step 50ms
  easing: "ease-out", // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

export default {
  data() {
    return {
      // maybe not white and black for theme mode ? or add another array in changeMode()  ?
      cursorColors: [
        // Purple, Orange
        ["#3B1877", "#DA5A2A"],
        // Marine, Jade
        ["#00203F", "#ADEFD1"],
        // Light blue, orange
        ["#7b9acc", "#F2AA4C"],
        // pink, red
        ["#FAD0C9", "#ed6f63"],
      ],
      projects: Projects,
      index: 0,
      transitionName: "slide",
    };
  },
  mounted: function () {
    /* -------------------------------------------------------------------------- */
    /*          Need to do a property detect safari and display a message         */
    /* -------------------------------------------------------------------------- */
    function logInfo() {
      /* ----------------------- Log Credits in the console ----------------------- */
      console.log(
        "%c%s",
        "border-radius: 6px; padding: 8px; color: #ffffff; background: #e63b3b;",
        "🧑🏻‍💻 Developed by: Théo Dupont — https://theodupont.ga"
      );

      /* -------------------------------------------------------------------------- */
    }
    logInfo();
    window.addEventListener("mousemove", () => {
      this.cursor();
    });
    window.addEventListener("click", () => {
      const cursor = document.getElementById("cursor");

      cursor.classList.remove("cursor--hide");
      cursor.classList.remove("cursor--link");
    });
    window.addEventListener("dblclick", () => {
      const cursor = document.getElementById("cursor");

      cursor.classList.toggle("cursor--scale");
    });
    // window.addEventListener("scroll", () => {
    //   var height = Math.max(
    //     document.body.scrollHeight,
    //     document.body.offsetHeight
    //     // html.clientHeight,
    //     // document.body.html.scrollHeight,
    //     // document.body.html.offsetHeight
    //   );
    //   // console.log(height);
    //   // console.log(window.scrollY);
    // });
    let step = [];
    window.addEventListener("keyup", (event) => {
      if (event.key == "s") {
        step = [];
        step.push(event.key);
      } else if (event.key == "i" && step.includes("s")) {
        step.push(event.key);
      } else if (event.key == "o" && step.includes("i")) {
        step.push(event.key);
      } else if (event.key == "d" && step.includes("o")) {
        step.push(event.key);
      } else if (event.key != "s") {
        return (step = []);
      }

      if (step.length == 4 && step.includes("d")) {
        const root = document.querySelector(":root");
        root.classList.toggle("siod");
        return;
      }
      // console.log(event.keyCode);
      // do something
    });
  },
  unmounted: function () {
    window.addEventListener("mousemove", () => {
      this.cursor();
    });
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        // console.log("transition" + this.transition);
        document.title = to.meta.title || "Théo Dupont";
        // console.log(this.$route.path.split("/")[1]);
        if (
          this.$route.path.split("/")[1] == "project" &&
          this.index > this.$route.params.id
        ) {
          this.transitionName = "slide-back";
          this.index = 0;
        } else if (
          this.$route.path.split("/")[1] == "project" &&
          this.index < this.$route.params.id
        ) {
          // change name of animation
          this.transitionName = "slide";
        } else if (
          this.$route.path == "/" &&
          this.index == this.projects.length
        ) {
          this.transitionName = "slide";
        } else if (this.$route.path == "/" && this.index == undefined) {
          this.transitionName = "";
        } else {
          this.transitionName = this.$route.meta.transitionName;
          this.index = 0;
        }

        this.index = this.$route.params.id;
      },
    },
  },
  methods: {
    cursor() {
      const cursor = document.getElementById("cursor");

      /**
       * Need to make a function like timeout when the mouse don't move hide the cursor after a delay
       * Add And remove a class which play animation after 10s remove and readd the class reset the time
       * no duplication like setTimeout
       */

      cursor.classList.remove("cursor--hide");

      setTimeout(() => {
        cursor.classList.add("cursor--hide");
      }, 1);

      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;

      const cursorCopy = document.getElementById("cursor__copy");

      cursorCopy.style.left = `${event.clientX}px`;
      cursorCopy.style.top = `${event.clientY}px`;

      const links = document.querySelectorAll(".link");

      links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          cursor.classList.add("cursor--link");
        });

        link.addEventListener("mouseleave", () => {
          cursor.classList.remove("cursor--link");
        });
      });

      const sections = document.querySelectorAll(".section");

      sections.forEach((section) => {
        section.addEventListener("mouseenter", () => {
          this.cursorColor();
        });
      });

      const copys = document.querySelectorAll(".copy");

      copys.forEach((copy) => {
        copy.addEventListener("mouseenter", () => {
          cursorCopy.classList.add("cursor__copy--active");
          cursor.classList.add("cursor--link");
        });

        copy.addEventListener("mouseleave", () => {
          cursor.classList.remove("cursor--link");
          cursorCopy.classList.remove("cursor__copy--active");
        });
      });
    },
    cursorColor() {
      // maybe make an array with object which contain main color and second color for better associations
      const cursor = document.getElementById("cursor");

      const randomColor = Math.floor(
        Math.random() * (this.cursorColors.length - 0) + 0
      );

      const randomAngle = Math.floor(Math.random() * (360 - 0) + 0);

      cursor.style.transform = `translate(-50%, -50%) rotate(${randomAngle}deg)`;

      const gradient = document.getElementById("cursor__gradient");

      for (let i = 0; i < gradient.children.length; i++) {
        gradient.children[
          i
        ].style.stopColor = `${this.cursorColors[randomColor][i]}`;
      }

      // emit to children
      this.$emit("cursorColor");
    },
    enter() {
      const els = document.querySelectorAll(".page");

      els.forEach((el) => {
        el.classList.add("slide-right");
      });
    },
    changeMode: function changeMode(event) {
      const button = event.target;
      button.classList.toggle("change__mode--light");
      /**
       * Get ":root" CSS Element in JS
       */
      const root = document.querySelector(":root");

      /**
       * Remove easter theme
       */

      root.classList.remove("siod");

      /**
       * Toggle light theme
       */

      root.classList.toggle("light");

      // console.log(root.classList.contains("light"));

      /**
       * Change colors list of cursor for non same colors of background
       */

      // or maybe pop and push for remove and add only one color ?

      // return root.classList.contains("light")
      //   ? (this.cursorColors = ["green", "red", "black"])
      //   : (this.cursorColors = ["green", "red", "white"]);
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/style.scss";
// @import "@/scss/utils/_variables.scss";

body {
  height: auto;
}

#app {
  width: 100%;
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  @extend %flex-center;
  flex-direction: column;
  color: var($--secondary-color);
}

// display the cursor when the app is build
.cursor,
.cursor__copy {
  display: initial;
}

.cursor {
  position: fixed;
  width: 25rem;
  border-radius: 50%;
  filter: blur(2rem);
  fill: black;
  transition: background 1s ease-in-out, width 0.7s ease, height 0.5s ease;
  transform: translate(-50%, -50%);
  z-index: -666;
  pointer-events: none;
  &--link {
    width: 0;
    height: 0;
  }
  &--hide {
    animation: 10s linear forwards scale;

    @keyframes scale {
      99% {
        width: 25rem;
      }
      100% {
        width: 0;
      }
    }
  }
  &--scale {
    width: 200vw;
  }
}

.cursor__copy {
  display: none;
  position: fixed;
  font-size: 1.3rem;
  font-style: italic;
  font-weight: 400;
  text-transform: uppercase;
  color: var($--secondary-color);
  transform: translate(-75%, -60%);
  pointer-events: none;
  z-index: 1;
  &--active {
    display: block;
  }
}

nav {
  width: 100%;
  @extend %pos-fixed-top-center;
  @extend %flex-space-between;
  gap: 1rem;
  padding: 30px;
  z-index: 1;
  .links {
    @extend %flex-center;
    gap: 1rem;

    a {
      font-weight: bold;
      color: var($--main-color);
    }

    a.router-link-exact-active {
      color: var($--main-color);
    }

    &__back {
      padding: 0.5rem;
      width: 2rem;
      height: 2rem;
      @extend %flex-center;
      flex-direction: column;
      gap: 0.5rem;
      background: var($--main-color);
      border-radius: 40%;
      transition: all 0.3s ease-out;
      cursor: pointer;
      &:hover {
        gap: 0.35rem;
        & > span:nth-child(1) {
          transform: translate(-10%, 0) rotate(-33deg);
        }
      }
      span {
        width: 85%;
        height: 1.2px;
        background: var($--secondary-color);
        transition: all 0.3s ease-out;
        &:nth-last-child(1) {
          transform: translate(-10%, 0) rotate(33deg);
        }
      }
    }
  }
  .change__mode {
    position: relative;
    padding: 0.5rem;
    width: 2rem;
    height: 2rem;
    @extend %flex-center;
    background: var($--main-color);
    box-shadow: 0 0 1rem 0 var($--secondary-color);
    border-radius: 40%;
    cursor: pointer;
    transition: box-shadow 0.15s ease-in-out;
    &:hover {
      box-shadow: 0 0 100rem 55rem var($--secondary-color);
      transition: box-shadow 0.3s ease-in-out;
    }
    &--light {
      img {
        display: none;
      }
      .sun {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1rem;
        height: 1rem;
        background: var($--accent-color);
        border-radius: 100%;
        transform: translate(-50%, -50%);
        pointer-events: none;
      }
    }
    img {
      width: 1rem;
      height: 1rem;
      // fill: var($--accent-color);
      pointer-events: none;
    }
  }
}

.project {
  position: absolute;
  top: 0;
}

// first animation

.slide-back-enter-from {
  transform: translate(-100%, 0);
}
.slide-back-leave-to {
  transform: translate(100%, 0);
  // opacity: 0;
}

//second

.slide-enter-from {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
  // opacity: 0;
}

.slide-back-enter-active,
.slide-back-leave-active,
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
  // transition: opacity 1s ease-in-out;
}

// .slide-right {
//   transform: translate(-100%, 0);
//   transition: all 5s ease-in;
// }

// .slide-left {
//   transform: translate(100%, 0);
//   transition: all 5s ease-in;
// }

// .slide-right,
// .slide-left {
//   // opacity: 0;
//   transition: transform 10s ease-in;
// }

.slide {
  transition: all 5s ease-in;
}

@media screen and (max-width: 768px) {
  nav {
    .change__mode {
      &:hover {
        box-shadow: 0 0 1rem 0 var($--secondary-color);
        transition: box-shadow 0.3s ease-in-out;
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .cursor__copy {
    display: none;
  }
}
</style>
