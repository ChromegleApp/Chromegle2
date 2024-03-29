const config = {
    "greetingMessageField": new MutableMultiEditField({
        "storageName": "GREETING_MESSAGE_MULTI_FIELD",
        "prompt": "Enter the %n message to display on join:",
        "default": ["Hello there!"],
        "times": 3,
        "min": 0,
        "max": 15,
        "check": (_response) => {
            const checker = arr => arr.every(v => v === null);

            if (_response == null || _response === "null" || (_response != null && checker(_response))) {
                return {
                    "confirm": "false",
                    "value": null
                };
            }

            let response = [];
            for (let __response of _response) {
                if (__response == null || __response.trim().length < 1) continue;
                response.push(__response);
            }

            return {"confirm": "true", "value": response}

        },
    }),
    "typingSpeedField": new FieldEdit({
        "storageName": "GREETING_TYPING_SPEED",
        "prompt": "Enter a new speed (wpm) for keyboard typing:",
        "default": 200,
        "check": (response) => {

            if (!isNumeric(response)) {
                return {
                    "confirm": "false",
                    "value": null
                };
            } else if (response > 1000) {
                return {
                    "confirm": "true",
                    "value": 1000
                };
            } else if (response < 20) {
                return {
                    "confirm": "true",
                    "value": 20
                };
            } else {
                return {
                    "confirm": "true",
                    "value": response
                };
            }

        }
    }),
    "greetingToggle": new ToggleEdit({
        "elementName": "greetingToggle",
        "storageName": "GREETING_TOGGLE",
        "default": "false",
        "warning": {
            "message": "Chromegle is not a spam-bot. Abusing auto-message to send recurring, frequent messages will eventually result in an Omegle ban. " +
                "Use this feature responsibly, with a VPN. We're not responsible for any stupid things you do, nor will we cater to spam of Omegle's platform.",
            "state": "true"
        }
    }),
    "autoReconnectDelayField": new FieldEdit({
        "storageName": "AUTO_RECONNECT_DELAY",
        "prompt": "Enter a new delay to wait before auto-reconnecting:",
        "default": 10,
        "check": (response) => {

            if (!isNumeric(response)) {
                return {
                    "confirm": "false",
                    "value": null
                };
            }

            return {
                "confirm": "true",
                "value": Math.max(0, Math.min(30, parseInt(response)))
            };

        }
    }),
    "startTypingDelayField": new FieldEdit({
        "storageName": "GREETING_STARTING_DELAY",
        "prompt": "Enter a new delay to wait before starting to type messages:",
        "default": 5,
        "check": (response) => {

            if (!isNumeric(response)) {
                return {
                    "confirm": "false",
                    "value": null
                };
            } else if (response > 30) {
                return {
                    "confirm": "true",
                    "value": 30
                };
            } else if (response < 0) {
                return {
                    "confirm": "true",
                    "value": 0
                };
            } else {
                return {
                    "confirm": "true",
                    "value": response
                };
            }

        }
    }),
    "sendDelayField": new FieldEdit({
        "storageName": "GREETING_SEND_DELAY",
        "prompt": "Enter a new delay to wait before sending typed messages:",
        "default": 1,
        "check": (response) => {

            if (!isNumeric(response)) {
                return {
                    "confirm": "false",
                    "value": null
                };
            } else if (response > 30) {
                return {
                    "confirm": "true",
                    "value": 30
                };
            } else if (response < 0) {
                return {
                    "confirm": "true",
                    "value": 0
                };
            } else {
                return {
                    "confirm": "true",
                    "value": response
                };
            }

        }
    }),
    "autoSkipDelayField": new FieldEdit({
        "storageName": "AUTO_SKIP_FIELD",
        "prompt": "Enter a new delay to wait before skipping to the next person:",
        "default": 10,
        "check": (response) => {

            if (!isNumeric(response)) {
                return {
                    "confirm": "false",
                    "value": null
                };
            } else if (response > 1000) {
                return {
                    "confirm": "true",
                    "value": 1000
                };
            } else if (response < 5) {
                return {
                    "confirm": "true",
                    "value": 5
                };
            } else {
                return {
                    "confirm": "true",
                    "value": response
                };
            }

        }
    }),
    "autoSkipToggle": new ToggleEdit({
        "elementName": "autoSkipToggle",
        "storageName": "AUTO_SKIP_TOGGLE",
        "default": "false"
    }),
    "countrySkipToggle": new ToggleEdit({
        "elementName": "countrySkipToggle",
        "storageName": "COUNTRY_SKIP_TOGGLE",
        "default": "false",
        "warning": {
            "message": "This feature may get you banned for spam-skipping. By enabling it you agree you are aware of the risk of being banned using automation "
                + "tools like this one provided by Chromegle.",
            "state": "true"
        }
    }),
    "countrySkipInfo": new FieldEdit({
        "storageName": "COUNTRY_SKIP_FIELD",
        "prompt": "Enter the countries you wish to skip as country codes, separated by commas. " +
            "These can be 2 or 3 letter codes.\n\nVisit https://www.iban.com/country-codes for the full, up-to-date list of available country codes.",
        "default": "KP,VA",
        "check": (response) => {

            // Accept all no-values
            if (response !== "") {

                // Check alphabetical
                if (response == null || (!response.match(/^[a-zA-Z,]+$/))) {
                    return {
                        "confirm": "false",
                        "value": ""
                    };
                }

                let split = new Set();
                for (let code of response.split(",")) {
                    if (code.length < 2 || code.length > 3) {
                        return {
                            "confirm": "false",
                            "value": ""
                        };
                    } else {
                        split.add(code.toUpperCase());
                    }
                }
                response = [...split].join(",")

            }

            return {
                "confirm": "true",
                "value": response
            };
        }
    }),
    "autoReconnectToggle": new ToggleEdit({
        "elementName": "autoReconnectToggle",
        "storageName": "AUTO_RECONNECT_TOGGLE",
        "default": "false"
    }),
    "sexualFilterToggle": new ToggleEdit({
        "elementName": "sexualFilterToggle",
        "storageName": "SEXUAL_FILTER_TOGGLE",
        "default": "false"
    }),
    "profanityFilterToggle": new ToggleEdit({
        "elementName": "profanityFilterToggle",
        "storageName": "PROFANITY_FILTER_TOGGLE",
        "default": "false"
    }),
    "ultraDarkModeOption": new SwitchEdit({
        "elementName": "ultraDarkModeOption",
        "otherElementNames": ["semiDarkModeOption", "semiLightModeOption"],
        "storageName": "THEME_CHOICE_SWITCH",
        "default": "semiLightModeOption",
        "value": "/public/css/themes/ultradark.css"
    }),
    "semiDarkModeOption": new SwitchEdit({
        "elementName": "semiDarkModeOption",
        "otherElementNames": ["ultraDarkModeOption", "semiLightModeOption"],
        "storageName": "THEME_CHOICE_SWITCH",
        "default": "semiLightModeOption",
        "value": "/public/css/themes/semidark.css"
    }),
    "semiLightModeOption": new SwitchEdit({
        "elementName": "semiLightModeOption",
        "otherElementNames": ["semiDarkModeOption", "ultraDarkModeOption"],
        "storageName": "THEME_CHOICE_SWITCH",
        "default": "semiLightModeOption",
        "value": "/public/css/themes/semilight.css"
    }),
    "headerButtonsToggle": new ToggleEdit({
        "elementName": "headerButtonsToggle",
        "storageName": "HEADER_BUTTONS_TOGGLE",
        "default": "false"
    }),
    "popoutToolButtonToggle": new ToggleEdit({
        "elementName": "popoutToolButtonToggle",
        "storageName": "POPOUT_TOOL_BUTTON_TOGGLE",
        "default": "true"
    }),
    "fullscreenToolButtonToggle": new ToggleEdit({
        "elementName": "fullscreenToolButtonToggle",
        "storageName": "FULLSCREEN_TOOL_BUTTON_TOGGLE",
        "default": "true"
    }),
    "screenshotToolButtonToggle": new ToggleEdit({
        "elementName": "screenshotToolButtonToggle",
        "storageName": "SCREENSHOT_TOOL_BUTTON_TOGGLE",
        "default": "true"
    }),
    "skipRepeatsToggle": new ToggleEdit({
        "elementName": "skipRepeatsToggle",
        "storageName": "SKIP_REPEATS_TOGGLE",
        "default": "false"
    }),
    "pasteMenuToggle": new ToggleEdit({
        "elementName": "pasteMenuToggle",
        "storageName": "PASTE_MENU_TOGGLE",
        "default": "false"
    }),
    "blockedIPList": new ExternalField({
        "external": IPBlockingManager.MENU.enable.bind(IPBlockingManager.MENU)
    }),
    "unblockAllIPAddresses": new ExternalField({
        "external": IPBlockingManager.API.clearBlockConfig.bind(IPBlockingManager.API)
    }),
    "voiceCommandToggle": new ToggleEdit({
        "elementName": "voiceCommandToggle",
        "storageName": "VOICE_COMMAND_TOGGLE",
        "default": "false"
    }),
    "voiceCommandInfo": new ExternalField({
        "external": SpeechEngineManager?.Menu?.reloadMenu || alert("Menu failed to load!")
    }),
    "autoReconnectType": new FieldEdit({
        "storageName": "AUTO_RECONNECT_TYPE_FIELD",
        "prompt": "Enter where you want auto-reconnect to be enabled." +
            "\n\n1 = Text Chat" +
            "\n2 = Video Chat" +
            "\n3 = Both Chats",
        "default": "1",
        "check": (response) => {

            // Accept all no-values
            if (!["1", "2", "3"].includes(response)) {
                return {
                    "confirm": "false",
                    "value": response
                }
            }

            return {
                "confirm": "true",
                "value": response
            };
        }
    }),
    "homePageSplashToggle": new ToggleEdit({
        "elementName": "homePageSplashToggle",
        "storageName": "HOME_PAGE_SPLASH_TOGGLE",
        "default": "false"
    }),
    "homePageSplashEdit": new FieldEdit({
        "storageName": "HOME_PAGE_SPLASH_FIELD",
        "prompt": "Enter a new splash background image URL:",
        "default": "https://i.imgur.com/qa5Hkl9.jpeg",
        "check": (response) => {
            return {
                "confirm": isValidHttpsUrl(response) ? "true" : "false",
                "value": response
            }
        }
    }),
    "autoSkipWordsToggle": new ToggleEdit({
        "elementName": "autoSkipWordsToggle",
        "storageName": "AUTO_SKIP_WORDS_TOGGLE",
        "default": "false"
    }),
    "autoSkipAgeToggle": new ToggleEdit({
        "elementName": "autoSkipAgeToggle",
        "storageName": "AUTO_SKIP_AGE_TOGGLE",
        "default": "false"
    }),
    "autoSkipAgeField": new FieldEdit({
        "storageName": "AUTO_SKIP_AGE_FIELD",
        "prompt": "Enter the ACCEPTABLE age-range when people send their age in the chat (e.g. 18-22, 18+). " +
            "People OUTSIDE of this acceptable range will be automatically skipped.\n\n" +
            "Only the first 5 stranger messages will be checked.",
        "default": "18+",
        "check": (response) => {

            // Early exit
            if (response == null) {
                return {
                    "confirm": "false",
                    "value": response
                };
            }

            response = response.replaceAll(" ", "");
            let min, max;

            // TYPE 1: Range is N-Z
            let split = response.split("-");
            if (isNumeric(split[0])) {
                min = parseInt(split[0]);
            }
            if (isNumeric(split[1])) {
                max = parseInt(split[1]);
            }
            if (min && max) {
                return {
                    "confirm": "true",
                    "value": `${Math.max(18, min)}-${max}`
                };
            }

            // TYPE 2: Range is N+
            let test = response.replace("+", "");
            if (isNumeric(test)) {
                min = parseInt(test)
            }
            if (min) {
                return {
                    "confirm": "true",
                    "value": `${Math.max(18, min)}+`
                }
            }

            // TYPE 3: Invalid
            return {
                "confirm": "false",
                "value": response
            };

        }
    }),
    "autoSkipWordsField": new FieldEdit({
        "storageName": "AUTO_SKIP_WORDS_FIELD",
        "prompt": "Enter words that should automatically result in a skipped chat, comma-separated " +
            "(e.g. \"sex,anal,porn\").\n\n" +
            "Only the first 5 stranger messages will be checked.",
        "default": "sex,anal,porn",
        "check": (response) => {

            // Early exit
            if (response == null) {
                return {
                    "confirm": "false",
                    "value": response
                };
            }

            // Sanitize
            let values = response.split(",");
            let sanitized = [];

            for (let value of values) {
                let sanitizedValue = value.trim().toLowerCase();

                if (sanitizedValue.length > 0 && !sanitized.includes(sanitizedValue)) {
                    sanitized.push(sanitizedValue);
                }
            }

            return {
                "confirm": "true",
                "value": sanitized.join(",")
            };
        }
    }),
}


