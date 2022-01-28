import {
  IsAlpha,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class CreateMedicoDto {
  @IsNotEmpty({ message: 'Insira um nome.' })
  @IsAlpha()
  nome: string;

  @IsNotEmpty({ message: 'Insira o seu CRM.' })
  @IsNumberString()
  crm: string;

  @IsNotEmpty({ message: 'Insira um telefone fixo.' })
  @IsNumberString()
  telefone_fixo: string;

  @IsNotEmpty({ message: 'Insira um telefone celular.' })
  @IsNumberString()
  telefone_celular: string;

  @IsInt({ each: true })
  especialidade: number[];

  @IsNumberString()
  cep: string;

  @IsOptional()
  estado: string;

  @IsOptional()
  cidade: string;

  @IsOptional()
  rua: string;

  @IsOptional()
  bairro: string;
}
