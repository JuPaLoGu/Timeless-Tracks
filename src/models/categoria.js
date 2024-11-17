const mongoose=require("mongoose");

const categoriaSchema=mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type:String,
        required:true
    },
    musicas:[{type:mongoose.Schema.Types.ObjectId,ref: 'musica'}]

});
module.exports=mongoose.model('categoria',categoriaSchema);