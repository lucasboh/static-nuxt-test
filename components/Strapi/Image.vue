<template ref="test">
  <img
    :src="getStrapiMedia(responsiveUrl)"
    :alt="alt || ''"
    format="webp"
    loading="lazy"
    quality="80"
    provider="strapi"
  />
</template>

<script setup lang="ts">
import { getStrapiMedia } from '~~/utils/strapiHelper'

interface ImageFormats {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: null
  size: number
  width: number
  height: number
}

const props = defineProps<{
  imageFormats?: Record<string, ImageFormats>,
  alt?: string,
  url?: string,
  maxSize?: 'thumbnail' | 'small' | 'medium' | 'large' | 'xlarge',
}>()

const viewportWidth = ref<number>()

if (process.client) {
  viewportWidth.value = window.innerWidth
}

// find most appropriate image format, based on width
const responsiveUrl = computed(() => {
  if (!props.imageFormats || Object.keys(props.imageFormats).length === 0) {
    // formats can be null but also empty object
    return props.url
  }

  // sort from smallest to largest, transform (from object) to array
  let imageFormats = Object.values(props.imageFormats).sort((a, b) => a.width - b.width)

  if (props.maxSize) {
    let maxSizeIndex

    const maxSize = imageFormats.find((format, index) => {
      maxSizeIndex = index

      return format.name.includes(props.maxSize)
    })

    if (maxSize) {
      imageFormats = imageFormats.slice(0, maxSizeIndex + 1)
    }
  }

  // find the first image format (with a 15% increase, because if viewport is 501px, the 500px wide image should
  // still be used) that is bigger than the viewport width
  const appropriateImageFormat = imageFormats.find(imageFormat => viewportWidth.value <= imageFormat.width * 1.15) ||
    imageFormats[imageFormats.length - 1] // fallback to largest image format

  return appropriateImageFormat.url
})
</script>
