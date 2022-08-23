import { IsBoolean, IsString } from 'class-validator';

export class SetPostReviewDto {
  @IsString()
  postId: string;
  @IsBoolean()
  isPositive: boolean;
}
