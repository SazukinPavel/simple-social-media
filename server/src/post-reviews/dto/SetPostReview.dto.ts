import { IsBoolean, IsUUID } from 'class-validator';

export class SetPostReviewDto {
  @IsUUID()
  postId: string;
  @IsBoolean()
  isPositive: boolean;
}
