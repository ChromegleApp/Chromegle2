class UnmoderatedChatManager extends Module {

    constructor() {
        super();
        this.observer = null;
        this.addMultiElementListener(
            "click", this.onStartButtonClick, "#skip-btn"
        );

    }

    /**
     * Listen for start button click
     */
    onStartButtonClick() {
        this.cleanPage();
        this.observer = this.createMutationObserver();
        this.observer.observe(document, {attributes: true, childList: true, subtree:true});
    }

    /**
     * Create mutation observer to check for newly added NSFW ads
     * @returns {MutationObserver}
     */
    createMutationObserver() {
        return new MutationObserver(() => {});
    }

}






