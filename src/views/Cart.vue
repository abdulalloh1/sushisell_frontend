<script lang="ts" setup>
  import { onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/store/parts/auth";
  import { useCartStore } from "@/store/parts/cart";
  import ProductCard from "@/components/WorkSpace/ProductCard/ProductCard.vue";

  const router = useRouter()
  const authStore = useAuthStore()
  const cartStore = useCartStore()

  onMounted(() => {
    if(!authStore.isLoggedIn) return router.push({name: 'Login'})
  })
</script>

<template>
  <div class="page">
    <product-card
        v-for="(product, index) in cartStore.cart.products"
        :key="index"
        :roll="product"
    />
  </div>
</template>