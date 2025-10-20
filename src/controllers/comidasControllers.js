import * as ComidaModel from '../models/comidasModels.js'

export const listarTodos = async (req, res) => {
    try {
        const comidas = await ComidaModel.findAll();

        if (!comidas || comidas.length === 0) {
            res.status(404).json({
                total: comidas.length,
                mensagem: 'Não há comidas na lista',
                comidas
            })
        }

        res.status(200).json({
            total: comidas.length,
            mensagem: 'Lista de comidas',
            comidas
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro interno de servidor',
            detalhes: error.message,
            status: 500
        })
    }
}

export const listarUm = async (req, res) => {
    try {
        const id = req.params.id;
        const comida = await ComidaModel.findById(id);

        if (!comida) {
            return res.status(404).json({
                erro: 'Comida não encontrada!',
                mensagem: 'Verifique se o id da comida existe',
                id: id
            })
        }

        res.status(200).json({
            mensagem: 'Comida encontrada',
            comida
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao buscar comida por id',
            detalhes: error.message
        })
    }
}