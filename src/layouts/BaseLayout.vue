<script setup lang="ts">
import {computed} from "vue";
import UserForm from '@/pages/UserForm/UserForm.vue'
import UserPreview from "@/pages/UserPreview/UserPreview.vue";
import {useUserInfoStore} from "@/stores/UserInfoStore.ts";

const tabComponent = computed(() => useUserInfoStore().tabComponent)
const updateTab = useUserInfoStore().updateTabComponent
</script>

<template>
  <header class="head">
    <img src="@/assets/images/logo.svg"  alt="Logo" class="logo" />
    <div class="head-nav">
      <button :class="tabComponent ? 'head-nav__tab' : 'head-nav__tab active'" @click="updateTab(0)">Форма</button>
      <button :class="tabComponent ? 'head-nav__tab active' : 'head-nav__tab'" @click="updateTab(1)">Превью</button>
    </div>
  </header>
  <main class="main">
    <h4>Персональные данные</h4>
    <KeepAlive>
      <component :is="tabComponent ? UserPreview : UserForm" />
    </KeepAlive>
  </main>
  <footer class="footer">
     <span class="footer__info">all rights reserved</span>
  </footer>
</template>

<style scoped>
.head{
  border-bottom: 2px solid rgba(17, 17, 17, 0.1);
}
.logo{
  position: absolute;
  top: 1.375rem ;
}
.head-nav{
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.75rem 0;
}
.head-nav__tab {
  font-size: 0.875rem ;
  color: rgba(17, 17, 17, 0.48);
}
.head-nav__tab:hover {
  color: rgba(17, 17, 17, 0.67);
}

.active{
  color: rgba(1, 167, 253, 1);
}
.head-nav__tab:active {
  color: rgba(17, 17, 17, 0.82);
}
.main {
  padding: 1.875rem  375px 0;
}
.footer{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 76px;
  background-color: rgba(250, 250, 250, 1);
  position: fixed;
  bottom: 0;
}
.footer__info{
  font-size: 0.875rem ;
  color: rgba(0, 0, 0, 1);
}
</style>
