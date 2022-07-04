<template>
  <main class="page project">
    <h2 class="project__title">{{ project.title }}</h2>
    <section
      v-for="section in project.data.section"
      :key="section.content.type"
      class="project__container section"
    >
      <h5
        class="project__container__title"
        data-aos="fade-up"
        data-aos-offset="50"
        data-aos-once="false"
      >
        {{ section.title }}
      </h5>
      <div class="project__container__content">
        <div class="project__container__content__data">
          <div
            v-for="content in section.content"
            :key="content.type"
            class="project__container__content__data__content"
          >
            <p
              v-if="content.type === 'text'"
              class="project__container__content__data__content__text"
              v-html="content.data"
            ></p>
            <div
              v-else-if="content.type === 'img'"
              class="project__container__content__data__content__img"
            >
              <h6 class="project__container__content__data__content__img__alt">
                {{ content.alt + "." }}
              </h6>
              <img
                :src="require('@/assets/img/projects/' + content.data)"
                :alt="content.alt"
              />
            </div>
            <div
              v-else-if="content.type === 'video'"
              class="project__container__content__data__content__video"
            >
              <h6 class="project__container__content__data__content__video__alt">
                {{ content.alt + "." }}
              </h6>
              <video
                loading="lazy"
                :src="require('@/assets/img/projects/' + content.data)"
                type="video/mp4"
                autoplay=""
                muted=""
                loop=""
                :alt="content.alt"
              ></video>
            </div>
          </div>
        </div>
      </div>

      <h5
        v-if="section.client && section.date"
        class="project__container__date"
        data-aos="fade-up"
        data-aos-offset="50"
        data-aos-once="false"
      >
        {{ section.client + " — " + section.date }}
      </h5>
      <h5
        v-else-if="!section.client && section.date"
        class="project__container__date"
        data-aos="fade-up"
        data-aos-offset="50"
        data-aos-once="false"
      >
        {{ section.date }}
      </h5>
      <h5
        v-else
        class="project__container__date"
        data-aos="fade-up"
        data-aos-offset="50"
        data-aos-once="false"
      >
        {{ section.client }}
      </h5>
    </section>
    <div class="project__nav">
      <!-- <router-link v-if="project.id == 1" to="/">← back to home</router-link> -->
      <Button
        v-if="project.id == 1"
        text="← back to home"
        type="secondary"
        :router="true"
        link="/"
      />
      <!-- <router-link v-else :to="`${project.id - 1}`"
          >← previous project</router-link
        > -->
      <Button
        v-else
        text="← previous project"
        type="secondary"
        :router="true"
        :link="`${project.id - 1}`"
      />
      <!-- <router-link v-if="project.id == projects.length" to="/"
          >back to home →</router-link
        > -->
      <Button
        v-if="project.id == projects.length"
        text="back to home →"
        type="secondary"
        :router="true"
        link="/"
      />
      <!-- <router-link v-else :to="`${project.id + 1}`"
          >next project →</router-link
        > -->
      <Button
        v-else
        text="next project →"
        type="secondary"
        :router="true"
        :link="`${project.id + 1}`"
      />
    </div>
  </main>
</template>

<script>
// import router from "@/router";
import Button from "@/components/ButtonsComp.vue";

export default {
  name: "ProjectView",
  components: {
    Button,
  },
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

a {
  color: var($--accent-color);
  font-weight: 600;
}

.project {
  padding: 5rem 0;
  // width: 100vw;
  // height: auto;
  @extend %flex-center;
  flex-direction: column;
  &__title {
    width: 63%;
    // word-break: break-all;
    font-family: $garcia-marquez;
    font-weight: normal;
    text-align: center;
  }
  &__container {
    position: relative;
    margin-bottom: 3rem;
    width: 63%;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 2rem;
    // & > * {
    //   flex: 1 1 auto !important;
    // }
    // &__title, &__date {
    //   text-transform: uppercase;
    // }
    &__title {
      position: sticky;
      top: 1rem;
      align-self: baseline;
      flex: 1 1 15%;
      text-align: right;
      // white-space: nowrap;
    }
    &__content {
      width: 100%;
      flex: 1 1 50%;
      &__data {
        @extend %flex-center;
        flex-direction: column;
        gap: 2rem;
        &__content {
          width: 100%;
          &__text {
            text-align: justify;
            font-weight: 300;
          }
          &__img, &__video {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: center;
            align-self: center;
            &__alt {
              color: var($--main-color);
              // opacity: 0.4;
              font-style: italic;
              font-weight: 300;
            }
            img, video {
              width: 100%;
            }
          }
        }
      }
    }
    &__date {
      position: sticky;
      top: 1rem;
      flex: 1 1 15%;
      // white-space: nowrap;
    }
  }
  &__nav {
    width: 55%;
    @extend %flex-space-between;
    a {
      color: var($--secondary-color);
    }
  }
}

@media screen and (max-width: 1024px) {
  .project {
    &__container {
      width: 77%;
    }
    &__nav {
      width: 55%;
      @extend %flex-space-between;
      a {
        color: var($--secondary-color);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .project {
    &__container {
      position: relative;
      margin-bottom: 4rem;
      padding-bottom: 1rem;
      flex-direction: column;
      border-bottom: 0.05rem solid white;
      // }
      &__title,
      &__date {
        position: relative;
      }
    }
  }
}

@media screen and (max-width: 640px) {
  .project {
    &__nav {
      width: 90%;
    }
  }
}

@media screen and (max-width: 400px) {
  .project {
    &__nav {
      flex-direction: column;
      gap: 1rem;
      & > a:nth-child(1) {
        transform: translate(-10%, 0);
      }
      & > a:nth-last-child(1) {
        transform: translate(10%, 0);
      }
    }
  }
}
</style>
