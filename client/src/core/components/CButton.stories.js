import CButton from './CButton.vue';

export default { title: 'Button' };

function createStory(type, text) {
    return () => ({
      components: {
        CButton
      },
      template: `<c-button type="${type}">${text}</c-button>`
    })
}

export const button = createStory('', "Default")

export const primary = createStory('primary', "Primary")

export const danger = createStory('danger', "Danger")

export const outlined = createStory('outlined', "Outlined")
