import { defineStore} from "pinia";
import { reactive, ref } from "vue";
import type { UserData } from "@/stores/userData";

export const useUserInfoStore= defineStore(
  "userInfoStore",
  () => {
    const userInfo = reactive<{data: UserData}>({
      data: {
        name: "",
        age: '',
        children: [

        ]
      }
    })
    const tabComponent = ref(0);
    const updateTabComponent = (tab: number) => {
      tabComponent.value = tab
    }

    const saveUserData = (userData: UserData) => {
      userInfo.data = userData
    }

    return {
      userInfo,
      saveUserData,
      tabComponent,
      updateTabComponent,
    }
})
