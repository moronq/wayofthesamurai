export const updateObjectInArray = (item, itemId, objPropName, newObjProp) => {
    return item.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProp}
        }
        return u
    })
}