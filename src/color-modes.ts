
export const getStoredTheme = () => localStorage.getItem('theme');
export const setStoredTheme = (theme: string) => localStorage.setItem('theme', theme);

export const getPreferredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
      return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const setTheme = (theme: string) => {
  if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
  }
}

export const showActiveTheme = (theme: string, focus = false) => {
  const themeSwitcher: HTMLElement = document.querySelector('#bd-theme')!

  if (!themeSwitcher) {
    return
  }

  const themeSwitcherText = document.querySelector('#bd-theme-text')
  const activeThemeIcon = document.querySelector('.theme-icon-active use')
  const btnToActive = document.querySelector<HTMLElement>(`[data-bs-theme-value="${theme}"]`)!
  const svgOfActiveBtn = btnToActive.querySelector('svg use')!.getAttribute('href')

  document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
    element.classList.remove('active')
    element.setAttribute('aria-pressed', 'false')
  })

  btnToActive.classList.add('active')
  btnToActive.setAttribute('aria-pressed', 'true')
  activeThemeIcon!.setAttribute('href', svgOfActiveBtn!)
  const themeSwitcherLabel = `${themeSwitcherText!.textContent} (${btnToActive.dataset.bsThemeValue})`
  themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

  if (focus) {
    themeSwitcher.focus()
  }
}

export function colorModeInit() {
  setTheme(getPreferredTheme());

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle!.getAttribute('data-bs-theme-value')
          setStoredTheme(theme!)
          setTheme(theme!)
          showActiveTheme(theme!, true)
        })
      })
  })
}
