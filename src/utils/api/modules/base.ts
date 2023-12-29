export interface IFormConnectApiHandler<T> {
    data: () => T; // 用于更新的数据
    update: (data: T, ...args: any[]) => void; // 更新数据
}

export default class FormConnectApiHelper<T> {
    private updater: IFormConnectApiHandler<T> | null = null;

    constructor(handler: IFormConnectApiHandler<T>) {
        this.updater = handler;
    }

    update(...args: any[]) {
        return this.updater?.update(this.updater.data(), ...args)
    }
}