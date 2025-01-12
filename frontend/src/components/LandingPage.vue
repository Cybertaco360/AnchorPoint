<template>
    <div class="w-full h-dvh bg-zinc-950 text-white">
        <img src="../assets/testingvista.png" class="fixed blur-3xl brightness-50 contrast-200 animate-pulse"/>
        
        <!-- Hero Section -->
        <div class="relative z-10 flex flex-col items-center justify-center h-full max-w-4xl mx-auto text-center px-4">
            <h1 class="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                Accelerate Your Entrepreneurial Journey
            </h1>
            
            <p class="text-xl text-zinc-400 mb-12 max-w-2xl">
                Transform your ideas into reality. Join thousands of entrepreneurs who are building, connecting, and growing their startups with our platform.
            </p>

            <!-- CTA Form -->
            <div class="flex gap-4 w-full max-w-md">
                <Input 
                    class="w-full bg-zinc-900/50 border-zinc-800 focus:border-indigo-500" 
                    type="email" 
                    placeholder="Enter your email"
                />
                <Button @click="login"
                    class="cursor-pointer px-8 py-2 bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200 z-50"  
                    type="submit"
                >
                    Get Started
                </Button>
            </div>

            <!-- Social Proof -->
            <div class="mt-12 text-zinc-400 text-sm">
                <p>Trusted by 1000+ entrepreneurs</p>
                <div class="flex gap-8 mt-4">
                    <span>🏆 98% Success Rate</span>
                    <span>💎 Premium Resources</span>
                    <span>🤝 Active Community</span>
                </div>
            </div>
        </div>

        <!-- Gradient Overlay -->
        <div class="fixed bottom-0 z-20 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent w-full h-[50vh]"></div>
    </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuth0 } from '@auth0/auth0-vue'
const { isAuthenticated, logout, user, loginWithRedirect } = useAuth0()
const login = async () => {
try {
  await loginWithRedirect();
  setTimeout(async () => { // Delay ensures Auth0 state is updated after redirect
    await saveUserToFirestore();
  }, 3000);
} catch (error) {
  console.error("Login Error:", error)
}
}
</script>