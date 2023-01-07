import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: "dist",
    // 9月更新
    assetsDir: "assets", //指定静态资源存放路径
    sourcemap: false, //是否构建source map 文件
    // 10月更新
    chunkSizeWarningLimit: 1500, //chunk 大小警告的限制，默认500KB
    rollupOptions: {
      output: {
        // 最小化拆分包
        manualChunks(id) {
          if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
        chunkFileNames: 'js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名，[name]表示文件名,[hash]表示该文件内容hash值
      }
    },
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      // 10月更新
      output: {
         comments: true, // 去掉注释内容
      },
    },
  }
})
