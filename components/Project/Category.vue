<template>
  <div :class="{'project-category': true, selected}">
    <div class="img-container">
      <StrapiImage :image-formats="category.attributes.cover.data.attributes.formats" />
    </div>
    <div class="background" />
    <div class="hover-background" />
    <h2>
      {{ category.attributes.name }}
    </h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  category: Category
  selected?: boolean
}>()
</script>

<style lang="scss">
.project-category {
  position: relative;
  max-width: 450px;
  aspect-ratio: 414/540;
  clip-path: polygon(0 34px, 34px 0, 100% 0, 100% 100%, 0 100%);
  cursor: pointer;
  user-select: none;

  @media only screen and (min-width: 900px) {
    clip-path: polygon(0 80px, 80px 0, 100% 0, 100% 100%, 0 100%);
  }

  .img-container {
    height: 100%;
  }

  h2 {
    position: absolute;
    bottom: 24px;
    left: 24px;
    margin-bottom: 0;
    color: var(--gray-500);
    text-align: left !important;

    @media only screen and (min-width: 900px) {
      bottom: 48px;
      left: 36px;
    }
  }

  .background {
    position: absolute;
    inset: 0;
    background-color: var(--red-400);
    opacity: 0.6;
    transition: opacity 0.25s;
  }

  .hover-background {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 0;
    background-color: var(--gray-100);
    transition: height 0.25s ease-in-out;
  }

  &:hover,
  &.selected {
    .background {
      opacity: 0.2;
      transition: opacity 0.25s;
    }

    .hover-background {
      height: 120px;
      transition: height 0.25s ease-out;

      @media only screen and (min-width: 900px) {
        height: 220px;
      }
    }
  }
}
</style>
