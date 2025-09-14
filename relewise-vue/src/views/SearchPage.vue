<script setup lang="ts">
import { ref } from "vue";

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const searchInput = ref<string>("");
const loading = ref<boolean>(false)
const products = ref<Array<{id: string, name: string}>>([])

async function getData(term: string | null | undefined): Promise<void> {
  loading.value = true
  try{
    const userId = localStorage.getItem('userId')
    const res = await fetch(`${apiUrl}/search`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        search: { languageCode: 'da', term },
        user: { id: userId }
      })
    });
    const responseData = await res.json();
    products.value = responseData.products;
  } catch(err){
    console.warn(err)
  } finally
  {
    loading.value = false
  }
}
</script>

<template>
  <h1>Relewise Product Search</h1>
  <div class="search-container">
    <input :disabled="loading" @keyup="(e) => e.code === 'Enter' && getData(searchInput)" v-model="searchInput" type="text" placeholder="Start Searching" />
    <button :disabled="loading" class="search-button" type="button" @click="getData(searchInput)">
      <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/>
      </svg>
      <div v-if="loading" class="spinner"></div>
    </button>
  </div>
  <div v-if="products.length !== 0" class="product-list-container">
    <div class="product-list-container-scroll">
      <a :href="`/product/${product.id}`" class="product-list-item" v-for="product in products" :key="product.id">
        <p>{{product.id}}</p>
        <p class="product-name">{{product.name}}</p>
      </a>
    </div>
  </div>
</template>

<style scoped>
  .product-list-item,
  .search-container{
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .search-container{
    margin-bottom: 24px;
  }
  .product-list-container{
    padding: 12px 6px;
    background: white;
    border-radius: 24px;
    max-height: 50vh;
    overflow: hidden;
    box-sizing: border-box;
    .product-list-container-scroll{
      overflow-y: auto;
      overflow-x: hidden;
      height: inherit;
      max-height: calc(50vh - 24px);
      box-sizing: border-box;
    }
  }
  .product-list-item{
    padding: 12px;
    width: 100%;
    text-decoration: unset;
    background-color: unset;
    border-radius: 24px;
    gap: 12px;
    border-bottom: 1px solid white;
    justify-content: space-between;
    box-sizing: border-box;
    color: black;
    &:last-child{
      border-bottom: none;
    }
    &:hover{
      backdrop-filter: brightness(95%);
    }
    .product-name{
      text-align: right;
    }
  }
  input{
    border: none;
    align-self: stretch;
    padding: 12px;
    border-top-left-radius: 22.5px;
    border-bottom-left-radius: 22.5px;
    transition: all .2s ease-in-out;
    width: 100%;
    &:focus{
      outline: none;
    }
  }
  button{
    cursor: pointer;
    outline: none;
    box-shadow: none;
    border: 0;
  }
  .search-button{
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    align-self: stretch;
    border-top-right-radius: 22.5px;
    border-bottom-right-radius: 22.5px;
  }
  svg{
    height: 24px;
    width: 24px;
  }
  @keyframes spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .spinner {
    height: 24px;
    width: 24px;
    border: 4px solid #ddd;
    border-top-color: #3498db;
    border-radius: 50%;
    box-sizing: border-box;
    animation: spin 0.8s linear infinite;
  }
</style>
