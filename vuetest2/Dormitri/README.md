# Dormitri

Building tools: Vue, Node.js, MongoDB. Built with Vist.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Instruction for developers

In the terminal of the workspace, the "Dormitri" folder, run `npm run dev` to activate the client side running on port 3000. Meanwhile, run server.js with Node.js to activate the server side running on port 4000. You can edit CSS with real-time changes. If changes are in the server side files, please reload server.js. <br />
Construction of our Directory:
```
.
./public
./src
   --/assets
        //For static sources, img/svg/css/...
   --/components
        //For the Vue templates & Javascript services
        *Note: We may need to split Vue templates and JS files in future versions to better distinguish the usage*
   --/emails
        //For email service
   --/items
        //For Mongoose Schemas
   --/routes
        //routers storage. router.js is for client side Multipage Vue-router management; others are designed for the server side data exchange.
   --/views
        //The main pages that router.js are pointing to. Container for the components.
   --/services
        //js files that are used in the .vue templates for various purposes
   App.vue
        // the router-view template. The parent container routing to all subpages which router.js manages.
        *Note: Please note the inherit relationships of CSS files. The style of App.vue will be inherited by all subpages in our current version. For more information, please analyze my current files, or search for more informations. e.g., <style scoped> in Vue.*
   main.js
        // create Vue app.
   server.js
        //Node.js server.
index.html
   //The original HTML file which will be injected by App.vue.
package.json
   //Dependencies.
vite.config.js
   //configuration for Vite.
```
