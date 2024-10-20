interface ICity {
    id: number;
    pid: number;
    name: string;
    children: ICity[]
}

export const converse = (cityArr) => {
    let map = new Map<number, ICity>()
    let arr = <ICity>[]

    for (let city of Object.values(cityArr)) {
        let d = {
            id: city.id,
            pid: city.pid,
            name: city.extName,
            children: [],
        }
        map.set(city.id, d)
        if (city.pid === 0) {
            arr.push(d)
        } else {
            let newVar = map.get(city.pid);
            newVar.children.push(d)
        }
    }
    return arr
}
