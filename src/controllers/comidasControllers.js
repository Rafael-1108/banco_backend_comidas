import * as ComidaModel from '../models/comidasModels.js'

export const listarTodos = async (req, res) => {
    try {
        const comidas = await ComidaModel.findAll();

        if (!comidas || comidas.length === 0) {
            return res.status(404).json({
                total: comidas.length,
                mensagem: 'Não há comidas na lista',
                comidas
            })
        }

        return res.status(200).json({
            total: comidas.length,
            mensagem: 'Lista de comidas',
            comidas
        })

    } catch (error) {
        return res.status(500).json({
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

export const criarComida = async (req, res) => {
    try {
        const novaComida = req.body;

        // Adicionar validação básica se necessário (ex: verificar campos obrigatórios)
        if (Object.keys(novaComida).length === 0) {
            return res.status(400).json({
                erro: 'Dados inválidos',
                mensagem: 'O corpo da requisição não pode estar vazio.'
            });
        }
        
        const comidaCriada = await ComidaModel.create(novaComida);

        return res.status(201).json({
            mensagem: 'Comida cadastrada com sucesso!',
            comida: comidaCriada
        });
    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao cadastrar a comida',
            detalhes: error.message,
            status: 500
        });
    }
}

// PUT /comidas/:id - Atualizar uma comida existente (UPDATE)
export const atualizarComida = async (req, res) => {
    try {
        const id = req.params.id;
        const dadosParaAtualizar = req.body;

        // 1. Verificar se a comida existe
        const comidaExistente = await ComidaModel.findById(id);
        if (!comidaExistente) {
            return res.status(404).json({
                erro: 'Comida não encontrada!',
                mensagem: 'Não é possível atualizar um ID inexistente.',
                id: id
            });
        }

        // 2. Tentar atualizar
        // Assumindo que ComidaModel.update retorna a comida atualizada ou null/false em caso de falha.
        const comidaAtualizada = await ComidaModel.update(id, dadosParaAtualizar);

        return res.status(200).json({
            mensagem: 'Comida atualizada com sucesso!',
            comida: comidaAtualizada
        });
    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao atualizar a comida',
            detalhes: error.message,
            status: 500
        });
    }
}

// DELETE /comidas/:id - Remover uma comida (DELETE)
export const removerComida = async (req, res) => {
    try {
        const id = req.params.id;

        // 1. Verificar se a comida existe
        const comidaExistente = await ComidaModel.findById(id);
        if (!comidaExistente) {
            return res.status(404).json({
                erro: 'Comida não encontrada!',
                mensagem: 'Não é possível remover um ID inexistente.',
                id: id
            });
        }

        // 2. Tentar remover
        // Assumindo que ComidaModel.remove retorna true em caso de sucesso
        await ComidaModel.remove(id);

        return res.status(200).json({
            mensagem: `Comida com ID ${id} removida com sucesso!`,
            id: id
        });
    } catch (error) {
        return res.status(500).json({
            erro: 'Erro ao remover a comida',
            detalhes: error.message,
            status: 500
        });
    }
}