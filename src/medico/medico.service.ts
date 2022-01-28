import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { fetch } from 'cross-fetch';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MedicoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMedicoDto) {
    const { cep } = dto;

    // funcao para verificar a resposta da requisicao
    const isOk = (response) => {
      if (response.ok) {
        return response.json();
      }
    };

    // essa const guarda o objeto que retornara da api viacep
    const cepData = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(
      isOk,
    );

    if (cepData && dto.especialidade.length > 1) {
      await this.prisma.medico.create({
        data: {
          nome: dto.nome,
          crm: dto.crm,
          telefone_fixo: dto.telefone_fixo,
          telefone_celular: dto.telefone_celular,
          especialidade: { connect: dto.especialidade.map((id) => ({ id })) },
          cep: dto.cep,
          estado: cepData.uf,
          cidade: cepData.localidade,
          bairro: cepData.bairro,
          rua: cepData.logradouro,
        },
      });
    } else {
      throw new BadRequestException(
        'Verifique se o seu CEP está correto e/ou se você colocou, pelo menos, duas especializações médicas.',
      );
    }
  }

  findAll() {
    return `This action returns all medico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medico`;
  }

  update(id: number, updateMedicoDto: UpdateMedicoDto) {
    return `This action updates a #${id} medico`;
  }

  remove(id: number) {
    return `This action removes a #${id} medico`;
  }
}
