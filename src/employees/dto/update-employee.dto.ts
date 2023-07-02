import { IsAlpha, Length, IsOptional } from 'class-validator';

export class updateEmployeeDTO {
  @IsOptional()
  @IsAlpha()
  @Length(3, 20)
  firstname: string;

  @IsOptional()
  @IsAlpha()
  @Length(3, 20)
  lastname: string;

  @IsOptional()
  position: string;
}
