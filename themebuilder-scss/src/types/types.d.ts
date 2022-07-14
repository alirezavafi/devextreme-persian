interface MetaItem {
  Key?: string;
  Name?: string;
  Value?: string;
  Type?: string;
  TypeValues?: string;
  [key: string]: string;
}

interface ThemesMetadata {
  generic: MetaItem[];
  material: MetaItem[];
}

interface ConfigMetaItem {
  key: string;
  value: string;
}

interface LessCompilerInterface {
  render: Function;
}

interface ConfigSettings {
  themeName?: string;
  colorScheme?: string;
  makeSwatch?: boolean;
  outColorScheme?: string;
  assetsBasePath?: string;
  base?: boolean;
  items?: ConfigMetaItem[];
  data?: string;
  widgets?: string[];
  noClean?: boolean;
  removeExternalResources?: boolean;

  fileFormat?: string;
  baseTheme?: string;
  themeId?: string | number;

  isBootstrap?: boolean;
  bootstrapVersion?: number;

  outputFile?: string;
  outputColorScheme?: string;
  outputFormat?: string;

  command?: string;
  inputFile?: string;
  lessPath?: string;
  scssPath?: string;
  out?: string;
}

interface CompilerResult {
  result: import('sass-embedded').CompileResult;
  changedVariables: { [key: string]: string };
}

interface BundleResolver<T = 'async' | 'sync'> {
  options: import('sass-embedded').Options<T>;
  file: string;
}

interface PackageResult {
  css: string;
  compiledMetadata: { [key: string]: string };
  widgets: string[];
  unusedWidgets: string[];
  swatchSelector: string;
  version?: string;
}

interface Metadata {
  metadata: ThemesMetadata;
  version: string;
}

interface FileInfo {
  path: string;
  content: string;
}

interface WidgetItem {
  widgetName: string;
  widgetImportString: string;
}

interface WidgetHandlerResult {
  widgets: string[];
  unusedWidgets: string[];
  indexContent: string;
}

interface SwatchSass {
  sass: string;
  selector: string;
}

interface ScriptsDependencyTree {
  widget: string;
  dependencies: { [key: string]: ScriptsDependencyTree };
}

interface ScriptsDependencyCache {
  [key: string]: ScriptsDependencyTree;
}

interface FlatStylesDependencies {
  [key: string]: string[];
}

interface AstComment {
  value: string;
}

interface SyntaxTree {
  comments?: AstComment[];
}

interface SocketEventListener {
  name: string;
  handler: (e?: Error) => void;
}
