import { configure } from '@storybook/vue';
import Vue from 'vue';
import '@/router';
import '@/style.css';

configure(require.context('../src', true, /\.stories\.js$/), module);
