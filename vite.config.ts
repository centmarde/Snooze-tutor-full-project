import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    rollupOptions:{
      input:{
        main:'./src/index.html',
        login:'./src/login.html',
        register:'./src/register.html',
        home:'./src/home.html',
        userProfile:'./src/userProfile.html',
        sets: './src/sets.html',
        accept: './src/accept.html',
        answer: './src/answer.html',
      },
    }
  },
});
