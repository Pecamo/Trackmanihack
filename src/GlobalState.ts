export class GlobalState {
    private static instance: GlobalState;
    private initState: any;
    private version: number;
    private stringStorage: string[] = [];
    private isEof: boolean;

    private constructor() {
        // Clone state into InitState
        this.initState = {
            ...this.state
        };
    }

    public state = {
        isFirstLookback: true,
        version: undefined,
        stringStorage: [],
        isEof: false,
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
