import FormConnectApiHelper, { IFormConnectApiHandler } from './base';
import ApiUpdaterContainer from '../index';
// import {  } from 'data struct' // 数据结构

class KeyeventNextApiHelper extends FormConnectApiHelper<any> {
    constructor(handler: IFormConnectApiHandler<any>) {
        super(handler);
    }
}

const handler: IFormConnectApiHandler<any> = {
    data() {
        return 'update data...'
    },
    update(data: any, ...args: any[]) {
        console.log('===> update data:', data, ...args);
    },
}

ApiUpdaterContainer.use('keyevent-next', new KeyeventNextApiHelper(handler));
