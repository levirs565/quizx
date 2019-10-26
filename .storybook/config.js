import { configure } from '@storybook/vue';
import '../src/style.css';

configure(require.context('../src', true, /\.stories\.js$/), module);
