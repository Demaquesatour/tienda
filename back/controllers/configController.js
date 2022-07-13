var Config = require('../models/config');

const obtener_config_admin = async function(req, res){
    if(req.user) {
        if(req.user.role == 'admin') {
            let reg = await Config.findById({_id:"62ccba6d64f14881b244fb6b"});
            res.status(200).send({data:reg});
        } else {
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const actualiza_config_admin = async function(req,res){
    if (req.user) {
        if (req.user.role == 'admin') {
            let data = req.body;
            if (req.files) {
                //SI HAY IMAGEN
                console.log('Si hay imagen');
                var img_path = req.files.logo.path;
                var name = img_path.split('\\');
                var logo_name = name[2];
                let reg = await Config.findByIdAndUpdate({_id:"62ccba6d64f14881b244fb6b"},{
                    categorias:data.categorias,
                    titulo: data.titulo,
                    serie: data.serie,
                    logo: logo_name,
                    correlativo: data.correlativo,
                });       
                fs.stat('./uploads/configuraciones/'+reg.logo,function(err){
                    if (!err) {
                        fs.unlink('./uploads/configuraciones/'+reg.logo, (err)=>{
                            if (err) throw err;
                        });
                    }
                })
                res.status(200).send({data:reg});
            } else {
                console.log('No hay imagen');
                let reg = await Config.findByIdAndUpdate({_id:"62ccba6d64f14881b244fb6b"},{
                    categorias:data.categorias,
                    titulo: data.titulo,
                    serie: data.serie,
                    correlativo: data.correlativo,
                });      
                res.status(200).send({data:reg});          
            }
            await Config.create({
                categorias: [],
                titulo: 'Villaflex',
                logo: 'logo.png',
                serie: 0001,
                correlativo: 00001,
            });
        } else {
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}


module.exports = {
    actualiza_config_admin,
    obtener_config_admin
}