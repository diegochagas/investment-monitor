export function populate<T>(type: { new(data: any): T }, object: any): T {
    const instance = new type(object);
    
    Object.keys(instance)
        .forEach((key) => {
            if (typeof object[key] === 'object' &&
                (!Array.isArray(object[key]) && !Array.isArray(instance[key])) &&
                object[key] !== null
            ) {
                instance[key] = populate(instance[key].constructor, object[key]);
            } else if(typeof object[key] === 'object' &&
                (Array.isArray(object[key]) && Array.isArray(instance[key])) &&
                object[key] !== null) {
                if( typeof instance[key][0] !== 'object') {
                    instance[key] = object[key];
                } else {
                    instance[key] = object[key].map(obj => populate(instance[key][0].constructor, obj));
                }
            }
            else {
                instance[key] = object[key];
            }
        });
    return instance
}
