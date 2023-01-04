<template>
  <div class="project-page">
    <div v-if="project">
      <div class="text-container layout-wrapper">
        <h2 class="uppercase">
          {{ project.attributes.name }}
        </h2>
        <StrapiRichText :data="project.attributes.description" />
      </div>
      <div class="red-block" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GET_PROJECT_BY_SLUG from '@/graphql/getProjectBySlug'

const graphql = useStrapiGraphQL()

const project = ref<Project>(null)

try {
  const response: ProjectResponse = await graphql(GET_PROJECT_BY_SLUG(useRoute().params.projectSlug, 'es'))

  project.value = response.data.projects.data[0]
}
catch (error) {
  // eslint-disable-next-line no-console
  console.error(error)
}

</script>

<style lang="scss">
.project-page {
  .back-link {
    margin-bottom: 30px;
  }

  .carousel {
    @media only screen and (min-width: 900px) {
      margin-bottom: 80px;
    }
  }

  .text-container {
    margin-bottom: 60px;
  }

  .red-block {
    width: 55%;
    max-width: 575px;
    height: 51px;
    background-color: var(--main-color);

    @media only screen and (min-width: 900px) {
      height: 80px;
    }
  }

  .single-image-container {
    margin-bottom: 60px;

    img {
      max-height: 600px;
    }
  }
}
</style>
