# GNU/Linux Hub - Documentación del Proyecto

## Información General

- **Nombre:** GNU/Linux Hub
- **Tipo:** Single Page Application (SPA)
- **Stack:** HTML5, CSS3, Vanilla JavaScript
- **Estilo:** Minimalista Neón / Terminal Hacker
- **Autor:** TerWorks - DeartDev
- **Año:** 2026

## Estructura del Proyecto

```
/data/data/com.termux/files/home/projects/linux/
├── index.html          # SPA principal con 12 secciones
├── css/
│   └── styles.css      # Estilos con tema claro/oscuro
├── js/
│   └── main.js         # Interactividad completa
└── AGENTS.md           # Esta documentación
```

## Características

### Diseño Visual
- Paleta neón: Cyan (#00ffff), Verde (#00ff88), Dorado (#ffd700), Carmesí (#ff3860)
- Fondo oscuro/claro con variables CSS
- Efectos glow, glassmorphism, animaciones suaves
- Grid overlay animado en Hero
- Tipografías: Inter (sans-serif), Fira Code (monospace)

### Funcionalidades Implementadas

1. **Navegación**
   - Barra horizontal desktop con scrollspy
   - Menú hamburguesa móvil con animación X
   - Smooth scroll entre secciones

2. **Tema**
   - Toggle claro/oscuro con persistencia localStorage
   - Transiciones suaves entre temas

3. **Botones Flotantes**
   - "To Top" (esquina inferior derecha)
   - "Refresh" (esquina inferior izesquina inferior izquierda) - `location.reload(true)`
   - Aparecen al hacer scroll > 300px

4. **Animaciones**
   - Typewriter effect en Hero
   - Fade-in-up al hacer scroll (Intersection Observer)
   - Hover effects glow en tarjetas

5. **Componentes Interactivos**
   - Tabs para categorías de distros
   - Acordeón FAQ
   - Copiar comandos al portapapeles
   - Árbol de distros interactivo

6. **Quiz Interactivo**
   - 6 preguntas para determinar tu distro ideal
   - Sistema de puntuación con 10+ distros
   - Resultado personalizado con alternativas
   - Enlace directo de descarga

## Secciones de la SPA

1. **Hero** - Introducción con typewriter effect
2. **¿Qué es Linux?** - Definición, historia, filosofía
3. **Kernel vs GNU** - Explicación técnica
4. **Árbol de Distros** - Jerarquía visual
5. **Top Distros** - Clasificación por uso (tabs)
6. **Ruta de Aprendizaje** - Roadmap de aprendizaje
7. **Quiz Interactivo** - ¿Qué distro eres?
8. **Entornos de Escritorio** - Comparativa DEs
9. **Casos de Uso** - Aplicaciones prácticas
10. **Comandos Esenciales** - Terminal interactiva
11. **FAQ** - Preguntas frecuentes
12. **Recursos** - Links oficiales
13. **Footer** - Créditos y navegación

## Distros Incluidas

### Familia Debian
- Debian, Ubuntu, Linux Mint, Pop!_OS, Elementary OS, Zorin OS, Kali Linux, Raspberry Pi OS

### Familia Red Hat
- Fedora, RHEL, CentOS Stream, Rocky Linux, AlmaLinux, Oracle Linux

### Familia Arch
- Arch Linux, Manjaro, EndeavourOS, Garuda, ArcoLinux, Artix Linux

### Familia Slackware
- openSUSE (Tumbleweed/Leap), Salix

### Independientes
- Gentoo, Alpine Linux, Void Linux, NixOS

## Entornos de Escritorio Documentados

- GNOME, KDE Plasma, XFCE, MATE, Cinnamon, LXQt
- Window Managers: i3, Sway, Awesome

## Comandos Documentados

### Categorías:
- Navegación: ls, cd, pwd, tree
- Archivos: cp, mv, rm, mkdir, touch
- Permisos: chmod, chown, sudo
- Sistema: ps, top, df, du, free
- Red: ping, ip, curl, wget, ss
- Paquetes: apt, dnf, pacman, snap, flatpak

## Paleta de Colores

### Tema Oscuro (Default)
- `--bg-primary`: #0a0a0a
- `--bg-secondary`: #121212
- `--text-primary`: #e0e0e0
- `--accent-cyan`: #00ffff
- `--accent-green`: #00ff88
- `--accent-gold`: #ffd700
- `--accent-crimson`: #ff3860

### Tema Claro
- `--bg-primary`: #f5f5f5
- `--bg-secondary`: #ffffff
- `--text-primary`: #1a1a1a
- Acentos mantenidos

## APIs y Tecnologías Web Utilizadas

- CSS Custom Properties (Variables)
- Intersection Observer API
- Clipboard API
- localStorage API
- matchMedia API (prefers-color-scheme)
- CSS Grid y Flexbox
- CSS Animations y Transitions

## Accesibilidad

- Skip link para navegación por teclado
- ARIA labels en elementos interactivos
- Contraste de colores compliant
- Focus visible states
- Animaciones respetan prefers-reduced-motion

## Performance

- Carga de fuentes desde Google Fonts con preconnect
- Debounce en event listeners de scroll
- Animaciones GPU-accelerated (transform, opacity)
- Lazy loading implícito con Intersection Observer

## Cómo Usar

1. Abrir `index.html` en cualquier navegador moderno
2. No requiere servidor web (100% cliente)
3. Preferible usar extensión Live Server para desarrollo

## Notas de Desarrollo

- Código vanilla sin frameworks ni librerías externas
- Responsive: Desktop (>1024px), Tablet (768-1024px), Mobile (<768px)
- Compatibilidad: Chrome, Firefox, Safari, Edge (últimas 2 versiones)

## Créditos

- Iconos: Emojis Unicode nativos
- Fuentes: Google Fonts (Inter, Fira Code)
- Inspiración: Estética terminal/hacker

## Licencia

Proyecto educativo - GNU/Linux Hub © 2026 TerWorks - DeartDev