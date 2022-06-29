<template @click="console.log(true)">
  <nav>
    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/project/1">Project</router-link>
    </div>

    <div class="change__mode" @click="changeMode">
      <img src="@/assets/img/half-moon.svg" alt="" />
      <div class="sun"></div>
    </div>
  </nav>

  <!-- <router-view v-slot="{ Component }">
    <transition name="slide" @beforeLeave="beforeLeave">
      <component
        @mouseenter="cursorColor()"
        :cursorColors="cursorColors"
        :is="Component"
      />
    </transition>
  </router-view> -->

  <!-- classic -->

  <!-- <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transitionName" mode="out-in">
      <component
        :key="$route.params.id"
        @mouseenter="cursorColor()"
        :cursorColors="cursorColors"
        :is="Component"
        v-on:cursorColor="cursorColor()"
        :projects="projects"
      />
    </transition>
  </router-view> -->

  <!-- try to deal with different animation for index project previous and next -->

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

  <!-- <router-view v-slot="{ Component, route }">
    <transition
      :enter-active-class="route.meta.enterClass"
      :leave-active-class="route.meta.leaveClass"
    >
      <component
        @mouseenter="cursorColor()"
        :cursorColors="cursorColors"
        :is="Component"
      />
    </transition>
  </router-view> -->
</template>

<script>
import Projects from "@/assets/projects.json";

export default {
  data() {
    return {
      // maybe not white and black for theme mode ? or add another array in changeMode()  ?
      cursorColors: [
        ["#18ff00", "#4044e9", "#f27121"],
        ["#47a173", "#c7fb7c", "#1b4bf4"],
        ["#1874ba", "#feffab", "#c41c86"],
      ],
      projects: Projects,
      index: 0,
      transitionName: "slide",
    };
  },
  mounted: function () {
    window.addEventListener("mousemove", () => {
      this.cursor();
    });
    window.addEventListener("scroll", () => {
      var height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight
        // html.clientHeight,
        // document.body.html.scrollHeight,
        // document.body.html.offsetHeight
      );
      console.log(height);
      console.log(window.scrollY);
    });
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
          this.index = null;
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
        } else {
          this.transitionName = this.$route.meta.transitionName;
        }

        this.index = this.$route.params.id;
      },
    },
  },
  methods: {
    cursor() {
      const cursor = document.getElementById("cursor");

      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;

      const links = document.querySelectorAll(".link");

      links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          cursor.classList.add("cursor--link");
        });

        link.addEventListener("mouseleave", () => {
          cursor.classList.remove("cursor--link");
        });
      });
    },
    cursorColor() {
      // console.log("enter");
      // maybe make an array with object which contain main color and second color for better associations
      const cursor = document.getElementById("cursor");

      const randomColor = Math.floor(
        Math.random() * (this.cursorColors.length - 0) + 0
      );

      const randomAngle = Math.floor(Math.random() * (360 - 0) + 0);

      // cursor.style.background = `${this.cursorColors[randomNumber]}`;
      // maybe 2 colors is better
      cursor.style.background = `linear-gradient(${randomAngle}deg, ${this.cursorColors[randomColor][0]} 0%, ${this.cursorColors[randomColor][1]} 50%, ${this.cursorColors[randomColor][2]} 100%)`;

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

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: Avenir, $aileron;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @extend %flex-center;
  flex-direction: column;
  color: var($--secondary-color);
  overflow: hidden;
}

.cursor {
  position: fixed;
  width: 16rem;
  height: 25rem;
  background: white;
  border-radius: 50%;
  filter: blur(6rem);
  // transform: translate(-50%, -50%) rotate(30deg);
  transition: background 1s ease-in-out, width 0.7s ease, height 0.5s ease;
  z-index: -666;
  &--link {
    width: 0;
    height: 0;
  }
  animation: shape 25s linear infinite alternate-reverse;

  @keyframes shape {
    0% {
      transform: translate(-50%, -50%) scale(80%, 50%) rotate(30deg);
    }
    50% {
      transform: translate(-50%, -50%) scale(60%, 100%) rotate(90deg);
    }
    100% {
      transform: translate(-50%, -50%) scale(90%, 70%) rotate(60deg);
    }
  }
}

// .cursor--mask {
//   position: fixed;
//   width: 6rem;
//   height: 15rem;
//   background: red;
//   border-radius: 50%;
//   filter: blur(5rem);
//   transform: translate(-20%, -110%) rotate(30deg);
//   transition: background 1s ease-in-out, width 0.7s ease, height 0.5s ease;

//   // transition: background 1s ease-in-out, top 0.1s linear, left 0.1s linear,
//   //   width 0.7s ease, height 0.5s ease;
//   z-index: -1;
//   &--link {
//     width: 0;
//     height: 0;
//   }
// }

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
</style>
