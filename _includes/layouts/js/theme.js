const themeSettings = {
	'mode': 'auto'
};

function getThemeSettings() {
	for(const settingName in themeSettings) {
		let settingValue = null;
		const settingDefault = themeSettings[settingName];
		try {
			settingValue = localStorage.getItem('theme-' + settingName)
		} catch(e) {
			console.error('Unable to get theme setting from localStorage. Error: ' + e);
		}
		if(settingValue === null)
			settingValue = settingDefault;
		themeSettings[settingName] = settingValue;
	}
}

function setThemeSetting(name, value) {
	themeSettings[name] = value;
	try {
		localStorage.setItem('theme-' + name, value);
	} catch(e) {
		console.error('Unable to set theme setting in localStorage. Error: ' + e);
	}
}

function changeThemeMode(mode){
	const
		body = document.body || document.getElementsByTagName('body')[0],
		usingAuto = mode != 'light' && mode != 'dark',
		syntaxCSSElement = document.getElementById('syntaxCSS'),
		syntaxCSSElementReplaceHref = function(newClass) { syntaxCSSElement.href = syntaxCSSElement.href.replace('light.css', newClass + '.css').replace('dark.css', newClass + '.css').replace('default.css', newClass + '.css') };
	if(usingAuto) {
		body.classList.add('theme-mode-auto');
		body.classList.remove('theme-mode-dark');
		body.classList.remove('theme-mode-light');
		syntaxCSSElementReplaceHref('default');
	} else {
		body.classList.remove('theme-mode-auto');
		if(mode == 'dark') {
			body.classList.add('theme-mode-dark');
			body.classList.remove('theme-mode-light');
			syntaxCSSElementReplaceHref('dark');
		} else {
			body.classList.add('theme-mode-light');
			body.classList.remove('theme-mode-dark');
			syntaxCSSElementReplaceHref('light');
		}
	}
	setThemeSetting('mode', mode);
}

function toggleThemeMode() {
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches, themeMode = themeSettings['mode'];
	if (themeMode === 'auto') 
		changeThemeMode(prefersDark ? 'light' : 'dark');
	else if(prefersDark)
		changeThemeMode(themeMode === 'light' ? 'dark' : themeMode === 'dark' ? 'auto' : 'light');
	else
		changeThemeMode(themeMode === 'dark' ? 'light' : themeMode === 'light' ? 'auto' : 'dark');
}

document.addEventListener('DOMContentLoaded', function() {
	changeThemeMode(themeSettings['mode']);
});

getThemeSettings();
