<template>
  <div class="projects layout-wrapper">
    <h1>Titulo</h1>
    <section v-if="categories.length" class="categories-container">
      <!-- planta asfáltica (project but with category view) -->
      <!-- other categories -->
      <NuxtLink v-for="category in categories" :key="category.id" :to="`/trabajos/${category.id}`">
        <ProjectCategory
          :category="category"
        />
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import GET_CATEGORIES from '~~/graphql/getCategories'

const T = 'page.projects'

const graphql = useStrapiGraphQL()

const categories = ref<Category[]>([])
const asphaltProject = ref<Project>()

const { data  } = await useAsyncData<CategoriesResponse>('categories', () => graphql(GET_CATEGORIES('es')))

if (data.value) {
  categories.value = data.value.data.categories.data
  asphaltProject.value = data.value.data.projects.data[0]
}

//  *** SEO ***
</script>

<style lang="scss">
.projects {
  .container-no-works {
    width: 200px;
    height: 180px;
    background-color: white;

    p {
      text-align: center;
    }

    @media only screen and (min-width: 900px) {
      width: 800px;
    }
  }

  .categories-container {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    gap: 24px;
    row-gap: 80px;
    justify-content: center;

    @media only screen and (min-width: 900px) {
      grid-template-rows: unset;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .asphalt-link {
    width: fit-content;
  }

  .subcategories-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 40px;
    font-weight: 700;

    @media only screen and (min-width: 900px) {
      margin-bottom: 80px;
    }

    .subcategory {
      display: inline-block;
      padding: 12px;
      cursor: pointer;
      user-select: none;

      &.selected {
        color: var(--gray-500);
        cursor: default;
        background-color: var(--main-color);
      }
    }
  }

  .projects-container {
    display: flex;
    flex-wrap: wrap;
    row-gap: 64px;
    column-gap: 24px;
    justify-content: center;

    @media only screen and (min-width: 900px) {
      row-gap: 80px;
    }
  }
}
</style>
