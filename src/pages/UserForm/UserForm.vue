<script setup lang="ts">
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import UserFormChildren from '@/components/userForm/UserFormChildren.vue'
import type { Child } from '@/pages/UserForm/types.ts'
import { useUserInfoStore } from '@/stores/UserInfoStore'

const userName = ref('')
const userAge = ref('')
const countChildren = ref(5)
const children = ref<Child[]>([])
const errorInfo = ref(false)
const userStore = useUserInfoStore()
const updateTab = useUserInfoStore().updateTabComponent

const addChildren = () => {
  countChildren.value -= 1
  const idUser = uuidv4();
  children.value.push({id: idUser, name: '', age: ''})
}

const remove = (id: string) => {
  countChildren.value++
   const indexChildren = children.value.findIndex(el => el.id === id)
   children.value.splice(indexChildren, 1)
}

const changeChild = (child: Child) => {
  children.value.forEach(el => {
    if(el.id === child.id) {
      return child
    }
    return el
  })
}

const createUserData = () => {
  userName.value = ''
  userAge.value = ''
  children.value = []
}

const userDataValidate = () => {
  if(!userName.value || !userAge.value) return false;
  if (!children.value.length) return true;
  return children.value.every((child: Child) => child.name && child.age)
}

const saveUserData = () => {
  const validateForm = userDataValidate()
   if (validateForm) {
     userStore.saveUserData({
       name: userName.value,
       age: userAge.value,
       children: children.value,
     })
     updateTab(1)
     createUserData()
   } else {
     errorInfo.value = true
     setTimeout(() => {
       errorInfo.value = false
     }, 1000)
   }
}

</script>

<template>
  <div class="user-form-wrapper">
    <div class="input-wrapper">
      <input
        type="text"
        class="user-form"
        v-model="userName"
      />
      <label :class="userName ? 'title-form--active' : 'title-form'">ФИО</label>
    </div>
    <div class="input-wrapper">
      <input
        type="number"
        class="user-form"
        v-model="userAge"
      >
      <label :class="userAge ? 'title-form--active' : 'title-form'">Возраст</label>
    </div>
  </div>
  <div>
    <div class="user-children-wrapper">
      <h4>Дети (макс.5)</h4>
      <button
        class="add-children"
        @click="addChildren"
        v-show="countChildren"
      >
           Добавить ребенка
      </button>
    </div>
    <div class="children-list">
       <UserFormChildren
         v-for="item in children"
         :key="item.id"
         @remove="(value: string) => remove(value)"
         :childData="item"
         @changeChildData="(value: Child) => changeChild"
       />
    </div>
    <button class="save" @click="saveUserData">Сохранить</button>
    <div class="info-wrapper" v-if="errorInfo">
      <span class="title-error">Данные не переданы</span>
    </div>
  </div>

</template>

<style scoped>
.user-form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.625rem ;
  margin-bottom: 2.125rem ;
}
.input-wrapper{
   position: relative;
}
.user-form{
  height: 56px;
  border: 2px solid rgba(241, 241, 241, 1);
  border-radius: 0.25rem ;
  padding: 1.375rem  0 0 1rem ;
  width: 100%;
  box-sizing: border-box;
  color: rgba(17, 17, 17, 1);
}

.title-form{
  position: absolute;
  font-weight: 400;
  top: 1.25rem ;
  left: 1.25rem ;
}
.user-form:focus + .title-form{
  top: 0.5rem ;
  left: 1rem ;
  color: rgba(17, 17, 17, 0.48);
}
.title-form--active  {
  position: absolute;
  top: 0.5rem ;
  left: 1rem ;
  color: rgba(17, 17, 17, 0.48);
}

.user-children-wrapper{
  display: flex;
  justify-content: space-between;
}

.add-children {
  position: relative;
  color: rgba(1, 167, 253, 1);
  border: 2px solid rgba(1, 167, 253, 1);
  border-radius: 100px;
  padding: 0.625rem  1.25rem  0.625rem  44px;
  align-self: center;
  height: 44px;
}

.add-children:before{
  content: '+';
  position: absolute;
  left: 1.25rem ;
  line-height: 1.125rem ;
  font-size: 2rem ;
  color: rgba(1, 167, 253, 1);
}

.add-children:hover {
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.5)
}

.add-children:active {
  border-color: rgb(0, 127, 195);
}
.children-list{
  display: flex;
  flex-direction: column;
  gap: 0.625rem ;
  margin-bottom: 1.875rem ;
}
.save{
  background-color: rgba(1, 167, 253, 1);
  color: white;
  width: 118px;
  height: 44px;
  border-radius: 100px;
}
.save:hover {
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.5);
}

.save:active {
  background-color: rgb(0, 146, 220);
}
.info-wrapper{
  padding-top: 1.25rem ;
}
.title-error{
  color: red;
}
</style>
