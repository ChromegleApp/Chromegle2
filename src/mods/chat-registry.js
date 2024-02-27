class ChatRegistryManager extends Module {

    constructor() {
        super();
        console.log("ChatRegistryManager")
        ChatRegistry = this;
        this.#observer.observe(document, {subtree: true, childList: true, attributes: true});
        //this.addEventListener("click", this.onButtonClick, undefined, document);
        
    }

    #setUUID = () => this.#chatUUID = shortUuid();
    #clearUUID = () => this.#chatUUID = null;

    #observer = new MutationObserver(this.onMutationObserved.bind(this));
    #isChatting = false;
    #chatUUID = null;

    isChatting = () => this.#isChatting;
    getUUID = () => this.#chatUUID;

    onMutationObserved(mutations) {
        for (let mutationRecord of mutations) {
           this.onMutationRecord(mutationRecord);
        }
    }

    onMutationRecord(mutationRecord) {

        // Chat loaded
        if (mutationRecord.target["innerText"] != null) {
            if (mutationRecord.target["innerText"].includes("Peer's webcam")) {
                this.#isChatting = true;
                this.#setUUID();
            }
        }

        if (mutationRecord.target["innerText"] != null) {
            if (mutationRecord.target["innerText"].includes("Stranger has disconnected")) {
                this.#isChatting = false;
                this.#clearUUID();
            }
        }else if(mutationRecord.target["innerText"] != null) {
            if (mutationRecord.target["innerText"].includes("Peer's webcam")) {
                this.#isChatting = true;
                this.#setUUID();
            }
        }
        else{
            this.#isChatting = false;
            this.#clearUUID();
        }
           
        console.log( this.#isChatting)
    }
}