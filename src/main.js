import { createApp } from 'vue'
import App from './App'
import component  from '@/components/UI';
import router from '@/router/router';
import directives from './directives';
import store from './store';


const app = createApp(App)

component.forEach(component => {
    app.component(component.name, component)
});

// directives.forEach(directive => {
//     app.directive(directive.name, directive)
// });

directives.forEach(directive => {
        app.directive(directive.name, directive)
})


app
    .use(store)
    .use(router)
    .mount('#app')
