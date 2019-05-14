export default {
  install(Vue) {
    Vue.prototype.notification = {
      push(content, level) {
        if (this.container) {
          this.container.addNotification(content, level);
          return;
        }

        console.log('Container not set');
      }
    };
  }
};
