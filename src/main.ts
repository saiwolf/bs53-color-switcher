import './style.scss'
import * as bootstrap from 'bootstrap';

import { colorModeInit } from './color-modes'

colorModeInit()

document.addEventListener('DOMContentLoaded', () => {
     const popovers = document.querySelectorAll('[data-bs-toggle="popover"]');
     if (popovers && popovers.length > 0) {
          popovers.forEach(popover => {
               new bootstrap.Popover(popover)
          })
     }
})