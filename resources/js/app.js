import './bootstrap';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

resolvePageComponent(`./pages/${window.currentPageName}.js`, import.meta.glob('./pages/**/*.js')).then((module) => module.default())
