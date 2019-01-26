import {Container} from '../Container/Container';

export const Handler = (): ClassDecorator => {
    return registerAnnotation('Handler');
};

export const Injectable = (): ClassDecorator => {
    return registerAnnotation('Injectable');
};
export const AngularController = (): ClassDecorator => {
    return registerAnnotation('AngularController');
};
export const Tile = (): ClassDecorator => {
    return registerAnnotation('Tile');
};

const registerAnnotation = (name) => {
    return target => {
        if (typeof target._annotations === 'undefined') {
            target._annotations = [];
        }
        target._annotations.push(name);
        return target;
    };
};
export const On = (eventName): MethodDecorator => {
    registerAnnotation('On');
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        const fn = target[propertyKey];
        console.log(Container.getInstance());
        target[propertyKey] = (...args) => {

        };
    };
};
