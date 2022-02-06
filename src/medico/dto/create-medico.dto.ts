import {
  ArrayMinSize,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMedicoDto {
  @IsNotEmpty({ message: 'Insira um nome.' })
  @MaxLength(120)
  nome: string;

  @IsNotEmpty({ message: 'Insira o seu CRM.' })
  @IsNumberString()
  @MaxLength(7)
  @MinLength(7)
  crm: string;

  @IsNotEmpty({ message: 'Insira um telefone fixo.' })
  @IsNumberString()
  @MaxLength(12)
  telefone_fixo: string;

  @IsNotEmpty({ message: 'Insira um telefone celular.' })
  @IsNumberString()
  @MaxLength(12)
  telefone_celular: string;

  @IsInt({ each: true })
  @ArrayMinSize(2)
  especialidades: number[];

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
