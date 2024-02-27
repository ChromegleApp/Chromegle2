class ThemeManager extends Module {

    #stylesheet;

    OverrideManager = new OverrideManager();

    constructor() {
        super();
        config.semiLightModeOption.retrieveValue().then(this.setupTheme.bind(this)).catch(this.showPage);
    }

    async setupTheme(themeMode) {

        // Set up MicroModal
        MicroModal.init();

        // Set the theme mode
        this.#stylesheet = this.#getStylesheet();

        // Initialize overrides
        this.OverrideManager.initialize();
        this.setThemeMode(config[themeMode].getValue());

        // Header settings
        let headerEnabled = await config.headerButtonsToggle.retrieveValue();
        this.toggleHeaderButton(headerEnabled === "true")

        // Mobile support
        if (isMobile()) {
            this.OverrideManager.overrideMobile();
        }

        // Make page visible
        this.showPage();

    }

    #getStylesheet() {
        return document.querySelector('[href*="/static/style.css"]') || document.createElement("link");
    }

    showPage() {
        document.getElementsByTagName("html")[0].style.visibility = "visible";
    }

    setThemeMode(resourcePath) {
        this.#stylesheet.href = chrome.runtime.getURL(resourcePath);
        this.#stylesheet.id = "customStylesheet";
    }

    onSettingsUpdate(event) {
        let headerEnabled = config.headerButtonsToggle.fromSettingsUpdateEvent(event);

        if (headerEnabled != null) {
            this.toggleHeaderButton(headerEnabled === "true");
            return;
        }

        let modeChanged = config.semiLightModeOption.fromSettingsUpdateEvent(event);

        if (modeChanged != null) {
            this.setThemeMode(config[modeChanged].getValue());
        }

    }

    toggleHeaderButton = (headerEnabled) => {

        if (headerEnabled) {
            $("#sharebuttons").css("display", "");
        } else {
            $("#sharebuttons").css("display", "none");
        }

    }

}


class OverrideManager {

    initialize() {
        [
            this.#overrideBody,
            this.#overrideLogo,
            this.#overrideTaglineInsertMenu,
            this.#overrideLinks,

        ].forEach((fn) => {
            try {
                fn();
            } catch (ex) {
                Logger.ERROR("A theme management function has failed, stack-trace below:");
                console.log(ex);
            }
        })
    }

    #overrideBody = () => {
        $("body").css("min-height", "").css("top", "")
    }

    #overrideLinks = () => $("#feedback-btn").remove();
    #overrideLogo = () => {
        $("#logo > img").replaceWith(ButtonFactory.homeButton)
    };

    #overrideTaglineInsertMenu = () => {
        let div = document.createElement("div");
        div.id = "menucontainer";
        div.classList.add("settingsButtonContainer");
        div.append(ButtonFactory.menuButton.get(0))
        $("#top-bar").append(div);
    };

}
