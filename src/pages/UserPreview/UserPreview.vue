<script setup lang="ts">
import { useUserInfoStore } from '@/stores/UserInfoStore'
import {computed} from "vue";

 const userData = computed(() => useUserInfoStore().userInfo.data)
 const ageWord = (age: number | string) => {
   const ageStr = age.toString();
   const ageEnding = Number(age) < 20 ? ageStr : ageStr.split('')[ageStr.length - 1];
   switch (ageEnding) {
     case '1':
       return 'год'
     case '2':
     case '3':
     case '4':
       return 'годa'
     default:
       return 'лет'
   }
 }
</script>

<template>
  <h4 v-if="!userData.age">Нет данных</h4>
  <h4 class="user-name" v-show="userData.age">{{userData.name}}, {{userData.age}} {{ ageWord(userData.age) }}</h4>
  <div class="user-children">
    <h4 v-show="userData.children.length">Дети</h4>
    <div class="child-info-wrapper">
      <div v-for="child in userData.children">
        <span class="child-info">{{child.name}}, {{child.age}} {{ ageWord(child.age) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-name{
  font-weight: 700;
}

.child-info-wrapper{
  display: flex;
  flex-direction: column;
  gap: 1.875rem ;
  padding-top: 1.25rem ;
}

.child-info{
  background-color: rgba(241, 241, 241, 1);
  font-weight: 700;
  padding: 0.625rem  1.25rem ;
  border-radius: 5px;
}
</style>
