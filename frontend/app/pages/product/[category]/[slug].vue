<script setup lang="ts">
interface ProductDetail {
  id: number
  category: string
  slug: string
  name: string
  brand_color: string
  logo_url: string | null
  hero_background_url: string | null
  hero_object_url: string | null
  headline: string
  spec_badge: string | null
  tagline: string | null
  tech_title: string | null
  tech_highlight: string | null
  tech_image_url: string | null
  video_url: string | null
  video_title: string | null
  ba_photo_url: string | null
  ba_position: string | null
  ba_name: string | null
  ba_quote: string | null
  benefits_title: string | null
  benefits_highlight: string | null
  techFeatures: { title: string; title_highlight: string | null; description: string }[]
  techBadges: { icon: string; label: string }[]
  benefits: { icon: string; title: string; description: string }[]
}

const route = useRoute()
const category = route.params.category as string
const slug = route.params.slug as string

const { data: res } = await useApi<{ data: ProductDetail }>(`/products/${category}/${slug}`)

if (!res.value?.data) {
  throw createError({ statusCode: 404, statusMessage: 'Produk tidak ditemukan', fatal: true })
}

const product = computed(() => res.value!.data)

useHead(() => ({ title: `MyPertamina | ${product.value.name}` }))
</script>

<template>
  <div>
    <AppHeader />

    <ProductHero
      :name="product.name"
      :brand-color="product.brand_color"
      :logo-url="product.logo_url"
      :hero-background-url="product.hero_background_url"
      :hero-object-url="product.hero_object_url"
      :headline="product.headline"
      :spec-badge="product.spec_badge"
      :tagline="product.tagline"
    />

    <ProductTechnology
      v-if="product.tech_title && product.techFeatures.length"
      :title="product.tech_title"
      :highlight="product.tech_highlight"
      :image-url="product.tech_image_url"
      :features="product.techFeatures"
      :badges="product.techBadges"
      :brand-color="product.brand_color"
    />

    <ProductVideoShowcase v-if="product.video_url" :video-url="product.video_url" :video-title="product.video_title" />

    <ProductBrandAmbassador
      v-if="product.ba_name && product.ba_position && product.ba_quote"
      :photo-url="product.ba_photo_url"
      :position="product.ba_position"
      :name="product.ba_name"
      :quote="product.ba_quote"
      :brand-color="product.brand_color"
    />

    <ProductBenefits
      v-if="product.benefits_title && product.benefits.length"
      :title="product.benefits_title"
      :highlight="product.benefits_highlight"
      :benefits="product.benefits"
      :brand-color="product.brand_color"
    />

    <ProductRelated :current-slug="product.slug" />
  </div>
</template>
