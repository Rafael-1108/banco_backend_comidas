import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAll = async () => {
    return await prisma.comida.findMany({
        orderBy: { nome: 'asc' }
    });
}

export const findById = async (id) => {
    return await prisma.comida.findUnique({
        where: { id: Number(id) }
    });
}

export const create = async (dadosComida) => {
    return await prisma.comida.create({
        data: dadosComida,
    });
}

export const update = async (id, dadosParaAtualizar) => {
    
    const comidaAtualizada = await prisma.comida.update({
        where: { id: Number(id) },
        data: dadosParaAtualizar,
    });
    
    return comidaAtualizada;
}

export const remove = async (id) => {
    await prisma.comida.delete({
        where: { id: Number(id) },
    });
}