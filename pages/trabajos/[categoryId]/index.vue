<template>
  <div class="layout-wrapper category-projects">
    <div v-if="subcategories.length && projects.length">
      <h1>{{ projects[0].attributes.category.data.attributes.name }}</h1>
      <div class="subcategories-container">
        <div
          v-for="subcategory in subcategories"
          :key="subcategory.id"
          class="subcategory secondary uppercase"
          :class="{selected: selectedSubcategory === subcategory.id}"
          @click="handleSubcategorySelection(subcategory.id)"
        >
          {{ subcategory.attributes.name }}
        </div>
      </div>
      <div v-if="filteredProjects.length" class="projects-container">
        <Project v-for="project in filteredProjects" :key="project.id" :project="project" />
      </div>
    </div>
    <div v-else class="container-no-projects">
      <p>no hay trabajos</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import GET_PROJECTS_BY_CATEGORY from '@/graphql/getProjectsByCategory'
const T = 'page.index'

const graphql = useStrapiGraphQL()

const subcategories = ref<Subcategory[]>([])
const projects = ref<Project[]>([])
const { params } = useRoute()

const { data } = await useAsyncData<ProjectsResponse>(`category-${params.categoryId}`, () =>
    graphql(GET_PROJECTS_BY_CATEGORY(params.categoryId, 'es')))

if (data.value) {
  subcategories.value = data.value.data.subcategories.data
  subcategories.value.unshift({ id: 'all', attributes: { name: 'all' } } as Category)

  projects.value = data.value.data.category.data.attributes.projects.data
}

const selectedSubcategory = ref<string>('all')

function handleSubcategorySelection (subcategoryId) {
  selectedSubcategory.value = subcategoryId
}

const filteredProjects = computed(() => {
  if (selectedSubcategory.value === 'all') {
    return projects.value
  }

  return projects.value.filter(project => project.attributes.subcategory.data.id === selectedSubcategory.value)
})
</script>

<style lang="scss">
.category-projects {
  .container-no-projects {
    display: block;
    width: 100%;
    height: 180px;
    padding: 70px;
    margin: auto;
    color: var(--red-300);
    text-align: center;
    background-color: white;

    @media only screen and (min-width: 900px) {
      width: 820px;
      height: 180px;
      padding: 70px;
      margin-bottom: 80px;
    }
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
