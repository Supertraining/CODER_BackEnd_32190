import { Router }  from 'express';
import { fork } from 'child_process'
import path from 'path'


const forkRouter = Router();
function calculo(cantidad) {
	const hash = {};
	for (let i = 0; i <= cantidad; i++) {
		const val = Math.ceil(Math.random() * 1000);
		hash[val] ? (hash[val] += 1) : (hash[val] = 1);
	}
	return hash;
}

forkRouter.get('/api/randoms', (req, res) => {
    

const result = calculo(req.query?.cant || 100000000)
        res.json(result)

    // const calculo = fork(path.resolve('./api/calculo.js'))
    
    // calculo.on('message', result => {    
        
    //     if (result == 'listo') {
    //         calculo.send(req.query?.cant || 100000000)
    //     } else {
    //         res.json(result)
    //     }
    // })
})

export default forkRouter