// store/userStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

export const useUserStore = defineStore('userStore', () => {
    const { user } = useAuth0();
    const userID = ref<string | null>(null);

    const fetchUserID = () => {
        if (user.value) {
            userID.value = user.value.sub; // Set the Auth0 userID
        }
    };

    return { userID, fetchUserID };
});
