import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { fetch } from 'cross-fetch';
import { PrismaService } from 'src/prisma/prisma.service';
import { medico, prisma, Prisma } from '@prisma/client';

@Injectable()
export class MedicoService {
  constructor(private prisma: PrismaService) {}

  async dadosCep(numeroCep: string) {
    const isOk = (response) => {
      if (response.ok) {
        return response.json();
      }
    };

    const cepData1 = await fetch(
      `https://viacep.com.br/ws/${numeroCep}/json/`,
    ).then(isOk);

    if (!cepData1) {
      throw new NotFoundException(
        'Por favor, digite o CEP no formato de 8 digitos.',
      );
    } else if (cepData1.erro) {
      throw new BadRequestException('Por favor, digite um CEP existente.');
    }

    return cepData1;
  }

  ////////////////////////////////////////////////////////////////////////////

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

    if (cepData.erro) {
      throw new NotFoundException('CEP não existente.');
    }

    if (cepData) {
      try {
        await this.prisma.medico.create({
          data: {
            nome: dto.nome,
            crm: dto.crm,
            telefone_fixo: dto.telefone_fixo,
            telefone_celular: dto.telefone_celular,
            especialidades: {
              connect: dto.especialidades.map((id) => ({ id })),
            },
            cep: dto.cep,
            estado: cepData.uf,
            cidade: cepData.localidade,
            bairro: cepData.bairro,
            rua: cepData.logradouro,
          },
        });
      } catch (error) {
        throw new NotFoundException(
          'Pelo menos uma das especialidades selecionadas não existe.',
        );
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////

  async findAll(): Promise<medico[]> {
    return await this.prisma.medico.findMany({
      where: { deletado: false },
      include: { especialidades: true },
    });
  }

  ////////////////////////////////////////////////////////////////////////////

  async idVerification(medicoId: number) {
    if (isNaN(medicoId) == true) {
      throw new BadRequestException('Por favor, digite um ID válido.');
    }

    if (Number.isInteger(medicoId) == false) {
      throw new BadRequestException(
        'Por favor, digite um ID numérico inteiro.',
      );
    }

    const validarMedico = await this.prisma.medico.findUnique({
      where: { id: medicoId },
    });

    if (!validarMedico || validarMedico.deletado == true) {
      throw new NotFoundException('O médico inserido não foi encontrado.');
    } else {
      return validarMedico;
    }
  }

  ////////////////////////////////////////////////////////////////////////////

  async findOne(medicoId: number) {
    return await this.idVerification(medicoId);
  }

  ////////////////////////////////////////////////////////////////////////////

  async update(medicoid: number, dto: UpdateMedicoDto) {
    const verificarId = await this.idVerification(medicoid);
    if (!verificarId) {
      throw new BadRequestException('O médico inserido não foi encontrado.');
    }

    if (dto.especialidades) {
      const listaEspecialidades = dto.especialidades;
      const numeroEspecialidades = await this.prisma.especialidade.findMany({
        where: { id: { in: listaEspecialidades } },
      });

      let especialidadesExistentes = 0;
      for (const obj of numeroEspecialidades) {
        especialidadesExistentes++;
      }

      let especialidadesDto = 0;
      for (const obj of listaEspecialidades) {
        especialidadesDto++;
      }

      if (especialidadesExistentes !== especialidadesDto) {
        throw new NotFoundException(
          'Pelo menos uma das especialidades não foi encontrada.',
        );
      } else {
        await this.prisma.medico.update({
          where: { id: medicoid },
          data: { especialidades: { set: [] } },
        });
      }
    }

    if (dto.cep) {
      const infoCep = await this.dadosCep(dto.cep);

      const data: Prisma.medicoUpdateInput = {
        ...dto,
        especialidades: {},
        cep: infoCep.cep,
        estado: infoCep.uf,
        cidade: infoCep.localidade,
        bairro: infoCep.bairro,
        rua: infoCep.logradouro,
      };

      await this.prisma.medico.update({ where: { id: medicoid }, data });
    }

    const data: Prisma.medicoUpdateInput = {
      ...dto,
      especialidades: {
        connect: dto.especialidades?.map((id) => ({
          id,
        })),
      },
    };

    await this.prisma.medico.update({ where: { id: medicoid }, data });
  }

  ////////////////////////////////////////////////////////////////////////////

  async softDelete(medicoId: number) {
    const verificarId = await this.idVerification(medicoId);
    if (!verificarId) {
      throw new BadRequestException('O médico inserido não foi encontrado.');
    }

    await this.prisma.medico.update({
      where: { id: medicoId },
      data: { deletado: true },
    });
  }
}
