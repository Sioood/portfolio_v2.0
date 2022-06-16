<template @click="console.log(true)">
  <nav>
    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/project">Project</router-link>
    </div>

    <div id="change__mode" @click="changeMode()"></div>
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

  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transitionName">
      <component
        @mouseenter="cursorColor()"
        :cursorColors="cursorColors"
        :is="Component"
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
export default {
  data() {
    return {
      // maybe not white and black for theme mode ? or add another array in changeMode()  ?
      cursorColors: ["green", "red", "white"],
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
  },
  unmounted: function () {
    window.addEventListener("mousemove", () => {
      this.cursor();
    });
  },
  methods: {
    cursorColor() {
      const cursor = document.getElementById("cursor");
      const cursorMask = document.getElementById("cursor--mask");

      const randomNumber = Math.floor(
        Math.random() * (this.cursorColors.length - 0) + 0
      );

      const randomNumberMask = Math.floor(
        Math.random() * (this.cursorColors.length - 0) + 0
      );
      // const cursor = document.getElementById("cursor");
      cursor.style.background = `${this.cursorColors[randomNumber]}`;
      cursorMask.style.background = `${this.cursorColors[randomNumberMask]}`;
    },
    enter() {
      const els = document.querySelectorAll(".page");

      els.forEach((el) => {
        el.classList.add("slide-right");
      });
    },
    cursor() {
      const cursor = document.getElementById("cursor");
      const cursorMask = document.getElementById("cursor--mask");

      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;

      cursorMask.style.left = `${event.clientX}px`;
      cursorMask.style.top = `${event.clientY}px`;
    },
    changeMode() {
      /**
       * Get ":root" CSS Element in JS
       */
      const root = document.querySelector(":root");
      root.classList.toggle("light");

      console.log(root.classList.contains("light"));

      /**
       * Change colors list of cursor for non same colors of background
       */

      return root.classList.contains("light")
        ? (this.cursorColors = ["green", "red", "black"])
        : (this.cursorColors = ["green", "red", "white"]);
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
}

#cursor {
  position: fixed;
  width: 16rem;
  height: 35rem;
  background: white;
  border-radius: 50%;
  filter: blur(6rem);
  transform: translate(-50%, -50%) rotate(30deg);
  z-index: -1;
}

#cursor--mask {
  position: fixed;
  width: 6rem;
  height: 15rem;
  background: red;
  border-radius: 50%;
  filter: blur(5rem);
  transform: translate(-20%, -110%) rotate(30deg);
  z-index: -1;
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
      color: #2c3e50;
    }
    a.router-link-exact-active {
      color: #42b983;
    }
  }
  #change__mode {
    width: 2rem;
    height: 2rem;
    background: var($--main-color);
    box-shadow: 0 0 1rem 0 var($--secondary-color);
    border-radius: 30%;
    cursor: pointer;
    transition: box-shadow 0.15s ease-in-out;
    &:hover {
      box-shadow: 0 0 100rem 55rem var($--secondary-color);
      transition: box-shadow 0.3s ease-in-out;
    }
  }
}

.project {
  position: absolute;
  top: 0;
}

// first animation

.slide-enter-from {
  transform: translate(-100%, 0);
}
.slide-leave-to {
  transform: translate(100%, 0);
  // opacity: 0;
}

//second

.slide2-enter-from {
  transform: translate(100%, 0);
}
.slide2-leave-to {
  transform: translate(-100%, 0);
  // opacity: 0;
}

.slide-enter-active,
.slide-leave-active,
.slide2-enter-active,
.slide2-leave-active {
  transition: transform 0.5s ease-in;
  // transition: opacity 1s ease-in-out;
}

.slide-right {
  transform: translate(-100%, 0);
  transition: all 5s ease-in;
}

.slide-left {
  transform: translate(100%, 0);
  transition: all 5s ease-in;
}

// .slide-right,
// .slide-left {
//   // opacity: 0;
//   transition: transform 10s ease-in;
// }

.slide {
  transition: all 5s ease-in;
}
</style>
