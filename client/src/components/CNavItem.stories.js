import CNavItem from './CNavItem.vue';
import CIcon from './CIcon.vue';

export default {
  title: "Navigation Item"
}

export const inactive = () => ({
  components: { CNavItem, CIcon },
  template: `<ul><c-nav-item><c-icon>home</c-icon><span>Home</span></c-nav-item></ul>`
})

export const active = () => ({
  components: { CNavItem, CIcon },
  template: `<ul><c-nav-item active><c-icon>home</c-icon><span>Home</span></c-nav-item></ul>`
})


export const list = () => ({
  components: { CNavItem, CIcon },
  template: `
  <ul>
    <c-nav-item>
      <c-icon>home</c-icon>
      <span>Home</span>
    </c-nav-item>
    <c-nav-item active>
      <c-icon>folder</c-icon>
      <span>Folder</span>
    </c-nav-item>
    <c-nav-item>
      <c-icon>info</c-icon>
      <span>Info</span>
    </c-nav-item>
  </ul>`
})
