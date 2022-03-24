export const updateObjectInArray = (item: any, itemId: any, objPropName: any, newObjProp: any) => {
    return item.map((u: any) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProp}
        }
        return u
    })
}