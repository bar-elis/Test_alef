<script setup lang="ts">
import { toRef } from 'vue'
 import type { Child } from '@/pages/UserForm/types.ts'

 const props = defineProps<{
   childData: Child;
 }>()

defineEmits<{
   (event: 'remove', id: string): void
   (event: 'changeChildData', value: Child): void
 }>()

 const formData = toRef(props, 'childData')
</script>

<template>
  <div class="user-form-children-wrapper">
    <div class="input-children-wrapper">
      <input
        title="text"
        class="user-form-children"
        :value="props.childData.name"
        @input="(value) => formData.name = value.target?.value"
        @blur="$emit('changeChildData', formData)"
      />
      <label :class="formData.name ? 'title-form-children--active' : 'title-form-children'">Имя</label>
    </div>
    <div class="input-children-wrapper">
      <input
        type="number"
        class="user-form-children"
        :value="props.childData.age"
        @input="(value) => formData.age = value.target?.value < 100? value.target?.value : formData.age"
        @blur="$emit('changeChildData', formData)"
      >
      <label :class="props.childData.age ? 'title-form-children--active' : 'title-form-children'">Возраст</label>
    </div>
    <button class="remove" @click="$emit('remove', childData.id)">Удалить</button>
  </div>
</template>

<style scoped>
.user-form-children-wrapper {
  display: flex;
  gap: 1.125rem ;
  width: 100%;
}
.input-children-wrapper{
  position: relative;
}
.user-form-children{
  height: 56px;
  width: 260px;
  border: 2px solid rgba(241, 241, 241, 1);
  border-radius: 0.25rem ;
  padding: 1.375rem  0 0 1rem ;
  box-sizing: border-box;
  color: rgba(17, 17, 17, 1);
}

.title-form-children{
  position: absolute;
  font-weight: 400;
  top: 1.25rem ;
  left: 1.25rem ;
}
.user-form-children:focus + .title-form-children{
  top: 0.5rem ;
  left: 1rem ;
  color: rgba(17, 17, 17, 0.48);
}
.title-form-children--active  {
  position: absolute;
  top: 0.5rem ;
  left: 1rem ;
  color: rgba(17, 17, 17, 0.48);
}
.remove{
  font-size: 0.875rem ;
  color: rgba(1, 167, 253, 1);
}
</style>
