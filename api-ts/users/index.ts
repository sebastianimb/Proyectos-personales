import { Router } from 'express'
type Usuario = {
    id:string,
    name:string,
}
const router = Router()
router.get('/', (req, res)=>{
    res.send('Hola mundo')
})

router.post('/', (req,res)=>{
    const { name } = req.body as Usuario
    console.log(name);
    res.send('Ok Post')
    
})

export default router