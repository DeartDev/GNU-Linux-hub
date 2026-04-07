# 🐧 GNU/Linux Hub

Tu portal definitivo al universo Linux. Desde el primer comando hasta la compilación del kernel.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2026.1.0-00ffff)]()
[![Stack](https://img.shields.io/badge/stack-HTML%20%2F%20CSS%20%2F%20JS-orange)]()

---

## 🌟 Características

### Diseño Visual
- 🎨 Estilo minimalista neón / terminal hacker
- 🌙 Tema claro/oscuro con persistencia
- ✨ Efectos glow, glassmorphism y animaciones suaves
- 📱 100% Responsive (Desktop, Tablet, Mobile)

### Funcionalidades
- 🔘 Navegación horizontal con scrollspy
- 🍔 Menú hamburguesa móvil con animación X
- ⬆️ Botón "To Top" (aparece al hacer scroll)
- 🔄 Botón "Refresh" (limpia caché)
- ⌨️ Effect typewriter en el Hero
- 🎯 **Quiz Interactivo**: Descubre tu distro ideal
- 📋 Copiar comandos al portapapeles
- ❓ FAQ con acordeón interactivo
- 🏷️ Tabs para categorías de distros

---

## 🗂️ Estructura del Proyecto

```
/data/data/com.termux/files/home/projects/linux/
├── index.html          # SPA principal
├── css/
│   └── styles.css      # Estilos completos
├── js/
│   └── main.js         # Interactividad
├── assets/             # Recursos adicionales
├── AGENTS.md           # Documentación para agentes
└── README.md           # Este archivo
```

---

## 🚀 Cómo Usar

### Opción 1: Abrir directamente
```bash
# Simplemente abre el archivo en tu navegador
firefox index.html
# o
chromium index.html
```

### Opción 2: Servidor local (Recomendado)
```bash
# Con Python
python3 -m http.server 8000

# Con PHP
php -S localhost:8000

# Con Node.js (si tienes http-server instalado)
npx http-server
```

Luego visita `http://localhost:8000`

---

## 📚 Contenido

### Secciones
1. **Hero** - Introducción con efecto typewriter
2. **¿Qué es Linux?** - Definición, historia y filosofía
3. **Kernel vs GNU** - Explicación técnica
4. **Árbol de Distros** - Genealogía visual de distribuciones
5. **Top Distros** - Clasificación por uso (Casual/Dev/Servidor/Entusiasta)
6. **Ruta de Aprendizaje** - Roadmap principiante → avanzado
7. **Quiz Interactivo** - ¿Qué distro eres?
8. **Entornos de Escritorio** - Comparativa DEs
9. **Casos de Uso** - Aplicaciones prácticas
10. **Comandos Esenciales** - Terminal interactiva
11. **FAQ** - Preguntas frecuentes
12. **Recursos** - Links oficiales

### Distros Documentadas
- **Familia Debian**: Debian, Ubuntu, Linux Mint, Pop!_OS, Elementary OS, Zorin OS
- **Familia Red Hat**: Fedora, RHEL, CentOS Stream, Rocky Linux, AlmaLinux
- **Familia Arch**: Arch Linux, Manjaro, EndeavourOS, Garuda
- **Familia Slackware**: openSUSE (Tumbleweed/Leap)
- **Independientes**: Gentoo, Alpine, Void, NixOS

---

## 🎨 Paleta de Colores

### Tema Oscuro (Default)
| Variable | Color |
|----------|-------|
| `--bg-primary` | `#0a0a0a` |
| `--accent-cyan` | `#00ffff` |
| `--accent-green` | `#00ff88` |
| `--accent-gold` | `#ffd700` |
| `--accent-crimson` | `#ff3860` |

### Tema Claro
| Variable | Color |
|----------|-------|
| `--bg-primary` | `#f5f5f5` |
| `--bg-secondary` | `#ffffff` |

---

## 🛠️ Tecnologías

- **HTML5** - Semántico y accesible
- **CSS3** - Variables CSS, Grid, Flexbox, Animaciones
- **Vanilla JavaScript** - Sin frameworks ni librerías externas

### APIs Utilizadas
- CSS Custom Properties
- Intersection Observer API
- Clipboard API
- localStorage API
- matchMedia API

---

## 📱 Responsive

| Breakpoint | Ancho | Layout |
|------------|-------|---------|
| Desktop | > 1024px | Nav horizontal, multi-columnas |
| Tablet | 768-1024px | Nav colapsable, 2 columnas |
| Mobile | < 768px | Menú hamburguesa, 1 columna |

---

## 🤝 Contribuir

Este es un proyecto educativo. Si deseas contribuir:

1. Haz fork del repositorio
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

---

## 📄 Licencia

MIT License - © 2026 TerWorks - DeartDev

---

## 🙏 Créditos

- **Inspiración**: Estética terminal/hacker
- **Fuentes**: Inter (Google Fonts), Fira Code (Google Fonts)
- **Iconos**: Emojis Unicode nativos
- **Autor**: TerWorks - DeartDev

---

<div align="center">

🐧 **GNU/Linux Hub** - Tu puerta de entrada al software libre

_2026 - Hecho con 💚 y terminal_

</div>