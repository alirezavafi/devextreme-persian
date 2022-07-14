import {
  addBasePath, addInfoHeader, cleanCss, autoPrefix, removeExternalResources, fixSwatchCss,
} from '../../src/modules/post-compiler';

describe('PostCompiler', () => {
  test('addBasePath', () => {
    expect(addBasePath('font: url(fonts/roboto.ttf);', 'base')).toBe('font: url(base/fonts/roboto.ttf);');
    expect(addBasePath('font: url(fonts/roboto.ttf);', 'base/')).toBe('font: url(base/fonts/roboto.ttf);');
    expect(addBasePath('font: url(fonts/roboto.ttf);', 'c:\\base\\')).toBe('font: url(c:\\base/fonts/roboto.ttf);');

    expect(addBasePath('font: url(fonts/r.ttf),url(fonts/r.woff);', 'base/')).toBe('font: url(base/fonts/r.ttf),url(base/fonts/r.woff);');
    expect(addBasePath('font: url(\'fonts/roboto.ttf\');', 'base/')).toBe('font: url(\'base/fonts/roboto.ttf\');');
    expect(addBasePath('font: url("fonts/roboto.ttf");', 'base/')).toBe('font: url("base/fonts/roboto.ttf");');

    expect(addBasePath('font: url(icons/roboto.ttf);', 'base/')).toBe('font: url(base/icons/roboto.ttf);');
    expect(addBasePath(Buffer.from('font: url(icons/roboto.ttf);'), 'base/')).toBe('font: url(base/icons/roboto.ttf);');

    expect(addBasePath('font: url(data:BASE64);', 'base/')).toBe('font: url(data:BASE64);');
    expect(addBasePath('font: url(image SVG);', 'base/')).toBe('font: url(image SVG);');
  });

  test('addInfoHeader', () => {
    expect(addInfoHeader('css', '1.1.1'))
      .toBe('/** Generated by the DevExpress ThemeBuilder\n'
      + '* Version: 1.1.1\n'
      + '* http://js.devexpress.com/ThemeBuilder/\n'
      + '*/\n\n'
      + 'css');
  });

  test('addInfoHeader - css has @charset at-rule', () => {
    expect(addInfoHeader('@charset "UTF-8";\ncss', '1.1.1'))
      .toBe('@charset "UTF-8";\n'
      + '/** Generated by the DevExpress ThemeBuilder\n'
      + '* Version: 1.1.1\n'
      + '* http://js.devexpress.com/ThemeBuilder/\n'
      + '*/\n\n'
      + 'css');
  });

  test('cleanCss', async () => {
    expect(await cleanCss('.c1 { color: #F00; } .c2 { color: #F00; }'))
      .toBe('.c1,\n.c2 {\n  color: red;\n}');
  });

  test('autoPrefixer', async () => {
    expect(await autoPrefix('.c1 { box-shadow: none; }'))
      .toBe('.c1 { -webkit-box-shadow: none; box-shadow: none; }');
  });

  test('removeExternalResources', () => {
    const css = `@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);
    @import url(https://fonts.googleapis.com/earlyaccess/notokufiarabic.css);
    @import url(smth-else);
    .dx-validationsummary-item-content {
      line-height: normal;
    }`;

    const expectedCss = `    @import url(smth-else);
    .dx-validationsummary-item-content {
      line-height: normal;
    }`;

    expect(removeExternalResources(css)).toBe(expectedCss);
  });
});

describe('PostCompiler - swatch features (fixSwatchCss)', () => {
  test('fixSwatchCss - common styles and typography', () => {
    const compilerCss = `
.dx-swatch-c div {
  color: #fff;
}
.dx-swatch-c .dx-theme-accent-as-text-color {
  color: #fff;
}
.dx-swatch-c .dx-theme-generic-typography {
  color: #fff;
}
.dx-swatch-c .dx-theme-generic-typography textarea,
.dx-swatch-c .dx-theme-generic-typography input {
  color: #fff;
}`;
    const expectedCss = `
.dx-swatch-c div {
  color: #fff;
}
.dx-swatch-c .dx-theme-accent-as-text-color {
  color: #fff;
}
.dx-theme-generic-typography .dx-swatch-c,.dx-theme-generic-typography.dx-swatch-c {
  color: #fff;
}
.dx-theme-generic-typography .dx-swatch-c textarea,.dx-theme-generic-typography.dx-swatch-c textarea,
.dx-theme-generic-typography .dx-swatch-c input,.dx-theme-generic-typography.dx-swatch-c input {
  color: #fff;
}`;
    const result = fixSwatchCss(compilerCss, '.dx-swatch-c', 'c');
    expect(result).toBe(expectedCss);
  });

  test('fixSwatchCss - do not change the order of cascade\'s classes by swatch class (T692470) - checkbox case', () => {
    const compilerCss = `
.dx-swatch-c .dx-checkbox-checked .dx-checkbox-icon,
.dx-swatch-c .dx-checkbox-checked.dx-checkbox-icon {
  background-color: #fff;
}`;

    const result = fixSwatchCss(compilerCss, '.dx-swatch-c', 'c');
    expect(result).toBe(compilerCss);
  });

  test('fixSwatchCss - do not change the order of cascade\'s classes by swatch class (T692470) - underlined editor case', () => {
    const compilerCss = `
.dx-swatch-c .dx-rtl.dx-editor-underlined.dx-searchbox .dx-placeholder:before,
.dx-swatch-c .dx-rtl .dx-editor-underlined.dx-searchbox .dx-placeholder:before {
  padding-right: 0;
}`;

    const result = fixSwatchCss(compilerCss, '.dx-swatch-c', 'c');
    expect(result).toBe(compilerCss);
  });

  test('fixSwatchCss - do not change the order of cascade\'s classes by swatch class (T692470) - tabs case', () => {
    const compilerCss = `
.dx-swatch-c .dx-tab-selected + .dx-swatch-c .dx-tab-selected {
  border: none;
}`;

    const result = fixSwatchCss(compilerCss, '.dx-swatch-c', 'c');
    expect(result).toBe(compilerCss);
  });

  test('fixSwatchCss - do not change the order of cascade\'s classes by swatch class (T692470) - tabs case with extra selector', () => {
    const compilerCss = `
.dx-swatch-c .dx-tab-selected + .s .dx-swatch-c .dx-tab-selected {
  border: none;
}`;

    const expectedCss = `
.dx-swatch-c .dx-tab-selected + .dx-swatch-c .s .dx-tab-selected {
  border: none;
}`;

    const result = fixSwatchCss(compilerCss, '.dx-swatch-c', 'c');
    expect(result).toBe(expectedCss);
  });

  test('fixSwatchCss - fix theme marker in swatch css', () => {
    const compilerCss = '.dx-swatch-c .dx-theme-marker { font-family: \'dx.generic.light\'; }';

    const expectedCss = '.dx-swatch-c .dx-theme-marker { font-family: \'dx.generic.c\'; }';

    const result = fixSwatchCss(compilerCss, '.dx-swatch-c', 'c');
    expect(result).toBe(expectedCss);
  });
});
