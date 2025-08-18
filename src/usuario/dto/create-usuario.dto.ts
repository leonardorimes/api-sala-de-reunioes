import { Cargo } from 'src/common/enums/cargo.enum';

export class CreateUsuarioDto {
  nome: string;
  senha: string;
  email: string;
  cargo: Cargo;
  salario: number;
}
