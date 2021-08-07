export default { title: "Nav" }

export const inactiveLink = () => 
  `<ul>
    <li class="nav-item">
      <span class="material-icons">home</span>
      <span class="item-title">Home</span>
    </li>
  </ul>`


export const activeLink = () => 
  `<ul>
    <li class="nav-item active">
      <span class="material-icons">home</span>
      <span class="item-title">Home</span>
    </li>
  </ul>`


export const list = () => 
  `<ul>
    <li class="nav-item">
      <span class="material-icons">home</span>
      <span class="item-title">Home</span>
    </li>
    <li class="nav-item active">
      <span class="material-icons">document</span>
      <span class="item-title">Document</span>
    </li>
    <li class="nav-item">
      <span class="material-icons">info</span>
      <span class="item-title">Info</span>
    </li>
  </ul>`
