const crypt = require('crypto');
const connection = require('../database/connections.js');

module.exports = {

    //Retorna todos os Contatos Cadastrados
    async index(request, response) {
        const contatos = await connection('contatos').select('*');
        
        return response.json(contatos);
    },

    //Cadastra um Contato
    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;

        const id = crypt.randomBytes(4).toString('HEX');

        await connection('contatos').insert({
            id, name, email, whatsapp, city, uf
        });
        return response.json({ id });
    },

    //Da update em um Contato
    async update(request, response, next){
        try{
            const { name, email, whatsapp, city, uf } = request.body;
            const { id } = request.params;
            const contatoID = await connection('contatos').select('*').where({id: id});

            if(contatoID != ""){
                await connection('contatos')
                .update({ name, email, whatsapp, city, uf })
                .where({ id: id })

                return response.json({ "Status": "Alterado com Sucesso!" });
            }
        
            return response.status(400).json({ "Status": "ID de Contato não encontrado!" });
        }catch(error){
            next(error)
        }
    },

    //Deleta um Contato
    async delete(request, response){
        const { id } = request.params;
        const contato = await connection('contatos').select('*').where({ id: id });

        if(contato != ""){
            await connection('contatos').where('id', id).delete();
    
            return response.json({ contato, "Status": "Removido com Sucesso" });
        }

        return response.status(400).json({ "Status": "ID de Contato não encontrado!" });
    }
};