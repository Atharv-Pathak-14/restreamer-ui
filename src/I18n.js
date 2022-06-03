import React from 'react';

import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import * as plurals from 'make-plural/plurals';

import { messages as EN } from './locales/en/messages.js';
import { messages as DE } from './locales/de/messages.js';
import { messages as FR } from './locales/fr/messages.js';
import { messages as IT } from './locales/it/messages.js';
import { messages as PT } from './locales/pt/messages.js';
import { messages as ES } from './locales/es/messages.js';
import { messages as RU } from './locales/ru/messages.js';
import * as Storage from './utils/storage';

i18n.loadLocaleData('en', { plurals: plurals.en });
i18n.loadLocaleData('de', { plurals: plurals.de });
i18n.loadLocaleData('fr', { plurals: plurals.fr });
i18n.loadLocaleData('it', { plurals: plurals.it });
i18n.loadLocaleData('pt', { plurals: plurals.pt });
i18n.loadLocaleData('es', { plurals: plurals.es });
i18n.loadLocaleData('ru', { plurals: plurals.ru });
i18n.load({
	en: EN,
	de: DE,
	fr: FR,
	it: IT,
	pt: PT,
	es: ES,
	ru: RU,
});

const getLanguage = (defaultLanguage, supportedLanguages) => {
	let lang = Storage.Get('language');
	if (supportedLanguages.indexOf(lang) === -1) {
		lang = getBrowserLanguage(defaultLanguage);
	}

	if (supportedLanguages.indexOf(lang) === -1) {
		lang = defaultLanguage;
	}

	Storage.Set('language', lang);

	return lang;
};

const getBrowserLanguage = (defaultLanguage) => {
	let lang = window.navigator.language;

	const match = lang.match(/^[a-z]+/);
	if (!match) {
		return defaultLanguage;
	}

	return match[0].toLowerCase();
};

i18n.activate(getLanguage('en', ['en', 'de', 'fr', 'it', 'pt', 'es', 'ru']));

export default function Provider(props) {
	return <I18nProvider i18n={i18n}>{props.children}</I18nProvider>;
}
