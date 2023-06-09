import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-vue-markdown'

// https://vitejs.dev/config/
export default defineConfig({

  // ホストからアクセスできるように設定する
  // WSL2上の開発環境でホットリロードが効くようにする
  // base: '/vue-md-store/',
  server: {
    host: true,
    watch: {
      usePolling: true
    }
  },
  
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // <--
    }),
    Markdown()
  ],

})
