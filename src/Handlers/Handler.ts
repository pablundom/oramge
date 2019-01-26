import {Container} from '../Container/Container';

export interface Handler {
    handlerName: string;
    activated: boolean;
    deactivate();
    activate();
    register();
}


