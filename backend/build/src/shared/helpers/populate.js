"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function populate(type, object) {
    var instance = new type(object);
    Object.keys(instance)
        .forEach(function (key) {
        if (typeof object[key] === 'object' &&
            (!Array.isArray(object[key]) && !Array.isArray(instance[key])) &&
            object[key] !== null) {
            instance[key] = populate(instance[key].constructor, object[key]);
        }
        else if (typeof object[key] === 'object' &&
            (Array.isArray(object[key]) && Array.isArray(instance[key])) &&
            object[key] !== null) {
            if (typeof instance[key][0] !== 'object') {
                instance[key] = object[key];
            }
            else {
                instance[key] = object[key].map(function (obj) { return populate(instance[key][0].constructor, obj); });
            }
        }
        else {
            instance[key] = object[key];
        }
    });
    return instance;
}
exports.populate = populate;
//# sourceMappingURL=populate.js.map