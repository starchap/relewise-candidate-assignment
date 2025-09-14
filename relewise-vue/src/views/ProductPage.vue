<script setup lang="ts">
import {onMounted, ref} from "vue";

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const { productId } = defineProps<{ productId: string }>();
const status = ref(0)
async function trackProductView() {
  try {
    const userId = localStorage.getItem("userId");
    const res = await fetch(`${apiUrl}/track-product-view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        user: { id: userId },
      }),
    });
    if (!res.ok) {
      status.value = 400;
      console.error("Tracking failed w. status", res.status);
    }else{
      status.value = 200;
    }
  } catch (err) {
    status.value = 500;
    console.error("Failed to track", err);
  }
}

onMounted(trackProductView);
</script>


<template>
  <h1>Product: {{productId}}</h1>
  <div class="status">
    <svg v-if="status > 0" :class="status? 'success': 'failed'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path d="M576 160C576 210.2 516.9 285.1 491.4 315C487.6 319.4 482 321.1 476.9 320L384 320C366.3 320 352 334.3 352 352C352 369.7 366.3 384 384 384L480 384C533 384 576 427 576 480C576 533 533 576 480 576L203.6 576C212.3 566.1 222.9 553.4 233.6 539.2C239.9 530.8 246.4 521.6 252.6 512L480 512C497.7 512 512 497.7 512 480C512 462.3 497.7 448 480 448L384 448C331 448 288 405 288 352C288 299 331 256 384 256L423.8 256C402.8 224.5 384 188.3 384 160C384 107 427 64 480 64C533 64 576 107 576 160zM181.1 553.1C177.3 557.4 173.9 561.2 171 564.4L169.2 566.4L169 566.2C163 570.8 154.4 570.2 149 564.4C123.8 537 64 466.5 64 416C64 363 107 320 160 320C213 320 256 363 256 416C256 446 234.9 483 212.5 513.9C201.8 528.6 190.8 541.9 181.7 552.4L181.1 553.1zM192 416C192 398.3 177.7 384 160 384C142.3 384 128 398.3 128 416C128 433.7 142.3 448 160 448C177.7 448 192 433.7 192 416zM480 192C497.7 192 512 177.7 512 160C512 142.3 497.7 128 480 128C462.3 128 448 142.3 448 160C448 177.7 462.3 192 480 192z"/>
    </svg>
    <p v-if="status > 0 && status === 200">We don’t have all the product data just yet—but hey, the good news is we caught your interest, and that’s a win already!</p>
    <p v-if="status > 0 && status !== 200">Looks like we’ve got zero product data and missed the tracking—double mystery unlocked!</p>
  </div>
  <div class="back-container">
    <a :href="`/`">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z"/>
      </svg>
      Go back
    </a>
  </div>
</template>


<style scoped>
svg{
  fill: white;
  max-height: 270px;
}
.status{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
@keyframes joyful-jump {
  0%   { transform: translateY(0); }
  30%  { transform: translateY(-10px); }
  50%  { transform: translateY(0); }
  70%  { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}
.success{
  fill:#53cf78;
  animation: joyful-jump .6s ease;
}
@keyframes shake {
  0% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
  100% { transform: translateX(0); }
}
.failed{
  fill:#df5b5b;
  animation: shake .6s ease;
}
.back-container{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
}
a{
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0060df;
  text-decoration: none;
  background: white;
  border-radius: 24px;
  font-weight: bold;
  svg{
    height: 24px;
    width: 24px;
    fill: #0060df;
  }
}
p{
  font-size: 1.5em;
}
</style>
