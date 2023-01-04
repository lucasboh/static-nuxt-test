<template>
  <div>
    <NuxtLink class="project" :to="`/trabajos/${project.attributes.category.data.id}/${project.attributes.slug}`">
      <div class="project-card">
        <div class="img-container">
          <StrapiImage :image-formats="project.attributes.cover.data.attributes.formats" />
        </div>
        <div class="text-container">
          <h3>{{ project.attributes.name }} </h3>
        </div>
        <AtomLinkWithArrow :to="`/trabajos/${project.attributes.slug}`" label="link" />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{

  project: Project
}>()

const T = 'page.projects'
</script>

<style lang="scss">
  .project {
    display: flex;
    flex: 1;
    flex-direction: column;
    row-gap: 32px;
    margin-top: 40px;

    // min-width: 400px;

    .project-card {
      max-width: 414px;
      aspect-ratio: 414/540;
      margin-bottom: 30px;
      user-select: none;

      .img-container {
        height: 80%;
        overflow: hidden;

        img {
          transition: transform 0.45s ease-in-out;
          transform: scale(1);
        }
      }

      .text-container {
        display: flex;
        align-items: center;
        height: 20%;
        padding: 22px;
        color: var(--gray-500);
        text-transform: uppercase;
        background-color: var(--gray-100);

        @media only screen and (min-width: 900px) {
          padding: 20px 40px;
        }

        h3 {
          margin-bottom: 0;
        }
      }

      &:hover {
        img {
          transition: transform 0.45s ease-in-out;
          transform: scale(1.05);
        }
      }
    }

    .link-with-arrow {
      align-self: flex-end;
      margin-top: 20px;
      margin-left: auto;
    }
  }
</style>
