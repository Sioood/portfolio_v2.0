<template>
  <main class="page links__page">
    <div class="links__page__container">
      <img
        class="links__page__container__img"
        src="@/assets/img/logo.svg"
        alt="logo siod théo dupont"
      />
    </div>
    <h5 class="links__page__tag">@Siod</h5>
    <div class="links__page__wrapper">
      <Button
        data-splitbee-event="Links Mail"
        text="theodupontpro@gmail.com"
        type="main"
        :router="false"
        link="mailto:theodupontpro@gmail.com?subject=Contact&body="
      />

      <Button
        data-splitbee-event="Links Portfolio"
        text="Portfolio"
        type="main"
        :router="true"
        link="/"
      />
      <Button
        data-splitbee-event="Links Instagram"
        text="Instagram"
        type="main"
        :router="true"
        link="https://www.instagram.com/sioooood/"
      />

      <Button
        data-splitbee-event="Links Twitter"
        text="Twitter"
        type="main"
        :router="true"
        link="/"
      />
      <Button
        data-splitbee-event="Links Github"
        text="Github"
        type="main"
        :router="true"
        link="https://github.com/Sioood"
      />
      <Button
        data-splitbee-event="Links 99REFERENCE"
        text="99REFERENCE"
        type="main"
        :router="false"
        link="https://99reference.fr"
      />
    </div>
  </main>
</template>

<script>
// import router from "@/router";
import Button from "@/components/ButtonsComp.vue";

export default {
  name: "LinksView",
  components: {
    Button,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "@/scss/_utils.scss";

.links__page {
  margin: 5rem 0;
  width: 100vw;
  min-height: 100vh;
  @extend %flex-center;
  flex-direction: column;
  gap: 1rem;
  &__container {
    padding: 2rem;
    width: 10rem;
    height: 10rem;
    @extend %flex-center;
    background: white;
    outline: 2px solid black;
    border-radius: 50rem;
    &__img {
      object-fit: contain;
    }
  }
  &__tag {
    font-style: italic;
  }
  &__wrapper {
    @extend %flex-center;
    flex-direction: column;
    gap: 1.5rem;
  }
}

.button {
  width: 100%;
  @extend %flex-center;
}

@media screen and (max-width: 425px) {
  .button {
    padding: 0.4rem 0;
    width: 90vw !important;
  }
}
</style>
