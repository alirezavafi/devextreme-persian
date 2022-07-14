import '../../helpers/ignoreQuillTimers.js';
import './htmlEditorParts/initFixture.js';

import './htmlEditorParts/converters.tests.js';
import './htmlEditorParts/quillRegistrator.tests.js';
import markupTests from './htmlEditorParts/markup.tests.js';
import './htmlEditorParts/quillMarkup.tests.js';
import valueRenderingTests from './htmlEditorParts/valueRendering.tests.js';
import './htmlEditorParts/toolbarModule.tests.js';
import toolbarIntegrationTests from './htmlEditorParts/toolbarIntegration.tests.js';
import './htmlEditorParts/dropImageModule.tests.js';
import './htmlEditorParts/popupModule.tests.js';
import './htmlEditorParts/variablesModule.tests.js';
import './htmlEditorParts/api.tests.js';
import './htmlEditorParts/formDialog.tests.js';
import pasteTests from './htmlEditorParts/paste.tests.js';
import './htmlEditorParts/events.tests.js';
import './htmlEditorParts/resizingModule.tests.js';
import './htmlEditorParts/resizingIntegration.tests.js';
import './htmlEditorParts/tableResizingModule.tests.js';
import './htmlEditorParts/tableResizingIntegration.tests.js';
import './htmlEditorParts/tableContextMenuModule.tests.js';
import './htmlEditorParts/tableContextMenuIntegration.tests.js';
import './htmlEditorParts/tableProperties.tests.js';
import './htmlEditorParts/imageUploadModule.tests.js';
import './htmlEditorParts/imageUploadIntegration.tests.js';
import './htmlEditorParts/imageCursorModule.tests.js';
import './htmlEditorParts/mentionModule.tests.js';
import mentionIntegrationTests from './htmlEditorParts/mentionIntegration.tests.js';
import './htmlEditorParts/scrolling.tests.js';
import multilineIntegrationTests from './htmlEditorParts/multilineIntegration.tests.js';

markupTests();
valueRenderingTests();
toolbarIntegrationTests();
pasteTests();
mentionIntegrationTests();
multilineIntegrationTests();
