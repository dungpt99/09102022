import { ApiProperty } from "@nestjs/swagger";
import { OrderBy } from "src/common/constants/common.constants";
import { CommonPaginationDto } from "src/common/dto/pagination.dto";

export class GetItemsDto extends CommonPaginationDto {
	@ApiProperty({ enum: OrderBy, default: OrderBy.ASC, required: false })
	order?: OrderBy.ASC;

	@ApiProperty({ required: false })
	status?: Boolean;

	@ApiProperty({ required: false })
	categoryId?: string;
}
