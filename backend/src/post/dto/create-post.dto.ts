import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
 
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  image: string;
}