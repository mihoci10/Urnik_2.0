import tf from "@tensorflow/tfjs-node"

function random(min, max) {
    return Math.random()*(max-min)+min;
}

export class NeuralNetwork{

    _inputNodes;
    _hiddenNodes;
    _outputNodes;
    _model;

    constructor(a, b, c, d){
        if (a instanceof tf.Sequential){
            this._model = a;
            this._inputNodes = b;
            this._hiddenNodes = c;
            this._outputNodes = d;
        }
        else{
            this._inputNodes = a;
            this._hiddenNodes = b;
            this._outputNodes = c;
            this._model = this.createModel();
        }
    }

    copy(){
        return tf.tidy(() => {
            const modelCopy = this.createModel();
            const weights = this._model.getWeights();
    
            const weightCopy = [];
            for (let i = 0; i < weights.length; i++) 
                weightCopy.push(weights[i].clone())
    
            modelCopy.setWeights(weightCopy);
            return new NeuralNetwork(modelCopy, this._inputNodes, this._hiddenNodes, this._outputNodes);
        });
    }

    mutate(rate){
        tf.tidy(() => {
            const weights = this._model.getWeights();
            const mutatedWeights = [];
            for (let i = 0; i < weights.length; i++) {
                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();
                for (let j = 0; j < values.length; j++) {
                    if(random(0, 1) < rate){
                        let w = values[j];
                        values[j] = w + random(-1, 1)
                    }
                }
                let newTensor = tf.tensor(values, shape);
                mutatedWeights[i] = newTensor;
            }
            this._model.setWeights(mutatedWeights);
        });
    }

    predict(inputs){
        const xs = tf.tensor2d([inputs]);
        const ys = this._model.predict(xs);
        xs.dispose();
        const outputs = ys.dataSync();
        ys.dispose();
        return outputs;
    }

    createModel(){
        const model = tf.sequential();
        const hidden = tf.layers.dense({
            units: this._hiddenNodes,
            inputShape: [this._inputNodes],
            activation: 'sigmoid',
        });
        model.add(hidden);
        const output = tf.layers.dense({
            units: this._outputNodes,
            activation: 'softmax',
        });
        model.add(output);
        model.compile();
        return model;
    }

}