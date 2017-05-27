export default class PlannerStorage {
    constructor() {
        this.currentModelIndex = -1;
        this.models = [];
        this._idCnt = 0;
    }

    get currentModel() {
        if (this.currentModelIndex === -1) return null;
        return this.models[this.currentModelIndex];
    }

    addModel(modelProps) {
        const id = this._idCnt++;
        this.models.push({ id, key: id, ... modelProps });
        this.currentModelIndex = this.models.length - 1;
    }

    removeCurrentModel() {
        this.models.splice(this.currentModelIndex, 1);
        this.currentModelIndex = -1;
    }

    clone() {
        let copy = new PlannerStorage();
        copy._idCnt = this._idCnt;
        copy.currentModelIndex = this.currentModelIndex;
        copy.models = [];
        for (let i = 0; i < this.models.length; i++) {
            let model = this.models[i];
            let newModel = {
                source: { obj: model.source.obj },
                layoutOrigin: model.layoutOrigin.slice(0),
                wireframe: model.wireframe,
                style: {
                    transform: [
                        { rotateY: model.style.transform[0].rotateY },
                        { rotateX: model.style.transform[1].rotateX },
                        { translate: model.style.transform[2].translate.slice(0) },
                        { scale: model.style.transform[3].scale },
                        { rotateX: model.style.transform[4].rotateX },
                        { rotateY: model.style.transform[5].rotateY },
                    ]
                },
            };
            copy.models.push(newModel);
        }
        return copy;
    }
}
