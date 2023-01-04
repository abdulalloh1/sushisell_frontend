<script setup lang="ts">
import useToast from "@/components/UI/AppToast/useToast";

const {items} = useToast()
</script>

<template>
  <div class="app-toast">
    <div class="app-toast__items">
      <div
        v-for="item in items"
        :key="item.index"
        :class="['app-toast__item', `app-toast__item--${item.type}`]"
      >
        {{ item.text }} {{item.index}}
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./AppToast.scss" />