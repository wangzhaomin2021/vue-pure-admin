import FormConnectApiHelper from './modules/base'

export default class ApiUpdaterContainer {
    static container: Map<string, FormConnectApiHelper<any>> = new Map();

    static use<T>(name: string, apiUpdater: FormConnectApiHelper<T>) {
        ApiUpdaterContainer.container.set(name, apiUpdater);
    }

    static unload(name: string) {
        ApiUpdaterContainer.container.delete(name);
    }

    static get<T>(name: string): FormConnectApiHelper<T> | null {
        const apiUpdater = ApiUpdaterContainer.container.get(name);
        if (!apiUpdater) {
            console.error(`===> apiUpdater ${name} not found`);
            return null;
        }
        return apiUpdater;
    }
}