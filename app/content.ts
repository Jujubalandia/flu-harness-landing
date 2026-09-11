// Content and copy for the flu-harness landing page.
//
// Ported from the rh-harness landing page and retargeted to Flutter/Dart. The
// design language is inherited deliberately: same blueprint grid, same three
// typefaces, same muted steel accent. Only the subject changed.
//
// House rule, enforced by the pre-flight check: no em dashes anywhere in
// user-visible copy. Use a colon, a comma, or a plain hyphen.

export type Lang = "en" | "pt" | "es";
export type TabKey = "init" | "doctor" | "gate" | "shells";
export type LineKind = "cmd" | "ok" | "warn" | "fail" | "dim" | "";

export interface LangText {
  badge: string;
  navLifecycle: string;
  navFeatures: string;
  navDemo: string;
  navStart: string;
  navContribute: string;
  ctaGithub: string;
  copy: string;
  copied: string;
  heroTitleA: string;
  heroTitleB: string;
  heroLead: string;
  heroCta1: string;
  heroCta2: string;
  figCaption: string;
  figNote: string;
  stats: [string, string, string, string];
  lifeKicker: string;
  lifeTitle: string;
  lifeLead: string;
  phases: [string, string][];
  gates: [string, string, string][];
  featKicker: string;
  featTitle: string;
  features: [string, string, string[]][];
  termKicker: string;
  termTitle: string;
  termLead: string;
  tabHints: [string, string, string, string];
  startTitle: string;
  startLead: string;
  startNote: string;
  steps: [string, string][];
  contribTitle: string;
  contribLead: string;
  contribBug: string;
  contribFeat: string;
  contribute: [string, string][];
}

// The four terminal demos. Keyed by tab, each line is [text, kind].
export const SCRIPTS: Record<TabKey, [string, LineKind][]> = {
  init: [
    ["$ /flu-harness:new-flutter-project", "cmd"],
    ["", ""],
    ["-> reading pubspec.yaml ...", "dim"],
    ["   State          Riverpod              [detected]", "ok"],
    ["   Routing        go_router             [detected]", "ok"],
    ["   Backend        Supabase               [detected]", "ok"],
    ["   Local DB       Drift                  [detected]", "ok"],
    ["   Design system  material_ui            [detected]", "ok"],
    ["   Secure storage shared_preferences     [WARNING]", "warn"],
    ["   i18n           (none)                 [WARNING]", "warn"],
    ["", ""],
    ["? Confirm this stack? (Y/n) y", "dim"],
    ["", ""],
    ["   ok CLAUDE.md written (no placeholders)", "ok"],
    ["   ok docs/ : 6 phase templates", "ok"],
    ["   ok .githooks/ : profile strict", "ok"],
    ["   ok .githooks/lib/ : quality.sh + .ps1 + .cmd", "ok"],
    ["   ok .claude/rules/ : 11 of 19 rules copied", "ok"],
    ["   ok .claude/settings.json : denylist armed", "ok"],
    ["", ""],
    ["   Verifying the three shells agree ...", "dim"],
    ["   sh, PowerShell and cmd produced the same plan", "ok"],
    ["", ""],
    ["Next: /flu-harness:flutter-doctor", "dim"],
  ],

  doctor: [
    ["$ sh ~/.flu-harness/scripts/doctor.sh", "cmd"],
    ["", ""],
    ["   [OK]   flutter 3.47.3 on PATH (channel: stable)", "ok"],
    ["   [OK]   Dart SDK version: 3.13.3 (stable)", "ok"],
    ["   [OK]   flutter resolves to flutter.bat", "ok"],
    ["   [OK]   .gitignore covers Flutter + secret paths", "ok"],
    ["   [OK]   no secrets tracked by git", "ok"],
    ["   [WARN] CLAUDE.md missing (not initialized)", "warn"],
    ["   [WARN] shared_preferences in direct deps", "warn"],
    ['   [FAIL] analysis_options.yaml missing', "fail"],
    ['          fix: include: package:flutter_lints/flutter.yaml', "dim"],
    ["   [OK]   flutter entry point runs in this shell", "ok"],
    ["   [FAIL] hook script has CRLF line endings", "fail"],
    ["          fix: sed -i 's/\\r$//' .githooks/pre-commit", "dim"],
    ["", ""],
    ["   OK: 22  WARN: 2  FAIL: 2  / 26 total", "cmd"],
    ["   exit 1", "dim"],
  ],

  gate: [
    ['$ git commit -m "feat: paywall"', "cmd"],
    ["", ""],
    ["pre-commit : profile strict", "dim"],
    ["   ok dart format --set-exit-if-changed", "ok"],
    ["   ok flutter analyze --fatal-infos (0 issues)", "ok"],
    ["   x  dart_code_linter  lib/screens/paywall.dart", "fail"],
    ["      cyclomatic-complexity 27 (max 20)", "fail"],
    ["", ""],
    ["BLOCKED: refactor or lower the complexity.", "fail"],
    ["   Extract sub-widgets, or a state notifier.", "dim"],
    ["   Never raise the threshold.", "dim"],
    ["", ""],
    ["$ git commit --no-verify", "cmd"],
    ["BLOCKED by .claude/hooks/pre-tool-use.sh", "fail"],
    ["   nice try", "dim"],
  ],

  shells: [
    ["$ powershell -File .githooks\\lib\\quality.ps1 -DryRun", "cmd"],
    ["profile=strict", "ok"],
    ["stage=pre-push", "ok"],
    ["gate=format", "ok"],
    ["gate=analyze", "ok"],
    ["gate=lint", "ok"],
    ["gate=test", "ok"],
    ["gate=build", "ok"],
    ["", ""],
    ["$ cmd /c .githooks\\lib\\quality.cmd /dry-run", "cmd"],
    ["profile=strict", "ok"],
    ["stage=pre-push", "ok"],
    ["gate=format", "ok"],
    ["gate=analyze", "ok"],
    ["gate=lint", "ok"],
    ["gate=test", "ok"],
    ["gate=build", "ok"],
    ["", ""],
    ["Three shells. One gates.def. Byte-identical plans.", "cmd"],
  ],
};

export const LINE_COLOR: Record<LineKind, string> = {
  cmd: "#eef6ff",
  ok: "#b5d9fd",
  warn: "#e8c98a",
  fail: "#f0a08c",
  dim: "rgba(214,235,255,.55)",
  "": "transparent",
};

export const INSTALL =
  "curl -fsSL https://raw.githubusercontent.com/Jujubalandia/flu-harness/main/scripts/install.sh | sh";

export const CODE: Record<string, string> = {
  s1: "flutter --version      # need 3.35+ stable\ndart --version         # ships with Flutter\nstart ms-settings:developers   # Windows: symlink support",
  s2:
    "# Git Bash, macOS, Linux\ncurl -fsSL https://raw.githubusercontent.com/\\\n  Jujubalandia/flu-harness/main/scripts/install.sh | sh\n\n# PowerShell\npowershell -ExecutionPolicy Bypass -File scripts\\install.ps1\n\n# cmd.exe\nscripts\\install.cmd",
  s3: "# strict (default): everything, including a real APK build\n# standard: format + analyze + lint + tests\n# minimal: analyze only, for the first fast days\necho strict > .githooks/.profile",
  s4: "mkdir ~/projects/my-app && cd $_\nclaude\n> /flu-harness:new-flutter-project",
  s5: "> /flu-harness:flutter-doctor\n# OK: 26  WARN: 0  FAIL: 0  / 26",
};

export const DIMS: Record<Lang, string[]> = {
  en: ["State", "Routing", "Backend", "Local DB", "Design system", "i18n", "Monetization", "Testing"],
  pt: ["Estado", "Rotas", "Backend", "Banco local", "Design system", "i18n", "Monetizacao", "Testes"],
  es: ["Estado", "Rutas", "Backend", "BD local", "Design system", "i18n", "Monetizacion", "Testing"],
};

export const DIM_VALS = [
  "Riverpod",
  "go_router",
  "Supabase",
  "Drift",
  "material_ui",
  "gen-l10n",
  "RevenueCat",
  "mocktail",
];

export const PHASE_META = [
  { idx: "01", days: "D1-D3", doc: "01-spec.md", weight: "38%" },
  { idx: "02", days: "D1-D20", doc: "02-dev-plan.md", weight: "52%" },
  { idx: "03", days: "D4-D13", doc: "03-quality-gates.md", weight: "100%" },
  { idx: "04", days: "D13-D15", doc: "04-testing.md", weight: "78%" },
  { idx: "05", days: "D15-D17", doc: "05-store-launch.md", weight: "64%" },
  { idx: "06", days: "D17-D20", doc: "06-marketing.md", weight: "46%" },
];

export const STAT_N = ["20", "26", "20", "3"];

export const LANGS: [Lang, string, string][] = [
  ["en", "EN", "English"],
  ["pt", "PT", "Portugues (BR)"],
  ["es", "ES", "Espanol"],
];

export const L: Record<Lang, LangText> = {
  en: {
    badge: "v1 - open source",
    navLifecycle: "Lifecycle", navFeatures: "What it does", navDemo: "Demo", navStart: "Get started", navContribute: "Contribute",
    ctaGithub: "View on GitHub", copy: "Copy", copied: "Copied",
    heroTitleA: "Ship a Flutter app to both stores in", heroTitleB: "20 days.",
    heroLead: "Not another boilerplate. Spec to store listing, with gates that PowerShell, cmd and Git Bash all run the same way.",
    heroCta1: "Get started in 5 steps", heroCta2: "See the lifecycle",
    figCaption: "Fig. 01 - what the wizard already knows",
    figNote: "16 dimensions read straight out of pubspec.yaml. It only asks the things it genuinely cannot guess.",
    stats: ["Days, spec to store submission", "Doctor checks, one command", "Knowledge rules, copied by stack", "Shells that run the same gates"],
    lifeKicker: "The whole lifecycle",
    lifeTitle: "Writing the code is one sixth of shipping an app.",
    lifeLead: "Every phase gets a doc template, a gate and a day range. Nothing gets to be the part you deal with later.",
    phases: [
      ["Spec", "Problem, market, competitors, a cut/keep list, the viral loop. Decided before the first line."],
      ["Plan", "Phases, milestones, definitions of done, and the blockers everyone hits anyway."],
      ["Dev", "One MVP feature a day, with knowledge rules loaded per file you touch."],
      ["QA", "Test tiers, a device matrix that assumes you do not own a Mac, golden paths."],
      ["Store", "Assets, metadata, AAB and IPA upload, review checklist, and the lead times nobody budgets for."],
      ["Launch", "A D-7 to D+14 calendar, per-platform post templates, and yes, a landing page."],
    ],
    gates: [
      ["Develop", "Rules that show up on cue", "Twenty knowledge files load by glob. Edit a Supabase call and the RLS and secure-storage rules arrive. No Supabase in the project? You never see them."],
      ["Test", "26 checks, exit code 1", "Doctor reads only: environment, structure, dependencies, security, hooks, and the Windows shell health that nothing else checks. Every FAIL ships with its fix."],
      ["Build", "Three profiles, three shells", "minimal, standard or strict. Pre-commit runs format, analyze and lint; pre-push adds tests and a real debug APK build. Same plan in all three shells."],
    ],
    featKicker: "What is in the box",
    featTitle: "Six pieces that stop you re-deciding the same things.",
    features: [
      ["Init wizard", "Open a directory and type the command. It reads pubspec.yaml across 16 dimensions, shows you the table, and asks only what it cannot infer.", ["16 dimensions", "new or existing"]],
      ["Doctor", "26 health checks on any Flutter project, readable or as JSON for CI. Every FAIL comes with the exact fix. It never edits your files. Checks 22 to 26 are the Windows ones nothing else covers.", ["bash", "powershell", "cmd"]],
      ["Three shells, one plan", "The gate plan lives in gates.def. Three runners parse that same file, so PowerShell, cmd and Git Bash cannot drift apart. The test suite proves it.", ["gates.def", "dry-run"]],
      ["Selective rules", "Twenty knowledge files: Riverpod, go_router, Supabase, Drift, freezed, gen-l10n, RevenueCat, Windows. Copied only when your stack earns them.", ["glob-loaded", "20 files"]],
      ["Destructive-op guard", "A declarative denylist plus a runtime hook. flutter pub publish, force push, keytool, DROP TABLE and rm -rf / are stopped before they run.", ["settings.json", "no python3 needed"]],
      ["Six phase docs", "Spec, dev plan, quality gates, testing, store launch, marketing. Pre-filled templates, not empty headings you never reopen.", ["docs/", "D1 to D20"]],
    ],
    termKicker: "Live from the terminal", termTitle: "It talks back.",
    termLead: "Two commands do most of the work. One stands a project up; the other tells you, in 26 checks, exactly which part of it is about to embarrass you in front of App Review.",
    tabHints: ["init wizard, stack detection", "26 health checks", "quality gates, live", "the same plan, three shells"], startTitle: "Five steps. Roughly nine minutes.",
    startLead: "Prereqs: Flutter 3.35+ stable, git, and Claude Code. Windows needs Developer Mode and Git for Windows.",
    startNote: "Public repo. Clone it, fork it, open a PR.",
    steps: [
      ["Check your prereqs", "Flutter stable, git, Claude Code. On Windows also enable Developer Mode: Flutter needs symlink support, and Git for Windows supplies the sh that runs your hooks."],
      ["Install the harness", "One command per shell, no SSH key. Git Bash gets install.sh, PowerShell gets install.ps1, cmd gets install.cmd. All three produce the same layout."],
      ["Pick a gate profile", "strict is the default and the one you want, because its pre-push build gate is the only thing that catches a Gradle failure before CI does."],
      ["Run the wizard", "From your project directory. It detects, confirms, then writes CLAUDE.md, docs/, hooks and rules, and proves the three shells agree."],
      ["Ask the doctor", "Baseline on day one. Re-run it after every clone, after every hook that fails without a reason, and before any release build."],
    ], contribTitle: "It is public now. Come break it.",
    contribLead: "No SSH key, no access request. Clone it, run the suite, and send the rule or the check you wish had been there. Template changes land in projects created afterwards; existing ones are never touched.",
    contribBug: "Report a bug", contribFeat: "Request a check",
    contribute: [
      ["Clone it", "HTTPS, no key. git clone https://github.com/Jujubalandia/flu-harness ~/.flu-harness"],
      ["Prove it still works", "bash tests/test.sh. It asserts the three shells agree on the gate plan, that the guard blocks and allows the right things, and that the hooks are LF."],
      ["Try it for real", "Run the wizard and the doctor in a throwaway project before you open the PR."],
    ],
  },

  pt: {
    badge: "v1 - codigo aberto",
    navLifecycle: "Ciclo de vida", navFeatures: "O que faz", navDemo: "Demo", navStart: "Comecar", navContribute: "Contribuir",
    ctaGithub: "Ver no GitHub", copy: "Copiar", copied: "Copiado",
    heroTitleA: "Publique um app Flutter nas duas lojas em", heroTitleB: "20 dias.",
    heroLead: "Da spec ao texto da loja, com gates que rodam igual no PowerShell, no cmd e no Git Bash.",
    heroCta1: "Comecar em 5 passos", heroCta2: "Ver o ciclo de vida",
    figCaption: "Fig. 01 - o que o assistente ja sabe",
    figNote: "16 dimensoes lidas direto do pubspec.yaml. Ele so pergunta o que realmente nao da para adivinhar.",
    stats: ["Dias, da spec ao envio para a loja", "Checagens do doctor, um comando", "Regras de conhecimento, por stack", "Shells rodando os mesmos gates"],
    lifeKicker: "O ciclo de vida inteiro",
    lifeTitle: "Escrever o codigo e um sexto de publicar um app.",
    lifeLead: "Cada fase ganha um template de doc, um gate e um intervalo de dias. Nada fica sendo aquilo que a gente resolve depois.",
    phases: [
      ["Spec", "Problema, mercado, concorrentes, lista cut/keep, loop viral. Decidido antes da primeira linha."],
      ["Plano", "Fases, marcos, definicoes de pronto e os bloqueios que todo mundo enfrenta mesmo assim."],
      ["Dev", "Uma feature de MVP por dia, com regras de conhecimento carregadas conforme o arquivo aberto."],
      ["QA", "Camadas de teste, uma matriz de dispositivos que assume que voce nao tem Mac, golden paths."],
      ["Loja", "Assets, metadados, upload de AAB e IPA, checklist de revisao e os prazos que ninguem orca."],
      ["Lancamento", "Um calendario de D-7 a D+14, templates de post por plataforma e, sim, uma landing page."],
    ],
    gates: [
      ["Desenvolver", "Regras que aparecem na hora certa", "Vinte arquivos de conhecimento carregam por glob. Editou uma chamada ao Supabase, chegam as regras de RLS e de armazenamento seguro. Sem Supabase no projeto? Voce nunca as ve."],
      ["Testar", "26 checagens, exit code 1", "O doctor so le: ambiente, estrutura, dependencias, seguranca, hooks e a saude dos shells do Windows, que nada mais verifica. Todo FAIL vem com a correcao."],
      ["Buildar", "Tres perfis, tres shells", "minimal, standard ou strict. O pre-commit roda format, analyze e lint; o pre-push soma os testes e um build APK debug de verdade. O mesmo plano nos tres shells."],
    ],
    featKicker: "O que vem na caixa",
    featTitle: "Seis pecas para voce parar de redecidir as mesmas coisas.",
    features: [
      ["Assistente de init", "Abra uma pasta e digite o comando. Ele le o pubspec.yaml em 16 dimensoes, mostra a tabela e so pergunta o que nao da para inferir.", ["16 dimensoes", "novo ou existente"]],
      ["Doctor", "26 checagens de saude em qualquer projeto Flutter, legivel ou em JSON para CI. Todo FAIL vem com a correcao exata. Ele nunca edita seus arquivos.", ["bash", "powershell", "cmd"]],
      ["Tres shells, um plano", "O plano de gates vive no gates.def. Tres executores leem esse mesmo arquivo, entao PowerShell, cmd e Git Bash nao podem divergir. A suite de testes prova isso.", ["gates.def", "dry-run"]],
      ["Regras seletivas", "Vinte arquivos: Riverpod, go_router, Supabase, Drift, freezed, gen-l10n, RevenueCat, Windows. Copiados so quando a sua stack pede.", ["por glob", "20 arquivos"]],
      ["Guarda de operacoes destrutivas", "Uma denylist declarativa mais um hook em tempo de execucao. flutter pub publish, force push, keytool, DROP TABLE e rm -rf / sao barrados antes de rodar.", ["settings.json", "sem python3"]],
      ["Seis docs de fase", "Spec, plano de dev, quality gates, testes, lancamento na loja, marketing. Templates preenchidos, nao titulos vazios que voce nunca reabre.", ["docs/", "D1 a D20"]],
    ],
    termKicker: "Ao vivo no terminal", termTitle: "Ele responde.",
    termLead: "Dois comandos fazem quase tudo. Um monta o projeto; o outro diz, em 26 checagens, exatamente que parte dele vai te envergonhar na revisao da App Store.",
    tabHints: ["assistente de init, deteccao de stack", "26 checagens de saude", "quality gates, ao vivo", "o mesmo plano, tres shells"], startTitle: "Cinco passos. Uns nove minutos.",
    startLead: "Requisitos: Flutter 3.35+ stable, git e Claude Code. No Windows, tambem Developer Mode e Git for Windows.",
    startNote: "Repositorio publico. Clone, faca fork, abra um PR.",
    steps: [
      ["Confira os requisitos", "Flutter stable, git e Claude Code. No Windows ative tambem o Developer Mode: o Flutter precisa de suporte a symlink, e o Git for Windows fornece o sh que roda seus hooks."],
      ["Instale o harness", "Um comando por shell, sem chave SSH. Git Bash usa install.sh, PowerShell usa install.ps1, cmd usa install.cmd. Os tres produzem o mesmo layout."],
      ["Escolha um perfil de gate", "strict e o padrao e e o que voce quer, porque o gate de build no pre-push e a unica coisa que pega uma falha de Gradle antes do CI."],
      ["Rode o assistente", "Na pasta do seu projeto. Ele detecta, confirma e escreve CLAUDE.md, docs/, hooks e regras, e ainda prova que os tres shells concordam."],
      ["Chame o doctor", "Linha de base no dia um. Repita depois de cada clone, de cada hook que falha sem explicacao e antes de qualquer build de release."],
    ], contribTitle: "Agora e publico. Venha quebrar.",
    contribLead: "Sem chave SSH, sem pedir acesso. Clone, rode a suite e mande a regra ou a checagem que voce queria que existisse. Mudancas em templates valem para projetos criados depois; os existentes nunca sao tocados.",
    contribBug: "Reportar um bug", contribFeat: "Pedir uma checagem",
    contribute: [
      ["Clone", "HTTPS, sem chave. git clone https://github.com/Jujubalandia/flu-harness ~/.flu-harness"],
      ["Prove que ainda funciona", "bash tests/test.sh. Ela garante que os tres shells concordam no plano de gates, que a guarda bloqueia e libera o que deve, e que os hooks estao em LF."],
      ["Teste de verdade", "Rode o assistente e o doctor num projeto descartavel antes de abrir o PR."],
    ],
  },

  es: {
    badge: "v1 - codigo abierto",
    navLifecycle: "Ciclo de vida", navFeatures: "Que hace", navDemo: "Demo", navStart: "Empezar", navContribute: "Contribuir",
    ctaGithub: "Ver en GitHub", copy: "Copiar", copied: "Copiado",
    heroTitleA: "Publica una app Flutter en ambas tiendas en", heroTitleB: "20 dias.",
    heroLead: "De la spec al texto de la tienda, con gates que corren igual en PowerShell, cmd y Git Bash.",
    heroCta1: "Empezar en 5 pasos", heroCta2: "Ver el ciclo de vida",
    figCaption: "Fig. 01 - lo que el asistente ya sabe",
    figNote: "16 dimensiones leidas directo del pubspec.yaml. Solo pregunta lo que de verdad no puede adivinar.",
    stats: ["Dias, de la spec al envio a la tienda", "Chequeos del doctor, un comando", "Reglas de conocimiento, por stack", "Shells que corren los mismos gates"],
    lifeKicker: "El ciclo de vida completo",
    lifeTitle: "Escribir el codigo es un sexto de publicar una app.",
    lifeLead: "Cada fase tiene plantilla de doc, un gate y un rango de dias. Nada queda como eso lo vemos despues.",
    phases: [
      ["Spec", "Problema, mercado, competencia, lista cut/keep, bucle viral. Decidido antes de la primera linea."],
      ["Plan", "Fases, hitos, definiciones de terminado y los bloqueos que igual le pasan a todo el mundo."],
      ["Dev", "Una funcion del MVP por dia, con reglas de conocimiento cargadas segun el archivo que tocas."],
      ["QA", "Niveles de test, una matriz de dispositivos que asume que no tienes Mac, golden paths."],
      ["Tienda", "Assets, metadatos, subida de AAB e IPA, checklist de revision y los plazos que nadie presupuesta."],
      ["Lanzamiento", "Un calendario de D-7 a D+14, plantillas de post por plataforma y si, una landing page."],
    ],
    gates: [
      ["Desarrollar", "Reglas que aparecen a tiempo", "Veinte archivos de conocimiento se cargan por glob. Editas una llamada a Supabase y llegan las reglas de RLS y de almacenamiento seguro. Sin Supabase en el proyecto? Nunca las ves."],
      ["Probar", "26 chequeos, exit code 1", "El doctor solo lee: entorno, estructura, dependencias, seguridad, hooks y la salud de los shells de Windows, que nada mas revisa. Cada FAIL trae su arreglo."],
      ["Compilar", "Tres perfiles, tres shells", "minimal, standard o strict. El pre-commit corre format, analyze y lint; el pre-push suma tests y un build APK debug real. El mismo plan en los tres shells."],
    ],
    featKicker: "Que trae la caja",
    featTitle: "Seis piezas para dejar de re-decidir lo mismo.",
    features: [
      ["Asistente de init", "Abre una carpeta y escribe el comando. Lee el pubspec.yaml en 16 dimensiones, muestra la tabla y solo pregunta lo que no puede inferir.", ["16 dimensiones", "nuevo o existente"]],
      ["Doctor", "26 chequeos de salud en cualquier proyecto Flutter, legible o en JSON para CI. Cada FAIL trae el arreglo exacto. Nunca edita tus archivos.", ["bash", "powershell", "cmd"]],
      ["Tres shells, un plan", "El plan de gates vive en gates.def. Tres ejecutores leen ese mismo archivo, asi que PowerShell, cmd y Git Bash no pueden divergir. La suite de tests lo prueba.", ["gates.def", "dry-run"]],
      ["Reglas selectivas", "Veinte archivos: Riverpod, go_router, Supabase, Drift, freezed, gen-l10n, RevenueCat, Windows. Se copian solo cuando tu stack los pide.", ["por glob", "20 archivos"]],
      ["Guardia de operaciones destructivas", "Una denylist declarativa mas un hook en tiempo de ejecucion. flutter pub publish, force push, keytool, DROP TABLE y rm -rf / se frenan antes de correr.", ["settings.json", "sin python3"]],
      ["Seis docs de fase", "Spec, plan de dev, quality gates, tests, lanzamiento en tienda, marketing. Plantillas rellenadas, no titulos vacios que nunca vuelves a abrir.", ["docs/", "D1 a D20"]],
    ],
    termKicker: "En vivo desde la terminal", termTitle: "Te contesta.",
    termLead: "Dos comandos hacen casi todo. Uno monta el proyecto; el otro te dice, en 26 chequeos, que parte exacta te va a avergonzar ante la revision de la App Store.",
    tabHints: ["asistente de init, deteccion de stack", "26 chequeos de salud", "quality gates, en vivo", "el mismo plan, tres shells"], startTitle: "Cinco pasos. Unos nueve minutos.",
    startLead: "Requisitos: Flutter 3.35+ stable, git y Claude Code. En Windows tambien Developer Mode y Git for Windows.",
    startNote: "Repositorio publico. Clonalo, haz fork, abre un PR.",
    steps: [
      ["Revisa los requisitos", "Flutter stable, git y Claude Code. En Windows activa tambien el Developer Mode: Flutter necesita soporte de symlink, y Git for Windows aporta el sh que corre tus hooks."],
      ["Instala el harness", "Un comando por shell, sin clave SSH. Git Bash usa install.sh, PowerShell usa install.ps1, cmd usa install.cmd. Los tres dejan el mismo layout."],
      ["Elige un perfil de gate", "strict es el predeterminado y es el que quieres, porque su gate de build en el pre-push es lo unico que atrapa una falla de Gradle antes del CI."],
      ["Corre el asistente", "Desde la carpeta de tu proyecto. Detecta, confirma y escribe CLAUDE.md, docs/, hooks y reglas, y ademas prueba que los tres shells coinciden."],
      ["Llama al doctor", "Linea base el dia uno. Repitelo tras cada clon, tras cada hook que falla sin motivo claro y antes de cualquier build de release."],
    ], contribTitle: "Ya es publico. Ven a romperlo.",
    contribLead: "Sin clave SSH, sin pedir acceso. Clonalo, corre la suite y manda la regla o el chequeo que te hubiera gustado tener. Los cambios en plantillas aplican a proyectos creados despues; los existentes nunca se tocan.",
    contribBug: "Reportar un bug", contribFeat: "Pedir un chequeo",
    contribute: [
      ["Clonalo", "HTTPS, sin clave. git clone https://github.com/Jujubalandia/flu-harness ~/.flu-harness"],
      ["Demuestra que sigue vivo", "bash tests/test.sh. Verifica que los tres shells coinciden en el plan de gates, que la guardia bloquea y libera lo correcto, y que los hooks estan en LF."],
      ["Pruébalo de verdad", "Corre el asistente y el doctor en un proyecto desechable antes de abrir el PR."],
    ],
  },
};
