# Modernizar el frontend web de HotsData

This ExecPlan is a living document. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` current as work proceeds.

## Purpose / Big Picture

El objetivo es llevar `hotsdata-frontend` desde una SPA React 15 de 2017, construida con Webpack 3, Babel 6, Redux 3, React Router 3 y Node 6, a una aplicacion mantenible con toolchain moderna, rutas claras, pruebas de regresion y una UI responsive para explorar replays, perfiles, comparaciones y uploads.

Al terminar, una persona debe poder entrar a `hotsdata-frontend`, instalar dependencias con una version soportada de Node, ejecutar el servidor de desarrollo, abrir la app, navegar por las rutas principales, ver estados de carga/error razonables, ejecutar pruebas automatizadas y producir un build estatico para deploy.

La modernizacion debe conservar el contrato funcional actual con el API Restify de `../api/server.js`: login, registro, usuario, listado de replays, detalle de replay, busqueda/comparacion de jugadores, informacion de heroes y upload de replays.

## Progress

- [x] 2026-06-25: Inspeccion inicial del repo y del frontend web.
- [x] 2026-06-25: Identificados stack, rutas, dependencias, scripts, env vars, API endpoints y riesgos principales.
- [x] 2026-06-25: Verificado que el build actual no corre en este checkout porque no hay `node_modules`; `npm run build` falla en `rimraf: not found`.
- [x] 2026-06-25: Elegido enfoque de migracion escalonada con Vite, React moderno, React Router moderno y Redux Toolkit/RTK Query.
- [x] 2026-06-25: Ejecutada la fase 0 con matriz de rutas en `docs/frontend-routes.md`, fixtures JSON y pruebas de contrato para helpers de datos.
- [x] 2026-06-25: Ejecutada la fase 1 con Vite, React 19, npm/package-lock, ESLint flat config, Vitest, TypeScript no-emit y servidor Express simplificado para `dist`.
- [x] 2026-06-25: Ejecutada la fase 2 con `src/main.jsx`, `src/app/router.jsx`, hash routes modernas y shell con header/footer responsive.
- [x] 2026-06-25: Ejecutada la fase 3 con `src/api/client.js`, `src/api/authStorage.js`, Redux Toolkit, RTK Query y acceso centralizado al token.
- [x] 2026-06-25: Ejecutada la fase 4 con UI responsive nueva para home, auth, replays, detalle, profile, compare, upload y settings.
- [x] 2026-06-25: Ejecutada parcialmente la fase 5 con Vitest, Testing Library, docs, auditoria npm limpia y smoke visual con Playwright MCP; no se agrego suite Playwright e2e persistente en este PR.

## Surprises & Discoveries

El directorio superior `/home/crorella/Documents/HotsData` contiene multiples repos Git (`hots-parser`, `hotsdata-frontend`, `uploader`, `etl`, `api`, `heroesinfo` y el contenedor superior). Para esta modernizacion, el repo activo es `hotsdata-frontend`; el API relevante esta en el repo hermano `../api`.

`hotsdata-frontend/package.json` declara `engines.node` como `6.11.1`, usa `webpack@3.5.6`, `webpack-dev-server@2.7.1`, `babel-core@6`, `node-sass@4.5.2`, `react@15.4.2`, `react-router@3.0.2`, `redux@3.6.0` y `axios@0.16.1`. Esta combinacion no es razonable de mantener en Node actual.

La maquina actual tiene `node v22.22.2` y `npm 10.9.7`; `yarn` no esta instalado. El directorio `hotsdata-frontend/node_modules` no existe.

`npm run build` en `hotsdata-frontend` falla antes de compilar:

    > kerrigan-frontend@1.0.0 build
    > npm run clean && webpack
    > kerrigan-frontend@1.0.0 clean
    > rimraf dist
    sh: 1: rimraf: not found

La app tiene unas 5.2k lineas de JS y 1.1k lineas de SCSS. Es suficientemente pequena para migrar por superficies funcionales, pero suficientemente acoplada para requerir fixtures y pruebas antes de reemplazar librerias.

`src/router.js` usa `hashHistory` de React Router 3 y define estas rutas visibles: `/`, `/register`, `/signin`, `/contact`, `/about`, `/changelog`, `/upload`, `/replays`, `/replays/:replayId`, `/profile`, `/profile/:toonhandle`, `/profile/heroes`, `/profile/heroes/:hero`, `/players/compare`, `/user-settings`.

`src/containers/GlobalHeroesPage.js` importa `../actions/MapActions`, `../actions/GlobalStatsActions` y `../components/icons/RoleIcon`, que no existen en el checkout. La ruta no esta conectada en `src/router.js`, por lo que parece codigo incompleto o abandonado.

`src/containers/SettingsPage.js` importa `../actions/user_actions`, pero el archivo real es `src/actions/UserActions.js`. Esta pantalla tampoco esta conectada en `src/router.js`.

`src/containers/ReplaysShowPage.js` usa `_.capitalize` pero no importa `lodash`. Si esa pantalla compila bajo el toolchain actual, depende de un global accidental; en una migracion moderna debe fallar y corregirse.

Hay lifecycles legacy de React (`componentWillMount`, `componentWillReceiveProps`) en rutas principales como replay show/index, profile, signin, logout, user settings y profile dropdown.

`src/components/uploader/Uploader.js` muta arrays de estado directamente, usa `react-dropzone@3`, no agrega token de auth al upload y solo registra errores con `console.log`.

La autenticacion guarda JWT en `localStorage` (`src/lib/Auth.js`) y las acciones leen el token manualmente en cada request. Este patron debe centralizarse como primer paso; cambiar a cookies HttpOnly requiere trabajo coordinado con `../api`.

`src/index.html` carga Font Awesome y Google Fonts desde CDN, ademas de Google Analytics clasico `analytics.js` con UA. Esta decision afecta privacidad, CSP, performance y soporte futuro.

`style/style.scss` fija `min-width: 1045px` en `.content`, usa `letter-spacing: -1px` global y fondo full-page con `assets/stormlogs_bg.jpg`; esto explica por que la UI no sera responsive sin redisenar layout y tablas.

Durante la ejecucion, `npm audit --audit-level=moderate` quedo limpio despues de actualizar Vitest a 4.1.9. Antes de esa actualizacion, las vulnerabilidades restantes eran solo de dependencias de desarrollo transitivas de Vitest/Vite.

La comprobacion visual con Playwright MCP encontro dos problemas CSS reales: el boton de menu movil aparecia en desktop por precedencia de `.icon-button`, y el detalle de replay podia expandir horizontalmente la pagina movil por min-content de tablas dentro de grids. Ambos se corrigieron en `src/styles/main.css`.

`server.js` se habia simplificado para servir `dist`, pero eso exige mantener `express` como dependencia de produccion. Se agrego `express@^4.21.2` y `npm audit --omit=dev` siguio reportando 0 vulnerabilidades.

## Decision Log

Decision: Modernizar primero `hotsdata-frontend` como app web separada; tratar `uploader` como proyecto Electron separado.

Rationale: `uploader` tiene su propio repo Git, package, Electron 1.4, Webpack 1 y tests. Mezclarlo con la SPA web multiplicaria el riesgo. La ruta web `/upload` debe conservarse, pero la app Electron necesita un ExecPlan propio si se moderniza.

Date/Author: 2026-06-25 / Codex

Decision: Usar Vite como build tool objetivo y reemplazar Webpack 3/Babel 6/node-sass.

Rationale: La app es una SPA cliente sin SSR. Vite reduce configuracion, soporta dev server moderno, HMR y build estatico. El `sass` moderno reemplaza a `node-sass`, que es el bloqueo mas probable en Node actual.

Date/Author: 2026-06-25 / Codex

Decision: Usar Node 22 LTS/local o una version compatible documentada, y abandonar Node 6.

Rationale: La maquina actual ya tiene Node 22. Vite requiere Node moderno. Mantener Node 6 solo conservaria vulnerabilidades y herramientas obsoletas.

Date/Author: 2026-06-25 / Codex

Decision: Migrar a React moderno en dos pasos de validacion: primero resolver warnings con React 18.3 si se hace upgrade in-place, luego React 19; si se hace port por rutas en Vite, apuntar directo a React 19 y corregir APIs removidas durante el port.

Rationale: La guia oficial de React recomienda React 18.3 como puente para detectar deprecaciones antes de React 19. Como esta app ya requiere reemplazar router/build, un port por rutas puede saltar el runtime intermedio si tiene pruebas y fixtures.

Date/Author: 2026-06-25 / Codex

Decision: Mantener rutas hash inicialmente mediante React Router moderno (`createHashRouter` o equivalente) y posponer URLs limpias hasta que el servidor/deploy se valide.

Rationale: La app actual usa hash routes. Mantener ese contrato evita cambios simultaneos en `server.js`, CDN, Heroku/Procfile o hosting estatico. Browser history puede ser una mejora posterior cuando el deploy este bajo control.

Date/Author: 2026-06-25 / Codex

Decision: Usar Redux Toolkit y RTK Query, no Redux legacy con action constants, reducers manuales y `redux-promise`.

Rationale: La app actual ya piensa en Redux; Redux Toolkit conserva ese modelo pero simplifica store, reducers, async state y cache de API. RTK Query reduce acciones manuales repetitivas alrededor de Axios.

Date/Author: 2026-06-25 / Codex

Decision: Introducir TypeScript de forma incremental, no como condicion para el primer build moderno.

Rationale: El valor inicial esta en obtener build/dev/test moderno y capturar contratos de API. Una conversion obligatoria de todos los archivos a TS en el primer paso aumentaria el riesgo. Se puede empezar con `checkJs`, tipos JSDoc o archivos `*.ts` para API/schemas, y convertir componentes por ruta.

Date/Author: 2026-06-25 / Codex

Decision: Centralizar auth/token en una capa de API cliente; no prometer cookies HttpOnly sin tocar `../api`.

Rationale: El JWT en `localStorage` es un riesgo conocido de XSS, pero cambiar el mecanismo de sesion exige soporte backend. La modernizacion frontend puede eliminar lecturas dispersas y preparar el contrato, pero el cambio seguro completo es cross-repo.

Date/Author: 2026-06-25 / Codex

## Outcomes & Retrospective

La modernizacion inicial quedo implementada como una nueva entrada Vite que no importa el arbol legacy de containers/actions/reducers. Esto permite compilar, testear y servir la SPA moderna sin borrar todavia los archivos antiguos, que quedan disponibles para referencia o limpieza posterior.

La app ahora usa React 19, React Router 7, Redux Toolkit/RTK Query, fixtures con fallback de API, layout responsive y pruebas de contrato. El deploy Node sigue soportado mediante `server.js`, que sirve `dist/index.html` para rutas SPA.

Gaps intencionales: no se agrego una suite Playwright e2e versionada, no se migro la app Electron `../uploader`, y no se cambio el modelo de sesion a cookies HttpOnly porque requiere cambios coordinados con `../api`.

## Context and Orientation

Trabajar desde:

    /home/crorella/Documents/HotsData/hotsdata-frontend

El API hermano que la app consume vive en:

    /home/crorella/Documents/HotsData/api

Archivos clave del frontend actual:

`package.json` contiene scripts antiguos: `clean`, `build`, `start`. `start` ejecuta `webpack-dev-server`; `build` ejecuta `rimraf dist && webpack`.

`.env.example` define:

    PORT=8080
    API_HOST=http://localhost:8080
    NODE_ENV=development

`webpack.config.js` define `devServer.port = 8000`, `entry.bundle = ./src/index.js`, `entry.vendor = ['react', 'redux', 'react-redux', 'react-dom']`, `Dotenv`, `HtmlWebpackPlugin`, `CommonsChunkPlugin` y `DefinePlugin` con `NODE_ENV` hardcodeado a `development`.

`server.js` es un servidor Express simple para servir `dist` en produccion y Webpack middleware en desarrollo. Tiene un bug menor en el log porque usa comillas simples con `${port}`.

`Procfile` ejecuta:

    web: npm run build && node server.js

`src/index.js` crea el store con `createStore`, `redux-promise` y `redux-thunk`, y monta con `ReactDOM.render`.

`src/router.js` usa React Router 3 con `hashHistory`, rutas anidadas y `onEnter={requireAuth}`. Tambien inicializa `react-ga`.

`src/actions/*` contiene llamadas Axios directas contra `process.env.API_HOST`, con tokens `Bearer` leidos desde `localStorage`.

`src/reducers/*` contiene reducers manuales con action constants. `src/reducers/replay_reducer.js` asume que `redux-promise` entrega `action.payload.data`.

`src/components/*` y `src/containers/*` mezclan componentes presentacionales, containers conectados a Redux, tablas de stats, pantallas de auth y upload.

`style/*.scss` contiene estilos globales, colores, nav, formularios, tablas, tabs y upload. Hay SCSS por pantalla bajo `src/components` y `src/containers`.

Endpoints del API actual en `../api/server.js` que el frontend usa o debe preservar:

    GET /list
    GET /replays/:replayID
    GET /heroes
    GET /player/teammates
    GET /player/search/:pattern
    GET /player/heroes/:toonhandle?
    GET /winrates
    GET /hero_info
    GET /patches
    GET /user
    GET /checkReset/:hashkey
    GET /replays/check/:replayId
    POST /login
    POST /upload
    POST /register
    POST /resetRequest/:email
    PUT /user
    PUT /resetPassword/:email/:newpassword

Important terms:

SPA means single-page application: one HTML page where React handles navigation.

Vite is the modern dev/build tool replacing Webpack 3 in this plan.

RTK Query is Redux Toolkit's data fetching layer. It stores request status, cache and errors in Redux without handwritten Axios action/reducer pairs.

MSW means Mock Service Worker. It can mock API responses in tests and local development without changing production code.

## Plan of Work

Fase 0: Baseline reproducible y contratos.

Primero, crear un branch limpio y registrar el estado del frontend actual. Confirmar `git status --short` en `hotsdata-frontend` antes de editar. Documentar la version local de Node/npm y decidir si se usara Node 22 local o `.nvmrc`.

No instalar paquetes antiguos globales ni intentar hacer que Node 6 sea el futuro. Si se necesita reproducir la app legacy para screenshots, usar contenedor o runtime aislado y registrar esa decision. La reproduccion legacy es util, pero no debe bloquear la migracion si las dependencias antiguas no instalan.

Crear una matriz de rutas con "pantalla", "datos requeridos", "auth requerida", "estado vacio", "estado error" y "criterio visual". Guardarla en `docs/frontend-routes.md` o en este ExecPlan bajo `Artifacts and Notes`.

Crear fixtures JSON para las respuestas minimas de API en `src/test/fixtures` o `test/fixtures`: login exitoso, usuario, lista de replays paginada, detalle de replay con dos equipos, hero_info, player/heroes, player/search, teammates y upload exitoso/error. Si el API local puede correr, capturar respuestas reales. Si no, construir fixtures desde los shapes que usa el UI y marcar los campos inferidos.

Agregar una prueba minima de "contrato de transformadores" para `src/lib/MatchSummaryDataTransformer.js`, `src/lib/PlayerHeroDataTransformer.js`, `src/lib/HeroStatsHelpers.js` y `src/lib/TimeUtils.js` antes de reescribirlos.

Fase 1: Toolchain moderna.

Reemplazar el package legacy por un package moderno basado en npm:

    scripts esperados:
      dev: vite --host 127.0.0.1
      build: vite build
      preview: vite preview --host 127.0.0.1
      test: vitest run
      test:watch: vitest
      lint: eslint .
      format: prettier --check .
      typecheck: tsc --noEmit

Agregar `vite.config.ts` o `vite.config.js`, mover/convertir `src/index.html` a `index.html` en la raiz si se sigue la convencion de Vite, y reemplazar `process.env.API_HOST` por `import.meta.env.VITE_API_HOST`.

Reemplazar `node-sass` por `sass`. Mantener SCSS al principio para reducir cambios simultaneos, pero centralizar imports desde un archivo claro como `src/styles/main.scss`.

Eliminar dependencias obsoletas que ya no se usen: `babel-*`, `webpack*`, `rimraf` si no hace falta, `redux-promise`, `react-ga` clasico, `react-router-redux`, `immutability-helper` si se reemplaza por actualizaciones inmutables normales o Immer.

Agregar `.env.example` moderna:

    VITE_API_HOST=http://localhost:8080
    VITE_GA_MEASUREMENT_ID=

Mantener `server.js` solo si el deploy lo necesita para servir `dist`; si se mantiene, simplificarlo para produccion estatica y fallback SPA. No mezclar dev middleware de Webpack en el nuevo servidor.

Fase 2: React y rutas.

Crear un `src/main.jsx` o `src/main.tsx` moderno con `createRoot` desde `react-dom/client`.

Crear `src/app/App.jsx` y `src/app/router.jsx`. Modelar las rutas actuales con React Router moderno. Empezar con hash routing para preservar URLs actuales. Usar componentes de guardia o loaders para auth en lugar de `onEnter`.

Portar rutas por orden de riesgo:

1. Shell, Home, About, Contact, Changelog, Header, Footer y Logo.
2. SignIn, Register, Logout/ProfileDropdown y UserSettings.
3. Replays index.
4. Replay show y tablas.
5. Profile y Profile heroes.
6. Player compare.
7. Upload.

En cada ruta, convertir class components legacy a function components con hooks solo cuando el cambio sea local y probado. No hacer reescrituras esteticas profundas en la misma commit que cambia router/data.

Eliminar o decidir explicitamente sobre `GlobalHeroesPage.js` y `SettingsPage.js`. Si se mantienen, agregar rutas y crear los actions/componentes faltantes. Si no se mantienen, borrarlos despues de confirmar que no hay enlaces ni objetivos de producto.

Fase 3: API, estado y auth.

Crear una capa unica `src/api/client.ts` o `src/api/client.js` que conozca `VITE_API_HOST`, agregue headers de auth, normalice errores y no obligue a cada componente a construir URLs manualmente.

Si se adopta Redux Toolkit:

    src/app/store.ts
    src/features/auth/authSlice.ts
    src/features/replays/replaysApi.ts
    src/features/profile/profileApi.ts
    src/features/heroes/heroesApi.ts
    src/features/playerCompare/playerCompareSlice.ts

Usar RTK Query para endpoints server-backed: `/list`, `/replays/:id`, `/hero_info`, `/player/search`, `/player/heroes`, `/player/teammates`, `/user`, `/upload`.

Mantener estado puramente UI como filtros, tabs, selected hero, selected players y upload progress cerca de cada pantalla, salvo que deba sobrevivir navegacion.

Centralizar auth. Como primer paso, mantener compatibilidad con JWT en storage pero envolverlo en `authStorage`. Quitar `console.log` de tokens y respuestas de login. Como mejora cross-repo posterior, planear cookies HttpOnly en `../api`.

Agregar manejo de errores consistente: estados `loading`, `empty`, `error`, `unauthorized` y `retry` en pantallas de datos. Las paginas no deben asumir que `action.payload.data` existe.

Fase 4: UI, responsive y accesibilidad.

Conservar identidad HotsData y assets reales (`assets/logo-main.*`, roles, `stormlogs_bg.jpg`) pero reemplazar el layout fijo de 1045px por contenedores responsive con `max-width`, `width: min(...)` y grids que no rompan en mobile.

Quitar `letter-spacing: -1px` global. Definir tokens de color, spacing, radius y estados semanticos. Evitar que la UI quede dominada solo por gradientes purple/blue; usar fondo y superficies mas contenidos para que tablas y datos sean legibles.

Actualizar navegacion con estados activos, menu mobile y controles accesibles. Botones de acciones deben usar iconos cuando corresponda, labels claros y foco visible.

Rehacer tablas de replays/stats para lectura densa: sticky header cuando aporte, alineacion numerica, sorting explicito, empty states, overflow horizontal controlado en mobile y sin texto solapado.

Modernizar formularios de auth/settings/upload con validacion cliente, errores inline y estados pending/success/failure. Upload debe mostrar progreso por archivo, error por archivo, cancel/retry si es viable, y no mutar estado directamente.

Reemplazar Font Awesome remoto por iconos empaquetados (`lucide-react` o equivalente) y mover fonts a una estrategia local o system fonts. Si se conserva analytics, usar una integracion moderna y condicionada por env.

Fase 5: Pruebas, docs y deploy.

Agregar Vitest + Testing Library para unidades/componentes y MSW para mocks de API.

Agregar Playwright para flujos principales:

    visita home
    login exitoso y fallido
    replays index con filtros y paginacion
    replay show con tabs
    profile publico por toonhandle
    player compare agrega/remueve jugador
    upload muestra progreso y error

Agregar pruebas de accesibilidad basicas con `@axe-core/playwright` o equivalente para rutas principales.

Actualizar `README.md` con requisitos, setup, env vars, comandos, como usar mocks, como apuntar a API local y como producir build.

Actualizar `Procfile` y `server.js` si el deploy sigue usando Node para servir `dist`; si el hosting es estatico, documentar el comando de build y directorio de salida.

Eliminar archivos de toolchain legacy solo cuando `npm run build`, `npm test` y smoke tests hayan pasado con el nuevo stack.

## Concrete Steps

Comenzar siempre con:

    cd /home/crorella/Documents/HotsData/hotsdata-frontend
    git status --short
    node -v
    npm -v

Registrar el baseline actual:

    npm run build

Resultado observado el 2026-06-25: falla en `rimraf: not found` porque no hay dependencias instaladas. Si en el futuro se instalan dependencias, actualizar esta seccion con el nuevo resultado.

Crear branch de trabajo:

    git switch -c modernize-frontend

Si el comando falla porque el branch ya existe:

    git switch modernize-frontend

Crear docs/fixtures iniciales:

    mkdir -p docs src/test/fixtures

Agregar o actualizar:

    docs/frontend-routes.md
    src/test/fixtures/replays-list.json
    src/test/fixtures/replay-show.json
    src/test/fixtures/user.json
    src/test/fixtures/login-success.json
    src/test/fixtures/player-heroes.json
    src/test/fixtures/player-search.json
    src/test/fixtures/hero-info.json

Modernizar package:

    npm install react react-dom react-router @reduxjs/toolkit react-redux
    npm install -D vite typescript vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom eslint prettier sass playwright msw

Si se decide usar TS desde el inicio:

    npm install -D @types/react @types/react-dom

Crear configuracion:

    vite.config.ts
    tsconfig.json
    eslint.config.js
    src/setupTests.ts
    src/test/msw/server.ts

Migrar entrypoint:

    index.html
    src/main.jsx or src/main.tsx
    src/app/App.jsx or src/app/App.tsx
    src/app/router.jsx or src/app/router.tsx
    src/app/store.js or src/app/store.ts

Ejecutar despues de cada fase:

    npm run lint
    npm test
    npm run build

Despues de tener dev server:

    npm run dev

Abrir la URL que reporte Vite, normalmente `http://127.0.0.1:5173`, y validar manualmente las rutas de la matriz.

Agregar Playwright cuando exista shell funcional:

    npx playwright install --with-deps
    npm run test:e2e

Si `npx playwright install --with-deps` requiere permisos de sistema, registrar el bloqueo y usar navegadores ya instalados o pedir aprobacion antes de instalar dependencias del SO.

## Validation and Acceptance

Aceptacion tecnica minima:

`npm install` termina sin depender de Node 6, Yarn global ni paquetes nativos obsoletos como `node-sass`.

`npm run dev` levanta la app en Vite.

`npm run build` produce `dist` sin warnings criticos ni errores.

`npm test` corre pruebas unitarias/componentes con fixtures.

`npm run lint` corre sin errores o con una lista documentada de warnings aceptados temporalmente.

Las rutas principales cargan sin errores de consola no manejados:

    #/
    #/signin
    #/register
    #/replays
    #/replays/<fixture-id>
    #/profile
    #/profile/<toonhandle>
    #/players/compare
    #/upload
    #/user-settings

El flujo de auth muestra errores de credenciales sin romper la app, persiste sesion segun el contrato actual y limpia sesion en logout.

Las pantallas con datos muestran loading, empty y error states. Un fallo de red de API no debe producir pantalla blanca.

La pagina de replay show renderiza header de mapa/equipos y tabs de stats con fixture de detalle.

Replays index filtra por hero/map y match type sin mutar props ni depender de refs string.

Upload maneja progreso y error por archivo sin mutar `this.state.uploadFiles`.

La UI no tiene `min-width` fijo que rompa viewport mobile. Validar al menos 375x667, 768x1024 y 1440x900.

No quedan imports rotos conocidos: `MapActions`, `GlobalStatsActions`, `components/icons/RoleIcon`, `actions/user_actions`, `_` global en replay show.

No quedan llamadas dispersas a `localStorage.getItem('token')` en actions/componentes; el acceso al token esta centralizado.

No quedan `console.log` de token, respuestas de login o debug de mapas en produccion.

Aceptacion de producto:

Un usuario puede entender desde la home que HotsData sirve para analizar replays.

Un usuario autenticado puede ver su lista de replays, abrir un replay, revisar stats/talentos/map stats y navegar de vuelta.

Un usuario puede buscar/comparar jugadores y entender errores o ausencia de resultados.

Un usuario puede subir replay files y ver progreso/resultado.

## Idempotence and Recovery

Mantener commits pequenos por fase. Si una fase falla, volver al ultimo commit verde en vez de mezclar rollback manual con trabajo nuevo.

No borrar `yarn.lock`, `webpack.config.js`, `.babelrc` o `server.js` hasta que el build Vite y la ruta de deploy esten validados. Si se eliminan, hacerlo en una fase final con una prueba de build/deploy.

Si el API local no corre por falta de config/secrets, usar MSW y fixtures para validar frontend. Marcar explicitamente que las pruebas son mock-backed.

Si React Router v7 introduce friccion innecesaria, aceptar React Router v6 como paso intermedio con hash routes, siempre que el plan registre la decision y la ruta futura.

Si React 19 descubre demasiadas incompatibilidades de librerias de tablas/tabs/dropzone, migrar primero a React 18.3 y registrar los warnings. Luego actualizar a React 19 en una fase separada.

Si una pantalla legacy esta incompleta o no conectada, no bloquear la modernizacion. Decidir si se elimina, se oculta o se implementa con criterios de producto claros.

Si los estilos se rompen durante el port, priorizar layout funcional y legible sobre pixel parity con el diseno antiguo. Conservar assets y contenido importante, no necesariamente gradientes o spacing legacy.

## Artifacts and Notes

Inspeccion del 2026-06-25:

    git -C /home/crorella/Documents/HotsData/hotsdata-frontend status --short
    # sin salida; checkout limpio

    git -C /home/crorella/Documents/HotsData/hotsdata-frontend log -1 --oneline
    # 6134c664 Merge pull request #1 from Numose/master

    node -v
    # v22.22.2

    npm -v
    # 10.9.7

    yarn -v
    # /bin/bash: line 1: yarn: command not found

    test -d node_modules && echo node_modules-present || echo node_modules-absent
    # node_modules-absent

    find src -type f -name '*.js' -print0 | xargs -0 wc -l
    # 5201 total

    find style src -type f -name '*.scss' -print0 | xargs -0 wc -l
    # 1068 total

    npm run build
    # sh: 1: rimraf: not found

Validacion posterior a la modernizacion, ejecutada el 2026-06-25:

    npm run lint
    # passed

    npm test
    # Test Files 2 passed; Tests 4 passed

    npm run typecheck
    # passed

    npm run build
    # vite v6.4.3 built dist successfully

    npm audit --audit-level=moderate
    # found 0 vulnerabilities

    VITE_USE_FIXTURES=true npm run dev -- --port 5173
    # Vite served http://127.0.0.1:5173/

    node -e "fetch('http://127.0.0.1:5173/').then(r=>r.text()).then(t=>{console.log(t.includes('src=\"/src/main.jsx\"') ? 'vite-html-ok' : t.slice(0,120));})"
    # vite-html-ok

Playwright MCP smoke checks, ejecutados el 2026-06-25:

    http://127.0.0.1:5173/#/
    # Desktop snapshot rendered HotsData Beta, primary nav, workflow cards and footer.

    mobile viewport 390x844 at http://127.0.0.1:5173/#/
    # Header collapsed to menu button, text/cards stacked, no visible overlap.

    http://127.0.0.1:5173/#/replays/RPL-1001
    # Replay detail rendered fixture-backed teams, stat cards and tabs; mobile overflow was corrected so wide tables remain inside their scroll container.

Current package facts from `package.json`:

    name: kerrigan-frontend
    engines.node: 6.11.1
    react: ^15.4.2
    react-router: ^3.0.2
    redux: ^3.6.0
    webpack: ^3.5.6
    webpack-dev-server: ^2.7.1
    node-sass: ^4.5.2
    axios: ^0.16.1

External docs checked on 2026-06-25:

    React 19 release: https://react.dev/blog/2024/12/05/react-19
    React 19 upgrade guide: https://react.dev/blog/2024/04/25/react-19-upgrade-guide
    Vite guide: https://vite.dev/guide/
    React Router v7 upgrade guide: https://reactrouter.com/upgrading/v6
    Redux Toolkit recommendation: https://redux-toolkit.js.org/introduction/why-rtk-is-redux-today

Specific current-source implications:

React 19 is stable and removes `ReactDOM.render`, so `src/index.js` must move to `createRoot`.

React 19 requires the modern JSX transform; the Babel 6 config should not be carried forward.

Vite currently requires Node 20.19+ or 22.12+, so Node 22.22.2 is compatible.

React Router v7 requires Node 20 and React/ReactDOM 18 minimum, so it fits the target runtime.

Redux Toolkit is the official recommended way to write Redux logic today and should replace handwritten Redux boilerplate over time.

Known cleanup list:

    src/containers/GlobalHeroesPage.js: unresolved imports and not routed.
    src/containers/SettingsPage.js: wrong import casing/path and not routed.
    src/containers/ReplaysShowPage.js: missing lodash import for `_.capitalize`.
    src/containers/ProfilePage.scss: `rbga` typo.
    src/components/uploader/Uploader.js: direct state mutation and no user-facing error handling.
    src/components/SignIn.js and src/actions/SessionActions.js: console logging token/login response.
    src/router.js: Google Analytics UA and React Router 3 `onEnter`.
    src/index.html: remote Font Awesome, Google Fonts and classic analytics.
    style/style.scss: `min-width: 1045px` and global negative letter spacing.

## Interfaces and Dependencies

Frontend runtime target:

    Node 22.x local, or another documented Node version satisfying Vite and React Router requirements.
    npm as package manager unless the team explicitly installs and commits another manager.

Core frontend dependencies:

    react
    react-dom
    react-router
    @reduxjs/toolkit
    react-redux
    sass

Testing and quality:

    vite
    @vitejs/plugin-react
    vitest
    @testing-library/react
    @testing-library/user-event
    @testing-library/jest-dom
    jsdom
    msw
    playwright
    eslint
    prettier
    typescript, if adopting TS or typecheckable JS

API contract:

The frontend reads `VITE_API_HOST`, builds requests to `../api/server.js` endpoints, and sends JWT Bearer auth where required. The API currently allows anonymous `/login`, `/upload`, `/register`, `/winrates`, `/patches`, `/player/heroes/*`, `/player/search/*`, reset endpoints and `/replays/*`; authenticated routes include `/user`, `/list`, `/player/teammates` and some profile-related paths.

Deployment interface:

`dist` is the static build output. Existing `Procfile` uses `npm run build && node server.js`; update it only after `server.js` has been simplified for Vite output or the hosting target has changed.

Design interface:

Keep HotsData-specific assets in `assets/`. Replace remote icon/font dependencies with package or local assets. Preserve data-dense workflows over marketing pages: replays, stats, compare, upload and profile are the primary experiences.
