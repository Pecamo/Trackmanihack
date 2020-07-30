export class GlobalState {
    private static instance: GlobalState;
    private initState: any;

    private constructor() {
        // Clone state into InitState
        this.initState = {
            ...this.state
        };
    }
    

    public state = {
        isFirstLookback: true,
    }

    public static getInstance(): GlobalState {
        if (typeof this.instance === "undefined") {
            this.instance = new GlobalState();
        }

        return this.instance;
    }

    public reset() {
        this.state = {
            ...this.initState
        };
    }
}
